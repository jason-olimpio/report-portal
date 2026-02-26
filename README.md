# Report Portal

Report Portal is a mobile app for creating and tracking reports with photos, categories, location, and status updates.

## Features
- Create a report with description, category, and up to 5 photos.
- Automatic location capture for each report.
- Map view for browsing reports.
- Dashboard and calendar view for tracking report status.
- Push notifications on status changes.
- Light/Dark theme, multilingual UI, accessibility support.
- Offline-first: create reports with photos offline; auto-syncs when online.

## Tech stack
- React Native CLI (native Android/iOS projects).
- Android: Android Studio + Gradle, Java/JDK 17.
- iOS: Xcode (macOS required).
- Maps: MapTiler (API key required).

## Requirements
- Node.js 16+
- Git
- Android Studio (for Android builds) and/or Xcode (for iOS builds).
- Java JDK 17 (Android)

## Environment setup
Follow the official React Native environment setup for your OS/platform, including `ANDROID_HOME` configuration for Android builds.

## Getting started

### 1) Clone
```bash
git clone <REPO_URL>
cd <PROJECT_FOLDER>
```

### 2) Install dependencies
```bash
npm install
```

### 3) Configure environment variables
Create a `.env` file in the project root:

```env
MAPTILER_API_KEY=your_api_key_here
```

MapTiler requests won’t work without a valid API key.

### 4) Start Metro
```bash
npm start
```

### 5) Run
Android:
```bash
npm run android
```

iOS (macOS only):
```bash
npm run ios
```

## Build artifacts

### Android
Debug APK:
```bash
cd android
./gradlew assembleDebug
```

Release APK:
```bash
cd android
./gradlew assembleRelease
```

Release AAB:
```bash
cd android
./gradlew bundleRelease
```

### iOS (macOS + Xcode)
```bash
open ios/ReportPortal.xcworkspace
```

Then:
- Xcode → Product → Archive