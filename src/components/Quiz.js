import React from "react"

export default function Quiz(props) {
    function answerStyle(answer) {
        let opacity = {
            opacity: answer !== props.quiz.selectedAnswer ? 0.5 : 1.0
        }
        if (props.isEnd) {
            if (answer === props.quiz.selectedAnswer) {
                return {
                    backgroundColor: "#94D7A2",
                    ...opacity
                }
            } else if (answer === props.quiz.correctAnswer) {
                return {
                    backgroundColor: "#F8BCBC",
                    ...opacity
                }
            } else {
                return {
                    backgroundColor: "#F5F7FB",
                    ...opacity
                }
            }
        } else {
            return {
                backgroundColor: props.quiz.selectedAnswer === answer ? "#D6DBF5" : "#F5F7FB"
            }
        }
    }
    return (
        <div className="quiz--container">
            <div className="question" dangerouslySetInnerHTML={{ __html: props.quiz.question }} />
            <div className="quiz--answers">
                {props.quiz.answers.map(answer =>
                    <button
                        key={answer}
                        className="quiz--answer"
                        onClick={() => props.handleAnswerSelect(props.quiz.question, answer)}
                        style={answerStyle(answer)}
                        dangerouslySetInnerHTML={{ __html: answer }} />)}
            </div>
            <div className="border" />
        </div>
    )
}