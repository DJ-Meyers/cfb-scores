import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';

import { teams } from '../data/teams';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../context/quiz/quizContext';
import { INITIALIZE_QUIZ, PUT_STATE_IN_LOCAL_STORAGE } from '../context/Types';

export const OptionsForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
        shouldFocusError: true,
    });

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
                payload: { games: res.data, team: data.team }
            })

            dispatch({ type: PUT_STATE_IN_LOCAL_STORAGE }); 

            navigate('/quiz');
        });
    };
    const onError = (errors: any, e: any) => console.log(errors);

    return (
        <form
            className='flex flex-col self-start w-full'
            onSubmit={handleSubmit(onSubmit, onError)}
            id='options-form'
        >
            <label className='text-lg font-medium mb-1.5'>Team</label>
            <select
                className='mb-3 rounded-md border-solid border border-slate-800 p-3 bg-white'
                {...register('team')}
                style={{ WebkitAppearance: 'none' }}
            >
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
                                value: 2022,
                                message: 'Year must be between 1869 and 2022',
                            },
                            min: {
                                value: 1869,
                                message: 'Year must be between 1869 and 2022',
                            },
                        })}
                        defaultValue={2012}
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
                                value: 2022,
                                message: 'Year must be between 1869 and 2022',
                            },
                            min: {
                                value: 1869,
                                message: 'Year must be between 1869 and 2022',
                            },
                            validate: {
                                greaterThanStart: (v: number) =>
                                    v >= getValues('start') ||
                                    'End Year must be greater than Start Year',
                            },
                        })}
                        defaultValue={2021}
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
                        className='bg-cyan-600 text-white font-medium rounded-md p-3 grow cursor-pointer'
                        type='submit'
                        value='Get Started'
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
