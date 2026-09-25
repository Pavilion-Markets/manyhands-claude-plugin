---
name: notes-to-tasks
description: Use when the person pastes rough notes, a standup, a brain dump or meeting notes and wants their Manyhands tasks updated from them.
---

# Notes to tasks

This is the in-app assistant's job, done by you with the `manyhands` tools.

1. Call `manyhands_context` (with `hq` if the person has several HQs).
2. Read the notes. For each thing the notes say, decide one change: a new task, a
   status move, an edit, a cancel, or a comment on an existing task. Match existing
   tasks by their identifier (such as `PAV-12`) or by title from the snapshot.
3. Make ONE `manyhands_apply` call with all the ops. Put the notes, as typed, in
   `message`.
4. Report each change in one line. Offer `manyhands_undo` if something looks wrong.

Rules:

- Act on what the notes say. Do not ask questions first, and do not add work the notes
  do not mention.
- Use statuses, projects, labels, types and member emails exactly as the snapshot lists
  them.
- A date in the notes resolves against today and goes in as `YYYY-MM-DD`.

The server also publishes the assistant's full rule text as the MCP prompt
`notes-to-tasks`. In Claude Code, the person can run it as
`/mcp__manyhands__notes-to-tasks`. When the person uses that prompt, follow its text.
