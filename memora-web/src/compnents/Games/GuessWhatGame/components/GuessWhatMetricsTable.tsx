// src/components/MetricsTable.tsx
import React from "react";
import { calculateAverages } from "../../../../utils/game/guessWhatUtils";

export interface IGuessWhatMetric {
    level: number;
    attempt: number;
    accuracy: number;
    levelErrors: number;
    totalResponseTime: number;
    levelScore: number;
}


interface MetricsTableProps {
    metrics: IGuessWhatMetric[];
    totalScore: number;
}

export const GuessWhatMetricsTable: React.FC<MetricsTableProps> = ({ metrics, totalScore }) => {
    if (!metrics || metrics.length === 0) return <p className="text-center text-gray-500"></p>;
    const averages = calculateAverages(metrics)

    return (
        <div className="mt-10 w-full">
            <h1 className="flex flex-col justify-center items-center p-4 max-w-lg mx-auto font-bold">Session Stats</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-green-200 rounded-md">
                        <th className="border p-2">Level</th>
                        <th className="border p-2">Attempts</th>
                        <th className="border p-2">Response Time (s)</th>
                        <th className="border p-2">Accuracy (%)</th>
                        <th className="border p-2">Errors</th>
                        <th className="border p-2">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {metrics.map((metric, index) => (
                        <tr key={index} className="text-center">
                            <td className="border p-2">{metric.level}</td>
                            <td className="border p-2">{metric.attempt}</td>
                            <td className="border p-2">{metric.totalResponseTime.toFixed(2)}</td>
                            <td className="border p-2">{metric.accuracy.toFixed(1)}%</td>
                            <td className="border p-2">{metric.levelErrors}</td>
                            <td className="border p-2">{metric.levelScore}</td>
                        </tr>
                    ))}
                    <tr className="bg-green-200">
                        <th className="border p-2">Levels: {metrics.length}</th>
                        <th className="border p-2">Avg Attempts: {averages.avgAttemps.toFixed()}</th>
                        <th className="border p-2">Avg Response Time: {averages.avgResponseTime.toFixed(2)}</th>
                        <th className="border p-2">Avg Accuracy: {averages.avgAccuracy.toFixed(1)}%</th>
                        <th className="border p-2">Avg Errors: {averages.avgErrors.toFixed()}</th>
                        <th className="border p-2">Total: {totalScore}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
