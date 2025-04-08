
import type { PageServerLoad } from "./$types.js";
import { imageSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate, fail, message } from 'sveltekit-superforms';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { prompt } from './prompt'
import { GEMINI_API_KEY } from '$env/static/private';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(imageSchema)),
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(imageSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const schema = {
			description: "List of types",
			type: SchemaType.ARRAY,
			items: {
				type: SchemaType.OBJECT,
				properties: {
					id: {
						type: SchemaType.STRING,
						description: "Unique event ID",
						nullable: false,
					},
					title: {
						type: SchemaType.STRING,
						description: "Event title",
						nullable: false,
					},
					date: {
						type: SchemaType.ARRAY,
						description: "Event date as [year, month, day]",
						items: {
							type: SchemaType.INTEGER,
						},
						nullable: false,
						minItems: 3,
						maxItems: 3,
					}
				},
				required: ["id", "title", "date"],
			},
		};

		// Stop this being hard coded in deployment
		const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
		const model = genAI.getGenerativeModel({
			model: "gemini-2.0-flash-exp",
			generationConfig: {
				responseMimeType: "application/json",
				responseSchema: schema,
			},
		});

		const a = await form.data.image.arrayBuffer()
		const base64string = Buffer.from(a).toString("base64");
		const temp = {
			inlineData: {
				mimeType: form.data.image.type,
				data: base64string
	}}

		const result = await model.generateContent([prompt, temp]);
		console.log(result.response.text());



		return message(form, {events: result.response.text()});
	}
};
