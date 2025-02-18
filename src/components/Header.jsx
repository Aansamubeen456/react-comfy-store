import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logOutUser } from '../features/user/UserSlice'
import { clearCart } from '../features/cart/cartSlice'
import { useQueryClient } from '@tanstack/react-query'

const Header = () => {
  const user = useSelector((state) => state.userState.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleUser = () => {
    navigate('/')
    dispatch(clearCart())
    dispatch(logOutUser())
    queryClient.removeQueries()
  }
  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center sm:justify-end">
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-xs sm:text-sm">Hello, {user.username}</p>
            <button
              className="btn btn-xs btn-outline btn-primary"
              onClick={handleUser}
            >
              log out
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link to="/login" className="link link-hover text-xs sm:text-sm">
              Sign in/ Guest
            </Link>
            <Link to="/register" className="link link-hover text-xs sm:text-sm">
              Create an Account
            </Link>
          </div>
        )}
        {/* USER */}
        {/* LINKS */}
      </div>
    </header>
  )
}

export default Header
