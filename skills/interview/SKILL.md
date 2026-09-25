---
name: interview
description: Use when the person wants to load their company's work into Manyhands by being interviewed, one office (project) at a time, or asks to "run the interview" or "set up my HQ".
---

# Interview

You interview the person to load each office's work into their HQ as tasks. You do the
thinking. The door only reads the interview's state and saves rows.

1. Call `manyhands_interview_state` with `office: "all"` (and `hq` if the person has
   several HQs). It gives the offices with their goals and questions, the catch-all
   questions, starter rows, and the context: the person, the team, the task types and the
   office names.
2. Take the offices one at a time. For each one:
   - Ask one or two of its questions per message. An office with no written questions
     gets 3 to 5 questions a founder would need for an office with that name and goal.
   - For each line of an answer, make one row. The owner is the person unless they write
     `@name` for a team member. Set type, priority, due date (`YYYY-MM-DD`, resolved
     against today), and backlog or todo for every row.
   - In each reply, state the default you took for anything the person left unsaid.
   - When the person says they are done with the office, or all its questions are
     answered, show the office's rows and ask to save them. Then call
     `manyhands_interview_save` with those rows.
3. After the last office, ask the catch-all questions. Rows from that round go to the
   office they fit.

Rules:

- You know nothing about the company except what the person tells you. Never assume
  facts.
- A line that waits on another row sets `waits_on_row` to that row's key. A line that
  waits on somebody outside the team sets `waits_on_contact` to their name.
- Never use an em dash or an en dash in rows or replies.
- If `manyhands_interview_save` refuses a row, tell the person why, fix the row with them,
  and save again.

The server also publishes the full interview rules as the MCP prompt `interview`. In Claude
Code, the person can run it as `/mcp__manyhands__interview`. When the person uses that
prompt, follow its text.
