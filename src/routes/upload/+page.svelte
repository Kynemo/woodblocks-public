<script lang="ts">
	import { FileInput } from "$lib/components/ui/fileinput/index.js";
	import * as Form from "$lib/components/ui/form/index.js";
	import { superForm, fileProxy } from 'sveltekit-superforms'
	import { zodClient } from 'sveltekit-superforms/adapters'
	import { imageSchema } from './schema.js';

	import DataTable from "./data-table.svelte";
	import {columns} from './columns';
	import { createICSLink, downloadICS } from '$lib';
	import { Button } from '$lib/components/ui/button';

	import { LoaderCircle } from 'lucide-svelte';

	import { fade } from 'svelte/transition';

	let { data } = $props();

	const form = superForm(data.form, {
		validators: zodClient(imageSchema),
		onSubmit: () => {loading = true},
		onUpdated: () => {loading = false},
	})
	const { form: formData, enhance, message } = form
	const file = fileProxy(formData, 'image')
	let selectedRows = $state([]);
	let loading = $state(false);

</script>

{#if $message?.events}
	<div transition:fade>
		<DataTable tableData={$message.events} {columns} bind:selectedRows />
		<div class="items-center text-center pt-4">
			<Button onclick={() => downloadICS(createICSLink(selectedRows))}>Add to calendar</Button>
		</div>
	</div>
{:else }
	{#if loading}
		<div transition:fade>
			<div class="py-8 px-4 mx-auto max-w-screen-xl text-center justify-center items-center lg:py-16 lg:px-12">
				<h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-black md:text-5xl lg:text-6xl dark:text-white">We're working on it</h1>
				<p class="mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-800">Looks like you're busy!</p>
				<div class="flex justify-center items-center">
					<LoaderCircle size={60} class="animate-spin"/>
				</div>
			</div>
		</div>
	{:else}
		<div>
			<div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
				<h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-black md:text-5xl lg:text-6xl dark:text-white">Upload your photo, we'll do the rest</h1>
				<p class="mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-800">We'll take your handwritten calendar types and let you add them to your iPhone calendar</p>
			</div>
			<div class="grid w-full mx-auto max-w-sm items-center gap-1.5">
				<form method="POST" enctype="multipart/form-data" use:enhance>
					<Form.Field {form} name="image">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Image</Form.Label>
								<FileInput {...props} bind:files={$file} />
							{/snippet}
						</Form.Control>
						<Form.Description />
						<Form.FieldErrors />
					</Form.Field>
					<div class="items-center text-center pt-4">
						<Form.Button class="mx-auto">Submit</Form.Button>
					</div>
				</form>
			</div>
		</div>
	{/if}
{/if}