import React, { useContext } from 'react';
import { QuizContext } from '../../../context/quiz/quizContext';
import { IconContext } from 'react-icons';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { getAbbr, percent, safeDivide } from '../../../context/quiz/quizHelpers';

export const QuizResultsCard = () => {
    const { state } = useContext(QuizContext);
    return (
        <div className='w-full my-6 bg-white rounded-xl p-6 flex flex-col shadow-md relative'>
            <h3 className='mb-3 text-xl font-semibold text-center'>{state.numCorrect}/{state.selectedQuestions.length}: {percent(safeDivide(state.numCorrect, state.selectedQuestions.length))}</h3>
            <table>
                <thead>
                    <tr>
                        <th className='text-left'>Date</th>
                        <th className='text-left'>Game</th>
                        <th className='text-left'>Choice</th>
                    </tr>
                </thead>
                <tbody>
                    {state.selectedQuestions &&
                        state.selectedQuestions.map((q, i) => {

                            const date = new Date(q.StartDate).toLocaleDateString('en-US')
                            const dateStr = date.substring(0, date.length - 4) + date.substring(date.length - 2);
                            return (
                                <tr key={q.StartDate} className={`${i % 2 === 1 && 'bg-gray-100'}`}>
                                    <td>
                                        {dateStr}
                                    </td>
                                    <td>
                                        {getAbbr(q.HomeTeam)} {q.HomePoints} - {q.AwayPoints} {getAbbr(q.AwayTeam)}
                                    </td>
                                    <td className='flex justify-center items-center'>
                                        {state.correctArray[i] ? (
                                            <IconContext.Provider
                                                value={{
                                                    className:
                                                        'text-green-500 inline ml-1.5',
                                                    size: '20px'
                                                }}
                                            >
                                                <HiCheckCircle />
                                            </IconContext.Provider>
                                        ) : (
                                            <IconContext.Provider
                                                value={{
                                                    className:
                                                        'text-red-500 inline ml-1.5',
                                                    size: '20px'
                                                }}
                                            >
                                                <HiXCircle />
                                            </IconContext.Provider>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};
