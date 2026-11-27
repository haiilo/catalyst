import React from 'react';

export interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="demo-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function Value({ value }: { value: unknown }) {
  return <pre className="demo-value">{JSON.stringify(value, null, 2)}</pre>;
}
