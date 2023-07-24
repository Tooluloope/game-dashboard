import React, { useState, useEffect, useMemo } from "react";
import Papa from "papaparse";
import {
	Container,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Text,
	Spinner,
} from "@chakra-ui/react";

import ChartDisplay from "./components/ChartDisplay";
import TableDisplay from "./components/TableDisplay";
import TargetLineInterface from "./components/TargetLineInterface";
import { DataEntry } from "./types";
import CSV from "./assets/data.csv?url";
import DateRangePicker from "./components/DateRangePicker";
import { convertToJSDate } from "./utils";
import AppSelector from "./components/AppSelector";

const App: React.FC = () => {
	// State
	const [allData, setAllData] = useState<DataEntry[]>([]); // The entire dataset
	const [selectedApp, setSelectedApp] = useState<string>("All");
	const [selectedPlatform, setSelectedPlatform] = useState<string>("All");
	const [selectedCountry, setSelectedCountry] = useState<string>("All");
	const [selectedAdNetwork, setSelectedAdNetwork] = useState<string>("All");

	const [selectedDates, setSelectedDates] = useState<Date[]>([
		new Date(),
		new Date(),
	]);

	const [targetValue, setTargetValue] = useState<number>(0);
	const [targetColor, setTargetColor] = useState<string>("#ff0000"); // Default red

	useEffect(() => {
		Papa.parse(CSV, {
			download: true,
			header: true,
			complete: result => {
				if (result.data) {
					setAllData(result.data as DataEntry[]);
				}
			},
		});
	}, []);

	const { uniqueApps, uniquePlatforms, uniqueCountries, uniqueAdNetworks } =
		useMemo(() => {
			const uniqueApps = Array.from(new Set(allData.map(entry => entry.App)));
			const uniquePlatforms = Array.from(
				new Set(allData.map(entry => entry.Platform))
			);
			const uniqueCountries = Array.from(
				new Set(allData.map(entry => entry.Country))
			);
			const uniqueAdNetworks = Array.from(
				new Set(allData.map(entry => entry["Ad Network"]))
			);

			return {
				uniqueApps,
				uniquePlatforms,
				uniqueCountries,
				uniqueAdNetworks,
			};
		}, [allData]);

	// More filters can be added here like country, platform, etc.
	const filteredData = useMemo(() => {
		const [startDate, endDate] = selectedDates;

		const filtered = allData.filter(entry => {
			const entryDate = convertToJSDate(entry.Date);
			const start = new Date(startDate);
			const end = new Date(endDate);

			return (
				entryDate >= start &&
				entryDate <= end &&
				(selectedApp === "All" || entry.App === selectedApp) &&
				(selectedPlatform === "All" || entry.Platform === selectedPlatform) &&
				(selectedCountry === "All" || entry.Country === selectedCountry) &&
				(selectedAdNetwork === "All" ||
					entry["Ad Network"] === selectedAdNetwork)
			);
		});
		return filtered;
	}, [
		allData,
		selectedAdNetwork,
		selectedApp,
		selectedCountry,
		selectedDates,
		selectedPlatform,
	]);

	if (allData.length === 0) {
		return (
			<Container
				maxW="container.sm"
				mx={"auto"}
				w="100vw"
				height={"100vh"}
				py={"20px"}
				display="flex"
				justifyContent="center"
				alignItems="center"
				flexDirection="column"
			>
				<Spinner
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="blue.500"
					size="xl"
				/>

				<Text fontSize="xl" as="b">
					Loading Data...
				</Text>
			</Container>
		);
	}

	return (
		<Container maxW="4xl" mx={"auto"} w="100vw" py={"20px"}>
			<Text fontSize="xl" as="b">
				Game Analytics Dashboard
			</Text>

			<div>
				<AppSelector
					value={selectedApp}
					onChange={setSelectedApp}
					options={uniqueApps}
					label="Game/App"
				/>
				<AppSelector
					value={selectedPlatform}
					onChange={setSelectedPlatform}
					options={uniquePlatforms}
					label=" Platform"
				/>
				<AppSelector
					value={selectedCountry}
					onChange={setSelectedCountry}
					options={uniqueCountries}
					label=" Country"
				/>
				<AppSelector
					value={selectedAdNetwork}
					onChange={setSelectedAdNetwork}
					options={uniqueAdNetworks}
					label=" Ad Network"
				/>

				<DateRangePicker
					selectedDates={selectedDates}
					onDateChange={setSelectedDates}
				/>
				<TargetLineInterface
					value={targetValue}
					color={targetColor}
					onValueChange={setTargetValue}
					onColorChange={setTargetColor}
				/>
			</div>

			<Tabs variant="enclosed">
				<TabList>
					<Tab>Chart</Tab>
					<Tab>Table</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						<ChartDisplay
							data={filteredData}
							targetValue={targetValue}
							targetColor={targetColor}
						/>
					</TabPanel>
					<TabPanel>
						<TableDisplay data={filteredData} />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Container>
	);
};

export default App;
