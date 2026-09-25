---
name: manyhands
description: Use when the person asks about their Manyhands HQ (tasks, projects, documents, decisions, notes, comments, contacts) or asks to read or change anything in it. Explains how to use the manyhands_* MCP tools safely.
---

# Manyhands

The `manyhands` MCP server gives you the person's Manyhands HQ. Every call runs as the
signed-in person, with the same permissions they have in the app. You cannot act as
anybody else, so never write in the first person as another member.

## First call

- If you do not know which HQ to use, call `manyhands_hqs`. When the person belongs to
  one HQ, you can leave out `hq` on every tool. When they belong to several, ask which
  one, or use the one they named.
- Before you change anything, call `manyhands_context`. It gives the statuses, projects,
  labels, types, members and newest tasks. Use those names exactly as it lists them.

## Reading

- `manyhands_list`: rows of one kind, without bodies. Tasks can be narrowed by status,
  project or assignee.
- `manyhands_get`: one row in full, with its comments. A task can be named as `PAV-12`.
- `manyhands_search`: full-text search across the HQ.

## Changing

- `manyhands_apply`: 1 to 50 ops in one transaction (create, update, move or cancel a
  task, comment on a task, create or update a project, create a contact). A later op can
  name a row an earlier op made as `#n`, counted from 1. Put what the person asked for in
  `message`.
- After `manyhands_apply`, tell the person what changed, in one short list.
- `manyhands_undo`: undo the person's newest apply, or the one whose turn id you pass.
  Offer it when the person says a change was wrong.
- `manyhands_comment`: comment on a task, project, decision, meeting or CRM row.
- `manyhands_note`: add to one of the person's private notes. See the `jot` skill.

## Rules

- Do only what the person asked. Do not add tasks they did not mention.
- If a tool answers "not found" for a row the person named, the row does not exist or
  they cannot see it. Say so. Do not guess another id.
- Decisions cannot be locked from here. Send the person to the app for that.
