# Choosing a State Tool

The completed application is the exact source demonstrated in the video.

- Starter/zustand-workspace: the Zustand workspace project as completed in the previous lecture.
- Completed/zustand-workspace: the project at the end of this lecture. Keep it for the next lecture.
- Practice: the role play State Tool Choice: the scenario (Role Play.json), its written equivalent with three response prompts (Written Equivalent.txt) and a sample response to read after your own.
- Practice: the assignment Remember Display Formats (Instructions.txt) with its independent Starter, the complete Solution and Solution Explanation.txt (install and start each copy as the instructions describe).

## Run

Copy the project into your React workspace (for example C:\react\zustand-workspace) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first, and use the same 127.0.0.1 address throughout: localhost is a different browser-storage origin). Validate with `npm run lint` and `npm run build`.

## Try it

With the API and the dev server running, open http://127.0.0.1:5190. Search studio, then travel, then press the browser's Back button: the address returns to ?q=studio and the table shows the studio rows again. Then work through the State Tool Choice written prompts and the Remember Display Formats assignment in its own Starter copy.
