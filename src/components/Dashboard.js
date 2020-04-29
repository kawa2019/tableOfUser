import React, { useState, useEffect } from 'react';
import { Button, Table, Card, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default function Dashboard({ allUsers, setAllUsers, addEdit, setAddEdit, name, setName, email, setEmail, setId, id }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const [noUsers, setNoUsers] = useState("")
    const [ascendingUsername, setAscendingUsername] = useState(true)


    console.log(allUsers);
    const usersNumber = () => {
        if (allUsers.length == 1) {
            setNoUsers('show')
        } else { setNoUsers('') }
    }

    const toDelete = (id) => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                return allUsers.map(c => {
                    if (c.id == id) {
                        return
                    } else {
                        return c
                    }
                })
            })
            .then(newArray => newArray.filter(a => { return a != undefined }))
            .then(updateArray => { console.log(updateArray); return setAllUsers(updateArray) })
            .then(() => {
                if (allUsers.length == 1) {
                    setNoUsers('show')
                } else { setNoUsers('') }
            })
    }

    const handleColumnName = () => {
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
            <Card>
                <Card.Header >
                    User List
            <Button variant="primary"><Link to="/formUser" style={{ color: "#fff" }} onClick={() => { setAddEdit(true); setName(''); setEmail('') }}>Add new</Link></Button>{' '}
                </Card.Header>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th onClick={handleColumnName}>Username</th>
                            <th>Email</th>
                            <th>City</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {noUsers && <tr><td colSpan="7">0 users</td></tr>}
                        {allUsers.map(u => {
                            return (<tr>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.username}</td>
                                <td>{u.email}</td>
                                <td>{u.address.city}</td>
                                <td><Button variant="warning"><Link to="/formUser" style={{ color: "#fff" }} onClick={() => { setAddEdit(false); setId(u.id); setName(u.name); setEmail(u.email) }}>Edit</Link></Button>{' '}</td>
                                <td><Button variant="danger" onClick={() => { setId(u.id); setShow(true) }} >Delete</Button></td>
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
//