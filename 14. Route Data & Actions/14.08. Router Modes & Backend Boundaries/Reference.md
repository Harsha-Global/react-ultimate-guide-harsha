# Router Modes & Backend Boundaries — reference

- https://reactrouter.com/start/modes
- https://reactrouter.com/start/data/actions

Pinned package: react-router 8.4.0 (latest stable verified against npm latest and the official changelog). The stable installed documentation was used to verify the exact APIs. No claim of one universally dominant mode or package version across industry.

- Choose responsibilities before a mode
- Trace the actual trust boundary
- Review the complete developer journey
- Check understanding before the next project

Read this with the runnable source and the Code.md implementation sequence. The source code for each lecture is distributed through the course GitHub repository linked from the “How to Download Source Code” article lecture. This authoring delivery does not claim that the repository has been uploaded.

## Operations encountered in the lessons

| Purpose | Request | Response/use |
|---|---|---|
| API readiness | GET /api/health | Health object |
| Load the catalog | GET /api/employees | Employee array |
| Load one record | GET /api/employees/:id | Employee or 404 |
| Save edit | PUT /api/employees/:id | Full editable body; updated employee |
| Toggle status | PATCH /api/employees/:id | `{ active: boolean }`; updated employee |

Route Form POST to `/employees/:id/edit` invokes the browser action, which performs the API PUT. A fetcher Form POST to `/employees/:id/status` invokes its browser action, which performs the API PATCH. Neither frontend action URL is a new backend endpoint. Query filters are local over the loaded catalog. No Node source explanation is required.
