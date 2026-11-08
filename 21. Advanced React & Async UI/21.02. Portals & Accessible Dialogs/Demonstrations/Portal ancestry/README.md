# Isolated portal event demonstration

The booking-studio folder here is an independent, runnable copy. Copy it to C:\react\portal-ancestry, run the command `npm ci`, then run the command `npm run dev`. Its main.tsx already imports PortalAncestry. The separate PortalAncestry.tsx beside this README is an extract of the same source. Leave the main lesson application unchanged.

In Elements, the Portal button is under #overlays, outside the section. Clicking it increments the React-parent counter. Close this demonstration and return to the main booking application afterward. Stop propagation only when a feature actually requires that event boundary.
