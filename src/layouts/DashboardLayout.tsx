import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

const Layout = () => {
	return (
		<div className="flex flex-col max-h-screen">
			<Header />
			<div className="flex flex-col overflow-hidden sm:flex-row">
				<Sidebar />
				<div className="overflow-y-auto flex-grow bg-slate-200 h-screen">
					<Outlet />
				</div>
			</div>
			<Toaster />
		</div>
	);
};

export default Layout;
