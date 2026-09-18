import { useSelector } from 'react-redux';
import { CircleStackIcon } from '@heroicons/react/24/solid';
import { RootState } from '@/store';
import { formatDateTime } from '@/lib/formatDate';

const Header = () => {
	const lastUpdated = useSelector(
		(state: RootState) =>
			state.cryptocurrency.cryptocurrencies[0]?.last_updated
	);

	return (
		<header className="bg-white border-b py-2 px-4">
			<div className="flex flex-row items-center justify-between gap-2">
				<div className="flex flex-row gap-1 items-center">
					<CircleStackIcon className="size-5 text-slate-400" />
					<h1 className="text-base sm:text-lg text-slate-800 font-semibold">
						Crypto Dashboard
					</h1>
				</div>
				{lastUpdated && (
					<p className="text-xs sm:text-sm text-slate-500 whitespace-nowrap">
						<span className="hidden sm:inline">Last Updated: </span>
						{formatDateTime(lastUpdated)}
					</p>
				)}
			</div>
		</header>
	);
};

export default Header;
