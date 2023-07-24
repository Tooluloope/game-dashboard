import { DataEntry } from "./types";

// Convert a date string to a JS Date object
export function convertToJSDate(dateStr: string): Date {
	if (dateStr.includes("/")) {
		const [day, month, year] = dateStr.split("/");
		return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
	} else {
		const [year, month, day] = dateStr.split("-");
		return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
	}
}

// Aggregate data by date
export function aggregateDataByDate(data: DataEntry[]): {
	Date: string;
	"Daily Users": number;
}[] {
	const aggregated: { [key: string]: number } = {};

	data.forEach(entry => {
		const formattedDate = convertToJSDate(entry.Date)
			.toISOString()
			.split("T")[0];

		if (aggregated[formattedDate]) {
			aggregated[formattedDate] += parseInt(entry["Daily Users"]);
		} else {
			aggregated[formattedDate] = parseInt(entry["Daily Users"]);
		}
	});

	const sortedDates = Object.keys(aggregated).sort(
		(a, b) => new Date(a).getTime() - new Date(b).getTime()
	);

	// Convert the aggregated object back to an array
	const aggregatedArray = sortedDates.map(date => ({
		"Date": convertToMonthDay(date),
		"Daily Users": aggregated[date],
	}));

	return aggregatedArray;
}

// Convert a date string to a month/day string
export function convertToMonthDay(dateStr: string): string {
	const date = new Date(dateStr);
	const day = date.getUTCDate().toString().padStart(2, "0"); // Ensure day is two digits
	const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed, ensure month is two digits
	return `${month}/${day}`;
}
