import React from 'react';
import { OptionsForm } from '../components/OptionsForm';

export const Home = () => {
    return (
        <div className='flex justify-start items-center flex-col w-80 mx-auto pt-8'>
            <h1 className='mb-3 opacity-100 text-3xl font-semibold w-full'>
                CFBGuessr Team Quiz
            </h1>
            <OptionsForm />
        </div>
    );
};
