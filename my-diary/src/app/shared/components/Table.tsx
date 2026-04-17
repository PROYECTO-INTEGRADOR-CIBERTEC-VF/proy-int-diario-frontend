import type { ReactNode } from 'react'

type TableColumn<T> = {
  key: keyof T | string
  label: string
  render?: (item: T) => ReactNode
}

type TableProps<T> = {
  columns: Array<TableColumn<T>>
  rows: T[]
}

export function Table<T extends Record<string, unknown>>({ columns, rows }: TableProps<T>) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={String(column.key)}>{column.render ? column.render(row) : String(row[column.key as keyof T] ?? '')}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
