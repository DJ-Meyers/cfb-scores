import React, { ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

export const PageBase: React.FC<{ children: ReactNode[] }> =({ children }) => {

    return (
        <div className='flex flex-col h-full'>
            <Header />
            <div className='grow'>
                {children}
            </div>
            <Footer />
        </div>
    )
}