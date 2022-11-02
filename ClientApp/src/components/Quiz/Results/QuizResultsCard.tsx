import React, { useContext } from 'react';
import { QuizContext } from '../../../context/quiz/quizContext';
import { IconContext } from 'react-icons';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { getAbbr, percent, safeDivide } from '../../../context/quiz/quizHelpers';

export const QuizResultsCard = () => {
    const { state } = useContext(QuizContext);

    return (
        <div className='w-full my-6 bg-white rounded-xl p-6 flex flex-col shadow-sm relative'>
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
                            return (
                                <tr key={q.startDate}>
                                    <td>
                                        {new Date(
                                            q.startDate
                                        ).toLocaleDateString('en-US')}
                                    </td>
                                    <td>
                                        {getAbbr(q.homeTeam)} {q.homePoints} - {q.awayPoints} {getAbbr(q.awayTeam)}
                                    </td>
                                    <td>
                                        {state.choicesArray[i] ? 'Win' : 'Loss'}{' '}
                                        {state.correctArray[i] ? (
                                            <IconContext.Provider
                                                value={{
                                                    className:
                                                        'text-green-500 top-6 right-6 inline',
                                                }}
                                            >
                                                <HiCheckCircle />
                                            </IconContext.Provider>
                                        ) : (
                                            <IconContext.Provider
                                                value={{
                                                    className:
                                                        'text-red-500 top-6 right-6 inline',
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
