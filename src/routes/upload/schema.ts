import { z } from "zod";

export const imageSchema = z.object({
	image: z
		.instanceof(File, { message: 'Please upload a file.'})
});
