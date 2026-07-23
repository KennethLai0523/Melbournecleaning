# Melbourne Cleaning Monorepo

This repository now contains two independent frontends for **Melbourne Cleaning Group**:

- `website/` — React + Vite website
- `app/` — Expo + React Native mobile app

Firebase Hosting serves **only** the website build from `website/dist`.

## Website development

```bash
cd website
npm install
npm run dev
```

## Website build and deploy

```bash
cd website
npm run build
cd ..
firebase deploy --only hosting
```

## Mobile development

```bash
cd app
npm install
npx expo start
```

## Expo Go

1. Install Expo Go on your phone.
2. Connect your phone and computer to the same Wi-Fi.
3. Run `npx expo start`.
4. Scan the QR code in the terminal or browser.

## Root workspace shortcuts

```bash
npm run web
npm run web:build
npm run mobile
npm run mobile:clear
```

## Notes

- The website remains a React + Vite app under `website/`.
- The mobile app is an Expo + React Native app under `app/`.
- Firebase Hosting deploys only `website/dist`.
- Authentication and backend booking storage are planned, but not implemented yet.
