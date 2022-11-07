import React from 'react';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

export const QuizResultsPreheader = () => 
<div>
    <div className='flex justify-start items-center relative mb-6 w-full'>
        <Link
            className='flex items-center gap-1 opacity-50 hover:opacity-100'
            to="/"
        >
            <RiArrowGoBackFill /> Back
        </Link>
    </div>
</div>
