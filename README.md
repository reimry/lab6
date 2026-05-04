# Lab 4 - NestJS + Resend + Cloudflare Tunnel

## 1) Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example` and set:
- `CONTACT_TO_EMAIL` - your real email (owner email)
- `RESEND_API_KEY` - optional if key is already in `secret.txt`

## 2) Run app

Development mode:

```bash
npm run start:dev
```

Production build:

```bash
npm run build
npm start
```

Site is served from `public/`.
Main page: `GET /`

## 3) Contact API

Endpoint: `POST /api/contact`

Payload:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Hello",
  "message": "Your message text..."
}
```

Validation:
- required fields
- `email` format
- length limits for all fields

## 4) Cloudflare Quick Tunnel

Install cloudflared (once), then run:

```bash
npm run tunnel
```

It will expose local server (`http://localhost:3000`) with a public URL.
