import numeral from 'numeral';
import { format } from 'date-fns';
import { SanitizedCryptocurrencyHistory, TimeRange } from '@/types';

type PayloadType = {
	value: number;
	dataKey: string;
	payload: SanitizedCryptocurrencyHistory;
};

type tooltipProps = {
	active?: boolean;
	payload?: PayloadType[];
	timeRange?: TimeRange;
};

const CustomTooltip = ({ active, payload, timeRange }: tooltipProps) => {
	if (active && payload && payload.length) {
		const date = new Date(payload[0].payload.date);
		// Year view is daily granularity; time-of-day isn't meaningful there.
		const dateLabel =
			timeRange === '365'
				? format(date, 'MMM d, yyyy')
				: format(date, 'MMM d, HH:mm');

		return (
			<div className="bg-white rounded p-3 shadow">
				<div className="label">
					<p className="text-xs text-slate-500 mb-2">{dateLabel}</p>
					{payload[0].dataKey == 'price' && (
						<p className="text-base">
							${numeral(payload[0].value).format('0,0.00')}
						</p>
					)}
					{(payload[0].dataKey == 'volume' ||
						payload[0].dataKey == 'marketCap') && (
						<p className="text-base uppercase">
							${numeral(payload[0].value).format('0.00a')}
						</p>
					)}
				</div>
			</div>
		);
	}

	return null;
};

export default CustomTooltip;
