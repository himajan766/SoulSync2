# SoulSync Setup Guide for iOS Simulator

This guide provides step-by-step instructions to set up and run SoulSync in an iOS simulator. Before you begin, ensure you have the necessary tools and dependencies installed on your system.

## Prerequisites

1. **Node.js**: Ensure Node.js is installed on your system. You can download and install it from [here](https://nodejs.org/).

2. **npm or yarn**: npm is installed with Node.js by default. Alternatively, you can use yarn as a package manager. Install yarn globally by running:
    ```
    npm install -g yarn
    ```

3. **React Native CLI**: Install the React Native command-line interface globally:
    ```
    npm install -g react-native-cli
    ```

4. **Xcode**: Xcode is required to run the iOS simulator. Install it from the App Store on macOS.

## Setup Instructions

1. **Clone the Repository**: Clone the existing React Native frontend repository to your local machine:
    ```
    git clone https://github.com/himajan766/SoulSync2
    ```

2. **Navigate to the Project Directory**: Change directory to the project folder:
    ```
    cd <project-directory>
    ```

3. **Install Dependencies**: Install project dependencies using npm or yarn:
    ```
    npm install
    # or
    yarn install
    ```

4. **Start Metro Bundler**: Metro is the JavaScript bundler used by React Native. Start it by running:
    ```
    npx react-native start
    ```

5. **Open iOS Simulator**: Open iOS Simulator using Xcode:
    - Open Xcode.
    - Go to `Xcode` > `Open Developer Tool` > `Simulator`.
    - Select the desired iOS device from the simulator options.

6. **Build and Run the App**: Once the iOS simulator is running, you can build and run your React Native app:
    ```
    npx react-native run-ios or
    # or
    yarn expo start
    ```

## Additional Notes

- If you encounter any issues during the setup process, refer to the official React Native documentation or community forums for assistance.
- Ensure that your Xcode installation is up-to-date, as compatibility issues may arise with older versions.
- For advanced configuration and customization, refer to the React Native documentation and community resources.

