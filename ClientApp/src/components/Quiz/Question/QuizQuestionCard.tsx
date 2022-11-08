import React, { useContext } from 'react';
import { QuizContext } from '../../../context/quiz/quizContext';
import { IconContext } from 'react-icons';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';

export const QuizQuestionCard = () => {
    const { state } = useContext(QuizContext);
    return (
        <React.Fragment>
            {state.currentQuestion &&
                <div
                    className={
                        'h-[250px] w-full my-6 bg-white rounded-xl p-6 flex flex-col shadow-md relative'
                    }
                >
                    {state.isBetweenQuestions ? (
                        state.correctArray &&
                            state.correctArray[state.questionIndex] ? (
                            <IconContext.Provider
                                value={{
                                    className:
                                            'text-green-500 absolute top-6 right-6',
                                    size: '20px'
                                }}
                            >
                                <HiCheckCircle />
                            </IconContext.Provider>
                        ) : (
                            <IconContext.Provider
                                value={{
                                    className:
                                        'text-red-500 absolute top-6 right-6',
                                    size: '20px'
                                }}
                            >
                                <HiXCircle />
                            </IconContext.Provider>
                        )
                    ) : null}
                    <h2 className='text-xl opacity-100 font-medium w-full text-center mb-6'>
                        {new Date(
                            state.currentQuestion.StartDate
                        ).toLocaleDateString('en-US')}
                    </h2>
                    <h2
                        id='away-team'
                        className='text-3xl opacity-100 font-medium w-full text-center mb-3'
                    >
                        {state.currentQuestion.AwayTeam}{' '}
                        {state.isBetweenQuestions
                            ? state.currentQuestion.AwayPoints
                            : ''}
                    </h2>
                    <h2 className='text-3xl opacity-100 font-medium w-full text-center mb-3'>
                        @
                    </h2>
                    <h2
                        id='home-team'
                        className='text-3xl opacity-100 font-medium w-full text-center mb-6'
                    >
                        {state.currentQuestion.HomeTeam}{' '}
                        {state.isBetweenQuestions
                            ? state.currentQuestion.HomePoints
                            : ''}
                    </h2>
                </div>
            }
        </React.Fragment>
    );
};
