import React from 'react';
import { cn } from '../../lib/cn';

export function DataTable({ columns, data, keyField = 'id', className }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-eps-text2 bg-eps-surface rounded-card border border-eps-border">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className={cn('w-full overflow-x-auto rounded-card border border-eps-border bg-eps-bg', className)}>
      <table className="w-full text-sm text-left">
        <thead className="bg-eps-surface text-eps-text2 uppercase text-xs font-semibold border-b border-eps-border">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="px-6 py-4">{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-eps-border">
          {data.map((row, i) => (
            <tr key={row[keyField] || i} className="hover:bg-eps-surface/50 transition-colors">
              {columns.map((col, j) => (
                <td key={j} className="px-6 py-4">
                  {col.cell ? col.cell(row) : row[col.accessorKey]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
