# pipeline

Scheduler and Instagram posting logic.

Responsibilities:
- Cron schedule: daily carousel + 3–4 stories/week
- Render JSX components to PNG (Satori + sharp)
- Upload media and publish via Instagram Graph API
- Logging and error handling

Entry points:
- scheduler.js  — starts the cron daemon
- post.js       — one-shot post runner (carousel or stories)
- render.js     — JSX → PNG renderer
