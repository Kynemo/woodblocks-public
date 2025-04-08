// place files you want to import through the `$lib` alias in this folder.

import type { Event } from "./types"
import {
	type CalendarDateTime,
	getLocalTimeZone,
	now,
	ZonedDateTime
} from '@internationalized/date';

export function createICSLink(events: Event[]) {
	let icsContent = [
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"PRODID:-//calendar_no_auth//EN",
		//"CALSCALE:GREGORIAN",
		//"METHOD:PUBLISH",
	]
	for (const event of events) {
		icsContent = icsContent.concat([
			"BEGIN:VEVENT",
			`UID:${formatDate(event.date)}-calendarVision.com`,
			`DTSTAMP${formatDate(now(getLocalTimeZone()))}`,
			`DTSTART${formatDate(event.date, true)}`,
			// Try omitting DEND for now
			`SUMMARY:${escapeICS(event.title)}`,
			`END:VEVENT`
		]);
	}
	icsContent = icsContent.concat([`END:VCALENDAR`]);

	return `data:text/calendar,${encodeURIComponent(icsContent.join("\n"))}`;
}

function formatDate(date: CalendarDateTime | ZonedDateTime, dateOnly: boolean = false): string {
	//const year = date.getUTCFullYear();
	const year = String(date.year).padStart(4, '0');
	const month = String(date.month).padStart(2, '0');
	const day = String(date.day).padStart(2, '0');
	const hour = String(date.hour).padStart(2, '0');
	const minute = String(date.minute).padStart(2, '0');
	const second = String(date.second).padStart(2, '0');

	return dateOnly ? `;VALUE=DATE:${year}${month}${day}` :
		`:${year}${month}${day}T${hour}${minute}${second}Z`
}
// Helper function to escape characters that are not allowed in ics
function escapeICS(str: string): string {
	return str.replace(/\\/g, '\\\\')
		.replace(/,/g, '\\,')
		.replace(/;/g, '\\;')
		.replace(/\n/g, '\\n')
		.replace(/\r/g, '\\r');
}

export function downloadICS(uri: string) {
	const a = document.createElement('a');
	a.style.display = 'none';
	a.href = uri;
	a.download = 'events_calendar.ics';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}
