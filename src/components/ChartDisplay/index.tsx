import React from "react";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	TimeScale,
	TimeSeriesScale,
} from "chart.js";

import { ChartDisplayProps } from "../../types";
import { aggregateDataByDate } from "../../utils";

ChartJS.register(
	LinearScale,
	PointElement,
	Tooltip,
	Legend,
	TimeScale,
	TimeSeriesScale,
	CategoryScale,
	LineElement,
	Title
);

const ChartDisplay: React.FC<ChartDisplayProps> = ({
	data,
	targetValue,
	targetColor,
}) => {
	if (data.length === 0) {
		return <div>No Data to chart</div>;
	}
	const chartData = {
		labels: aggregateDataByDate(data).map(d => d.Date),
		datasets: [
			{
				label: "Daily Users",
				data: aggregateDataByDate(data).map(d => d["Daily Users"]),
				borderColor: "blue",
				fill: false,
			},
			{
				label: "Target Line",
				data: Array(data.length).fill(targetValue),
				borderColor: targetColor || "red",
				borderDash: [5, 5],
				fill: false,
			},
		],
	};

	return <Line data={chartData} />;
};

export default ChartDisplay;
