import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Collection from './pages/Collection';
import CryptocurrencyDetail from './pages/CryptocurrencyDetail';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Dashboard />} />
					<Route path="collection" element={<Collection />} />
					<Route
						path="coins/:id"
						element={<CryptocurrencyDetail />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
