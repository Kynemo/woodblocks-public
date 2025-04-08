import { CalendarDateTime } from '@internationalized/date';

export type Event = {
	id: string;
	title: string;
	date: CalendarDateTime;
}

export type JSONEvent = {
	id: string;
	title: string;
	date: number[]
}