import React, { useContext, useEffect } from 'react';
import { QuizContext } from '../../../context/quiz/quizContext';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

export const QuizQuestionPreheader = () => {
    
    const { state } = useContext(QuizContext);

    useEffect(() => {
        const plus1 = document.getElementById('plus-1');
        if (plus1 && state.numCorrect > 0) {
            plus1.classList.add('animate-score-toast');
            setTimeout(() => {
                plus1.classList.remove('animate-score-toast');
            }, 750);
        }
    }, [state.numCorrect]);

    useEffect(() => {
        const plus0 = document.getElementById('plus-0');
        if (plus0 && state.numIncorrect > 0) {
            plus0.classList.add('animate-score-toast');
            setTimeout(() => {
                plus0.classList.remove('animate-score-toast');
            }, 750);
        }
    }, [state.numIncorrect]);

    return (
        <div>
            <div className='flex justify-between items-center relative mb-6 w-full'>
                <Link
                    className='flex items-center gap-1 opacity-50 hover:opacity-100'
                    to='/'
                >
                    <RiArrowGoBackFill /> Back
                </Link>
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