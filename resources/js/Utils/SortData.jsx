export const sortData = (values, column, direction) => {
    if (!column) return values;

    return [...values].sort((a, b) => {
        let valueA = a[column];
        let valueB = b[column];

        if (column === 'value' || column === 'attempt') {
            valueA = parseFloat(valueA);
            valueB = parseFloat(valueB);
        }

        if (column === 'createdAt' || column === 'updatedAt') {
            const parseDate = (str) => {
                const [day, month, year] = str.split('.').map(Number);
                return new Date(year, month - 1, day);
            };
            valueA = parseDate(valueA);
            valueB = parseDate(valueB);
        }

        if (direction === 'asc') {
            return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
        } else {
            return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
        }
    });
};
