import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Breadcrumb, Button, Card, Col, Row, Form } from 'react-bootstrap';

import {Formik} from 'formik';
function SignUp (props) {
    const [isSubmitted, setSubmitted] = useState(false);

    const onSubmit = (values, actions) => setSubmitted(true);

    if(isSubmitted) {
        return <Redirect to='/log-in' />
    }
    return (
        <Row>
            <Col lg={12}>
                <Breadcrumb>
                <Breadcrumb.Item href = '/'>Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Sign Up</Breadcrumb.Item>
                
                </Breadcrumb>
                <Card>
                    <Card.Header>Sign Up</Card.Header>
                    <Card.Body>
                        <Formik
                            initialValues={{
                                username: '',
                                firstName: '',
                                lastName: '',
                                password: '',
                                group: 'rider',
                                photo: []
                            }}

                            onSubmit={onSubmit}
                        >
                            {({
                                handleChange,
                                handleSubmit,
                                values
                            }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group controlId='username'>
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control
                                            name='username'
                                            onChange={handleChange}
                                            values={values.username}    
                                        />
                                    </Form.Group>

                                    <Form.Group controlId='firstName'>
                                        <Form.Label>First name:</Form.Label>
                                        <Form.Control
                                            name='firstName'
                                            onChange={handleChange}
                                            values={values.firstName}    
                                        />
                                    </Form.Group>


                                    <Form.Group controlId='lastName'>
                                        <Form.Label>Last name:</Form.Label>
                                        <Form.Control
                                            name='lastName'
                                            onChange={handleChange}
                                            values={values.lastName}    
                                        />
                                    </Form.Group>

                                    <Form.Group controlId='password'>
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control
                                            name='password'
                                            onChange={handleChange}
                                            type='password'
                                            values={values.password}    
                                        />
                                    </Form.Group>

                                    <Form.Group controlId='group'>
                                        <Form.Label>Group:</Form.Label>
                                        <Form.Control
                                            as='select'
                                            name='group'
                                            onChange={handleChange}
                                            values={values.group}    
                                        >
                                            <option value='rider'>Rider</option>
                                            <option value='driver'>Driver</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='photo'>
                                        <Form.Label>Photo:</Form.Label>
                                        <Form.Control
                                            name='photo'
                                            onChange={handleChange}
                                            type='file'
                                            values={values.photo}    
                                        />
                                    </Form.Group>
                                    <Button block type='submit' variant='primary'>Sign Up</Button>
                                </Form>
                            )}

                        </Formik>
                    </Card.Body>
                    <p className='mt-3 text-center'>
                        Already have an account? <Link to='/log-in'>Log In!</Link>
                    </p>
                </Card>
            </Col>
        </Row>
    );
}

export default SignUp;