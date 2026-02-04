# 🏷️ Haggly

**Negotiation message generator for marketplace sellers.** Never freeze up when someone lowballs you again.

![Haggly](https://img.shields.io/badge/status-MVP-orange) ![React](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple)

## What is Haggly?

Haggly helps casual sellers on Facebook Marketplace, OfferUp, and Craigslist respond confidently to offers. Just enter what you're selling and the offer you received — get 3 ready-to-copy responses in different tones.

**Perfect for when someone offers $20 on your $100 item and you don't know what to say.**

## Features

- 📱 **Mobile-first design** — Use it while chatting with buyers
- 🎯 **3 tone options** — Friendly, Firm, or Casual
- 📋 **One-tap copy** — Paste directly into your chat
- ⚡ **Instant responses** — No waiting, no signup required
- 🎨 **Clean, playful UI** — Professional but fun

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy to Vercel

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/haggly)

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Option 3: Git Integration

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Click Deploy

That's it! Vercel auto-detects Vite and configures everything.

## Tech Stack

- **React 18** — UI framework
- **Vite** — Build tool (fast!)
- **Tailwind CSS** — Styling
- **No backend** — Everything runs client-side

## Project Structure

```
haggly/
├── src/
│   ├── main.jsx          # Entry point
│   ├── App.jsx           # Main app component
│   ├── index.css         # Tailwind imports
│   ├── components/
│   │   ├── InputForm.jsx     # Seller input form
│   │   ├── ResponseCard.jsx  # Generated response display
│   │   └── CopyButton.jsx    # Copy-to-clipboard button
│   └── utils/
│       └── messageGenerator.js  # Template-based message logic
├── index.html
├── vite.config.js
├── tailwind.config.js
├── vercel.json
└── package.json
```

## Future Plans

- [ ] Claude API integration for smarter responses
- [ ] More tone options
- [ ] Saved response history
- [ ] Browser extension
- [ ] Platform-specific templates (FB Marketplace, OfferUp, etc.)

## License

MIT — do whatever you want with it.

---

Built with 💜 by the Haggly team
