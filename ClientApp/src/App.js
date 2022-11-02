import React, { Component } from 'react';
import { Routes, Route } from 'react-router';
import { Layout } from './components/Layout.tsx';
import { Home } from './pages/Home';
import { Quiz } from './pages/Quiz';

import { QuizProvider } from './context/quiz/quizContext';

import './output.css';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <QuizProvider>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route exact path='/quiz' element={<Quiz />} />
                    </Routes>
                </QuizProvider>
            </Layout>
        );
    }
}
