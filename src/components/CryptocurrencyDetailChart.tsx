import { useState } from 'react';
import numeral from 'numeral';

import {
	ResponsiveContainer,
	AreaChart,
	Area,
	YAxis,
	Tooltip,
	CartesianGrid,
} from 'recharts';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { CryptocurrencyHistory } from '../types';
import { transformChartData } from '../lib/transformChartData';
import CustomTooltip from './ui/customTooltip';

interface CryptocurrencyProps {
	timeRange: '7' | '30' | '365';
	setTimeRange: (timeRange: '7' | '30' | '365') => void;
	data: CryptocurrencyHistory;
}
function CryptocurrencyDetailChart({
	timeRange,
	setTimeRange,
	data,
}: CryptocurrencyProps) {
	const chartData = transformChartData(data);

	const [metric, setMetric] = useState<
		'price' | 'volume' | 'marketCap'
	>('price');

	const handleTimeChange = (value: string) => {
		const newTimeRange = value as '7' | '30' | '365';
		setTimeRange(newTimeRange);
	};

	return (
		<div className="pb-4">
			<div className="flex gap-4 justify-end mb-2">
				<div className="w-1/4">
					<Select
						onValueChange={(value) =>
							setMetric(value as 'price' | 'volume' | 'marketCap')
						}
						defaultValue="price"
					>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="price">Price</SelectItem>
							<SelectItem value="volume">Volume</SelectItem>
							<SelectItem value="marketCap">Market Cap</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="w-1/4">
					<Select
						onValueChange={(value) => handleTimeChange(value)}
						defaultValue={timeRange}
					>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="7">Week</SelectItem>
							<SelectItem value="30">Month</SelectItem>
							<SelectItem value="365">Year</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<ResponsiveContainer width="100%" height={300}>
				<AreaChart
					data={chartData}
					margin={{ top: 20, right: 0, bottom: 20, left: 20 }}
				>
					<defs>
						<linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
							<stop
								offset="5%"
								stopColor="#51A62C"
								stopOpacity={0.8}
							/>
							<stop
								offset="95%"
								stopColor="#51A62C"
								stopOpacity={0}
							/>
						</linearGradient>
					</defs>
					<CartesianGrid strokeDasharray="3 3" />
					<YAxis
						padding={{ top: 20, bottom: 20 }}
						type="number"
						domain={['dataMin', 'dataMax']}
						tickCount={10}
						tickMargin={10}
						tickFormatter={(dataPoint: string) =>
							numeral(dataPoint).format('0.0a')
						}
					/>
					<Tooltip content={<CustomTooltip />} />

					<Area
						type="monotone"
						dataKey={metric}
						stroke="#31651B"
						fillOpacity={1}
						fill="url(#color)"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}

export default CryptocurrencyDetailChart;
