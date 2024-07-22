import { FormInput, SubmitButton } from '../components'
import { Form, Link, redirect, useNavigate } from 'react-router-dom'
import { customFetch } from '../utlis'
import { toast } from 'react-toastify'
import { logInUser } from '../features/user/UserSlice'
import { useDispatch } from 'react-redux'

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    try {
      const response = await customFetch.post('/auth/local', data)
      store.dispatch(logInUser(response.data))
      toast.success('Logged in Successfully')
      return redirect('/')
    } catch (error) {
      console.log(error)
      const errorMessage =
        error?.response?.data?.error?.message ||
        'please double check your credentials'
      toast.error(errorMessage)
      return null
    }
  }

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGuestUser = async () => {
    try {
      const response = await customFetch.post('/auth/local', {
        identifier: 'test@test.com',
        password: 'secret',
      })
      dispatch(logInUser(response.data))
      toast.success('Welcome, guest user')
      navigate('/')
    } catch (error) {
      toast.error('There is an error for a Guest User. Please try again')
    }
  }

  return (
    <section className="h-screen grid place-items-center">
      <Form
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
        method="post"
      >
        <h4 className="text-center text-3xl font-bold capitalize">login</h4>
        <FormInput name="identifier" type="email" label="email" />
        <FormInput name="password" type="password" label="password" />

        <div className="mt-4 ">
          <SubmitButton text="login" />
        </div>

        <button
          type="button"
          className="btn btn-secondary btn-block uppercase"
          onClick={handleGuestUser}
        >
          guest user
        </button>
        <p className="text-center ">
          Not a member yet?{' '}
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  )
}

export default Login
