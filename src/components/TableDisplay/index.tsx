import {
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	Box,
} from "@chakra-ui/react";

import { TableDisplayProps } from "../../types";
import { uniqueId } from "lodash";

const TableDisplay: React.FC<TableDisplayProps> = ({ data }) => {
	return (
		<Box overflowX="scroll">
			<Table variant="simple">
				<TableCaption>Table of data for {data.length} days</TableCaption>
				<Thead>
					<Tr>
						<Th>Date</Th>
						<Th>Country</Th>
						<Th>App</Th>
						<Th>Platform</Th>
						<Th>Ad Network</Th>
						<Th isNumeric>Daily Users</Th>
					</Tr>
				</Thead>
				<Tbody>
					{data.map(row => (
						<Tr key={uniqueId()}>
							<Td>{row.Date}</Td>
							<Td>{row.Country}</Td>
							<Td>{row.App}</Td>
							<Td>{row.Platform}</Td>
							<Td>{row["Ad Network"]}</Td>
							<Td isNumeric>{row["Daily Users"]}</Td>
						</Tr>
					))}
				</Tbody>
				<Tfoot>
					<Tr>
						<Th>Date</Th>
						<Th>Country</Th>
						<Th>App</Th>
						<Th>Platform</Th>
						<Th>Ad Network</Th>
						<Th isNumeric>Daily Users</Th>
					</Tr>
				</Tfoot>
			</Table>
		</Box>
	);
};

export default TableDisplay;
