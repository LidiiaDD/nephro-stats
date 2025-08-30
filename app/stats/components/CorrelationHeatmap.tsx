'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Динамічний імпорт Plotly (без SSR) і без суворої типізації, щоб не ламатись на збірці
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false }) as unknown as (
  props: any
) => JSX.Element;

type HeatmapProps = {
  /** Матриця кореляцій (z) */
  matrix: number[][];
  /** Підписи колонок (ось X) */
  xLabels?: string[];
  /** Підписи рядків (ось Y) */
  yLabels?: string[];
  /** Заголовок графіка */
  title?: string;
  /** Мін/макс для кольоршкали (опційно) */
  zmin?: number;
  zmax?: number;
  /** Показувати значення на клітинках */
  showValues?: boolean;
  /** Розміри графіка (опційно) — за замовчуванням адаптивно по ширині */
  width?: number;
  height?: number;
};

/**
 * Теплокарта кореляцій (Plotly Heatmap).
 * Типізація навмисно м’яка для сумісності з різними версіями react-plotly.js/plotly.js
 */
export default function CorrelationHeatmap({
  matrix,
  xLabels,
  yLabels,
  title = 'Correlation heatmap',
  zmin,
  zmax,
  showValues = false,
  width,
  height = 560,
}: HeatmapProps) {
  // Текст на клітинках (якщо потрібно)
  const text =
    showValues
      ? matrix.map((row) => row.map((v) => (Number.isFinite(v) ? v.toFixed(2) : '')))
      : undefined;

  const data: any[] = [
    {
      type: 'heatmap',
      z: matrix,
      x: xLabels,
      y: yLabels,
      colorscale: 'RdBu',
      reversescale: true, // щоб сині — негативні, червоні — позитивні
      zmin: typeof zmin === 'number' ? zmin : -1,
      zmax: typeof zmax === 'number' ? zmax : 1,
      colorbar: { title: 'r', titleside: 'right' },
      text,
      texttemplate: showValues ? '%{text}' : undefined,
      textfont: showValues ? { size: 10 } : undefined,
      hovertemplate:
        '<b>%{y}</b> vs <b>%{x}</b><br>r = %{z:.3f}<extra></extra>',
    },
  ];

  const layout: any = {
    title: { text: title, x: 0.5, xanchor: 'center' },
    margin: { l: 80, r: 30, t: 60, b: 80 },
    xaxis: {
      tickangle: -45,
      automargin: true,
    },
    yaxis: {
      automargin: true,
    },
    width,
    height,
  };

  const config: any = {
    displaylogo: false,
    responsive: true,
    modeBarButtonsToRemove: ['toImage'],
  };

  return (
    <Plot
      data={data}
      layout={layout}
      config={config}
      useResizeHandler
      style={{ width: '100%', height: height ? `${height}px` : '100%' }}
    />
  );
}
