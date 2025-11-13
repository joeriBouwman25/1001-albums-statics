import React, { useState, useEffect } from "react";
import "./LoadingState.css";

interface RecordType {
    id: number;
    left: string;
    top: number;
    speed: number;
}

export const LoadingState: React.FC = () => {
    const [gameActive, setGameActive] = useState<boolean>(false);
    const [records, setRecords] = useState<RecordType[]>([]);
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        if (!gameActive) return;
        const spawn = setInterval(() => {
            const newRecord: RecordType = {
                id: Date.now(),
                left: `${Math.random() * 90}vw`,
                top: -80,
                speed: Math.random() * 10 + 1.5, // px per frame
            };
            setRecords((prev) => [...prev, newRecord]);
        }, 900);
        return () => clearInterval(spawn);
    }, [gameActive]);

    useEffect(() => {
        if (!gameActive) return;
        const fall = setInterval(() => {
            setRecords((prev) =>
                prev
                    .map((r) => ({
                        ...r,
                        top: r.top + r.speed,
                    }))
                    .filter((r) => r.top < window.innerHeight)
            );
        }, 30);
        return () => clearInterval(fall);
    }, [gameActive]);


    const handleShoot = (id: number): void => {
        setRecords((prev) => prev.filter((r) => r.id !== id));
        setScore((s) => s + 1);
    };

    return (
        <div className="loading-container">
            <div className="spinner"></div>

            <h1>De server is aan het opstarten...</h1>
            <h2>Dit duurt helaas even 😅</h2>
            <h3>Speel ondertussen een spelletje tot alles ingeladen is 🎮</h3>

            {!gameActive && (
                <button className="mini-game-btn" onClick={() => setGameActive(true)}>
                    👉 Start Mini Game
                </button>
            )}

            {gameActive && <div className="score">💿 Score: {score}</div>}


            {records.map((record) => (
                <div
                    key={record.id}
                    className="record"
                    style={{ left: record.left, top: `${record.top}px` } as React.CSSProperties}
                    onClick={() => handleShoot(record.id)}
                >
                    <div className="record-inner">
                        <div className="record-label"></div>
                        <div className="record-hole"></div>
                        <div className="record-shine"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};
