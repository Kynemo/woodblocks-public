<script>
	import { fade } from 'svelte/transition';
</script>

<section class="bg-white dark:bg-gray-900">
	<div
		transition:fade
		class="hero min-h-screen bg-cover bg-black/30 bg-blend-overlay"
		style="background-image: url(https://images.unsplash.com/photo-1715711201365-eecc5c7f8310?q=80&w=2586&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);">
		<div class="col-start-1 row-start-1 bg-gray-800 bg-opacity-70 w-full h-full"></div>
		<div class="py-8 px-4 m-auto max-w-screen-xl items-center text-center lg:py-16 lg:px-12">
			<h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl dark:text-white">Changing calendars, forever</h1>
			<p class="mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-200">Your paper calendar doesn't have to stay at home anymore</p>
			<div class="flex mb-8 lg:mb-16 flex-row justify-center space-y-0 space-x-4">
				<a href="/upload" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border bg-white border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
					Get started
				</a>
			</div>
		</div>
	</div>
</section>

