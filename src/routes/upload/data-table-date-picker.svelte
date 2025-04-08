<script lang="ts">
	import CalendarIcon from "lucide-svelte/icons/calendar";
	import {
		DateFormatter,
		type DateValue,
		getLocalTimeZone
	} from '@internationalized/date';
	import { cn } from "$lib/utils.js";
	import { buttonVariants } from "$lib/components/ui/button/index.js";
	import { Calendar } from "$lib/components/ui/calendar/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";

	const df = new DateFormatter("en-US", {
		dateStyle: "long"
	});

	let value = $state<DateValue | undefined>();
	let { currentDate, onOpenChange } = $props();
	value = currentDate;
	let contentRef = $state<HTMLElement | null>(null);
	let isOpen = $state(false);
	let valueChanged = false;
</script>

<Popover.Root bind:open={isOpen} onOpenChange={(o) => {
	onOpenChange(value, o, valueChanged);
	valueChanged = false;
}}>
	<Popover.Trigger
		class={cn(
   buttonVariants({
    variant: "outline",
    class: "w-[200px] justify-start text-left font-normal"
   }),
   !value && "text-muted-foreground"
  )}
	>
		<CalendarIcon />
		{value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date"}
	</Popover.Trigger>
	<Popover.Content bind:ref={contentRef} class="w-auto p-0">
		<Calendar type="single" bind:value onValueChange={() => valueChanged=true} />
	</Popover.Content>
</Popover.Root>