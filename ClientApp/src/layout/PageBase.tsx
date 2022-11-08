import React, { ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

export const PageBase: React.FC<{ children: ReactNode[] }> =({ children }) => {

    return (
        <div className='flex flex-col h-screen bg-slate-200'>
            <Header />
            <div className='grow'>
                {children}
            </div>
            <Footer />
        </div>
    )
}