import React from "react";
import { QuizQuestionActions } from "./QuizQuestionActions";
import { QuizQuestionPreheader } from "./QuizQuestionPreheader";
import { QuizQuestionCard } from "./QuizQuestionCard";

export const QuizQuestion = () => {

    return (
        <div className='w-full'>
            <QuizQuestionPreheader />
            <QuizQuestionCard />
            <QuizQuestionActions />
        </div>
    );
}