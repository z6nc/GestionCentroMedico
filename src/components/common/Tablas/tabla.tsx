// src/components/DataTable.tsx
import React from "react";

export interface Column<T> {
    header: string;
    accessor?: keyof T;
    cell?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
}

export function DataTable<T>({ columns, data }: DataTableProps<T>) {
    return (
        <div className="relative shadow-md rounded-lg  overflow-x-scroll max-w-5xl  2xl:max-w-[1550px] ">
            <table className="min-w-full  text-sm">
                <thead className="text-xs text-gray-800  uppercase bg-green-400">
                    <tr>
                        {columns.map((col, i) => (
                            <th key={i} className="px-9 py-5 text-left font-semibold">
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-wrap text-center">
                    {data.map((row, i) => (
                        <tr key={i} className="bg-white border-b border-gray-200 hover:bg-green-400/5">
                            {columns.map((col, j) => (
                                <td key={j} className="px-6 py-4 text-gray-900">
                                    {col.cell
                                        ? col.cell(row)
                                        : typeof row[col.accessor as keyof T] === "boolean"
                                            ? (row[col.accessor as keyof T] ? "Activo" : "Inactivo")
                                            : (row[col.accessor as keyof T] as React.ReactNode)}
                                </td>

                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
