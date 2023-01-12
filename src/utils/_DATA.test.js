import '@testing-library/jest-dom';
import {_saveQuestion,_saveQuestionAnswer} from './_DATA';

describe('_saveQuestion', () => {
    
    it('Will return the saved question and all expected fields are populated', async () => {

        const save = await _saveQuestion({
            optionOneText: 'eat a hot dog',
            optionTwoText: 'eat a ham burger',
            author: 'authorName',
        });

        expect(save.id).toBeDefined();
        expect(new Date(save.timestamp)).toBeInstanceOf(Date);
        expect(save.author).toBe('authorName');
        expect(Array.isArray([save.optionOne.votes])).toBe(true);
        expect(save.optionOne.text).toBe('eat a hot dog');
        expect(Array.isArray([save.optionTwo.votes])).toBe(true);
        expect(save.optionTwo.text).toBe('eat a ham burger');

    });

    it('Will return an error if wrong data is passed', async () => {
        
        await expect(_saveQuestion({
            optionOneText: '',
            optionTwoText: '',
            author: '',
        })).rejects.toEqual('Please provide optionOneText, optionTwoText, and author');
    });

});

describe('_saveQuestionAnswer', () => {

    it('Will return the saved question and all expected fields are populated', async () => {
       
        const save = await _saveQuestionAnswer({
            authedUser: 'sarahedo',
            qid: 'vthrdm985a262al8qx3do',
            answer: 'optionOne'
        });

        expect(save).toBe(true);

    });

    it('Will return an error if wrong data is passed', async () => {
        
        await expect(_saveQuestionAnswer({
            authedUser: '',
            qid: '',
            answer: '',
        })).rejects.toEqual('Please provide authedUser, qid, and answer');
    });

});