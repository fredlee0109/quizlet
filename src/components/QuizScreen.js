import React from "react";
import Quiz from "./Quiz";
import Result from "./Result";

export default function QuizScreen() {
    const [numTries, setNumTries] = React.useState(0);
    const [quizes, setQuizes] = React.useState([]);
    const [isEnd, setIsEnd] = React.useState(false);
    const [correctAnswerCount, setCorrectAnswerCount] = React.useState(0);
    const [isValid, setIsValid] = React.useState(true);

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple")
            .then((res) => res.json())
            .then((res) => parseResponse(res.results));
    }, [numTries]);

    function parseResponse(res) {
        setQuizes(
            res.map((re) => ({
                question: re.question,
                answers: getAnswers(re.correct_answer, re.incorrect_answers),
                correctAnswer: re.correct_answer,
                selectedAnswer: ""
            }))
        );
    }

    function getAnswers(correctAnswer, incorrectAnswer) {
        incorrectAnswer.splice(
            Math.floor(Math.random() * incorrectAnswer.length),
            0,
            correctAnswer
        );
        return incorrectAnswer;
    }

    function handleAnswerSelect(question, answer) {
        setQuizes((oldQuizes) =>
            oldQuizes.map((quiz) =>
                quiz.question === question ? { ...quiz, selectedAnswer: answer } : quiz
            )
        );
    }

    function handleSubmit() {
        let numCorrectAnswer = 0;
        let valid = true;
        quizes.forEach((quiz) => {
            if (!quiz.selectedAnswer) {
                valid = false;
            }
            if (quiz.selectedAnswer === quiz.correctAnswer) {
                numCorrectAnswer++;
            }
        });
        setIsValid(valid);
        setCorrectAnswerCount(numCorrectAnswer);
        setIsEnd((oldIsEnd) => {
            if (valid && !oldIsEnd) {
                return true;
            }
        });
    }

    function handlePlayAgain() {
        setQuizes([]);
        setNumTries((oldNumTries) => oldNumTries + 1);
        setIsEnd(false);
    }

    return (
        <>
            {quizes.length === 0 && <p className="loading">Loading...</p>}
            {quizes.length !== 0 && <div className="quiz-screen--container">
                {quizes.map((quiz) => (
                    <Quiz
                        key={quiz.question}
                        quiz={quiz}
                        handleAnswerSelect={handleAnswerSelect}
                        isEnd={isEnd}
                    />
                ))}
                {isEnd && (
                    <Result
                        correctAnswerCount={correctAnswerCount}
                        handlePlayAgain={handlePlayAgain}
                    />
                )}
                {!isValid && <p>Answer all questions!</p>}
                {!isEnd && (
                    <button className="check--button" onClick={handleSubmit}>
                        Check answers
                    </button>
                )}
            </div>
            }
        </>
    );
}
