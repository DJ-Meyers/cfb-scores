import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { QuizContext } from '../../../context/quiz/quizContext';
import { RESET_QUIZ } from '../../../context/Types';
import { RiArrowGoBackFill } from 'react-icons/ri';

export const QuizQuestionPreheader = () => {
    
    const { state, dispatch } = useContext(QuizContext);
    const navigate = useNavigate();
    
    const reset = () => {
        dispatch({ type: RESET_QUIZ });
        navigate('/');
    };

    useEffect(() => {
        const plus1 = document.getElementById('plus-1');
        if (plus1 && state.numCorrect > 0) {
            plus1.classList.add('animate-score-toast');
            setTimeout(() => {
                plus1.classList.remove('animate-score-toast');
            }, 1000);
        }
    }, [state.numCorrect]);

    useEffect(() => {
        const plus0 = document.getElementById('plus-0');
        if (plus0 && state.numIncorrect > 0) {
            plus0.classList.add('animate-score-toast');
            setTimeout(() => {
                plus0.classList.remove('animate-score-toast');
            }, 1000);
        }
    }, [state.numIncorrect]);

    return (
        <div>
            <div className='flex justify-between items-center relative mb-6 w-full'>
                <button
                    className='flex items-center gap-1 opacity-50 hover:opacity-100'
                    onClick={reset}
                >
                    <RiArrowGoBackFill /> Back
                </button>
                <h2 className='font-bold text-xl'>{state.team} Quiz</h2>
                <h3 className='opacity-100 text-sm uppercase font-semibold'>
                    Q{state.questionIndex + 1} of {state.selectedQuestions.length}
                </h3>
                <div
                    id='plus-1'
                    className='absolute bottom-2 right-0 text-green-500 font-bold text-xl opacity-0'
                >
                    +1
                </div>
                <div
                    id='plus-0'
                    className='absolute bottom-2 right-0 text-red-500 font-bold text-xl opacity-0'
                >
                    +0
                </div>
            </div>
        </div>
    );
}