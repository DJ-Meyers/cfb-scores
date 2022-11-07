import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';

import { teams } from '../data/teams';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../context/quiz/quizContext';
import { INITIALIZE_QUIZ, PUT_STATE_IN_LOCAL_STORAGE, RESET_QUIZ } from '../context/Types';
import { IconContext } from 'react-icons';
import { GiPerspectiveDiceSixFacesThree } from 'react-icons/gi';
import { CgSpinner } from 'react-icons/cg';

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

    async function generateQuiz(formData: FormData) {
        await axios({
            method: 'post',
            url: '/teamdata/',
            data: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then((res) => {
            setLoading(false);

            dispatch({
                type: INITIALIZE_QUIZ,
                payload: { games: res.data, team: formData.get('name'), startYear: formData.get('startYear'), endYear: formData.get('endYear') },
            });
            dispatch({ type: PUT_STATE_IN_LOCAL_STORAGE });

            navigate('/quiz');
        });
    }

    useEffect(() => {
        dispatch({ type: RESET_QUIZ });
        // eslint-disable-next-line
    }, []);

    const generateRandomQuiz = async () => {
        const formData = new FormData();
        const team = teams[Math.round(Math.random() * teams.length)];
        const startYear = Math.round(Math.random() * (maxYear - minYear - 10) + minYear);
        const endYear = startYear + 10;
        const teamStr = team ? team.school : ''
        formData.append('name', teamStr);
        formData.append('startYear', startYear.toString());
        formData.append('endYear', endYear.toString());

        setLoading(true);

        await generateQuiz(formData);

    };

    const onSubmit = async (data: any, e: any) => {

        const formData = new FormData();
        formData.append('name', data.team);
        formData.append('startYear', data.start);
        formData.append('endYear', data.end);

        setLoading(true);

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
                {loading ? (
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
                        disabled={watchTeam === selectTeamString}
                    />
                )}
                <button
                    className='bg-orange-400 font-medium rounded-md p-3 w-12 cursor-pointer'
                    type='button'
                    onClick={generateRandomQuiz}
                >
                    <IconContext.Provider
                        value={{
                            color: 'white',
                            size: '24px'
                        }}
                    >
                        <GiPerspectiveDiceSixFacesThree />
                    </IconContext.Provider>
                </button>
            </div>
        </form>
    );
};
