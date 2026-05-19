import { useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { useAppDispatch } from '@/store';
import { fetchCryptocurrencies } from '@/store/slices/cryptocurrencySlice';

const Layout = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchCryptocurrencies());
	}, [dispatch]);

	return (
		<div className="flex flex-col h-screen">
			<Header />
			<div className="flex flex-col sm:flex-row flex-1 min-h-0">
				<Sidebar />
				<div className="overflow-y-auto flex-1 bg-slate-200">
					<Outlet />
				</div>
			</div>
			<Toaster />
		</div>
	);
};

export default Layout;
