'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Беремо Plot як динамічний клієнтський компонент.
// Навмисно розслаблюємо типи, щоб не ламати білд.
type AnyProps = Record<string, any>;

const Plot = dynamic(
  () => import('react-plotly.js'),
  { ssr: false }
) as unknown as React.ComponentType<AnyProps>;

export default function PlotClient(props: AnyProps) {
  return <Plot {...props} />;
}
