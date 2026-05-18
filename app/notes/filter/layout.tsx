import React from 'react';
import css from './LayoutNotes.module.css';

interface FilterLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  modal: React.ReactNode;
}

export default function FilterLayout({ children, sidebar, modal }: FilterLayoutProps) {
  return (
    <main className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <section className={css.content}>
        {children}
      </section>
      
      {modal}
    </main>
  );
}