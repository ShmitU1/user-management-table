import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

const UserTable = () => {
  // Select relevant parts of the state
  const { filteredUsers, status, error } = useSelector((state: RootState) => state.users)

  // Show loading state
  if (status === 'loading') return <div className="text-center text-gray-600">Loading...</div>
  // Show error state
  if (status === 'failed') return <div className="text-center text-red-600">Error: {error}</div>

  // Render the user table
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left text-gray-600">Name</th>
            <th className="px-4 py-2 text-left text-gray-600">Username</th>
            <th className="px-4 py-2 text-left text-gray-600">Email</th>
            <th className="px-4 py-2 text-left text-gray-600">Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.username}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable