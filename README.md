AI Focus

AI Focus is a minimalist web application that measures the stability of your attention through touch interaction.

Instead of tracking time or tasks, AI Focus evaluates how steady your focus signal is. By holding your finger or cursor on the Focus Orb, the system analyzes micro-movements and calculates a Focus Score.

The steadier your interaction, the stronger your focus signal.

---

Concept

Most productivity tools measure time spent working.

AI Focus measures something different:

attention stability.

When the user presses and holds the orb, the system measures movement jitter.
Low jitter = higher focus signal.

This transforms focus into a skill-based interaction rather than a timer.

---

How It Works

1. Press and hold the Focus Orb
2. Maintain a steady touch
3. Release to generate your Focus Score

Example result:

Focus Score: 88%
State: Deep Focus

If movement becomes unstable:

Focus Score: 41%
State: Distracted

---

Focus States

Score| State
0–30| Distracted
31–60| Settling
61–80| Focused
81–100| Deep Focus

These states help visualize the quality of attention during the interaction.

---

Interface

AI Focus intentionally uses a single-screen design.

Elements include:

- Breathing Focus Orb
- Live interaction signal
- Focus score output
- Attention state indicator

The goal is to keep the experience calm, fast, and frictionless.

---

Tech Stack

- Next.js 14
- React
- Pointer event tracking
- CSS animation

No backend services or APIs are required for the initial version.

---

Project Structure

app/
  layout.tsx
  page.tsx
  globals.css

components/
  FocusOrb.tsx

---

Deployment

AI Focus is designed for instant deployment on Vercel.

1. Push the repository to GitHub
2. Import the repo into Vercel
3. Deploy

Example:

https://aifocus.vercel.app

---

Philosophy

AI Focus treats attention as a signal rather than a schedule.

Instead of forcing productivity, the app invites users to observe and strengthen their ability to maintain steady focus.

Small improvements in stability can lead to stronger concentration during deep work sessions.

---

Part of the Voltara Ecosystem

AI Focus is one of several lightweight tools inside Voltara City, a hub of experimental applications designed to explore human–AI interaction.

Other districts include:

- BullFinderPro
- Voltara Oracle
- GaiaGauge
- Sanctuary Sprint
- AI Stabilizer

Each tool focuses on a different signal: intelligence, sentiment, focus, balance, and creation.

---

License

Open experimental project.

Use, modify, and explore freely.

---

Built as part of an ongoing exploration into attention, interaction, and digital equilibrium.