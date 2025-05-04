import React, {useMemo, useState} from 'react';
import { sortData } from '@/Utils/SortData';

const SortableTable = ({
                           data,
                           columns,
                           hoveredRowId,
                           onHover,
                           getRowKey,
                           renderExtraCells,
                       }) => {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const handleSort = (columnKey) => {
        if (sortColumn === columnKey) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(columnKey);
            setSortDirection('asc');
        }
    };

    const sortedData = useMemo(() => {
        return sortData(data, sortColumn, sortDirection);
    }, [data, sortColumn, sortDirection]);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-xs">
                <thead>
                <tr>
                    {columns.map(col => (
                        <th
                            key={col.key}
                            onClick={() => handleSort(col.key)}
                            className="px-3 py-2 text-center font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        >
                            {col.label}
                            {col.sortable && (
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
                <tbody className="bg-white divide-y divide-gray-200">
                {sortedData.map(row => (
                    <tr
                        key={getRowKey(row)}
                        onMouseEnter={() => onHover?.(row.id)}
                        onMouseLeave={() => onHover?.(null)}
                        className={
                            hoveredRowId && hoveredRowId === row.id && onHover ? 'bg-gray-100' : ''}
                    >
                        {columns.map(col => (
                            <td key={col.key} className="px-3 py-2 text-center whitespace-nowrap">
                                {col.render ? col.render(row) : row[col.key] ?? '-'}
                            </td>
                        ))}
                        {renderExtraCells && renderExtraCells('row', row)}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
export default SortableTable;
