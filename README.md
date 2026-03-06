# AI Focus

**AI Focus** is a minimalist attention-training dApp built around a simple challenge:

**Hold when instructed. Release on command. Stay calm as the sequence accelerates.**

Instead of measuring focus with a passive timer, AI Focus turns attention into an active skill loop using reaction timing, control, and rising difficulty.

---

## Concept

AI Focus is designed as a **focus trial**.

The system gives commands:

- **HOLD**
- **RELEASE**

The player must respond correctly and maintain composure as timing windows become tighter with each cleared cycle.

This transforms focus from a vague idea into something interactive, measurable, and repeatable.

---

## Core Loop

1. Start the trial
2. Wait for the command
3. Press and hold on **HOLD**
4. Lift on **RELEASE**
5. Survive longer as the sequence becomes less forgiving
6. Build score, streak, and level

---

## Features

- Single-screen focus training experience
- Dynamic **HOLD / RELEASE** instruction loop
- Increasing difficulty by level
- Focus score tracking
- Streak counter
- State labels like:
  - Scattered
  - Distracted
  - Building
  - Focused
  - Deep Focus
- Animated breathing orb interface
- Mobile-friendly interaction design

---

## Why It Works

Most focus tools track:

- time spent
- task duration
- pomodoro cycles

AI Focus tracks something more immediate:

- response discipline
- control under pressure
- steadiness of attention

It is part reflex trainer, part focus ritual, part performance loop.

---

## Tech Stack

- Next.js 14+
- React
- TypeScript
- CSS animations
- Vercel deployment

No backend is required for the MVP.

---

## Project Structure

```text
app/
  layout.tsx
  page.tsx
  globals.css

components/
  FocusTrainer.tsx