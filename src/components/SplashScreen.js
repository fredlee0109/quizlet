import React from "react"

export default function SplashScreen(props) {
    return (
        <div className="splash--container">
            <h2 className="splash--title">
                Quizzical
            </h2>
            <button className="splash--btn" onClick={props.handleClick}>
                Start Quiz
            </button>
        </div>
    )
}