import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUsers } from './store/usersSlice'
import UserTable from './components/UserTable'
import SearchFilters from './components/SearchFilters'
import { AppDispatch } from './store/store'
import './index.css'

function App() {
  const dispatch = useDispatch<AppDispatch>()

  // Fetch users when the component mounts
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">User Management</h1>
        <SearchFilters />
        <UserTable />
      </div>
    </div>
  )
}

export default App