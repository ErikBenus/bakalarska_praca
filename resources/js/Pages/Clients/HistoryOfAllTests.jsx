import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { usePermissions } from "@/Components/UsePermissions.jsx";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import SortableTable from '@/Components/SortableTable';
import { sortData } from '@/Utils/SortData';

const CategoryFilter = ({ categories, onFilterChange }) => {
    const [selectedCategories, setSelectedCategories] = useState(categories);

    const handleCheckboxChange = (category) => {
        const newSelectedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter(c => c !== category)
            : [...selectedCategories, category];

        setSelectedCategories(newSelectedCategories);
        onFilterChange(newSelectedCategories);
    };

    return (
        <div className="mb-4">
            <div className="grid grid-cols-2 gap-4">
                {categories.map(category => (
                    <label key={category} className="flex items-center">
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCheckboxChange(category)}
                            className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>{category}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};
export default function HistoryOfAllTests() {
    const { can } = usePermissions();
    const { auth } = usePage().props;
    const [testResults, setTestResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [hoveredRowId, setHoveredRowId] = useState(null);

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('sk-SK');


    useEffect(() => {
        if (can('see client dashboard')) {
            const fetchTestResults = async () => {
                try {
                    const response = await axios.get(`/api/client/${auth.user.id}/all-tests`);
                    setTestResults(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching all test results:", error);
                    setLoading(false);
                }
            };

            fetchTestResults();
        }
    }, [auth.user.id, can]);

    const processTestData = () => {
        if (!testResults) return [];

        const processedData = [];

        testResults.forEach(item => {
            let testName = '';
            let category = '';

            if (item.test_type === 'test') {
                testName = item.test.name;
                category = item.test.category;
            } else if (item.test_type === 'max_power_test') {
                testName = item.test.exercise_name;
                category = 'Maximálna sila';
            } else if (item.test_type === 'y_balance_test') {
                testName = item.test.name;
                category = 'Y Balance Test';
            }

            item.values.forEach(value => {
                processedData.push({
                    testName: testName,
                    value: value.value || 'N/A',
                    limbName: value.limb_name,
                    metrics: item.test.metrics,
                    id: value.id,
                    createdAt: formatDate(value.created_at),
                    category: category,
                });
            });
        });

        return processedData;
    };

    const columns = [
        { key: 'category', label: 'Kategória' },
        { key: 'testName', label: 'Názov testu' },
        { key: 'value', label: 'Hodnota' },
        { key: 'limbName', label: 'Končatina' },
        { key: 'metrics', label: 'Metriky' },
        { key: 'createdAt', label: 'Prebehlo' },
    ];

    const allCategories = [...new Set(testResults.map(item => {
        if (item.test_type === 'test') return item.test.category;
        if (item.test_type === 'max_power_test') return 'Maximálna sila';
        if (item.test_type === 'y_balance_test') return 'Y Balance Test';
        return null;
    }).filter(category => category !== null))];

    const [filteredCategories, setFilteredCategories] = useState(allCategories);
    const filteredData = processTestData().filter(item => filteredCategories.includes(item.category));

    const processedTestData = processTestData();

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    if (can('see client dashboard')) {
        return (
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        História testovaní
                    </h2>
                }
            >
                <Head title="História testovaní" />

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <h2 className="text-2xl font-semibold mb-4">
                                    Zoznam všetkých vašich testov
                                </h2>
                                <CategoryFilter
                                    categories={allCategories}
                                    onFilterChange={setFilteredCategories}
                                />
                                {loading ? (
                                    <p>Načítavanie...</p>
                                ) : (
                                    <SortableTable
                                        data={sortData(filteredData, sortColumn, sortDirection)}
                                        columns={columns}
                                        sortColumn={sortColumn}
                                        sortDirection={sortDirection}
                                        onSort={handleSort}
                                        hoveredRowId={hoveredRowId}
                                        onHover={setHoveredRowId}
                                        getRowKey={(row) => row.id}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }
}
