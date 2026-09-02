// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
  site: 'https://brunif.github.io',
  base: '/computer-science-for-kids',
  integrations: [
    mermaid(),
    starlight({
      title: 'Курс «Як насправді працює комп’ютер»',
      description:
        'Практичний курс фундаментальної інформатики для Марка — від бітів до мереж, безпеки, Git та фінального проєкту Computer Detective.',
      logo: {
        src: './src/assets/logo.svg',
      },
      editLink: {
        baseUrl: 'https://github.com/BrunIF/computer-science-for-kids/edit/main',
      },
      social: [
        {
          label: 'GitHub',
          href: 'https://github.com/BrunIF/computer-science-for-kids',
          icon: 'github',
        },
      ],
      lastUpdated: true,
      favicon: '/favicon.svg',
      sidebar: [
        {
          label: 'Вступ',
          items: [
            { label: 'Про курс', slug: '' },
            { label: 'Словник курсу', slug: 'glossary' },
          ],
        },
        {
          label: 'Рівень 1. Мисливець за даними',
          items: [
            { label: 'Лекція 1', slug: 'lectures/lecture-01' },
            { label: 'Лекція 2', slug: 'lectures/lecture-02' },
            { label: 'Лекція 3', slug: 'lectures/lecture-03' },
            { label: 'Лекція 4', slug: 'lectures/lecture-04' },
            { label: 'Лекція 5', slug: 'lectures/lecture-05' },
            { label: 'Лекція 6', slug: 'lectures/lecture-06' },
            { label: 'Лекція 7', slug: 'lectures/lecture-07' },
          ],
        },
        {
          label: 'Рівень 2. Архітектор логіки',
          items: [
            { label: 'Лекція 8', slug: 'lectures/lecture-08' },
            { label: 'Лекція 9', slug: 'lectures/lecture-09' },
            { label: 'Лекція 10', slug: 'lectures/lecture-10' },
          ],
        },
        {
          label: 'Рівень 3. Дослідник заліза',
          items: [
            { label: 'Лекція 11', slug: 'lectures/lecture-11' },
            { label: 'Лекція 12', slug: 'lectures/lecture-12' },
            { label: 'Лекція 13', slug: 'lectures/lecture-13' },
            { label: 'Лекція 14', slug: 'lectures/lecture-14' },
            { label: 'Лекція 15', slug: 'lectures/lecture-15' },
            { label: 'Лекція 16', slug: 'lectures/lecture-16' },
          ],
        },
        {
          label: 'Рівень 4. Хранитель файлів',
          items: [
            { label: 'Лекція 17', slug: 'lectures/lecture-17' },
            { label: 'Лекція 18', slug: 'lectures/lecture-18' },
            { label: 'Лекція 19', slug: 'lectures/lecture-19' },
            { label: 'Лекція 20', slug: 'lectures/lecture-20' },
            { label: 'Лекція 21', slug: 'lectures/lecture-21' },
            { label: 'Лекція 22', slug: 'lectures/lecture-22' },
          ],
        },
        {
          label: 'Рівень 5. Оператор операційної системи',
          items: [
            { label: 'Лекція 23', slug: 'lectures/lecture-23' },
            { label: 'Лекція 24', slug: 'lectures/lecture-24' },
            { label: 'Лекція 25', slug: 'lectures/lecture-25' },
            { label: 'Лекція 26', slug: 'lectures/lecture-26' },
            { label: 'Лекція 27', slug: 'lectures/lecture-27' },
            { label: 'Лекція 28', slug: 'lectures/lecture-28' },
            { label: 'Лекція 29', slug: 'lectures/lecture-29' },
          ],
        },
        {
          label: 'Рівень 6. Мережевий слідопит',
          items: [
            { label: 'Лекція 30', slug: 'lectures/lecture-30' },
            { label: 'Лекція 31', slug: 'lectures/lecture-31' },
            { label: 'Лекція 32', slug: 'lectures/lecture-32' },
            { label: 'Лекція 33', slug: 'lectures/lecture-33' },
            { label: 'Лекція 34', slug: 'lectures/lecture-34' },
            { label: 'Лекція 35', slug: 'lectures/lecture-35' },
            { label: 'Лекція 36', slug: 'lectures/lecture-36' },
            { label: 'Лекція 37', slug: 'lectures/lecture-37' },
            { label: 'Лекція 38', slug: 'lectures/lecture-38' },
          ],
        },
        {
          label: 'Рівень 7. Вартовий цифрової фортеці',
          items: [
            { label: 'Лекція 39', slug: 'lectures/lecture-39' },
            { label: 'Лекція 40', slug: 'lectures/lecture-40' },
            { label: 'Лекція 41', slug: 'lectures/lecture-41' },
            { label: 'Лекція 42', slug: 'lectures/lecture-42' },
          ],
        },
        {
          label: 'Рівень 8. Хранитель історії коду',
          items: [
            { label: 'Лекція 43', slug: 'lectures/lecture-43' },
            { label: 'Лекція 44', slug: 'lectures/lecture-44' },
            { label: 'Лекція 45', slug: 'lectures/lecture-45' },
            { label: 'Лекція 46', slug: 'lectures/lecture-46' },
            { label: 'Лекція 47', slug: 'lectures/lecture-47' },
          ],
        },
        {
          label: 'Рівень 9. Linux-інженер лабораторії',
          items: [
            { label: 'Лекція 48', slug: 'lectures/lecture-48' },
            { label: 'Лекція 49', slug: 'lectures/lecture-49' },
            { label: 'Лекція 50', slug: 'lectures/lecture-50' },
            { label: 'Лекція 51', slug: 'lectures/lecture-51' },
          ],
        },
        {
          label: 'Рівень 10. Фінальний інженерний рейд',
          items: [{ label: 'Лекція 52', slug: 'lectures/lecture-52' }],
        },
      ],
      customCss: ['./src/styles/custom.css'],
    }),
  ],
});
