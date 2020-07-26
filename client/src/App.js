import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { LinkContainer} from 'react-router-bootstrap'
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';

import SignUp from './components/SignUp';
import LogIn from './components/LogIn';

function App() {
  return (
    <>
      <Navbar bg='light' expand='lg' variant='light'>
        <LinkContainer to='/'>
          <Navbar.Brand classname='logo'>Taxi</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle />
        <Navbar.Collapse></Navbar.Collapse>
      </Navbar>

      <Container className='pt-3'>
        <Switch>
          <Route exact path='/' render={() => (
              <div className='middle-center'>
                <h1 className='landing logo'>Taxi</h1>
                <Link className='btn btn-primary' to='/sign-up'>Sign Up</Link>
                <Link className='btn btn-primary' to='/log-in'>Log In</Link> 
              </div>
          )} />

          <Route path='/sign-up' component={SignUp} />
          <Route path='/log-in' component={LogIn} />
        </Switch>
      </Container>
    </>
  );
}

export default App;
