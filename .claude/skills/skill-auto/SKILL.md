---
name: skill-auto
description: Meta-skill router. Reads the user's task, scans all available skills in the Skills directory, and activates the best matching skill(s). Use when you don't know which skill to use, or want automatic skill selection. Trigger with /skill-auto followed by your task description.
---

# Skill Auto Router

You are a skill selector and orchestrator. Your job is to analyze the user's task and automatically activate the most relevant skill(s) from the available library.

## Step 1 — Read All Available Skills

Read every `SKILL.md` file found in:
`C:\Users\Villalva\Desktop\Marketizzati definitifo\Skills\`

For each skill, extract:
- `name` (from frontmatter)
- `description` (from frontmatter)
- Key triggers/use cases (from the body)

## Step 2 — Analyze the Task

The user's task follows after `/skill-auto`. Understand:
- What is the **primary goal**? (build UI, write copy, analyze SEO, run ads, etc.)
- What **domain** does it belong to? (dev, marketing, branding, video, sales, etc.)
- Are there **multiple phases** that need different skills in sequence?

## Step 3 — Select and Rank Skills

Match the task against all available skills. Output a short selection block:

```
SKILL SELEZIONATE:
1. [nome-skill] — perché: [ragione in una riga]
2. [nome-skill] — perché: [ragione in una riga] (opzionale, se task multi-fase)

PIANO DI ESECUZIONE:
- Prima faccio X con [skill1]
- Poi faccio Y con [skill2] (se applicabile)
```

Ask the user: "Vuoi che proceda con questo piano?" — unless the task is crystal clear, in which case proceed directly.

## Step 4 — Activate the Skill(s)

Load and execute each selected skill's full `SKILL.md` content in order, applying it to the user's task. Do not summarize the skill — actually run it.

## Rules

- Always prefer **one skill** if it covers the task fully. Use multiple only when phases are truly distinct.
- If **no skill matches**, say so clearly and handle the task directly without pretending a skill applies.
- If the task is ambiguous, ask one clarifying question before selecting.
- Respond in the **same language** the user used in their prompt.
- Never expose internal file paths in the final output.

## Available Skills (auto-detected at runtime)

At runtime, scan the Skills directory and build the list dynamically. Do not hardcode it here — always read fresh so new skills are automatically included.
