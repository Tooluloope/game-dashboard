import { FormControl, FormLabel } from "@chakra-ui/react";
import {
	RangeDatepicker,
	RangeDatepickerProps,
} from "chakra-dayzed-datepicker";

const DateRangePicker: React.FC<RangeDatepickerProps> = ({
	selectedDates,
	onDateChange,
}) => {
	return (
		<FormControl my={"10px"}>
			<FormLabel>Select Time Period</FormLabel>
			<RangeDatepicker
				selectedDates={selectedDates}
				onDateChange={onDateChange}
			/>
		</FormControl>
	);
};

export default DateRangePicker;
