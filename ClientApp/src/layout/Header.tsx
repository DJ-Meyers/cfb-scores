import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => (
    <div className='w-full h-12 flex justify-between items-center bg-slate-300 shadow-sm'>
        <div className='mx-auto w-80 max-w-[1080px] sm:px-4 sm:w-full'>
            <Link to='/' className='font-semibold'>CFBGuessr</Link>
        </div>
    </div>
);
