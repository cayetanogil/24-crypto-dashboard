import CryptocurrencyList from '../components/CryptocurrencyList';
import useCryptocurrencies from '../hooks/useCryptocurrencies';
import { format } from 'date-fns';

const Dashboard = () => {
	const { cryptocurrencies, status, error } = useCryptocurrencies();

	if (status === 'loading') {
		return <p className="text-center text-slate-500">Loading...</p>;
	}

	if (status === 'failed') {
		return (
			<p className="text-center text-slate-500">Error: {error}</p>
		);
	}

	return (
		<div className="p-4 flex-grow">
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
				<p className="text-center text-slate-500">No data found.</p>
			)}
		</div>
	);
};

export default Dashboard;
