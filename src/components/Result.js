import React from "react"

export default function Output(props) {
    return (
        <div className="output--container">
            <p>
                You scored {props.correctAnswerCount}/5 correct answers
            </p>
            <button className="play_again--button" onClick={props.handlePlayAgain}>
                Play again
            </button>
        </div>
    )
}