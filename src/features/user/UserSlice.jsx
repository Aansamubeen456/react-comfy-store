import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const themes = {
  winter: 'winter',
  dracula: 'dracula',
}
const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('user')) || null
}

const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem('theme') || themes.winter
  document.documentElement.setAttribute('data-theme', theme)
  return theme
}

const defaultState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
}

const UserSlice = createSlice({
  name: 'user',
  initialState: defaultState,
  reducers: {
    logInUser: (state, action) => {
      const user = { ...action.payload.user, token: action.payload.jwt }
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    logOutUser: (state) => {
      state.user = null
      localStorage.removeItem('user')
      toast.success('logged out Successfully')
    },
    toggleTheme: (state, action) => {
      const { winter, dracula } = themes
      state.theme = state.theme === winter ? dracula : winter
      document.documentElement.setAttribute('data-theme', state.theme)
      localStorage.setItem('theme', state.theme)
    },
  },
})

export const { logInUser, logOutUser, toggleTheme } = UserSlice.actions

export default UserSlice.reducer
