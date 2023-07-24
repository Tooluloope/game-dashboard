export type DataEntry = {
	Date: string;
	Country: string;
	App: string;
	Platform: string;
	"Ad Network": string;
	"Daily Users": string;
};

export type ChartDisplayProps = {
	data: DataEntry[];
	targetValue: number;
	targetColor: string;
};

export type TableDisplayProps = {
	data: DataEntry[];
};

export type TargetLineProps = {
	value: number;
	color: string;
	onValueChange: (value: number) => void;
	onColorChange: (color: string) => void;
};

export type DateRangePickerProps = {
	startDate: string;
	endDate: string;
	onStartDateChange: (date: string) => void;
	onEndDateChange: (date: string) => void;
};

export type AppSelectorProps = {
	options: string[];
	value: string;
	onChange: (value: string) => void;
};
