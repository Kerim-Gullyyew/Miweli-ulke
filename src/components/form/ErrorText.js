import React from 'react'

const ErrorText = ({message}) => {
    return (
        <p className="text-red-500 text-sm pt-4 italic">
            {message}
        </p>
    )
}

export default ErrorText