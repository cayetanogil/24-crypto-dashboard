import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/index';
import { TimeRange } from '../types';
import {
	addFavorite,
	removeFavorite,
	fetchCryptocurrencyDetail,
	fetchCryptocurrencyHistory,
	setTimeRange,
} from '../store/slices/cryptocurrencySlice';

import {
	CircleStackIcon,
	ExclamationTriangleIcon,
	StarIcon,
} from '@heroicons/react/24/solid';

import parse from 'html-react-parser';
import numeral from 'numeral';
import { format } from 'date-fns';

import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from '@/components/ui/card';

import CryptocurrencyDetailChart from '../components/CryptocurrencyDetailChart';
import EmptyState from '../components/EmptyState';


function CryptocurrencyDetail() {
	const { id } = useParams<{ id: string }>();

	const dispatch = useAppDispatch();
	const { toast } = useToast();

	const isFavorite = useSelector((state: RootState) =>
		state.cryptocurrency.favorites.includes(id ?? '')
	);

	const cryptocurrencyDetail = useSelector(
		(state: RootState) => state.cryptocurrency.cryptocurrencyDetail
	);
	const cryptocurrencyHistory = useSelector(
		(state: RootState) => state.cryptocurrency.cryptocurrencyHistory
	);
	const timeRange = useSelector(
		(state: RootState) => state.cryptocurrency.timeRange
	);
	const detailStatus = useSelector(
		(state: RootState) => state.cryptocurrency.detailStatus
	);
	const detailError = useSelector(
		(state: RootState) => state.cryptocurrency.detailError
	);
	const historyStatus = useSelector(
		(state: RootState) => state.cryptocurrency.historyStatus
	);
	const historyError = useSelector(
		(state: RootState) => state.cryptocurrency.historyError
	);

	const updateTimeRange = (newTimeRange: TimeRange) => {
		dispatch(setTimeRange(newTimeRange));
	};

	const handleFavoriteClick = () => {
		if (!id || !cryptocurrencyDetail) return;
		if (isFavorite) {
			toast({ description: cryptocurrencyDetail.name + ' removed from collection.' });
			dispatch(removeFavorite(id));
		} else {
			toast({ description: cryptocurrencyDetail.name + ' added to collection' });
			dispatch(addFavorite(id));
		}
	};

	useEffect(() => {
		if (!id) return;
		const promise = dispatch(fetchCryptocurrencyDetail(id));
		return () => {
			promise.abort();
		};
	}, [dispatch, id]);

	useEffect(() => {
		if (!id) return;
		const promise = dispatch(fetchCryptocurrencyHistory({ id, timeRange }));
		return () => {
			promise.abort();
		};
	}, [dispatch, id, timeRange]);

	if (detailStatus === 'idle' || detailStatus === 'loading') {
		return <p className="text-center text-slate-500">Loading...</p>;
	}

	if (detailStatus === 'failed') {
		return (
			<EmptyState
				icon={<ExclamationTriangleIcon className="size-12 text-slate-300" />}
				title="Couldn't load this coin"
				description={detailError ?? undefined}
				action={
					<button
						onClick={() => id && dispatch(fetchCryptocurrencyDetail(id))}
						className="text-sm text-blue-500 hover:underline"
					>
						Try again
					</button>
				}
			/>
		);
	}

	return (
		<div className="p-4 max-w-5xl mx-auto">
			{cryptocurrencyDetail?.market_data ? (
				<>
					<Card>
						<CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
							<div className="flex flex-1 flex-col justify-center p-4 min-w-0">
								<CardTitle className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-4">
									<div className="flex flex-row items-center gap-3">
										<img
											className="w-10 h-10"
											src={cryptocurrencyDetail.image.small || ''}
											alt={cryptocurrencyDetail.name || ''}
										/>
										<div className="flex flex-col">
											<div className="flex flex-row items-baseline gap-2">
												<h1 className="text-3xl font-bold text-slate-800">
													{cryptocurrencyDetail.name}
												</h1>
												<p className="uppercase tracking-wide text-sm font-medium text-slate-700">
													{cryptocurrencyDetail.symbol}
												</p>
											</div>
											<div className="flex flex-row gap-1">
												<Badge
													className={`text-xs font-semibold right select-none ${
														cryptocurrencyDetail.market_data.price_change_percentage_24h == null
															? 'bg-slate-200 text-slate-600 hover:bg-slate-300'
															: cryptocurrencyDetail.market_data.price_change_percentage_24h >= 0
																? 'bg-green-200 text-green-800 hover:bg-green-300'
																: 'bg-red-200 text-red-800 hover:bg-red-300'
													}`}
												>
													{cryptocurrencyDetail.market_data.price_change_percentage_24h != null
														? `${cryptocurrencyDetail.market_data.price_change_percentage_24h >= 0 ? '▲' : '▼'} ${Math.abs(cryptocurrencyDetail.market_data.price_change_percentage_24h).toFixed(2)}%`
														: 'N/A'}
												</Badge>
												<p>
													<button onClick={handleFavoriteClick}>
														<StarIcon
															className={`size-5 ${
																isFavorite
																	? 'text-slate-800'
																	: 'text-slate-300'
															}`}
														/>
													</button>
												</p>
											</div>
										</div>
									</div>
									<ul className="flex flex-row w-full lg:w-auto border-t mt-2 pt-3 lg:border-t-0 lg:mt-0 lg:pt-0">
										<li className="border-r flex-1 lg:flex-none pr-4 lg:px-4 text-center lg:text-left">
											<div className="uppercase tracking-wide text-xs font-normal text-slate-500 block">
												Current Price
											</div>
											<div className="font-bold text-2xl">
												$
												{numeral(
													cryptocurrencyDetail.market_data
														.current_price.usd
												).format('0,0.00')}
											</div>
										</li>
										<li className="border-r flex-1 lg:flex-none px-4 text-center lg:text-left">
											<div className="uppercase tracking-wide text-xs font-normal text-slate-500 block">
												Volume
											</div>
											<div className="font-bold text-2xl uppercase">
												{numeral(
													cryptocurrencyDetail.market_data
														.total_volume.usd
												).format('0.00a')}
											</div>
										</li>
										<li className="flex-1 lg:flex-none pl-4 text-center lg:text-left">
											<div className="uppercase tracking-wide text-xs font-normal text-slate-500 block">
												Market Cap
											</div>
											<div className="font-bold text-2xl uppercase">
												$
												{numeral(
													cryptocurrencyDetail.market_data.market_cap
														.usd
												).format('0.00a')}
											</div>
										</li>
									</ul>
								</CardTitle>
								<CardDescription>
									{cryptocurrencyDetail.description.en !== '' && (
										<p className="pt-4 max-w-prose text-pretty line-clamp-3 leading-relaxed border-t">
											{parse(cryptocurrencyDetail.description.en)}
										</p>
									)}
								</CardDescription>
							</div>
						</CardHeader>
						<CardContent className="p-4 border-b">
							{(cryptocurrencyHistory || historyStatus === 'failed') && (
								<CryptocurrencyDetailChart
									timeRange={timeRange}
									setTimeRange={updateTimeRange}
									data={cryptocurrencyHistory}
									historyStatus={historyStatus}
									historyError={historyError}
								/>
							)}
							<ul className="border-t pt-4 flex flex-row justify-evenly sm:justify-end">
								<li className="border-r px-4">
									<div className="text-xs text-slate-500">
										Circulating
									</div>
									<div className="text-base font-semibold my-2">
										{numeral(
											cryptocurrencyDetail.market_data
												.circulating_supply
										).format('0,0')}
									</div>
								</li>
								<li className="border-r px-4">
									<div className="text-xs text-slate-500">
										Total
									</div>
									<div className="text-base font-semibold my-2">
										{cryptocurrencyDetail.market_data.total_supply != null
											? numeral(
													cryptocurrencyDetail.market_data.total_supply
												).format('0,0')
											: '—'}
									</div>
								</li>
								{cryptocurrencyDetail.market_data.max_supply && (
									<li className="px-4">
										<div className="text-xs text-slate-500">
											Max Supply
										</div>
										<div className="text-base font-semibold my-2">
											{numeral(
												cryptocurrencyDetail.market_data.max_supply
											).format('0,0')}
										</div>
									</li>
								)}
							</ul>
						</CardContent>
						<CardFooter className="p-4 flex flex-col sm:flex-row sm:justify-between ">
							<ul className="*:inline *:mr-2 text-sm">
								{cryptocurrencyDetail.links.homepage[0] && (
									<li>
										<a
											className="text-blue-500"
											target="_blank" rel="noopener noreferrer"
											href={cryptocurrencyDetail.links.homepage[0]}
										>
											Homepage
										</a>
									</li>
								)}
								{cryptocurrencyDetail.links.repos_url.github[0] && (
									<li>
										<a
											className="text-blue-500"
											target="_blank" rel="noopener noreferrer"
											href={
												cryptocurrencyDetail.links.repos_url.github[0]
											}
										>
											Github
										</a>
									</li>
								)}
								{cryptocurrencyDetail.links.subreddit_url && (
									<li>
										<a
											className="text-blue-500"
											target="_blank" rel="noopener noreferrer"
											href={cryptocurrencyDetail.links.subreddit_url}
										>
											Reddit
										</a>
									</li>
								)}
								{cryptocurrencyDetail.links.whitepaper && (
									<li>
										<a
											className="text-blue-500"
											target="_blank" rel="noopener noreferrer"
											href={cryptocurrencyDetail.links.whitepaper}
										>
											Whitepaper
										</a>
									</li>
								)}
							</ul>

							<p className="text-sm text-slate-500 font-semibold pt-4 sm:pt-0">
								Last Updated:{' '}
								{format(
									new Date(
										cryptocurrencyDetail.market_data.last_updated
									),
									'yyyy-MM-dd HH:mm:ss'
								)}
							</p>
						</CardFooter>
					</Card>
				</>
			) : (
				<EmptyState
					icon={<CircleStackIcon className="size-12 text-slate-300" />}
					title="No data found"
					action={
						<Link to="/" className="text-sm text-blue-500 hover:underline">
							Back to dashboard →
						</Link>
					}
				/>
			)}
		</div>
	);
}

export default CryptocurrencyDetail;
