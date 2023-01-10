import {connect} from 'react-redux';

const Percentage = ({questions,qid,option}) => {

    const answerVotes = questions[qid][option].votes.length;

    const allVotes = questions[qid].optionOne.votes.length + questions[qid].optionTwo.votes.length;

    const answerPercentage = (answerVotes, totalVotes = allVotes) => {
        let percent = 0;
        if(totalVotes) {
            percent = ((answerVotes / totalVotes) * 100).toFixed(0);
        }
        return percent;
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            color: '#1976d2',
            fontWeight: 'bold',
            margin: '1em 0 2em 0',
            textAlign: 'center'
            }}>
            <span style={{minWidth: '3em'}}>{answerPercentage(answerVotes) + '%'}</span>
            <span style={{
                backgroundColor: '#1976d2',
                height: '5px',
                width: (answerPercentage(answerVotes) - 10) + '%',
                marginRight: '.5em',
                marginLeft: '.5em',
                minWidth: '3px',
            }}></span>
            {answerVotes !== 0 && (
                <span style={{whiteSpace: 'nowrap', opacity: '0.7'}}>{answerVotes} {answerVotes > 1 || answerVotes === 0 ? 'Votes' : 'Vote'}</span>
            )}
        </div>
    )
}

const mapStateToProps = ({questions}) => (
    {
      questions
    }
  );
export default connect(mapStateToProps)(Percentage);