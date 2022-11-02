import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { QuizContext } from '../../../context/quiz/quizContext';
import { RESET_QUIZ } from '../../../context/Types';
import { RiArrowGoBackFill } from 'react-icons/ri';

export const QuizResultsPreheader = () => {
    const { state, dispatch } = useContext(QuizContext);
    const navigate = useNavigate();

    const reset = () => {
        dispatch({ type: RESET_QUIZ });
        navigate('/');
    };

    return (
        <div>
            <div className='flex justify-center items-center relative mb-6 w-full'>
                <button
                    className='flex items-center gap-1 opacity-50 hover:opacity-100 absolute left-0 top-[2px]'
                    onClick={reset}
                >
                    <RiArrowGoBackFill /> Back
                </button>
                <h2 className='font-bold text-xl'>{state.team} Quiz Results</h2>
            </div>
        </div>
    );
};
