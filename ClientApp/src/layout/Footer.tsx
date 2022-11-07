import React from 'react';
import { IconContext } from 'react-icons';
import { AiFillGithub }  from 'react-icons/ai';

export const Footer = () => {

    return (<div className='w-full h-12'>
        <div className='mx-auto w-80 sm:w-full max-w-[1080px] sm:px-4 flex justify-between items-center'>
            <h3 className='font-semibold'>Created by <a href='https://www.linkedin.com/in/dj-meyers/' className='font-semibold hover:text-gray-400'>DJ Meyers</a></h3>
            <a href='https://github.com/DJ-Meyers/cfb-scores' className='font-semibold hover:text-gray-400'><IconContext.Provider value={{ className: 'inline pb-1', size: '20'}}><AiFillGithub /> Source</IconContext.Provider></a>
        </div>
    </div>);
}