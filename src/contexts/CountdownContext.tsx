import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownContextProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeOut: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownContextProps) {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(25 * 60);
    const [isActive, setisActive] = useState(false);
    const [hasFinished, setHasFineshed] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    
    function startCountdown() {
        setisActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeOut)
        setisActive(false);
        setHasFineshed(false);
        setTime(25 * 60);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeOut = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time === 0) {
            setHasFineshed(true);
            setisActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);
    
    return (
        <CountdownContext.Provider 
        value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
        }}
        >
            {children}
        </CountdownContext.Provider>
    );
}