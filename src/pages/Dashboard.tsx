import {
	CircleStackIcon,
	ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';
import CryptocurrencyList from '../components/CryptocurrencyList';
import EmptyState from '../components/EmptyState';
import useCryptocurrencies from '../hooks/useCryptocurrencies';
import { useAppDispatch } from '../store';
import { fetchCryptocurrencies } from '../store/slices/cryptocurrencySlice';
import { format } from 'date-fns';

const Dashboard = () => {
	const dispatch = useAppDispatch();
	const { cryptocurrencies, status, error } = useCryptocurrencies();

	if (status === 'idle' || status === 'loading') {
		return <p className="text-center text-slate-500">Loading...</p>;
	}

	if (status === 'failed') {
		return (
			<EmptyState
				icon={<ExclamationTriangleIcon className="size-12 text-slate-300" />}
				title="Something went wrong"
				description={error ?? undefined}
				action={
					<button
						onClick={() => dispatch(fetchCryptocurrencies())}
						className="text-sm text-blue-500 hover:underline"
					>
						Try again
					</button>
				}
			/>
		);
	}

	return (
		<div className="p-4 grow max-w-400 mx-auto">
			{cryptocurrencies && cryptocurrencies.length > 0 && (
				<>
					<CryptocurrencyList
						cryptocurrencies={cryptocurrencies}
						isGrid={true}
						limit={15}
					/>
					<p className="text-sm text-slate-500 text-right py-4">
						Last Updated:{' '}
						{format(
							new Date(cryptocurrencies[0].last_updated),
							'yyyy-MM-dd HH:mm:ss'
						)}
					</p>
				</>
			)}
			{cryptocurrencies.length == 0 && (
				<EmptyState
					icon={<CircleStackIcon className="size-12 text-slate-300" />}
					title="No cryptocurrencies found"
				/>
			)}
		</div>
	);
};

export default Dashboard;
