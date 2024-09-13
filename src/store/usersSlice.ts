import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';

// Define the User interface
interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
}

// Define the state structure for the users slice
interface UsersState {
  users: User[]
  filteredUsers: User[]
  filters: {
    name: string
    username: string
    email: string
    phone: string
  }
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

// Initial state for the users slice
const initialState: UsersState = {
  users: [],
  filteredUsers: [],
  filters: {
    name: '',
    username: '',
    email: '',
    phone: ''
  },
  status: 'idle',
  error: null
}

// Async thunk for fetching users from the API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data as User[];
})

// Create the users slice
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Action to set a filter and update filtered users
    setFilter: (state, action: PayloadAction<{ field: keyof UsersState['filters']; value: string }>) => {
      state.filters[action.payload.field] = action.payload.value
      // Filter users based on all active filters
      state.filteredUsers = state.users.filter(user => 
        Object.entries(state.filters).every(([key, value]) => 
          (user[key as keyof User] as string).toLowerCase().includes(value.toLowerCase())
        )
      )
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state for fetchUsers
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
      })
      // Handle successful fetchUsers
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = action.payload
        state.filteredUsers = action.payload
      })
      // Handle failed fetchUsers
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
  }
})

export const { setFilter } = usersSlice.actions
export default usersSlice.reducer