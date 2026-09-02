/**
 * Копіює файли курсу з кореня репозиторію в content collection Starlight.
 *
 * Лекції та словник живуть у корені проєкту (lecture-01.md … lecture-52.md,
 * glossary.md) і є єдиним джерелом правди. Перед збіркою/розробкою ми копіюємо
 * файли в src/content/docs/, додаючи до копій необхідний YAML frontmatter
 * (title), якого немає в оригінальних файлах Markdown (вони починаються з H1).
 *
 * Запуск: node scripts/sync-content.mjs
 */
import { mkdir, readFile, writeFile, access, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..', '..');
const targetDocs = path.resolve(__dirname, '..', 'src', 'content', 'docs');
const targetLectures = path.join(targetDocs, 'lectures');

const lectureFiles = Array.from({ length: 52 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return `lecture-${num}.md`;
});

await mkdir(targetLectures, { recursive: true });

// Видаляємо застарілі копії, яких більше немає
const existing = await readdir(targetLectures).catch(() => []);
for (const f of existing) {
  if (!lectureFiles.includes(f)) {
    await import('node:fs/promises').then((m) =>
      m.rm(path.join(targetLectures, f), { force: true })
    );
  }
}

function extractTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

async function renderWithFrontmatter(srcPath, fallbackTitle) {
  const content = await readFile(srcPath, 'utf-8');
  const title = extractTitle(content) ?? fallbackTitle;
  return `---
title: ${JSON.stringify(title)}
---

${content}`;
}

let copied = 0;

for (const file of lectureFiles) {
  const src = path.join(root, file);
  try {
    await access(src);
  } catch {
    console.warn(`⚠️  Пропущено (не знайдено): ${file}`);
    continue;
  }
  const out = await renderWithFrontmatter(src, `Лекція ${file.replace(/\D/g, '')}`);
  await writeFile(path.join(targetLectures, file), out);
  copied++;
}

// Словник — теж має H1, додаємо frontmatter аналогічно
const glossarySrc = path.join(root, 'glossary.md');
try {
  await access(glossarySrc);
  const out = await renderWithFrontmatter(glossarySrc, 'Словник курсу');
  await writeFile(path.join(targetDocs, 'glossary.md'), out);
  copied++;
} catch {
  console.warn('⚠️  Пропущено (не знайдено): glossary.md');
}

console.log(`✔ Скопійовано та опрацьовано ${copied} файлів у src/content/docs/`);
