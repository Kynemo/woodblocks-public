import type { ColumnDef } from "@tanstack/table-core";
import {
	renderComponent,
} from "$lib/components/ui/data-table/index.js";
import Checkbox from "./data-table-checkbox.svelte";
import DatePicker from "./data-table-date-picker.svelte";
import type { CalendarDateTime } from '@internationalized/date';
import type { Event } from "$lib/types"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

interface TableMeta {
	updateDate: (id: string, newDate: CalendarDateTime) => void;
}

export const columns: ColumnDef<Event>[] = [
	{
		id: "select",
		header: ({ table }) =>
			renderComponent(Checkbox, {
				checked: table.getIsAllPageRowsSelected(),
				indeterminate:
					table.getIsSomePageRowsSelected() &&
					!table.getIsAllPageRowsSelected(),
				onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
				controlledChecked: true,
				"aria-label": "Select all",
			}),
		cell: ({ row }) =>
			renderComponent(Checkbox, {
				checked: row.getIsSelected(),
				onCheckedChange: (value) => row.toggleSelected(!!value),
				controlledChecked: true,
				"aria-label": "Select row",
			}),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "title",
		header: "Title",
	},
	{
		accessorKey: "date",
		header: "Date",
		cell: ({ row, column, table }) =>
			renderComponent(DatePicker, {
				currentDate: row.getValue("date"),
				onOpenChange: (value: CalendarDateTime, isOpen: boolean, valueChanged: boolean) => {
					if (!isOpen) {
						if (valueChanged) {
							const meta = table.options.meta as TableMeta
							meta.updateDate(row.original.id, value);
							column.toggleSorting(false);
						}
					}
				}
			}),
		sortingFn: (rowA, rowB) => {
			return rowA.original.date.compare(rowB.original.date)
		},
	}
];
