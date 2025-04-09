import { useState, useMemo } from 'react';

const useSortableTable = (data) => {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const sortedData = useMemo(() => {
        if (!sortColumn) return data;

        return [...data].sort((a, b) => {
            let valueA = a[sortColumn];
            let valueB = b[sortColumn];

            if (sortColumn === 'value' || sortColumn === 'attempt') {
                valueA = parseFloat(valueA);
                valueB = parseFloat(valueB);
            }

            if (sortDirection === 'asc') {
                if (valueA < valueB) return -1;
                if (valueA > valueB) return 1;
            } else {
                if (valueA > valueB) return -1;
                if (valueA < valueB) return 1;
            }
            return 0;
        });
    }, [data, sortColumn, sortDirection]);

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    return {
        sortedData,
        sortColumn,
        sortDirection,
        handleSort,
    };
};

export default useSortableTable;
