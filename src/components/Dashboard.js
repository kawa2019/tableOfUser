import React, { useState } from 'react';
import { Button, Table, Card, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default function Dashboard({ allUsers, setAllUsers, setAddEdit, setName, setEmail, setId, id }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [noUsers, setNoUsers] = useState("")
    const [ascendingUsername, setAscendingUsername] = useState(true)

    const toDelete = (id) => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(res => {
                return allUsers.map(user => {
                    if (user.id === id) {
                        return
                    } else {
                        return user
                    }
                })
            })
            .then(newArrayUsers => newArrayUsers.filter(user => { return user !== undefined }))
            .then(correctArrayUsers => setAllUsers(correctArrayUsers))
            .then(() => {
                if (allUsers.length === 1) {
                    setNoUsers('showZero')
                } else { setNoUsers('') }
            })
    }

    const handleColumnUsername = () => {
        setAscendingUsername(!ascendingUsername);
        if (ascendingUsername) {
            return (allUsers.sort((a, b) => {
                const x = a.username;
                const y = b.username;
                return x < y ? -1 : x > y ? 1 : 0;
            }))
        } else {
            return (allUsers.sort((a, b) => {
                const x = a.username;
                const y = b.username;
                return x > y ? -1 : x < y ? 1 : 0;
            }))
        }
    }
    return (
        <>
            <Card style={{ border: "none" }}>
                <Card.Header style={{ display: 'flex', justifyContent: "space-between" }} >
                    User List
                    <Button variant="primary"><Link to="/formUser" style={{ color: "#fff" }} onClick={() => { setAddEdit(true); setName(''); setEmail('') }}>Add new</Link></Button>{' '}
                </Card.Header>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th onClick={handleColumnUsername} style={{ cursor: "pointer" }}>Username</th>
                            <th>Email</th>
                            <th>City</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {noUsers && <tr><td colSpan="7">0 users</td></tr>}
                        {allUsers.map((user, index) => {
                            return (<tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.address.city}</td>
                                <td><Button variant="warning"><Link to="/formUser" style={{ color: "#fff" }} onClick={() => { setAddEdit(false); setId(user.id); setName(user.name); setEmail(user.email) }}>Edit</Link></Button>{' '}</td>
                                <td><Button variant="danger" onClick={() => { setId(user.id); setShow(true) }} >Delete</Button></td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
           </Button>
                    <Button variant="primary" onClick={() => { setShow(false); return toDelete(id) }}>
                        Delete
           </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
