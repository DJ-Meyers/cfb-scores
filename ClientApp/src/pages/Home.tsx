import React from 'react';
import { OptionsForm } from '../components/OptionsForm';

export const Home = () => {
    return (
        <div className=' flex justify-start items-center flex-col w-96 mx-auto pt-8 '>
            <h1 className='mb-3 opacity-100 text-3xl font-semibold w-full'>
                Choose your Team and Year
            </h1>
            <OptionsForm />
        </div>
    );
};
