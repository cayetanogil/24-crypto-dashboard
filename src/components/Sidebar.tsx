import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import CryptocurrencyList from './CryptocurrencyList';
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
	const cryptocurrencies = useSelector(
		(state: RootState) => state.cryptocurrency.cryptocurrencies
	);
	const navigate = useNavigate();

	const handleCoinChange = (value: string) => {
		navigate(`/coins/${value}`);
	};

	return (
		<aside className="flex w-48 shrink-0 bg-slate-100 border-r overflow-y-auto">
			<nav className="p-4 w-full">
				<ul className="sm:pb-3 sm:border-b flex flex-row gap-2 sm:flex-col sm:justify-normal justify-around">
					<li className="uppercase tracking-wide text-xs text-slate-500 pt-0 ml-2 select-none hidden sm:block">
						Menu
					</li>
					<li>
						<NavLink
							className={({ isActive }) =>
								`rounded hover:bg-slate-200 transition-all flex flex-row items-center gap-2 text-slate-600 hover:text-slate-800 py-2 sm:py-1 px-2 text-sm border-b-2 sm:border-b-0 sm:border-l-2 ${isActive ? 'bg-slate-200 border-blue-500' : 'border-transparent'}`
							}
							to="/"
						>
							<Squares2X2Icon className="size-5" />
							Dashboard
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({ isActive }) =>
								`rounded hover:bg-slate-200 transition-all flex flex-row items-center gap-2 text-slate-600 hover:text-slate-800 py-2 sm:py-1 px-2 text-sm border-b-2 sm:border-b-0 sm:border-l-2 ${isActive ? 'bg-slate-200 border-blue-500' : 'border-transparent'}`
							}
							to="/collection"
						>
							<StarIcon className="size-5" />
							Collection
						</NavLink>
					</li>
					{cryptocurrencies && cryptocurrencies.length > 0 && (
						<li>
							<Drawer>
								<DrawerTrigger className="sm:hidden rounded hover:bg-slate-200 transition-all flex flex-row items-center gap-2 text-slate-600 hover:text-slate-800 py-2 px-2 text-sm border-b-2 border-transparent">
									<CircleStackIcon className="size-5" />
									Coins
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
						<li className="uppercase tracking-wide text-xs text-slate-500 pt-0 ml-2 pb-2 select-none">
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
