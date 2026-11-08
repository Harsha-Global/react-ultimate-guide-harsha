# Event Desk — attendee editor

Local course practice API; no real reservation or payment.

Use the Node engine declared in package.json. In Windows Command Prompt, copy this project beneath C:\react\event-registration and run npm ci. Run npm run api in one terminal, check http://localhost:4087/api/health, then run npm run dev in another terminal and open http://localhost:5187.

To reset only this practice copy: stop its API, run npm run reset, then restart npm run api. This removes saved edits/uploads in the copied project. Keep the main and optional exercise in separate folders and do not start both APIs on the same port.

Run npm run lint and npm run build. The setup reference lists the introduced API contracts.

L05 Starter: independent practice copy. The Solution adds the ticket/guest equality refinement; the main course source does not.
