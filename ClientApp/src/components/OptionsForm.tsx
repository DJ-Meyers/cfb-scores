import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';

import { teams } from '../data/teams';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../context/quiz/quizContext';
import { INITIALIZE_QUIZ, PUT_STATE_IN_LOCAL_STORAGE, RESET_QUIZ } from '../context/Types';
import { IconContext } from 'react-icons';
// import { GiPerspectiveDiceSixFacesThree } from 'react-icons/gi';
import { IoCalendarSharp } from 'react-icons/io5';
import { CgSpinner } from 'react-icons/cg';
import { Game } from '../data/game';

export type QuizResponse = {
    games: Game[];
    team: string;
    startYear: number;
    endYear: number;
    isDaily: boolean;
    length?: number;
}

export const OptionsForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useContext(QuizContext);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({ type: RESET_QUIZ });
        // eslint-disable-next-line
    }, []);

    const maxYear = 2021;
    const minYear = 1971;
    const defaultStart = 2012;
    const defaultEnd = 2021;
    const selectTeamString = '-- Select a Team --';

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        getValues,
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
        shouldFocusError: true,
        defaultValues: {
            team: selectTeamString,
            start: defaultStart,
            end: defaultEnd,
        },
    });
    const watchTeam = watch('team', selectTeamString);


    const generateQuiz = async (formData: FormData) => {
        await axios({
            method: 'post',
            url: '/teamquiz/',
            data: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then((res) => {
            setIsLoading(false);
            dispatch({
                type: INITIALIZE_QUIZ,
                payload: JSON.parse(res.data) as QuizResponse,
            });
            dispatch({ type: PUT_STATE_IN_LOCAL_STORAGE });

            navigate('/quiz');
        });
    }

    const generateDailyQuiz = async () => {
        await axios({
            method: 'post',
            url: '/dailyquiz/',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then((res) => {
            setIsLoading(false);
            dispatch({
                type: INITIALIZE_QUIZ,
                payload: JSON.parse(res.data) as QuizResponse,
            });
            dispatch({ type: PUT_STATE_IN_LOCAL_STORAGE });

            navigate('/quiz');
        });
    }

    const onSubmit = async (data: any, e: any) => {

        const formData = new FormData();
        formData.append('name', data.team);
        formData.append('startYear', data.start);
        formData.append('endYear', data.end);

        setIsLoading(true);

        generateQuiz(formData);
    };

    const onError = (errors: any, e: any) => console.log(errors);


    return (
        <form className='flex flex-col self-start w-full' onSubmit={handleSubmit(onSubmit, onError)} id='options-form'>
            <label className='text-lg font-medium mb-1.5'>Team</label>
            <select
                className='mb-3 rounded-md border-solid border border-slate-800 p-3 bg-white'
                {...register('team')}
                style={{ WebkitAppearance: 'none' }}
            >
                <option>{selectTeamString}</option>
                {teams.map((item, index) => {
                    return <option key={index}>{item.school}</option>;
                })}
            </select>
            <ErrorMessage errors={errors} name='team' />
            <div id='year-pickers' className='flex gap-3 mb-6'>
                <div className='basis-1/2'>
                    <label className='text-lg font-medium mb-1.5'>Start</label>
                    <input
                        type='number'
                        className='rounded-md border-solid border border-slate-800 p-3 w-full bg-white'
                        {...register('start', {
                            required: true,
                            max: {
                                value: maxYear,
                                message: `Year must be between ${minYear} and ${maxYear}`,
                            },
                            min: {
                                value: minYear,
                                message: `Year must be between ${minYear} and ${maxYear}`,
                            },
                        })}
                        defaultValue={defaultStart}
                    />
                    <ErrorMessage errors={errors} name='start' />
                </div>
                <div className='basis-1/2'>
                    <label className='text-lg font-medium mb-1.5'>End</label>
                    <input
                        type='number'
                        className='rounded-md border-solid border border-slate-800 p-3 w-full bg-white'
                        {...register('end', {
                            required: true,
                            max: {
                                value: maxYear,
                                message: `Year must be between ${minYear} and ${maxYear}`,
                            },
                            min: {
                                value: minYear,
                                message: `Year must be between ${minYear} and ${maxYear}`,
                            },
                            validate: {
                                greaterThanStart: (v: number) => v >= getValues('start') || 'End Year must be greater than Start Year',
                            },
                        })}
                        defaultValue={defaultEnd}
                    />
                    <ErrorMessage errors={errors} name='end' />
                </div>
            </div>
            <div id='btns-container' className='flex gap-3'>
                {isLoading ? (
                    <button
                        className='bg-cyan-600 text-white font-medium rounded-md p-3 grow cursor-not-allowed flex items-center justify-center'
                        type='submit'
                        disabled
                    >
                        <IconContext.Provider
                            value={{
                                className: 'animate-spin mr-1.5',
                                size: '24px'
                            }}
                        >
                            <CgSpinner />
                        </IconContext.Provider>
                        <span>Creating Your Quiz</span>
                    </button>
                ) : (
                    <input
                        className={`text-white font-medium rounded-md p-3 grow ${
                            watchTeam !== selectTeamString ? 'bg-cyan-600 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
                        }`}
                        type='submit'
                        value='Get Started'
                        disabled={watchTeam === selectTeamString || isLoading}
                    />
                )}
                <button
                    className='bg-green-500 rounded-md p-3 w-12 cursor-pointer'
                    onClick={generateDailyQuiz}
                    type='button'
                    disabled={isLoading}
                >
                    <IconContext.Provider
                        value={{
                            color: 'white',
                            size: '24px'
                        }}
                    >
                        <IoCalendarSharp />
                    </IconContext.Provider>
                </button>
                {/* <button
                    className='bg-orange-400 rounded-md p-3 w-12 cursor-pointer'
                    onClick={generateRandomQuiz}
                    type='button'
                    disabled={isLoading}
                >
                    <IconContext.Provider
                        value={{
                            color: 'white',
                            size: '24px'
                        }}
                    >
                        <GiPerspectiveDiceSixFacesThree />
                    </IconContext.Provider>
                </button> */}
            </div>
        </form>
    );
};
