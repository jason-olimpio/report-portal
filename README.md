# 🌍 SOS Reports - Your app for cleaner cities

Welcome to **SOS Reports**, the app that allows you to actively contribute to keeping your city clean! With just a few taps, you can report abandoned waste and help authorities take prompt action.

**How does it work?**  
Take a photo of the issue, add a description, and the app will automatically record the location. Reports are then sent to urban sanitation services for resolution.

## ✨ What you can do with the app

### Intuitive reporting

- 📸 **Geotagged photos**: Send up to 5 images with precise coordinates
- 🗂️ **Detailed categories**: Construction, electronic, bulky waste, and much more
- 📍 **Interactive map**: View all reports in your area

### Real-time monitoring

- 📊 **Personal dashboard**: Track the status of your reports
- 📅 **Visual calendar**: Follow progress with intuitive colors (red = pending, green = resolved)
- 🔔 **Push notifications**: Get updates when there’s a change

### Personalized experience

- 🌙 **Light/Dark theme**: Choose your preferred mode
- 🌍 **English/Italian**: Switch language anytime
- ♿ **Full accessibility**: Designed for everyone

## 🛠️ Getting started

### Prerequisites

Make sure you have:

- Node.js (version 16 or higher)
- Android Studio (for Android) or Xcode (for iOS on Mac)
- React Native CLI
- Java JDK 17 (required for Android development)

### Environment Variables Setup

Before proceeding with the installation, ensure you have properly configured the following environment variables:

- `JAVA_HOME`: Should point to your Java JDK 17 installation directory
- `ANDROID_HOME`: Should point to your Android SDK installation directory (usually within Android Studio installation)

On Windows:
```bash
# For JAVA_HOME, set it to your JDK installation path, e.g.:
JAVA_HOME=C:\Program Files\Java\jdk-17

# For ANDROID_HOME, set it to your Android SDK path, e.g.:
ANDROID_HOME=C:\Users\[YourUsername]\AppData\Local\Android\Sdk
```

On macOS/Linux:
```bash
# Add these lines to your ~/.bashrc or ~/.zshrc file:
export JAVA_HOME=/path/to/your/jdk-17
export ANDROID_HOME=/path/to/your/android/sdk
```

After setting these variables, restart your terminal or run `source ~/.bashrc` (or `source ~/.zshrc` on macOS) to apply the changes.
### Installation step-by-step:

```bash
# 1. Clone the project
git clone https://git.fm-technology.it/sviluppo/staging/sossegnalazioni.git
cd sossegnalazioni

# 2. Install dependencies
npm install

# 3. Start the development server
npm start

# 4. Run the app (choose a platform)
npm run android   # For Android
npm run ios       # For iOS (Mac only)
```

## 🗺️ MapTiler API Key Configuration

The application uses MapTiler for map services. The API key is stored in the `.env` file in the root directory:

```
MAPTILER_API_KEY=your_api_key_here
```

To modify the MapTiler API key:

1. Open the `.env` file in the root directory
2. Replace the value of `MAPTILER_API_KEY` with your new key
3. Save the file
4. Restart the development server for the changes to take effect

## 📦 Building Executable Applications

For React Native applications, "executables" are platform-specific builds:

### For Android:

**Debug Build (APK):**
```bash
cd android
./gradlew assembleDebug
```
The debug APK will be generated at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```
Note: Debug builds are larger, slower, and less secure than release builds. They're intended for development and testing purposes only.

**Production Build (APK):**
```bash
cd android
./gradlew assembleRelease
```
The APK will be generated at:
```
android/app/build/outputs/apk/release/app-release.apk
```

**Production Build (AAB for Google Play):**
```bash
cd android
./gradlew bundleRelease
```
The bundle will be generated at:
```
android/app/build/outputs/bundle/release/app-release.aab
```

### For iOS (requires macOS with Xcode):

**Debug Build:**
In Xcode:
- Select your project in the navigator
- Select "Debug" from the scheme dropdown
- Select your target device
- Click the "Build and run" button (or press Cmd+R)

**Production Build:**
- Open the project in Xcode:
  ```bash
  open ios/AppSos.xcworkspace
  ```
- Select "Generic iOS Device" as the target
- Go to Product → Archive
- Follow the prompts to upload to App Store Connect
