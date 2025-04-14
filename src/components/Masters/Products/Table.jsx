import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTable, useSortBy, usePagination, useFilters, useGlobalFilter } from 'react-table';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import '../../../css/Table.css';

// const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-GB'); // Format: DD-MM-YYYY
// };

const Table = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalItem, setModalItem] = useState(null);

    // Edit and View Handlers
    const handleEdit = (rowData) => {
        console.log("Editing:", rowData);
        // Add navigation or modal logic here
    };

    const handleView = (rowData) => {
        setModalItem(rowData);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalItem(null);
    };

    // Table Columns
    const columns = React.useMemo(() => [
        {
            Header: 'Edit',
            accessor: 'edit',
            Cell: ({ row }) => (
                <button onClick={() => handleEdit(row.original)}><i className="fas fa-edit"></i></button>
            ),
            style: { maxWidth: '10px', textAlign: 'center' },
        },
        {
            Header: 'View',
            accessor: 'view',
            Cell: ({ row }) => (
                <button onClick={() => handleView(row.original)}><i className="fas fa-paperclip"></i></button>
            ),
            style: { minWidth: '60px', textAlign: 'center' },
        },
        { Header: 'Item No', accessor: 'item_no' },
        // { Header: 'Product Name', accessor: 'name' },
        { Header: 'Description', accessor: 'description' },
        { Header: 'UOM', accessor: 'uom' },
        { Header: 'Category', accessor: 'category' },
        { Header: 'Price (₹)', accessor: 'price' },
        // { Header: 'SKU', accessor: 'sku' },
        // { Header: 'Created At', accessor: 'createdAt', Cell: ({ value }) => formatDate(value) },
        // { Header: 'Updated At', accessor: 'updatedAt', Cell: ({ value }) => formatDate(value) },
    ], []);

    // Fetch data
    useEffect(() => {
        axios.get('http://localhost:5000/products')
            .then(response => {
                setData(response.data.products);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { pageIndex, pageSize, globalFilter },
        canPreviousPage,
        canNextPage,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        setGlobalFilter,
    } = useTable(
        { columns, data },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const handleExportToExcel = () => {
        const exportData = data.map(({ _id, __v, ...item }) => item); // Clean internal Mongo fields
        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Products');
        const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([excelFile]), 'products.xlsx');
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            {/* Search and Export Controls */}
            <div className="search-export-container">
                <input
                    value={globalFilter || ''}
                    onChange={e => setGlobalFilter(e.target.value || undefined)}
                    placeholder="Search all columns..."
                />
                <button onClick={handleExportToExcel}>Export to Excel</button>
            </div>

            {/* Table */}
            <div className="table-container">
                <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize).map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
                <span> Page <strong>{pageIndex + 1} of {pageCount}</strong> </span>
                <span>
                    | Go to page:
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            gotoPage(page);
                        }}
                        style={{ width: '50px', marginLeft: '5px' }}
                    />
                </span>
                <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                    {[10, 20, 30, 40, 50].map(size => (
                        <option key={size} value={size}>
                            Show {size}
                        </option>
                    ))}
                </select>
            </div>
            {showModal && modalItem && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1" role="dialog" aria-labelledby="itemModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h6 className="modal-title" id="itemModalLabel">{modalItem.name || modalItem.item_no}</h6>
                                <button type="button" className="close" onClick={closeModal} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="text-center mb-3">
                                    {modalItem.images && modalItem.images[0] ? (
                                        <img
                                            src={modalItem.images[0]}
                                            alt="Product"
                                            className="img-fluid"
                                            style={{ maxWidth: "200px", maxHeight: "200px" }}
                                        />
                                    ) : (
                                        <p>No image available</p>
                                    )}
                                </div>
                                <p><strong>Item No:</strong> {modalItem.item_no}</p>
                                <p><strong>Price:</strong> ₹{modalItem.price}</p>
                                <p><strong>UOM:</strong> {modalItem.uom}</p>
                                <p><strong>SKU:</strong> {modalItem.sku}</p>
                                <p><strong>Description:</strong> {modalItem.description || 'No description available.'}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Table;
