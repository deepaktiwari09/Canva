# React Native Webwenor Base Project

This is a base template repository for all future projects. The goal of this repository is to provide a proper file structure and tools for developers to kickstart their React Native projects.

## Setup

To set up the project, follow these steps:

1. Install dependencies using Yarn:
   ```
   yarn install
   ```

2. For iOS, navigate to the `ios` directory:
   ```
   cd ios
   ```

3. Install CocoaPods dependencies:
   ```
   pod install
   ```

### File Structure

The project follows a well-organized file structure to ensure modularity and maintainability. Below is an overview of the main directories and their contents:

```
src
├── assets
│   ├── audio
│   ├── fonts
│   ├── images
│   ├── jsons
│   ├── lotties
│   └── videos
├── components
│   ├── inputs
│   ├── headers
│   ├── footers
│   └── buttons
├── models
│   ├── navigators
│   ├── services
│   └── store
├── navigators
│   ├── authNavigator.ts
│   └── mainNavigator.ts
├── notifications
│   ├── backgroundcalls.ts
│   ├── channels&categories.ts
│   ├── notificationHandlers.ts
│   └── displayNotifications.ts
├── containers
├── services
│   └── index.ts
├── store
│   └── index.ts
├── styles
│   └── index.ts
└── utils
    ├── constants.ts
    ├── deeplinks.ts
    ├── permissions.ts
    ├── notifications.ts
    ├── regex.ts
    └── urls.ts
```

- **`assets`**: Contains various asset files such as audio, fonts, images, JSON files, Lottie animations, and videos.

- **`components`**: Houses reusable components categorized into inputs, headers, footers, and buttons.

- **`models`**: Includes models related to navigators, services, and the store.

- **`navigators`**: Defines the main navigators of the app, such as `authNavigator` for authentication and `mainNavigator` for the main app flow.

- **`notifications`**: Manages various aspects of notifications, including background calls, notification channels and categories, notification handlers, and display configurations.

- **`containers`**: Will contain the main container components of the app, each responsible for specific sections of the user interface.

- **`services`**: Contains service-related logic, typically API integration, and other utility functions.

- **`store`**: Manages the app's state using Redux or a similar state management library.

- **`styles`**: Centralizes style-related configuration, such as theme variables and style constants.

- **`utils`**: Contains utility functions that don't fit in other categories, such as constants, deep links, permissions handling, notification utilities, regular expressions, and URLs.

By following this file structure, the project aims to provide a clean and organized foundation for building scalable and maintainable React Native applications.

WSure, here's some additional information on installing dependencies specific to Windows and macOS:

## Windows Setup

### Node.js

1. Download the Node.js installer for Windows from the official website: https://nodejs.org/en/download/
2. Double-click on the downloaded installer and follow the installation wizard.
3. After installation, open the Command Prompt (or PowerShell) and verify Node.js and npm installation by running:
   ```
   node -v
   npm -v
   ```

### Yarn

1. Download the Yarn installer for Windows from the official website: https://classic.yarnpkg.com/en/docs/install/#windows-stable
2. Double-click on the downloaded installer and follow the installation instructions.
3. After installation, open the Command Prompt (or PowerShell) and verify Yarn installation by running:
   ```
   yarn -v
   ```

### CocoaPods

CocoaPods is required only for iOS development.

1. Install Ruby: Download the Ruby installer for Windows from the RubyInstaller website: https://rubyinstaller.org/downloads/
2. Double-click on the downloaded installer and follow the installation instructions.
3. Open the Command Prompt and verify Ruby installation by running:
   ```
   ruby -v
   ```
4. Install CocoaPods by running the following command in Command Prompt:
   ```
   gem install cocoapods
   ```

## macOS Setup

### Node.js and Yarn

1. Using Homebrew (Recommended):

   - Install Homebrew by following the instructions at https://brew.sh/
   - Install Node.js and Yarn using Homebrew:
     ```
     brew install node
     brew install yarn
     ```

2. Using Node Version Manager (nvm) and npm:

   - Install nvm by following the instructions at https://github.com/nvm-sh/nvm#installing-and-updating
   - Install the latest LTS version of Node.js using nvm:
     ```
     nvm install --lts
     ```
   - Install Yarn globally using npm:
     ```
     npm install -g yarn
     ```

3. Verify Node.js and Yarn installations:
   ```
   node -v
   npm -v
   yarn -v
   ```

### CocoaPods

CocoaPods is required only for iOS development.

1. Open the Terminal app and install CocoaPods by running the following command:
   ```
   sudo gem install cocoapods
   ```
   You may need to enter your macOS user password.

2. After installation, verify CocoaPods version:
   ```
   pod --version
   ```

With these installations, your development environment on Windows and macOS should be ready for React Native projects. Remember to navigate to the project directory and follow the initial setup instructions mentioned in the base template repository to install project-specific dependencies using `yarn install` or `npm install`.