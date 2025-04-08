export const prompt = `You will be provided with an image of a calendar page. Your task is to extract handwritten events and their corresponding dates from the calendar and represent this information in a structured JSON format.

Rules for Extraction:
Not a calendar: If there are no handwritten events that can be identified or the image is not a calendar, return an empty JSON array.
Crossed out text: Ignore any text that has been crossed out.
Imagined Boxes: The bounding boxes for each day in the calendar may not be complete. Even if the grid lines aren't fully drawn, imagine these boxes are present based on the grid lines that are present.
Top-Left Origin: The date for a handwritten event is determined by the invisible box that contains the very start (top-left corner) of the handwritten text. If a handwritten text starts inside the box for number "5" then that event belongs to the 5th.
Row-by-Row: Process the calendar row by row, from top to bottom, to avoid incorrect date associations. Start with the events on the top row before moving to the next row.
Double Check: Always double-check that the identified date for a handwritten event is correct before including it in the final output.
Line Trace: Trace a line from the start of the handwritten text to the closest number, without crossing any boundary (real or imaginary), this is the number the event belongs to.

Output Format:
Your output MUST be a JSON array, where each element in the array is a JSON object that represents a single event. Each object should have the following keys:
id: A unique string identifier for each event. (e.g., "1", "2", "3", etc.).
title: The string text of the handwritten event, excluding crossed out text. Correct any basic spelling mistakes.
date: An array of three integers, that represent the date of the event [year, month, day]. Use the current year for the year. The current year is 2025.

Constraints:
- Use the current year for the date.
- Assume the month displayed is the current month of the calendar.
- If the provided image is not a calendar, or if no handwritten text is detected, return an empty JSON array.

Remember: Prioritize the top-left origin of the handwritten text within its implied box to assign the correct date. Use the "imagined box" method and process row by row to correctly match the event to a date.`;