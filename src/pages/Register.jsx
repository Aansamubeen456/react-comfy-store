import { FormInput, SubmitButton } from '../components'
import { Form, Link, redirect } from 'react-router-dom'
import { customFetch } from '../utlis'
import { toast } from 'react-toastify'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    const response = await customFetch.post('/auth/local/register', data)
    toast.success('Account created Successfully')
    return redirect('/')
  } catch (error) {
    const errorMsg =
      error?.response?.data?.error?.message ||
      'please double check your credentials'
    toast.error(errorMsg)
    return null
  }
}

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
        method="post"
      >
        <h4 className="text-center text-3xl font-bold ">Register</h4>

        <FormInput label="username" name="username" type="text" />

        <FormInput label="email" name="email" type="email" />

        <FormInput label="password" name="password" type="password" />

        <div className="mt-4">
          <SubmitButton text="register" />
        </div>
        <p className="text-center ">
          Already a member?
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  )
}

export default Register
