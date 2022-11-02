import React, { useContext, useEffect } from 'react';
import { QuizContext } from '../../../context/quiz/quizContext';
import { NEXT_QUESTION, SUBMIT_ANSWER } from '../../../context/Types';

export const QuizQuestionActions = () => {
    const { state, dispatch } = useContext(QuizContext);

    if (state.isBetweenQuestions) {
        return (
            <div className='flex gap-3 mt-6'>
                <button
                    className='bg-blue-700 text-white font-medium rounded-md p-3 w-full cursor-pointer'
                    onClick={() => {
                        dispatch({ type: NEXT_QUESTION });
                    }}
                >
                    Next
                </button>
            </div>
        );
    } else {
        return (
            <div className='flex gap-3 mt-6'>
                <button
                    className='bg-red-700 text-white font-medium rounded-md p-3 basis-1/2 cursor-pointer'
                    onClick={() => {
                        dispatch({ type: SUBMIT_ANSWER, payload: false });
                    }}
                >
                    Loss
                </button>
                <button
                    className='bg-green-600 text-white font-medium rounded-md p-3 basis-1/2 cursor-pointer'
                    onClick={() => {
                        dispatch({ type: SUBMIT_ANSWER, payload: true });
                    }}
                >
                    Win
                </button>
            </div>
        );
    }
};
