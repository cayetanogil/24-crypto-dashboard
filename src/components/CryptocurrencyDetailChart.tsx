import { useMemo, useState } from 'react';
import numeral from 'numeral';
import { format } from 'date-fns';

import {
	ResponsiveContainer,
	AreaChart,
	Area,
	XAxis,
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

import { CryptocurrencyHistory, TimeRange } from '../types';
import { transformChartData } from '../lib/transformChartData';
import CustomTooltip from './ui/customTooltip';

const UP_COLOR = '#16a34a';
const DOWN_COLOR = '#dc2626';
const X_AXIS_TICK_COUNT = 6;

interface CryptocurrencyProps {
	timeRange: TimeRange;
	setTimeRange: (timeRange: TimeRange) => void;
	data: CryptocurrencyHistory | null;
	historyStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
	historyError: string | null;
}
function CryptocurrencyDetailChart({
	timeRange,
	setTimeRange,
	data,
	historyStatus,
	historyError,
}: CryptocurrencyProps) {
	const chartData = useMemo(
		() => (data ? transformChartData(data) : []),
		[data]
	);

	const [metric, setMetric] = useState<
		'price' | 'volume' | 'marketCap'
	>('price');

	const xAxisTicks = useMemo(() => {
		if (chartData.length === 0) return [];
		const step = Math.max(
			1,
			Math.floor(chartData.length / (X_AXIS_TICK_COUNT - 1))
		);
		const ticks: string[] = [];
		for (let i = 0; i < chartData.length; i += step) {
			ticks.push(chartData[i].date);
		}
		const lastDate = chartData[chartData.length - 1].date;
		if (ticks[ticks.length - 1] !== lastDate) {
			ticks.push(lastDate);
		}
		return ticks;
	}, [chartData]);

	const xAxisTickFormatter = (dateString: string) =>
		format(new Date(dateString), timeRange === '365' ? 'MMM yyyy' : 'MMM d');

	// Color the line by whether the metric rose or fell over the visible range.
	const trendColor = useMemo(() => {
		if (chartData.length < 2) return UP_COLOR;
		const first = chartData[0][metric];
		const last = chartData[chartData.length - 1][metric];
		return last >= first ? UP_COLOR : DOWN_COLOR;
	}, [chartData, metric]);

	const isRefreshing = historyStatus === 'loading';

	return (
		<div className="pb-4">
			<div className="flex gap-4 justify-end mb-2">
				<div className="w-36">
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
				<div className="w-36">
					<Select
						onValueChange={(value) => setTimeRange(value as TimeRange)}
						value={timeRange}
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

			{historyStatus === 'failed' ? (
				<p className="text-center text-slate-500 py-8">
					Error loading price history: {historyError}
				</p>
			) : (
				<div
					className={`transition-opacity duration-200 ${
						isRefreshing ? 'opacity-40' : 'opacity-100'
					}`}
				>
					<ResponsiveContainer width="100%" height={300}>
						<AreaChart
							data={chartData}
							margin={{ top: 20, right: 0, bottom: 10, left: 20 }}
						>
							<defs>
								<linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
									<stop
										offset="5%"
										stopColor={trendColor}
										stopOpacity={0.8}
									/>
									<stop
										offset="95%"
										stopColor={trendColor}
										stopOpacity={0}
									/>
								</linearGradient>
							</defs>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis
								dataKey="date"
								ticks={xAxisTicks}
								tickFormatter={xAxisTickFormatter}
								tickMargin={10}
								tickLine={false}
								axisLine={false}
							/>
							<YAxis
								padding={{ top: 20, bottom: 20 }}
								type="number"
								domain={['dataMin', 'dataMax']}
								tickCount={10}
								tickMargin={10}
								tickFormatter={(dataPoint: string) =>
									numeral(dataPoint).format('0.00a')
								}
							/>
							<Tooltip content={<CustomTooltip timeRange={timeRange} />} />

							<Area
								type="monotone"
								dataKey={metric}
								stroke={trendColor}
								fillOpacity={1}
								fill="url(#color)"
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>
			)}
		</div>
	);
}

export default CryptocurrencyDetailChart;
