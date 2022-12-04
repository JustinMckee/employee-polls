import {useState} from 'react';
import {handleSetAuthedUser} from '../../actions/authedUser';
import {connect} from 'react-redux';

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

  // TODO this isn't what a promise is supposed to look like.
  const handleSubmit = (e) => new Promise ((res, rej) => {
    e.preventDefault();
    dispatch(handleSetAuthedUser(fields));

    // TODO handle wrong username/password
  })

  const handleAutoFill = (e) => {
    e.preventDefault();
    setFields({
      username: 'sarahedo',
      password: 'password123',
    });
  }

  return (
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
          />
        <Button
          className="btn"
          type="submit"
          disabled={(fields.password === '')}
          variant="contained"
          size="large"
          >
          LOGIN
          </Button>
          <Button size="small" onClick={handleAutoFill} >Autofill</Button>
        </Stack>
    </Box>
  )
}

export default connect()(Login);
