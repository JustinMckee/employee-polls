import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import {handleAnswerQuestion} from '../../actions/questions'
import {connect} from 'react-redux';
import Percentage from '../Percentage';
import {useParams,redirect} from 'react-router-dom';
import NotFound from '../NotFound';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import './Question.scss';

const Question = ({authedUser,dispatch,questions,users}) => {

  const params = useParams();

  const [answer,setAnswer] = useState(users[authedUser].answers[params.id] ?? '');

  const location = useLocation();

  if(!questions[params.id]) {
    return (
      <NotFound />
    )
  }

  const totalVotes = questions[params.id].optionOne.votes.length + questions[params.id].optionTwo.votes.length;

  const handleClick = (event) => {
    let fauxInput = event.target.closest('.card-button');
    let qid = fauxInput.dataset.id;
    let answer = fauxInput.dataset.answer;
    setTimeout(() => {
      setAnswer(fauxInput.dataset.answer);
      dispatch(handleAnswerQuestion(authedUser,qid,answer));
    }, 200)
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: '0 0.5em 1em rgba(0,0,0,0.05)'
  }));

  return (
    <div>
      <h1>Would you rather&hellip;</h1>
      <Box sx={{
        display: 'inline-flex',
        alignItems: 'center',
        marginBottom: '3em',
        }}>
        <Avatar
          alt={users[questions[params.id].author].name}
          src={users[questions[params.id].author].avatarURL}
          sx={{width:50,height:50, marginRight: '1em'}}
          />
          <span>By {users[questions[params.id].author].name}</span>
      </Box>
      <form onSubmit={e => e.preventDefault()}>
        <input type="hidden" id="option" name={users[questions[params.id]]} value={answer} />

        {
        <Grid container spacing={{xs: 2, sm: 3, md: 5}}>
          <Grid item xs={6}>
            <Button sx={{
              padding: 0,
              display: 'block',
              width: '100%',
              }}
              disabled={(answer !== '') ? true : false}
              >
              <Item
                className="card-button"
                data-id={location.state.question.id}
                data-answer="optionOne"
                onClick={handleClick}
                data-selected={answer === 'optionOne'}
                >
                <h2>{location.state.question.optionOne.text.charAt(0).toUpperCase() + location.state.question.optionOne.text.slice(1)}</h2>
              </Item>
            </Button>
            {answer && (
              <div style={{marginTop:'1.5em'}}>
                 <Percentage 
                  qid={location.state.question.id} option='optionOne'
                />
              </div>
            )}
          </Grid>
          <Grid item xs={6}>
            <Button sx={{
              padding: 0,
              display: 'block',
              width: '100%',
              }}
              disabled={(answer !== '') ? true : false}
              >
              <Item
                className="card-button"
                data-id={location.state.question.id}
                data-answer="optionTwo"
                onClick={handleClick}
                data-selected={answer === 'optionTwo'}
                >
                <h2>{location.state.question.optionTwo.text.charAt(0).toUpperCase() + location.state.question.optionTwo.text.slice(1)}</h2>
              </Item>
            </Button>
            {answer && (
              <div style={{marginTop:'1.5em'}}>
                <Percentage qid={location.state.question.id} option='optionTwo' />
              </div>
            )}
          </Grid>
        </Grid>

      }
      </form>

      

    </div>
  )
}

const mapStateToProps = ({authedUser,questions,users}) => (
  {
    loading: authedUser !== null,
    authedUser,
    questions,
    users
  }
);

export default connect(mapStateToProps)(Question);
