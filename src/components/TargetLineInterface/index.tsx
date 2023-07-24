import {
	FormControl,
	FormLabel,
	Input,
	NumberInput,
	NumberInputField,
} from "@chakra-ui/react";
import { TargetLineProps } from "../../types";

const TargetLineInterface: React.FC<TargetLineProps> = ({
	value,
	color,
	onValueChange,
	onColorChange,
}) => {
	return (
		<div>
			<FormControl my={"10px"}>
				<FormLabel>Target Value:</FormLabel>
				<NumberInput
					defaultValue={value || 0}
					onChange={(_, value) => onValueChange(value)}
				>
					<NumberInputField />
				</NumberInput>
			</FormControl>
			<FormControl my={"10px"}>
				<FormLabel>Target Color:</FormLabel>
				<Input
					value={color}
					onChange={e => onColorChange(e.target.value)}
					size="md"
					type="color"
				/>
			</FormControl>
		</div>
	);
};

export default TargetLineInterface;
