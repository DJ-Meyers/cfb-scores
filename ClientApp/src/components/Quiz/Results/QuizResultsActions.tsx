import React, { useContext, useState } from "react";
import { QuizContext } from "../../../context/quiz/quizContext";
import { getAbbr } from "../../../context/quiz/quizHelpers";

export const QuizResultsActions = () => {

    const { state } = useContext(QuizContext);
    const [showCopied, setShowCopied] = useState(false);

    const getShareableString = () => {
        const rows = [];
        const startYearStr = state.startYear.toString().substring(2, 4);
        const endYearStr = state.endYear.toString().substring(2, 4);
        rows.push(`${getAbbr(state.team)} '${startYearStr}-'${endYearStr} ${state.numCorrect}/${state.selectedQuestions.length}`);
        rows.push('');
        state.selectedQuestions.forEach((game, index) => {
            const dateString = new Date(game.StartDate).toLocaleDateString()
            const correct = state.correctArray[index];
            rows.push(`${correct ? '✅' : '❌'} ${getAbbr(game.AwayTeam)}@${getAbbr(game.HomeTeam)} '${dateString.substring(dateString.length - 2)}`);
        });
        rows.push('https://bit.ly/cfb-record-quiz');
        return rows.join("\n");
    }

    const share = async () => {
        const shareText = getShareableString();
        if (navigator.share) {
            await navigator.share({
                title: 'CFB Results Quiz',
                text: shareText,
            });
        } else {
            navigator.clipboard.writeText(shareText);
            setShowCopied(true);

            setTimeout(() => {
                setShowCopied(false);
            }, 1000);
        }
    }

    return (
        <div className='w-full flex justify-end'>
            {showCopied ? (
                <button className='bg-green-500 text-white font-medium rounded-md p-3 w-full cursor-pointer' onClick={share}>
                    Copied to Clipboard
                </button>
            ) : (
                <button className='bg-blue-500 text-white font-medium rounded-md p-3 w-full cursor-pointer' onClick={share}>
                    Share
                </button>
            )}
        </div>
    );
}