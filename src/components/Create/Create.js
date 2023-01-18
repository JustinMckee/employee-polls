import {connect} from 'react-redux';
import {useState} from 'react';
import { useNavigate } from "react-router-dom";

import {handleAddQuestion} from '../../actions/questions';
import { updateUserQuestions } from '../../actions/users';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Create = ({authedUser,questions,users,dispatch}) => {

  const navigate = useNavigate();

  const [fields, setFields] = useState({
    optionOneText: '',
    optionTwoText: '',
    author: authedUser,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(handleAddQuestion(fields))
    .then((res) => {
      //dispatch(updateUserQuestions(fields.author, res.qid))
    })
    navigate('/');
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const text = e.target.value;

    setFields({
      ...fields,
      [name]: text,
    })

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
        <h1>Would You Rather&hellip;</h1>
        <TextField
          required
          id="outlined-required"
          type="text"
          name="optionOneText"
          value={fields.optionOneText}
          label="Option One"
          onChange={(e) => handleChange(e)}
          fullwidth="true"
          />
        <TextField
          required
          id="outlined-required"
          name="optionTwoText"
          type="text"
          value={fields.optionTwoText}
          label="Option Two"
          onChange={(e) => handleChange(e)}
          fullwidth="true"
          />
        <Button
          className="btn"
          type="submit"
          variant="contained"
          disabled={fields.optionOneText === '' || fields.optionTwoText === ''}
          size="large"
          >
          ADD
          </Button>
        </Stack>
    </Box>
  )
}

const mapStateToProps = ({authedUser,questions,users}) => (
  {
    authedUser,
    questions,
    users,
  }
)

export default connect(mapStateToProps)(Create);
