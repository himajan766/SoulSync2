Prerequisites

Node.js: Ensure Node.js is installed on your system. You can download and install it from here https://nodejs.org/en.

npm or yarn: npm is installed with Node.js by default. Alternatively, you can use yarn as a package manager. Install yarn globally by running:

npm install -g yarn

React Native CLI: Install the React Native command-line interface globally:

npm install -g react-native-cli

Xcode: Xcode is required to run the iOS simulator. Install it from the App Store on macOS.

Setup Instructions

Clone the Repository: Clone the existing React Native frontend repository to your local machine:

git clone https://github.com/himajan766/SoulSync2

Navigate to the Project Directory: Change directory to the project folder:

cd <project-directory>

Install Dependencies: Install project dependencies using npm or yarn:

npm install
# or
yarn install

Link Native Dependencies (if any): If your project includes any native dependencies, link them using:
bash

react-native link
Start Metro Bundler: Metro is the JavaScript bundler used by React Native. Start it by running:

npx react-native start or yarn expo start

Optional:

Open iOS Simulator: Open iOS Simulator using Xcode:
Open Xcode.
Go to Xcode > Open Developer Tool > Simulator.
Select the desired iOS device from the simulator options.

Build and Run the App: Once the iOS simulator is running, you can build and run your React Native app:
arduino

npx react-native run-ios
