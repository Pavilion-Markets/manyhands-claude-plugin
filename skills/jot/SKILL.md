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
- **A note**: a fact or thought to keep. Call `manyhands_note`.
  - If it continues a subject the person already has a note for, use `mode: "append"` with
    that note's name.
  - Otherwise use `mode: "create"` with a 1 to 3 word name, lowercase words joined by
    hyphens, such as `raise-ideas`.
  - If append answers that no note has that name, ask the person whether to create it.

The text you save is the jot itself: fix typos, strip a leading `#tag` or `/tag`, keep
the meaning, and add nothing that was not there.

Tell the person in one line where the jot went.
