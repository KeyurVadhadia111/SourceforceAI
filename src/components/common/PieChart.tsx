// components/PieChart.tsx
import React from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
    data: {
        label: string;
        value: number;
        color: string;
    }[];
    width?: number;
    height?: number;
}

export const PieChart: React.FC<PieChartProps> = ({ data, width = 140, height = 140 }) => {

    const total = data.reduce((sum, item) => sum + item.value, 0);

    const chartData = {
        labels: data.map((item) => item.label),
        datasets: [
            {
                data: data.map((item) => item.value),
                backgroundColor: data.map((item) => item.color),
                borderWidth: 0,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                titleColor: "#fff",
                bodyColor: "#fff",
                borderColor: "#529e7e",
                borderWidth: 1,
                padding: 10,
                displayColors: true,
                callbacks: {
                    label: function (context: any) {
                        const label = context.label || "";
                        const value = context.parsed || 0;
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: ${percentage}%`;
                    },
                },
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <div style={{ width, height, position: "relative", overflow: "visible" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
                <Pie data={chartData} options={options} />
            </div>
        </div>
    );
};
