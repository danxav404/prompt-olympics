# Architecture

## Version 1

```text
User

↓

Landing Page

↓

Prompt + Build Time

↓

Dashboard

├── Agent Feed
├── Progress Tracker
└── Preview Window

↓

Mock Generated Application
```

---

# Components

## Landing

Collects:

* startup prompt
* build duration

---

## Dashboard

Main application view.

Responsible for:

* layout
* countdown
* transitions

---

## Agent Feed

Displays fictional conversations between AI engineers.

Initially simulated.

Future:

Real Codex agent updates.

---

## Progress Tracker

Shows current build stage.

Current implementation:

Simulated timeline.

Future implementation:

Driven by actual task execution.

---

## Preview Window

Displays the generated application.

Current:

Placeholder application.

Future:

Live generated website.

---

# Guiding Principles

* Small reusable React components
* TypeScript throughout
* Functional components
* Clean separation of responsibilities
* Replace implementations without changing interfaces
