import css from "./App.module.css";
import CafeInto from "../CafeInfo/CafeInfo";
import VoteOptions from "../VoteOptions/VoteOptions"
import type Votes from "../../types/votes";
import type VoteType from "../../types/votes"
import { useState } from "react";
import VoteStats from "../VoteStats/VoteStats"
import Notification from "../Notification/Notification";

/* import React from "react"; */

const initialVotes: Votes = {
    good: 0,
	neutral: 0,
	bad: 0,
};

export default function App() {

    const [votes, setVotes] = useState(initialVotes);
    
    const handleVote = (type: keyof VoteType) => {
        setVotes(votes => ({
            ...votes,
            [type]: votes[type] + 1,
        }));
    };

    const resetVotes = () => {
        setVotes(initialVotes);
    };

    const totalVotes = votes.good + votes.neutral + votes.bad;

    const positiveRate = totalVotes
        ? Math.round((votes.good / totalVotes) * 100)
        : 0;



    

    return (
            <div className={css.app}>
                <CafeInto />
                <VoteOptions
                    onVote={handleVote}
                    onReset={resetVotes}
                    canReset={totalVotes > 0} />
            
                {totalVotes > 0 ? (
                    <VoteStats
                        votes={votes}
                        totalVotes={totalVotes}
                        positiveRate={positiveRate}
                    />
                ) : (
                    <Notification />
                )}

            </div>
                    
    );
}
