import numeral from 'numeral';
import { format } from 'date-fns';

type PayloadType = {
	date: string;
	value: number;
	dataKey: string;
};

type tooltipProps = {
	active?: boolean;
	payload?: PayloadType[];
};

const CustomTooltip = ({ active, payload }: tooltipProps) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-white rounded p-3 shadow border">
				<div className="label">
					<p className="text-xs text-slate-500 mb-2">
						{format(
							new Date(payload[0].payload.date),
							'yyyy-MM-dd HH:mm:ss'
						)}
					</p>
					{(payload[0].dataKey == 'price' ||
						payload[0].dataKey == 'marketCap') && (
						<p className="text-md">
							${numeral(payload[0].value).format('0,0.00')}
						</p>
					)}
					{payload[0].dataKey == 'volume' && (
						<p className="text-md">
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
