import React from 'react'

interface ErrorProps {
    message: string
}

export const Error: React.FC<ErrorProps> = ({message}) => {
    if (!message) return null
    return <p>{message}</p>
}
export default Error