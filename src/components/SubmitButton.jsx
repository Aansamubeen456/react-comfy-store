import React from 'react'
import { useNavigation } from 'react-router-dom'

const SubmitButton = ({ text }) => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <button
      type="submit"
      className="btn btn-primary btn-block uppercase"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <span className="loading loading-spinner">sending...</span>
        </>
      ) : (
        text || 'submit'
      )}
    </button>
  )
}

export default SubmitButton
