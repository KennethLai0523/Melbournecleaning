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
npx expo start --clear
```

The mobile app targets **Expo SDK 54**, which matches the Expo Go app on the App Store / Play Store. Newer SDK versions (55+) may hang forever in store Expo Go until Apple/Google approve an update.

## Expo Go

1. Install **Expo Go** on your phone (store version = SDK 54).
2. Connect your phone and computer to the same Wi-Fi.
3. From `app/`, run `npx expo start --clear`.
4. Scan the QR code in the terminal or browser.
5. If the project stays on loading, try tunnel mode: `npx expo start --tunnel --clear`.

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
- Do **not** use npm workspaces for this repo — Expo and the website need separate React installs. Root scripts use `npm --prefix` instead.
- Authentication and backend booking storage are planned, but not implemented yet.
