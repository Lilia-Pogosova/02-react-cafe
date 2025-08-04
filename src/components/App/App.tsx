import css from "./App.module.css";
import CafeInfo from "../CafeInfo/CafeInfo";
import VoteOptions from "../VoteOptions/VoteOptions"
import type { Votes, VoteType } from "../../types/votes";
import { useState } from "react";
import VoteStats from "../VoteStats/VoteStats"
import Notification from "../Notification/Notification";



const initialVotes: Votes = {
    good: 0,
	neutral: 0,
	bad: 0,
};

export default function App() {

    const [votes, setVotes] = useState<Votes>(initialVotes);
    
    const handleVote = (type: VoteType) => {
        setVotes((votes:Votes) => ({
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
                <CafeInfo />
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
