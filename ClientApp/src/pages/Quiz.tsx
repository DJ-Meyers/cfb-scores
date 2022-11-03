import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { QuizResults } from '../components/Quiz/Results/QuizResults';
import { QuizQuestion } from '../components/Quiz/Question/QuizQuestion';
import { InitialQuizStateType, QuizContext } from '../context/quiz/quizContext';
import { RESTORE_STATE_FROM_LOCAL_STORAGE } from '../context/Types';

export const Quiz = () => {
    const { state, dispatch } = useContext(QuizContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!state.currentQuestion) {
            try {
                const stateFromStorage = JSON.parse(localStorage.getItem('quizState') || '') as InitialQuizStateType;
                dispatch({ type: RESTORE_STATE_FROM_LOCAL_STORAGE, payload: stateFromStorage });
            } catch (e) {
                navigate('/');
            }
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className='opacity-75 flex justify-start items-center flex-col mx-auto pt-56 '>
            {state.questionIndex < state.selectedQuestions.length ? <QuizQuestion /> : <QuizResults />}
        </div>
    );
};
