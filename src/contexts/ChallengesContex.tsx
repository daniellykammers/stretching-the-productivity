import { createContext, ReactNode, useState } from 'react';

export const ChallengesContext = createContext({});

interface ChallengesProviderProps {
    children: ReactNode;
}

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesComplete, setChallengesComplete] = useState(0);

    function levelUp() {
      setLevel(level + 1);
    }

    <ChallengesContext.Provider value={{ level, currentExperience, challengesComplete, levelUp}}>
        {children}
    </ChallengesContext.Provider>
}