<script lang="ts" generics="TData, TValue">
	import {
		createSvelteTable,
		FlexRender
	} from '$lib/components/ui/data-table/index.js';
	import * as Table from "$lib/components/ui/table/index.js";
	import {
		type ColumnDef,
		type SortingState,
		type RowSelectionState,
		getCoreRowModel,
		getSortedRowModel,
	} from "@tanstack/table-core";
	import { CalendarDateTime } from '@internationalized/date';
	import type { Event, JSONEvent} from '$lib/types';

	type DataTableProps = {
		columns: ColumnDef<Event>[];
		tableData: string;
		selectedRows: Event[];
	};

	let { columns, tableData, selectedRows = $bindable([]) }: DataTableProps = $props();
	console.log(tableData)

	let formattedTableData = $state<Event[]>([]);
	formattedTableData = JSON.parse(tableData).map((event: JSONEvent) => (
		{
			id: event.id,
			title: event.title,
			date: new CalendarDateTime(event.date[0], event.date[1], event.date[2])
		})
	)


	let rowSelection = $state<RowSelectionState>({});
	let sorting = $state<SortingState>([]);

	const table = createSvelteTable({
		get data() {
			return formattedTableData;
		},
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: (updater) => {
			if (typeof updater === "function") {
				sorting = updater(sorting);
			} else {
				sorting = updater;
			}
		},
		onRowSelectionChange: (updater) => {
			if (typeof updater === "function") {
				rowSelection = updater(rowSelection);
				selectedRows = table.getFilteredSelectedRowModel().rows.map((row) => row.original);
			} else {
				rowSelection = updater;
			}
		},
		state: {
			get rowSelection() {
				return rowSelection;
			},
			get sorting() {
				return sorting;
			},
		},
		meta: {
			updateDate: (id: string, newDate: CalendarDateTime) => {
				const event = formattedTableData.find((event) => event.id === id);
				if (event) {
					event.date = newDate;
				}
				console.log(event);
				console.log(id);
			}
		}
	});
	table.toggleAllRowsSelected(true);
</script>

<div class="rounded-md border">
	<Table.Root>
		<Table.Header>
			{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
				<Table.Row>
					{#each headerGroup.headers as header (header.id)}
						<Table.Head>
							{#if !header.isPlaceholder}
								<FlexRender
									content={header.column.columnDef.header}
									context={header.getContext()}
								/>
							{/if}
						</Table.Head>
					{/each}
				</Table.Row>
			{/each}
		</Table.Header>
		<Table.Body>
			{#each table.getRowModel().rows as row (row.id)}
				<Table.Row data-state={row.getIsSelected() && "selected"}>
					{#each row.getVisibleCells() as cell (cell.id)}
						<Table.Cell>
							<FlexRender
								content={cell.column.columnDef.cell}
								context={cell.getContext()}
							/>
						</Table.Cell>
					{/each}
				</Table.Row>
			{:else}
				<Table.Row>
					<Table.Cell colspan={columns.length} class="h-24 text-center">
						No types.
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>

	<div class="text-muted-foreground flex-1 text-sm">
		{table.getFilteredSelectedRowModel().rows.length} of{" "}
		{table.getFilteredRowModel().rows.length} event(s) selected.
	</div>
</div>