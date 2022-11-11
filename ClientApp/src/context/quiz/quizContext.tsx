import React, { createContext, ReactNode, useReducer } from 'react';
import { Game } from '../../data/game';
import { TeamGame } from '../../data/TeamGame';
import { quizReducer } from './quizReducer';

export type InitialQuizStateType = {
    games: Game[];
    selectedQuestions: Game[];
    questionIndex: number;
    numCorrect: number;
    numIncorrect: number;
    numAttempted: number;
    correctArray: boolean[];
    choicesArray: boolean[];
    isBetweenQuestions: boolean;
    currentQuestion: Game | null;
    team: string;
    startYear: number;
    endYear: number;
    isLoadingBoxScores: boolean;
    isDaily: boolean;
    stats: TeamGame[];
};


const initialState = {
    games: [],
    selectedQuestions: [],
    questionIndex: -1,
    numCorrect: -1,
    numIncorrect: -1,
    numAttempted: -1,
    correctArray: [],
    choicesArray: [],
    isBetweenQuestions: false,
    currentQuestion: null,
    team: '',
    startYear: 0,
    endYear: 0,
    isLoadingBoxScores: false,
    isDaily: false,
    stats: [],
};

const QuizContext = createContext<{
    state: InitialQuizStateType,
    dispatch: React.Dispatch<any>
}>({ state: initialState, dispatch: () => null });

const QuizProvider: React.FC<{ children: ReactNode[] }> = ({ children }) => {
    const [state, dispatch] = useReducer(quizReducer, initialState);

    return (
        <QuizContext.Provider value={{ state, dispatch }}>
            {children}
        </QuizContext.Provider>
    )
}

export { QuizContext, QuizProvider };