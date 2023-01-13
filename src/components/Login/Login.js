import {useState} from 'react';
import {handleSetAuthedUser} from '../../actions/authedUser';
import {connect} from 'react-redux';
import { Navigate } from 'react-router-dom';

// Design system
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import Logo from '../../media/Logo';

const Login = ({dispatch,authedUser}) => {

  const [fields, setFields] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const text = e.target.value;

    setFields({
      ...fields,
      [name]: text,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(handleSetAuthedUser(fields));
    } catch (e) {
      console.error('ERROR', e);
    }
  }

  const handleAutoFill = (e) => {
    e.preventDefault();
    setFields({
      username: 'sarahedo',
      password: 'password123',
    });
  }

  return (
    <>
      {authedUser && (
         <Navigate to="/" />
      )}

      {
        !authedUser && (
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: '100%',
              maxWidth: '500px',
              margin: '3em auto',
            }}
            >

            <Stack spacing={2}>
              <Logo />
              <TextField
                required
                id="outlined-required"
                type="text"
                name="username"
                value={fields.username}
                label="Username"
                onChange={handleChange}
                fullwidth="true"
                inputProps={{ "data-testid": "username" }}
                />
              <TextField
                required
                id="outlined-password-input"
                name="password"
                type="password"
                value={fields.password}
                label="Password"
                onChange={handleChange}
                fullwidth="true"
                inputProps={{ "data-testid": "password" }}
                />
              <Button
                className="btn"
                type="submit"
                disabled={(fields.password === '')}
                variant="contained"
                size="large"
                data-testid="submit"
                >
                LOGIN
                </Button>
                <Button size="small" onClick={handleAutoFill}>Autofill</Button>
              </Stack>
          </Box>
        )}
    </>
    
  )
}

const mapStateToProps = ({authedUser}) => (
  {
    authedUser,
  }
)

export default connect(mapStateToProps)(Login);
