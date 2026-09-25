---
name: jot
description: Use when the person gives one short line to capture in Manyhands, such as "jot that ...", "note: ...", "remind me to ...", and it must go to the right note or become a task.
---

# Jot

One line in, one destination out.

Decide what the line is:

- **A task**: an action with a verb, often with a person or a deadline in it. Also any
  line with task markers: `@person`, `!priority`, `due <day>`, `>PAV-12`. Call
  `manyhands_context`, then make one `manyhands_apply` call with a single create op. Leave
  the markers out of the title and set the fields they name instead.
- **A note**: a fact or thought to keep. Call `manyhands_notes` to see the person's notes,
  then call `manyhands_note`.
  - If the line continues the subject of a note in that list, use `mode: "append"` with
    that note's name, exactly as listed (never its category).
  - Otherwise use `mode: "create"` with a 1 to 3 word name, lowercase words joined by
    hyphens, such as `raise-ideas`.

The text you save is the jot itself: fix typos, strip a leading `#tag` or `/tag`, keep
the meaning, and add nothing that was not there.

Tell the person in one line where the jot went.

The server also publishes the full routing rules as the MCP prompt `jot`. In Claude Code,
the person can run it as `/mcp__manyhands__jot`. When the person uses that prompt, follow
its text.
