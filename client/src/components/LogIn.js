import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import { Breadcrumb, Button , Card, Col, Row, Form } from 'react-bootstrap';

function LogIn(props) {

    const [isSubmitted, setSubmitted] = useState(false);

    const onSubmit = (values, actions) => setSubmitted(true);

    if(isSubmitted) {
        return <Redirect to='/' />;
    }

    return (
        <Row>
            <Col lg={12}>
                <Breadcrumb>
                    <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Log In</Breadcrumb.Item>

                </Breadcrumb>
                <Card>
                    <Card.Header>Log In</Card.Header>
                    <Card.Body>
                        <Formik initialValues={{
                            username: '',
                            password: ''
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
                                        <Form.Control name = 'username' 
                                        onChange={handleChange}
                                        value={values.username}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='password'>
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control 
                                            name='password'
                                            onChange={handleChange} 
                                            type='password' 
                                            value={values.password}
                                        />
                                    </Form.Group>
                                    <Button block type='submit' variant='primary'>Log In</Button>
                                </Form>
                            )}
                        </Formik>
                    </Card.Body>
                    <p className='mt-3 text-center'>
                        Don't have an account? <Link to='/sign-up'>Sign Up!</Link>
                    </p>
                </Card>
            </Col>
        </Row>
    );
}


export default LogIn;