import { ReactNode } from 'react';

interface EmptyStateProps {
	icon: ReactNode;
	title: string;
	description?: string;
	action?: ReactNode;
}

function EmptyState({ icon, title, description, action }: EmptyStateProps) {
	return (
		<div className="flex flex-col items-center gap-3 pt-16 text-slate-500">
			{icon}
			<p className="font-medium text-slate-700">{title}</p>
			{description && <p className="text-sm">{description}</p>}
			{action}
		</div>
	);
}

export default EmptyState;
