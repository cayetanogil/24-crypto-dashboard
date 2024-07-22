import { NavLink } from 'react-router-dom';
import CryptocurrencyList from './CryptocurrencyList';
import useCryptocurrencies from '../hooks/useCryptocurrencies';
import {
	CircleStackIcon,
	Squares2X2Icon,
	StarIcon,
} from '@heroicons/react/20/solid';

import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { Cryptocurrency } from '@/types';

const Sidebar = () => {
	const { cryptocurrencies } = useCryptocurrencies();

	const handleCoinChange = (value: string) => {
		window.location.href = `/coins/${value}`;
	};

	return (
		<aside className="flex sm:h-screen min-w-48 bg-slate-100 border-r">
			<nav className="p-4 w-full">
				<ul className="sm:pb-3 sm:border-b flex flex-row gap-2 sm:flex-col sm:justify-normal justify-around">
					<li className="uppercase text-xs text-slate-500 pt-0 ml-2 select-none hidden sm:block">
						Menu
					</li>
					<li className="rounded hover:bg-slate-200 transition-all flex flex-row items-center gap-2 group text-slate-600 bg-slate-200 sm:bg-transparent">
						<Squares2X2Icon className="size-5 ml-2 group-hover:text-slate-800" />
						<NavLink
							className="w-full py-2 sm:py-1 px-2 pl-0 text-sm block group-hover:text-slate-800"
							to="/"
						>
							Dashboard
						</NavLink>
					</li>
					<li className="rounded hover:bg-slate-200 transition-all flex flex-row items-center gap-2 group text-slate-600 bg-slate-200 sm:bg-transparent">
						<StarIcon className="size-5 ml-2 group-hover:text-slate-800" />
						<NavLink
							className="w-full py-2 sm:py-1 px-2 pl-0 text-sm block group-hover:text-slate-800"
							to="/collection"
						>
							Collection
						</NavLink>
					</li>
					{cryptocurrencies && cryptocurrencies.length > 0 && (
						<li className="rounded bg-slate-200 sm:bg-transparent">
							<Drawer>
								<DrawerTrigger className="sm:hidden rounded py-1 px-2 hover:bg-slate-200 transition-all flex flex-row items-center gap-2 group text-slate-600">
									<CircleStackIcon className="size-5 ml-2 group-hover:text-slate-800" />
									<p className="w-full py-2 sm:py-1 px-2 pl-0 text-sm block group-hover:text-slate-800">
										Coins
									</p>
								</DrawerTrigger>
								<DrawerContent className="bg-slate-100">
									<DrawerHeader>
										<DrawerTitle className="text-center text-slate-800">
											Select a coin...
										</DrawerTitle>
										<DrawerDescription></DrawerDescription>
									</DrawerHeader>
									<div className="flex flex-row justify-evenly">
										<Select
											onValueChange={(value) =>
												handleCoinChange(value)
											}
										>
											<SelectTrigger className="w-[180px]">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{cryptocurrencies.map(
													(crypto: Cryptocurrency) => (
														<SelectItem
															key={crypto.id}
															value={crypto.id}
														>
															{crypto.name}
														</SelectItem>
													)
												)}
											</SelectContent>
										</Select>
									</div>
									<DrawerFooter></DrawerFooter>
								</DrawerContent>
							</Drawer>
						</li>
					)}
				</ul>
				{cryptocurrencies && cryptocurrencies.length > 0 && (
					<ul className="py-3 hidden sm:block">
						<li className="uppercase text-xs text-slate-500 pt-0 ml-2 pb-2 select-none">
							Coins
						</li>
						<CryptocurrencyList
							cryptocurrencies={cryptocurrencies}
							isGrid={false}
							limit={15}
						/>
						<Drawer>
							<DrawerTrigger className="text-sm mb-2 rounded py-1 px-2 text-slate-600 hover:text-slate-800 bg-slate-200 hover:bg-slate-300 transition-all">
								More ...
							</DrawerTrigger>
							<DrawerContent className="bg-slate-100">
								<DrawerHeader>
									<DrawerTitle className="text-center text-slate-800">
										Select a coin...
									</DrawerTitle>
									<DrawerDescription></DrawerDescription>
								</DrawerHeader>
								<div className="flex flex-row justify-around">
									<Select
										onValueChange={(value) => handleCoinChange(value)}
									>
										<SelectTrigger className="w-[180px]">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{cryptocurrencies.map(
												(crypto: Cryptocurrency) => (
													<SelectItem
														key={crypto.id}
														value={crypto.id}
													>
														{crypto.name}
													</SelectItem>
												)
											)}
										</SelectContent>
									</Select>
								</div>
								<DrawerFooter></DrawerFooter>
							</DrawerContent>
						</Drawer>
					</ul>
				)}
			</nav>
		</aside>
	);
};

export default Sidebar;
