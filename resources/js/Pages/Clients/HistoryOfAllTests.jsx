import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { usePermissions } from "@/Components/UsePermissions.jsx";
import React, { useState, useEffect, useMemo } from "react";
import axios from 'axios';
import SortableTable from '@/Components/SortableTable';
import { sortData } from '@/Utils/SortData';
import ComparisonModal from '@/Components/TestResults/ComparisonModal.jsx'
import ClientDataModal from '@/Components/ClientDataModal.jsx';

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
    const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isClientDataModalOpen, setIsClientDataModalOpen] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [clientData, setClientData] = useState(null);
    const [clientFilter, setClientFilter] = useState('');
    const [selectedClients, setSelectedClients] = useState([]);
    const [testNameFilter, setTestNameFilter] = useState('');
    const [showAdditionalFilters, setShowAdditionalFilters] = useState(false);
    const [uniqueClients, setUniqueClients] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('sk-SK');

    useEffect(() => {
        const fetchTestResults = async () => {
            try {
                let response;
                if (can('see trainer dashboard')) {
                    response = await axios.get('/api/trainer/all-clients-tests');
                } else if (can('see client dashboard')) {
                    response = await axios.get(`/api/client/${auth.user.id}/all-tests`);
                }
                setTestResults(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching test results:", error);
                setLoading(false);
            }
        };

        fetchTestResults();
    }, [auth.user.id, can]);

    const processedData = useMemo(() => {
        const data = [];

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
                data.push({
                    testName,
                    value: value.value || 'N/A',
                    limbName: value.limb_name,
                    weight: value.weight || 0,
                    metrics: item.test.metrics,
                    id: value.id,
                    createdAt: formatDate(value.created_at),
                    category,
                    clientName: item.client ? `${item.client.first_name || ''} ${item.client.last_name || ''}`.trim() : 'N/A',
                    clientId: item.client_id,
                });
            });
        });

        const unique = [...new Map(
            data.filter(d => d.clientName !== 'N/A')
                .map(client => [client.clientId, { id: client.clientId, name: client.clientName }])
        ).values()];

        setUniqueClients(unique);
        return data;
    }, [testResults]);

    const allCategories = useMemo(() => {
        return [...new Set(testResults.map(item => {
            if (item.test_type === 'test') return item.test.category;
            if (item.test_type === 'max_power_test') return 'Maximálna sila';
            if (item.test_type === 'y_balance_test') return 'Y Balance Test';
            return null;
        }).filter(Boolean))];
    }, [testResults]);

    useEffect(() => {
        if (allCategories.length && filteredCategories.length === 0) {
            setFilteredCategories(allCategories);
        }
    }, [allCategories]);

    let filteredData = processedData.filter(item => filteredCategories.includes(item.category));

    const filteredClients = useMemo(() => {
        return uniqueClients.filter(client =>
            client.name.toLowerCase().includes(clientFilter.toLowerCase())
        );
    }, [uniqueClients, clientFilter]);

    if (can('see trainer dashboard')) {
        filteredData = filteredData.filter(item =>
            (selectedClients.length === 0 || selectedClients.includes(item.clientId)) &&
            item.clientName.toLowerCase().includes(clientFilter.toLowerCase()) &&
            item.testName.toLowerCase().includes(testNameFilter.toLowerCase())
        );
    } else {
        filteredData = filteredData.filter(item =>
            item.testName.toLowerCase().includes(testNameFilter.toLowerCase())
        );
    }

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const handleCheckboxChange = (rowId) => {
        setSelectedRows(prev =>
            prev.includes(rowId) ? prev.filter(id => id !== rowId) : [...prev, rowId]
        );
    };

    const openComparisonModal = () => {
        if (selectedRows.length >= 2) {
            setIsComparisonModalOpen(true);
        } else {
            alert('Vyberte aspoň 2 testy na porovnanie.');
        }
    };

    const handleClientIconClick = async (clientId) => {
        setSelectedClientId(clientId);
        setIsClientDataModalOpen(true);
        try {
            const response = await axios.get(`/api/clients/${clientId}/data`);
            setClientData(response.data);
        } catch (error) {
            console.error("Error fetching client data:", error);
            setClientData(null);
        }
    };

    const columns = [
        {
            key: 'checkbox',
            label: '',
            render: row => (
                <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleCheckboxChange(row.id)}
                />
            ),
            sortable: false
        },
        ...(can('see trainer dashboard')
            ? [{ key: 'clientName', label: 'Meno a priezvisko', render: row => row.clientName }]
            : []),
        { key: 'category', label: 'Kategória' },
        { key: 'testName', label: 'Názov testu' },
        { key: 'value', label: 'Hodnota' },
        { key: 'limbName', label: 'Končatina' },
        { key: 'weight', label: 'Váha' },
        { key: 'metrics', label: 'Metriky' },
        { key: 'createdAt', label: 'Prebehlo' },
        {
            key: 'clientIcon',
            label: '',
            render: (row) =>
                can('see trainer dashboard') && (
                    <span onClick={() => handleClientIconClick(row.clientId)} className="cursor-pointer">👤</span>
                )
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">História testovaní</h2>}
        >
            <Head title="História testovaní" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-semibold mb-4">Zoznam všetkých testovaní</h2>

                            <CategoryFilter
                                categories={allCategories}
                                onFilterChange={(categories) => {
                                    setFilteredCategories(categories);
                                    setShowAdditionalFilters(true);
                                }}
                            />

                            {showAdditionalFilters && can('see trainer dashboard') && (
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        placeholder="Hľadať klienta"
                                        value={clientFilter}
                                        onChange={e => setClientFilter(e.target.value)}
                                        className="mb-2 p-2 border rounded w-full"
                                    />
                                    <div className="max-h-40 overflow-y-auto border rounded p-2">
                                        {filteredClients.map(client => (
                                            <label key={client.id} className="flex items-center mb-1">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedClients.includes(client.id)}
                                                    onChange={() => {
                                                        setSelectedClients(prev =>
                                                            prev.includes(client.id)
                                                                ? prev.filter(id => id !== client.id)
                                                                : [...prev, client.id]
                                                        );
                                                    }}
                                                    className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                                <span>{client.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {showAdditionalFilters && (
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        placeholder="Hľadať test"
                                        value={testNameFilter}
                                        onChange={e => setTestNameFilter(e.target.value)}
                                        className="p-2 border rounded w-full"
                                    />
                                </div>
                            )}

                            <button
                                onClick={openComparisonModal}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                                disabled={selectedRows.length < 2}
                            >
                                Porovnať testy
                            </button>

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
                                    getRowKey={row => row.id}
                                />
                            )}

                            {isComparisonModalOpen && (
                                <ComparisonModal
                                    testResults={processedData.filter(item => selectedRows.includes(item.id))}
                                    onClose={() => setIsComparisonModalOpen(false)}
                                />
                            )}

                            {isClientDataModalOpen && (
                                <ClientDataModal
                                    clientData={clientData}
                                    onClose={() => {
                                        setIsClientDataModalOpen(false);
                                        setClientData(null);
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
