import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom'

export default function FormUsers({ allUsers, setAllUsers, addEdit, name, setName, email, setEmail, id }) {
    const [errorName, setErrorName] = useState("");
    const [errorEmail, setErrorEmail] = useState('');
    const history = useHistory();
    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase())
    };
    const checkForm = (e, id) => {
        e.preventDefault();
        setErrorName('');
        setErrorEmail("");

        if (name.trim().length === 0) {
            setErrorName('name is wrong');
        };

        if (!validateEmail(email) || email.trim().length === 0) {
            setErrorEmail('E-mail is wrong');
        };

        if ((name.trim().length === 0) || (!validateEmail(email) || email.trim().length === 0)) {
            return;
        }
        if (addEdit) {
            fetch('https://jsonplaceholder.typicode.com/users', {
                method: "POST",
                body: JSON.stringify({ name, email, address: { city: "" } }),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            })
                .then(response => response.json())
                .then(response => { setAllUsers(prevState => [...prevState, response]) })
                .then(history.push("/"))
        } else {
            fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: "PATCH",
                body: JSON.stringify({ name, email }),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response);
                    return allUsers.map(user => {
                        if (user.id === response.id) {
                            return response
                        } else {
                            return user
                        }
                    })
                })
                .then(newArrayUsers => setAllUsers(newArrayUsers))
                .then(history.push("/"))
        }
    }
    const myBorder = (error) => {
        let style = {}
        if (error) {
            return style = {
                borderBottom: "1px solid red"
            }
        }
    }
    return (
        <Form onSubmit={e => checkForm(e, id)}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" style={myBorder(errorName)} value={name} onChange={(e) => setName(e.target.value)} />
                {errorName && <p style={{ color: "#f00" }}>{errorName}</p>}
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>email</Form.Label>
                <Form.Control type="email" placeholder="email" style={myBorder(errorEmail)} value={email} onChange={(e) => setEmail(e.target.value)} />
                {errorEmail && <p style={{ color: "#f00" }}>{errorEmail}</p>}
            </Form.Group>
            <Button variant="outline-danger"><Link to="/" >Cancel</Link></Button>{' '}
            <Button variant="success" type="submit" >
                Submit
            </Button>

        </Form>
    )
}