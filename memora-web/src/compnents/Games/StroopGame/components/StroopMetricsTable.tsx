// src/components/MetricsTable.tsx
import React from "react";

interface IStroopMetric {
    questions: number;
    attempts: number;
    averageResponseTime: number;
    errors: number;
    accuracy: number;
}

interface StroopMetricsTableProps {
    metrics: IStroopMetric;
    totalScore: number;
    mmseScore: number;
}

export const StroopMetricsTable: React.FC<StroopMetricsTableProps> = ({ metrics, totalScore, mmseScore }) => {
    if (!metrics ) return <p className="text-center text-gray-500"></p>;

    return (
        <div className="mt-10 w-full">
            <h1 className="flex flex-col justify-center items-center p-4 max-w-lg mx-auto font-bold">Session Stats</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-green-300">
                        <th className="border p-2 text-center font-bold text-md">Number of Questions</th>
                        <th className="border p-2 text-center font-bold text-md">Attempts</th>
                        <th className="border p-2 text-center font-bold text-md">Average Respnse Time (s)</th>
                        <th className="border p-2 text-center font-bold text-md">Errors</th>
                        <th className="border p-2 text-center font-bold text-md">Accuracy (%)</th>
                        <th className="border p-2 text-center font-bold text-md">Total Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border p-2 text-center font-semibold text-md">{metrics.questions}</td>
                        <td className="border p-2 text-center font-semibold text-md">{metrics.attempts}</td>
                        <td className="border p-2 text-center font-semibold text-md">{metrics.averageResponseTime.toFixed(2)}</td>
                        <td className="border p-2 text-center font-semibold text-md">{metrics.errors}</td>
                        <td className="border p-2 text-center font-semibold text-md">{metrics.accuracy.toFixed(1)}%</td>
                        <td className="border p-2 text-center font-semibold text-md">{totalScore}</td>
                    </tr>
                </tbody>
            </table>
            <h1 className="flex flex-col justify-center items-center p-4 max-w-lg mx-auto font-bold">Predicted MMSE Score: {mmseScore.toFixed()}</h1>
        </div>
    );
};

