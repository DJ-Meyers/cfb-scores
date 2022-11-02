import React from 'react';
import { OptionsForm } from '../components/OptionsForm';

export const Home = () => {
    return (
        <div className=' opacity-75 flex justify-start items-center flex-col w-[400px] mx-auto pt-60 '>
            <h1 className='mb-3 opacity-100 text-3xl font-semibold w-full tracking-wide'>
                Choose your Team and Year
            </h1>
            <OptionsForm />
        </div>
    );
};
