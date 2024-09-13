import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../store/usersSlice'

type FilterField = 'name' | 'username' | 'email' | 'phone';

const SearchFilters = () => {
  const dispatch = useDispatch()
  const [selectedField, setSelectedField] = useState<FilterField>('name')

  // Handle filter change and dispatch action
  const handleFilterChange = (value: string) => {
    dispatch(setFilter({ field: selectedField, value }))
  }

  // Render filter inputs
  return (
    <div className="mb-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
      <input
        type="text"
        placeholder={`Filter by ${selectedField}`}
        onChange={(e) => handleFilterChange(e.target.value)}
        className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={selectedField}
        onChange={(e) => setSelectedField(e.target.value as FilterField)}
        className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="name">Name</option>
        <option value="username">Username</option>
        <option value="email">Email</option>
        <option value="phone">Phone</option>
      </select>
    </div>
  )
}

export default SearchFilters