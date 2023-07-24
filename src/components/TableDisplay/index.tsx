import { Box } from "@chakra-ui/react";
import { Table, createColumn } from "react-chakra-pagination";

import { TableDisplayProps } from "../../types";

const TableDisplay: React.FC<TableDisplayProps> = ({ data }) => {
	const columnHelper = createColumn<(typeof data)[0]>();

	const columns = [
		columnHelper.accessor("Date", {
			cell: info => info.getValue(),
			header: "Date",
		}),
		columnHelper.accessor("Country", {
			cell: info => info.getValue(),
			header: "Country",
		}),
		columnHelper.accessor("App", {
			cell: info => info.getValue(),
			header: "App",
		}),
		columnHelper.accessor("Platform", {
			cell: info => info.getValue(),
			header: "Platform",
		}),
		columnHelper.accessor("Ad Network", {
			cell: info => info.getValue(),
			header: "Ad Network",
		}),
		columnHelper.accessor("Daily Users", {
			cell: info => info.getValue(),
			header: "Daily Users",
		}),
	];

	return (
		<Box overflowX="scroll">
			<Table colorScheme="blue" columns={columns} data={data} />
		</Box>
	);
};

export default TableDisplay;
