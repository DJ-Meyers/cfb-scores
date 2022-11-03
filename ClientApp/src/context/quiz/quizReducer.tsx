import { Game } from '../../data/game';
import { INITIALIZE_QUIZ, NEXT_QUESTION, PUT_STATE_IN_LOCAL_STORAGE, RESET_QUIZ, RESTORE_STATE_FROM_LOCAL_STORAGE, SUBMIT_ANSWER } from '../Types';
import { InitialQuizStateType } from './quizContext';
import { shuffleGames } from './quizHelpers';

export const quizReducer = (state: InitialQuizStateType, action: { type: string, payload: any }) => {
    switch (action.type) {
        case INITIALIZE_QUIZ:
            const games = action.payload.games as Game[];
            const questions = shuffleGames(games);
            return {
                ...state,
                games: action.payload,
                selectedQuestions: questions,
                questionIndex: 0,
                numCorrect: 0,
                numIncorrect: 0,
                numAttempted: 0,
                currentQuestion: questions[0],
                team: action.payload.team,
            };
        case RESET_QUIZ:
            return {
                ...state,
                games: [],
                selectedQuestions: [],
                questionIndex: -1,
                numCorrect: -1,
                numIncorrect: -1,
                numAttempted: -1,
                correctAray: [],
                choicesArray: [],
                isBetweenQuestions: false,
                currentQuestion: null,
                team: '',
                isLoading: false,
            };
        case PUT_STATE_IN_LOCAL_STORAGE:
            localStorage.removeItem('quizState');
            localStorage.setItem('quizState', JSON.stringify(state));
            return {
                ...state,
            };
        case RESTORE_STATE_FROM_LOCAL_STORAGE:
            const newState = action.payload as InitialQuizStateType;
            return {
                ...state,
                games: newState.games,
                selectedQuestions: newState.selectedQuestions,
                team: newState.team,
                numCorrect: newState.numCorrect,
                numIncorrect: newState.numIncorrect,
                numAttempted: newState.numAttempted,
                questionIndex: newState.questionIndex,
                currentQuestion: newState.currentQuestion,
            };

        case SUBMIT_ANSWER:
            if (
                !state.currentQuestion ||
                !state.team ||
                !state.selectedQuestions
            ) {
                return {
                    ...state,
                };
            }
            const choseWin = action.payload;
            const homeTeamWon =
                state.currentQuestion.homePoints >
                state.currentQuestion.awayPoints;
            const teamWasHome = state.currentQuestion.homeTeam === state.team;
            const teamDidWin = teamWasHome ? homeTeamWon : !homeTeamWon;

            const newCorrect =
                choseWin === teamDidWin
                    ? state.numCorrect + 1
                    : state.numCorrect;
            
            const newIncorrect =
                choseWin === teamDidWin
                    ? state.numIncorrect
                    : state.numIncorrect + 1;

            const newCorrectArray = [...state.correctArray, (newCorrect !== state.numCorrect)];
            const newChoicesArray = [...state.choicesArray, choseWin]

            return {
                ...state,
                numCorrect: newCorrect,
                numIncorrect: newIncorrect,
                numAttempted: state.numAttempted + 1,
                isBetweenQuestions: true,
                correctArray: newCorrectArray,
                choicesArray: newChoicesArray,
            };
        case NEXT_QUESTION:
            if (!state.selectedQuestions) {
                return {...state}
            }
            let newCurrent;
            const newIndex = state.questionIndex + 1;

            newCurrent = newIndex < state.selectedQuestions.length ? state.selectedQuestions[newIndex] : null;
            return {
                ...state,
                questionIndex: newIndex,
                currentQuestion: newCurrent,
                isBetweenQuestions: false,
            };
        default:
            return state;
    }
};