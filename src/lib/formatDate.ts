import { format } from 'date-fns';

function getTimeZoneAbbreviation(date: Date): string {
	return (
		new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
			.formatToParts(date)
			.find((part) => part.type === 'timeZoneName')?.value ?? ''
	);
}

export function formatDateTime(date: Date | string | number): string {
	const parsedDate = date instanceof Date ? date : new Date(date);
	return `${format(parsedDate, 'yyyy/MM/dd HH:mm:ss')} ${getTimeZoneAbbreviation(parsedDate)}`;
}
