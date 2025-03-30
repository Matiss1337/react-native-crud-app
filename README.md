# Todo App (React Native + Expo)

A simple todo application built with React Native, Expo Router, and theme support.

## Features

- Add, toggle, and delete todos
- Dark/Light theme support
- Safe area handling for different devices
- Stack-based navigation
- Custom font integration (Inter Medium)
- Persistent storage for todos

## Project Structure

- `app/`
   - `_layout.jsx` - Root layout with navigation and providers
   - `index.jsx` - Main todo list screen
- `context/`
   - `ThemeContext.js` - Theme management
- `constants/`
   - `Colors.ts` - Theme color definitions
- `data/`
   - `todos.js` - Initial todo data

## Navigation

Uses Expo Router with Stack navigation:
- Single stack implementation for simple todo list flow
- Index screen configured without header
- Ready for additional screens (e.g., todo details)

## Theming

Implements a theme system with:
- Auto-detection of device theme
- Support for light/dark modes
- Context-based theme provider
- Consistent color scheme across the app

## Storage

Uses AsyncStorage for persistent data:
- Todos are saved locally on the device
- Data persists between app restarts
- Automatic loading of saved todos on app launch

## Styling

- Custom styles using StyleSheet
- Responsive layout with max-width constraints
- Safe area handling
- Inter Medium font integration

## Tech Stack

- React Native
- Expo
- TypeScript (partial)
- expo-router
- react-native-safe-area-context
- @expo-google-fonts/inter
- @react-native-async-storage/async-storage

## Getting Started

1. Install dependencies
   ```bash
   npm install

2. Start the app
   ```bash
   npx expo start


add
/ios
/android
in gitignore

# Check the version of the EAS CLI installed on your system
eas -v

# Log in to your EAS account
eas login

# Display the currently logged-in EAS user
eas whoami

# Initialize a new EAS project or link an existing one
eas init

# Configure your project for EAS Build, setting up necessary files and settings
eas build:configure

# Check for and install any necessary updates to Expo dependencies
npx expo install --check


# Build the project for Android using the development profile
eas build --profile development --platform android
