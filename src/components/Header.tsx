import { CircleStackIcon } from '@heroicons/react/24/solid';

const Header = () => {
	return (
		<header className="bg-white border-b py-2 px-4">
			<div className="flex flex-row gap-1 items-center">
				<CircleStackIcon className="size-5 text-slate-400" />
				<h1 className="text-lg text-slate-800 font-semibold">
					Crypto Dashboard
				</h1>
			</div>
		</header>
	);
};

export default Header;
