import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';

import { teams } from '../data/teams';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../context/quiz/quizContext';
import { INITIALIZE_QUIZ, PUT_STATE_IN_LOCAL_STORAGE } from '../context/Types';

export const OptionsForm = () => {

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

    const [loading, setLoading] = useState(false);
    const { dispatch } = useContext(QuizContext);
    const navigate = useNavigate();

    const spicyMode = () => {
        console.log("Let's Get Spicy!");
    };

    const onSubmit = async (data: any, e: any) => {

        const formData = new FormData();
        formData.append('name', data.team);
        formData.append('startYear', data.start);
        formData.append('endYear', data.end);

        setLoading(true);

        await axios({
            method: 'post',
            url: '/teamdata/',
            data: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then((res) => {
            dispatch({
                type: INITIALIZE_QUIZ,
                payload: { games: res.data, team: data.team },
            });

            dispatch({ type: PUT_STATE_IN_LOCAL_STORAGE });

            navigate('/quiz');
        });
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
                {loading ? (
                    <input
                        className='bg-cyan-600 opacity-75 text-white font-medium rounded-md p-3 grow cursor-not-allowed'
                        type='submit'
                        disabled
                        value='Creating Your Quiz...'
                    />
                ) : (
                    <input
                        className={`text-white font-medium rounded-md p-3 grow ${
                            watchTeam !== selectTeamString ? 'bg-cyan-600 cursor-pointer' : 'bg-gray-500 cursor-not-allowed'
                        }`}
                        type='submit'
                        value='Get Started'
                        disabled={watchTeam === selectTeamString}
                    />
                )}
                <input
                    className='bg-orange-500 text-white font-medium rounded-md p-3 w-12 cursor-pointer'
                    type='button'
                    onClick={spicyMode}
                    value='🌶️'
                />
            </div>
        </form>
    );
};
