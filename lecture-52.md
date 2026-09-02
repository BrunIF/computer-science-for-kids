# Лекція 52. Фінальний проєкт: Computer Detective

> **Рівень 10: Фінальний інженерний рейд**
>
> Марко, сьогодні ми не просто вивчимо новий термін — ми відкриємо ще один шар того, як насправді працює комп’ютер.

## Що ми сьогодні розкриємо

- об’єднати Python, Linux, файли, ОС, мережі, безпеку та Git
- створити корисний CLI-інструмент для дослідження власного комп’ютера
- опублікувати безпечний навчальний проєкт на GitHub разом із README

## Фінал — не нова магія, а складання знайомих деталей

Марко, сьогодні ми не вводимо десятки нових понять. Навпаки: беремо вже вивчені моделі й будуємо інструмент **Computer Detective**.

Програма має відповісти на питання:
- яка ОС і версія Python;
- який hostname;
- який процесор/архітектура;
- скільки логічних CPU;
- яка домашня та поточна директорія;
- скільки місця на файловій системі;
- яка локальна адреса визначена для вихідного мережевого маршруту, але без обов’язкової публікації цієї адреси.

Ми зберемо дані, красиво виведемо їх, зробимо файл виконуваним, commit-имо й підготуємо GitHub-публікацію.

## Python має стандартні модулі для системної інформації

Ми використаємо лише стандартну бібліотеку:

- `platform` — ОС, архітектура, Python;
- `os` — CPU count, користувацьке середовище, шляхи;
- `socket` — hostname і навчальна спроба визначити локальну адресу;
- `shutil` — інформація про disk usage;
- `pathlib.Path` — робота з шляхами.

Якщо певне поле недоступне на конкретній системі, хороший інструмент не повинен падати без пояснення — тому використаємо функції й обережну обробку мережевого кроку.

## Приватність — частина вимог проєкту

System Detective знає багато про комп’ютер, але README не повинен містити реальні секрети чи зайві персональні дані. Ми розділимо **локальний результат** і **публічний приклад**.

У README можна показати:

```text
Hostname: <hidden>
Local IP: <hidden>
OS: Ubuntu ...
Python: 3.x.x
```

Тобто вміння **не** публікувати зайве — теж результат курсу.

## Приклади

### Приклад 1

Функція `shutil.disk_usage(Path.home())` повертає total, used, free для файлової системи, де лежить домашній каталог.

### Приклад 2

`platform.system()` може повернути `Linux`, а `/etc/os-release` дає більш людську назву дистрибутива; у базовому проєкті достатньо стандартного `platform`.

### Приклад 3

Git commit фіксує локальну версію проєкту; `git push` публікує вже створені commits у remote — ми не плутаємо ці кроки.

## Фінальна лабораторія: будуємо проєкт

### Крок 1. Структура

```bash
mkdir -p ~/Projects/computer-detective
cd ~/Projects/computer-detective
touch computer_detective.py README.md .gitignore
```

### Крок 2. Код `computer_detective.py`

```python
#!/usr/bin/env python3

import os
import platform
import socket
import shutil
from pathlib import Path


def bytes_to_gib(value):
    return value / (1024 ** 3)


def detect_local_ip():
    """Return a likely local outbound IP without sending application data."""
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # UDP connect selects a route; no application packet has to be sent here.
        sock.connect(("1.1.1.1", 80))
        return sock.getsockname()[0]
    except OSError:
        return "unavailable"
    finally:
        sock.close()


def main():
    home = Path.home()
    disk = shutil.disk_usage(home)

    print("=== Computer Detective ===")
    print("OS:", platform.system(), platform.release())
    print("Machine:", platform.machine())
    print("Python:", platform.python_version())
    print("Hostname:", socket.gethostname())
    print("Logical CPUs:", os.cpu_count())
    print("Home:", home)
    print("Current directory:", Path.cwd())
    print(f"Disk total: {bytes_to_gib(disk.total):.1f} GiB")
    print(f"Disk free: {bytes_to_gib(disk.free):.1f} GiB")
    print("Local IP:", detect_local_ip())


if __name__ == "__main__":
    main()
```

### Крок 3. Запуск і права

```bash
python3 computer_detective.py
chmod +x computer_detective.py
./computer_detective.py
```

Поясни, навіщо shebang і чому `chmod +x` не був потрібен для варіанта `python3 computer_detective.py`.

### Крок 4. `.gitignore`

```gitignore
__pycache__/
*.pyc
.venv/
.env
```

### Крок 5. README

У `README.md` напиши своїми словами:

~~~markdown
# Computer Detective

Навчальний Linux/Python-проєкт, який показує базову інформацію про комп’ютер.

## Що я вивчив
- різницю між RAM і диском;
- що таке ОС, процес і файл;
- як працюють IP та localhost;
- як користуватися Git.

## Запуск
```bash
python3 computer_detective.py
```

## Приватність
Не публікуй реальний hostname, IP, username, токени або інші приватні дані у прикладах виводу.
~~~

Коли вставлятимеш вкладений code block у справжній README, використай зовнішні тильди `~~~markdown` або просто напиши розділи напряму, щоб Markdown-блоки не конфліктували.

### Крок 6. Git

```bash
git init
git status
git add computer_detective.py README.md .gitignore
git status
git commit -m "Build Computer Detective project"
git log --oneline
```

Якщо ім’я/адреса автора ще не налаштовані, зробіть це разом із дорослим privacy-friendly способом, як у лекції 44.

### Крок 7. GitHub

Перед публікацією:

```bash
git status
git diff --cached
```

Перевір файли очима. Потім разом із дорослим створіть порожній GitHub repository, додайте remote URL, який покаже GitHub, і виконайте типовий потік:

```bash
git branch -M main
git remote add origin ВАША_REMOTE_URL
git push -u origin main
```

Не вставляй токени, паролі чи приватні ключі в README, команду або файли репозиторію.

## Місія для Марка

Виконай місію по черзі. Якщо щось не виходить — спочатку перечитай приклад вище й спробуй знайти, на якому кроці результат відрізняється.

1. створи структуру `~/Projects/computer-detective`
2. набери програму самостійно, а не просто запускай нечитаний файл; після кожного блоку поясни його роль
3. запусти програму двома способами: через `python3` і як виконуваний файл
4. створи `.gitignore` і README з описом того, що **ти** зрозумів у курсі
5. зроби commit і переглянь `git log --oneline`
6. перед GitHub-публікацією перевір staged diff і видали з README точні приватні значення
7. разом із дорослим зроби push у GitHub
8. покажи проєкт іншій людині й без підглядання поясни: файл, процес, RAM, ОС, IP, port, Git commit, Git push

## Перевір себе

- Чому цей проєкт є інтеграцією всього курсу?
- Яка різниця між `python3 file.py` і `./file.py`?
- Навіщо потрібен `shutil.disk_usage`?
- Чому локальний IP можна показати на своєму екрані, але не обов’язково публікувати?
- Що фіксує commit і що робить push?
- Які три речі ти тепер можеш пояснити про комп’ютер краще, ніж до курсу?

## Що потрібно винести з лекції

- інформатика — це зв’язана система ідей від бітів до мереж та програм
- Linux дає інструменти спостерігати ці ідеї на реальному комп’ютері
- Python дозволяє автоматизувати дослідження, а Git — зберігати історію роботи
- безпека й приватність є частиною інженерної якості, а не додатком наприкінці

---

**Хакерський принцип:** не запам’ятовуй магічні слова. Намагайся пояснити своїми словами, що відбулося і чому.
