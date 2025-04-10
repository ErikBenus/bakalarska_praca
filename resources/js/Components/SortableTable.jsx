import React from 'react';

const SortableTable = ({
                           data,
                           columns,
                           sortColumn,
                           sortDirection,
                           onSort,
                           hoveredRowId,
                           onHover,
                           getRowKey,
                           renderExtraCells
                       }) => {
    return (
        <table className="min-w-full divide-y divide-gray-200 text-xs">
            <thead>
            <tr>
                {columns.map(col => (
                    <th
                        key={col.key}
                        onClick={() => onSort(col.key)}
                        className="px-3 py-2 text-center font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    >
                        {col.label}
                        {col.sortable && ( // Pridali sme podmienku pre sortable
                            <span className="ml-1">
                                    {sortColumn === col.key
                                        ? sortDirection === 'asc'
                                            ? '▲'
                                            : '▼'
                                        : '↕'}
                                </span>
                        )}
                    </th>
                ))}
                {renderExtraCells && renderExtraCells('header')}
            </tr>
            </thead>
            <tbody>
            {data.map(row => (
                <tr
                    key={getRowKey(row)}
                    onMouseEnter={() => onHover(row.id)}
                    onMouseLeave={() => onHover(null)}
                    className={hoveredRowId === row.id ? 'bg-gray-100' : ''}
                >
                    {columns.map(col => (
                        <td key={col.key} className="px-3 py-2 text-center whitespace-nowrap">
                            {col.render ? col.render(row) : row[col.key] || '-'}
                        </td>
                    ))}
                    {renderExtraCells && renderExtraCells('row', row)}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default SortableTable;
