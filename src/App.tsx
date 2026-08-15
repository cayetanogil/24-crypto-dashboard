import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';

const Collection = lazy(() => import('./pages/Collection'));
const CryptocurrencyDetail = lazy(
	() => import('./pages/CryptocurrencyDetail')
);

const routeFallback = <p className="text-center text-slate-500 p-4">Loading...</p>;

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Dashboard />} />
					<Route
						path="collection"
						element={
							<Suspense fallback={routeFallback}>
								<Collection />
							</Suspense>
						}
					/>
					<Route
						path="coins/:id"
						element={
							<Suspense fallback={routeFallback}>
								<CryptocurrencyDetail />
							</Suspense>
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
