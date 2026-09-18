import numeral from 'numeral';
import { formatDateTime } from '@/lib/formatDate';
import { SanitizedCryptocurrencyHistory } from '@/types';

type PayloadType = {
	value: number;
	dataKey: string;
	payload: SanitizedCryptocurrencyHistory;
};

type tooltipProps = {
	active?: boolean;
	payload?: PayloadType[];
};

const CustomTooltip = ({ active, payload }: tooltipProps) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-white rounded p-3 shadow">
				<div className="label">
					<p className="text-xs text-slate-500 mb-2">
						{formatDateTime(payload[0].payload.date)}
					</p>
					{(payload[0].dataKey == 'price' ||
						payload[0].dataKey == 'marketCap') && (
						<p className="text-base">
							${numeral(payload[0].value).format('0,0.00')}
						</p>
					)}
					{payload[0].dataKey == 'volume' && (
						<p className="text-base">
							{numeral(payload[0].value).format('0,0.00')}
						</p>
					)}
				</div>
			</div>
		);
	}

	return null;
};

export default CustomTooltip;
