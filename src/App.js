import React from "react"
import QuizScreen from "./components/QuizScreen"
import SplashScreen from "./components/SplashScreen"

export default function App() {

  const [isSplash, setIsSplash] = React.useState(true)

  return (
    <main>
      {isSplash && <SplashScreen handleClick={() => setIsSplash(false)} />}
      {!isSplash && <QuizScreen />}
    </main>
  )
}