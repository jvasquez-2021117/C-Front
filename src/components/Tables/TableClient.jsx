import React from 'react'

export const TableClient = ({id, name, phone, email}) => {
    return (
        <>
        <td>{id}</td>
        <td>{name}</td>
        <td>{phone}</td>
        <td>{email}</td>
        </>
    )
}