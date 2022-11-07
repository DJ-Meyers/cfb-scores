import React, { Component } from 'react';
import { Routes, Route } from 'react-router';
import { Home } from './pages/Home';
import { Quiz } from './pages/Quiz';

import { QuizProvider } from './context/quiz/quizContext';

import './output.css';
import { PageBase } from './layout/PageBase';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <QuizProvider>
                <Routes>
                    <Route path='/' element={<PageBase><Home /></PageBase>} />
                    <Route exact path='/quiz' element={<PageBase><Quiz /></PageBase>} />
                </Routes>
            </QuizProvider>
        );
    }
}
