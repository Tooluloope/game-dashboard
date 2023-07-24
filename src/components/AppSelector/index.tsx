import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { AppSelectorProps } from "../../types";

function AppSelector({ options, value, onChange, label }: AppSelectorProps) {
	return (
		<FormControl my={"10px"}>
			<FormLabel>Select {label}</FormLabel>
			<Select value={value} onChange={e => onChange(e.target.value)}>
				{options.map(app => (
					<option key={app} value={app}>
						{app}
					</option>
				))}
				<option value="All">All</option>
			</Select>
		</FormControl>
	);
}

export default AppSelector;
