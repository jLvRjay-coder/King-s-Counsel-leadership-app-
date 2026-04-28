# The King’s Counsel

A premium, stateless, Scripture-grounded daily leadership operating system built with React + Vite + TypeScript.

## Local setup

```bash
npm install
npm run dev
```

The Vite frontend will run locally. The OpenAI route is designed for Vercel serverless deployment. To run the API locally exactly like production, use Vercel CLI:

```bash
npm i -g vercel
vercel dev
```

## Required environment variables

Set these in Vercel Project Settings → Environment Variables:

```bash
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-5.4-mini
```

Do not expose the API key in a `VITE_` variable. This project uses `/api/counsel` so the secret remains server-side.

## Product guardrails

- No accounts
- No database
- No localStorage persistence
- No analytics
- No saved user data
- Send-to-self uses mailto/SMS links only
