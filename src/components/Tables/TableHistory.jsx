import React from 'react'

export const TableHistory = ({id, email, action, publication}) => {
    return (
        <>
        <td>{id}</td>
        <td>{action}</td>
        <td>{publication}</td>
        </>
    )
}