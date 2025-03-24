// src/components/MetricsTable.tsx
import React from "react";
import { Metric } from "../../types/props";

interface MetricsTableProps {
    metrics: Metric[];
}

const MetricsTable: React.FC<MetricsTableProps> = ({ metrics }) => {
    if (!metrics || metrics.length === 0) return <p className="text-center text-gray-500"></p>;

    return (
        <div className="mt-10 w-full">
            <p className="flex flex-col justify-center items-center p-4 max-w-lg mx-auto font-bold">PREVIOUS SESSION PERFORMANCE</p>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Level</th>
                        <th className="border p-2">Attempts</th>
                        <th className="border p-2">Response Time (s)</th>
                        <th className="border p-2">Accuracy (%)</th>
                        <th className="border p-2">Errors</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MetricsTable;
