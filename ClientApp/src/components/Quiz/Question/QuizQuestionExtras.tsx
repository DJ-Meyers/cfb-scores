import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { QuizContext } from '../../../context/quiz/quizContext';
import { SET_BOX_SCORES } from '../../../context/Types';
import { createStatTable, getDesiredStats, StatRow, TeamGame } from '../../../data/TeamGame';

export const QuizQuestionExtras = () => {

    const { state, dispatch } = useContext(QuizContext);
    useEffect(() => {
        if (state.selectedQuestions) {
            axios({
                method: 'post',
                url: '/boxscores/',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: state.selectedQuestions,
            }).then((res) => {
                const data = JSON.parse(res.data) as TeamGame[];
                dispatch({ type: SET_BOX_SCORES, payload: data });
            });
        }
        // eslint-disable-next-line
    }, [state.selectedQuestions]);

    console.log(state.isLoadingBoxScores, state.stats);

    if (state.isBetweenQuestions) { 
        if (state.stats[state.questionIndex] && state.selectedQuestions[state.questionIndex]) {
            const homeTeam = state.stats[state.questionIndex].Teams[0].School;
            const homeStats = getDesiredStats(state.stats[state.questionIndex].Teams[0].Stats);

            const awayTeam = state.stats[state.questionIndex].Teams[1].School;
            const awayStats = getDesiredStats(state.stats[state.questionIndex].Teams[1].Stats);

            
            const table = createStatTable(homeTeam, homeStats, awayTeam, awayStats);

            return (
                <div className='mt-4 w-full'>
                    <h2 className='font-bold w-full text-center text-xl'>Game Stats</h2>
                    <div className='flex w-full mt-2'>
                        <h2 className='basis-2/5 font-bold text-center text-lg'>{table.awayTeam}</h2>
                        <div className='basis-1/5 font-bold'>&nbsp;</div>
                        <h2 className='basis-2/5 font-bold text-center text-lg'>{table.homeTeam}</h2>
                    </div>
                    {table.statRows.map((sr: StatRow) => 
                        <div key={sr.category} className='w-full flex mt-1'>
                            <h3 className='basis-2/5 text-center align-middle'>{sr.away}</h3>
                            <h3 className='basis-1/5 font-semibold text-center align-middle px-2'>{sr.category}</h3>
                            <h3 className='basis-2/5 text-center align-middle'>{sr.home}</h3>
                        </div>
                    )}
                </div>
            )
        } else if (state.isLoadingBoxScores) {
            return (
                <div className='mt-4 w-full'>
                    <h2 className='font-bold w-full text-center text-xl'>Game Stats</h2>
                    <div className='flex w-full animate-pulse mt-2'>
                        <div className='basis-2/5'>
                            <div className='bg-gray-700 h-5 w-3/4 rounded-md mx-auto'></div>   
                        </div>
                        <div className='basis-1/5'></div>
                        <div className='basis-2/5'>
                            <div className='bg-gray-700 h-5 w-3/4 rounded-md mx-auto'></div>
                        </div>
                    </div>
                    <div className='w-full flex mt-1 animate-pulse'>
                        <div className='basis-2/5'>
                            <div className='bg-gray-500 mx-auto h-4 w-1/2 rounded-md'></div>   
                        </div>
                        <div className='basis-1/5 font-semibold px-2'>
                            <div className='bg-gray-700 h-4 w-3/4 mx-auto rounded-md'></div>
                        </div>
                        <div className='basis-2/5'>
                            <div className='bg-gray-500 mx-auto h-4 w-1/2 rounded-md'></div>
                        </div>
                    </div>
                    <div className='w-full flex mt-1 animate-pulse'>
                        <div className='basis-2/5'>
                            <div className='bg-gray-500 mx-auto h-4 w-1/2 rounded-md'></div>   
                        </div>
                        <div className='basis-1/5 font-semibold px-2'>
                            <div className='bg-gray-700 h-4 w-3/4 mx-auto rounded-md'></div>
                        </div>
                        <div className='basis-2/5'>
                            <div className='bg-gray-500 mx-auto h-4 w-1/2 rounded-md'></div>
                        </div>
                    </div>
                    <div className='w-full flex mt-1 animate-pulse'>
                        <div className='basis-2/5'>
                            <div className='bg-gray-500 mx-auto h-4 w-1/2 rounded-md'></div>   
                        </div>
                        <div className='basis-1/5 font-semibold px-2'>
                            <div className='bg-gray-700 h-4 w-3/4 mx-auto rounded-md'></div>
                        </div>
                        <div className='basis-2/5'>
                            <div className='bg-gray-500 mx-auto h-4 w-1/2 rounded-md'></div>
                        </div>
                    </div>
                    <div className='w-full flex mt-1 animate-pulse'>
                        <div className='basis-2/5'>
                            <div className='bg-gray-500 mx-auto h-4 w-1/2 rounded-md'></div>   
                        </div>
                        <div className='basis-1/5 font-semibold px-2'>
                            <div className='bg-gray-700 h-4 w-3/4 mx-auto rounded-md'></div>
                        </div>
                        <div className='basis-2/5'>
                            <div className='bg-gray-500 mx-auto h-4 w-1/2 rounded-md'></div>
                        </div>
                    </div>
                </div>
                
            )
        } else {
            return (null);
        }
    } else {
        return(<div></div>);
    }
}