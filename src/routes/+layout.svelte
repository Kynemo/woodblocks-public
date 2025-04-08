<script lang="ts">
	import '../app.css';
	import CalendarSync from "lucide-svelte/icons/calendar-sync";
	import { fade } from 'svelte/transition';
	let { children } = $props();
</script>
<header class="bg-white sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6">
	<nav
		class="font-medium flex flex-row items-center gap-5 text-sm"
	>
		<a href="/" class="flex items-center gap-2 text-lg font-semibold md:text-base">
			<CalendarSync size={28} />
			<span class="sr-only">woodblocks</span>
		</a>
		<a href="/" class="text-foreground text-lg hover:text-foreground transition-colors">
			woodblocks
		</a>
	</nav>
</header>
<div transition:fade>
	{@render children()}
</div>