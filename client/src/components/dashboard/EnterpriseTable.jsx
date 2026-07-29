import React, { useState, useMemo } from 'react'
import { Search, ChevronDown, ChevronUp, Download, Filter, MoreHorizontal, CheckSquare, Square } from 'lucide-react'

export function EnterpriseTable({ 
  columns = [], 
  data = [], 
  searchPlaceholder = "Search records...", 
  onRowClick,
  onBulkAction,
  actions = []
}) {
  const [search, setSearch] = useState('')
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const [selectedRows, setSelectedRows] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const handleSort = (colKey) => {
    if (sortCol === colKey) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortCol(colKey)
      setSortDir('asc')
    }
  }

  const filteredData = useMemo(() => {
    return data.filter(row => {
      if (!search) return true
      return Object.values(row).some(val => 
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    })
  }, [data, search])

  const sortedData = useMemo(() => {
    if (!sortCol) return filteredData
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortCol] ?? ''
      const bVal = b[sortCol] ?? ''
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredData, sortCol, sortDir])

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return sortedData.slice(start, start + pageSize)
  }, [sortedData, currentPage])

  const toggleSelectAll = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(paginatedData.map((_, idx) => idx))
    }
  }

  const toggleSelectRow = (idx) => {
    setSelectedRows(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden space-y-0">
      
      {/* Table Action Controls Header */}
      <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#F8FAFC]">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-blue-600 font-medium shadow-2xs"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {selectedRows.length > 0 && onBulkAction && (
            <button
              onClick={() => onBulkAction(selectedRows)}
              className="bg-blue-50 text-blue-600 font-bold text-xs px-3 py-2 rounded-xl border border-blue-200 transition"
            >
              Bulk Action ({selectedRows.length})
            </button>
          )}

          <button
            onClick={() => alert('Exporting records to CSV...')}
            className="bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold text-xs px-3 py-2 rounded-xl shadow-2xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>

      </div>

      {/* Table Viewport */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F8FAFC] text-gray-500 uppercase font-semibold border-b border-gray-200 sticky top-0">
            <tr>
              <th className="p-3.5 pl-4 w-10">
                <button onClick={toggleSelectAll} className="text-gray-400 hover:text-gray-700">
                  {selectedRows.length === paginatedData.length && paginatedData.length > 0 ? (
                    <CheckSquare className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                </button>
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                  className={`p-3.5 font-bold text-[11px] text-gray-700 tracking-wider ${
                    col.sortable !== false ? 'cursor-pointer hover:bg-gray-100/60' : ''
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <span>{col.label}</span>
                    {sortCol === col.key && (
                      sortDir === 'asc' ? <ChevronUp className="w-3 h-3 text-blue-600" /> : <ChevronDown className="w-3 h-3 text-blue-600" />
                    )}
                  </div>
                </th>
              ))}
              <th className="p-3.5 pr-4 text-right w-16">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="p-8 text-center text-gray-400 text-xs">
                  No records match your filter criteria.
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => {
                const isSelected = selectedRows.includes(idx)
                return (
                  <tr 
                    key={idx} 
                    onClick={() => onRowClick && onRowClick(row)}
                    className={`hover:bg-blue-50/40 transition cursor-pointer ${
                      isSelected ? 'bg-blue-50/60' : ''
                    }`}
                  >
                    <td className="p-3.5 pl-4" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => toggleSelectRow(idx)} className="text-gray-400">
                        {isSelected ? <CheckSquare className="w-4 h-4 text-blue-600" /> : <Square className="w-4 h-4" />}
                      </button>
                    </td>

                    {columns.map((col) => (
                      <td key={col.key} className="p-3.5">
                        {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                      </td>
                    ))}

                    <td className="p-3.5 pr-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="relative group/act inline-block">
                        <button className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-semibold bg-[#F8FAFC]">
        <span>Showing {sortedData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} entries</span>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
          >
            Previous
          </button>
          <span className="text-gray-700 font-bold">Page {currentPage}</span>
          <button
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={currentPage * pageSize >= sortedData.length}
            className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
          >
            Next
          </button>
        </div>
      </div>

    </div>
  )
}
