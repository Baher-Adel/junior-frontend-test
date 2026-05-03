# React Native User List

Expo (SDK 54) app with **Expo Router**, **Redux Toolkit**, **NativeWind** / Tailwind-style utilities, and **AsyncStorage** for offline-friendly caching.

## Prerequisites

- [Node.js](https://nodejs.org/) **20 LTS** or newer (includes `npm`)
- **iOS simulator**: Xcode (macOS only)
- **Android emulator**: [Android Studio](https://docs.expo.dev/workflow/android-studio-emulator/) with an AVD
- **Physical device**: [Expo Go](https://expo.dev/go) or a [development build](https://docs.expo.dev/develop/development-builds/introduction/)

## Installation

1. From the repository root, go into this app:

   ```bash
   cd react-native-user-list
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. (Recommended after dependency or native config changes) Clear Metro’s cache once:

   ```bash
   npx expo start --clear
   ```

## Run the app

Start the Expo dev server:

```bash
npm start
```

Same as:

```bash
npx expo start
```

Then:

- Press **a** for Android emulator, **i** for iOS simulator, or scan the QR code with **Expo Go** (Android) or the Camera app (iOS).

Convenience scripts (dev server must be running or will start as needed):

```bash
npm run android
npm run ios
npm run web
```

## Lint

```bash
npm run lint
```

## Project layout

- [`app/`](app/) — Expo Router screens and [`app/_layout.tsx`](app/_layout.tsx) (root providers)
- [`src/`](src/) — Redux store, API helpers, components, utilities

## Learn more

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [NativeWind](https://www.nativewind.dev/docs/getting-started/installation)
- [React Native Reusables](https://reactnativereusables.com/docs/installation) (optional UI primitives)
