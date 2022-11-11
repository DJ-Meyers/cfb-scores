import { QuizResponse } from '../../components/OptionsForm';
import { INITIALIZE_QUIZ, NEXT_QUESTION, PUT_STATE_IN_LOCAL_STORAGE, REQUEST_BOX_SCORES, RESET_QUIZ, RESTORE_STATE_FROM_LOCAL_STORAGE, SET_BOX_SCORES, SUBMIT_ANSWER } from '../Types';
import { InitialQuizStateType } from './quizContext';
import { shuffleGames } from './quizHelpers';

export const quizReducer = (state: InitialQuizStateType, action: { type: string, payload: any }) => {
    switch (action.type) {
        case INITIALIZE_QUIZ:
            const data: QuizResponse = action.payload as QuizResponse;
            const games = data.games;
            const questions = data.length ? shuffleGames(games, data.length) : games;

            return {
                ...state,
                games: games,
                selectedQuestions: questions,
                questionIndex: 0,
                numCorrect: 0,
                numIncorrect: 0,
                numAttempted: 0,
                currentQuestion: questions[0],
                correctAray: [],
                choicesArray: [],
                team: data.team,
                startYear: data.startYear,
                endYear: data.endYear,
                isLoadingBoxScores: false,
                isBetweenQuestions: false,
                isDaily: data.isDaily,
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
                isLoadingBoxScores: false,
                isDaily: false,
                stats: []
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
                questionIndex: newState.questionIndex,
                numCorrect: newState.numCorrect,
                numIncorrect: newState.numIncorrect,
                numAttempted: newState.numAttempted,
                correctArray: newState.correctArray,
                choicesArray: newState.choicesArray,
                isBetweenQuestions: newState.isBetweenQuestions,
                currentQuestion: newState.currentQuestion,
                team: newState.team,
                startYear: newState.startYear,
                endYear: newState.endYear,
                isLoadingBoxScores: newState.isLoadingBoxScores,
                isDaily: newState.isDaily,
                states: newState.stats,
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
                state.currentQuestion.HomePoints >
                state.currentQuestion.AwayPoints;
            const teamWasHome = state.currentQuestion.HomeTeam === state.team;
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
        case REQUEST_BOX_SCORES:
            return {
                ...state,
                isLoadingBoxScores: true
            };
        case SET_BOX_SCORES:
            return {
                ...state,
                stats: action.payload,
                isLoadingBoxScores: false,
            };
        default:
            return state;
    }
};