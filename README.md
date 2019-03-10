# FalconScoutApp

## About

FRC Team 5190's custom scouting app. Written in web technologies using Ionic 4, thus being completely cross-platform.

## Features

- Uses `Cloud Firestore` for the storage of all scouting data.
- Uses `The Blue Alliance v3 HTTP API` for retrieval of event and team specific information.
- Uses `Google Apps Scripts` for posting scouting data to an external Google Sheets page.

## For Users

Download the .APK (for Android) or .IPA (for iOS) file on your device from [here](https://github.com/Link07109/FalconScoutApp/releases) and install it.
There is also a web version as a progressive web app [here](https://falconscoutapp.firebaseapp.com).

## For Developers

### Pre-Setup

- Install node and npm
  - node and npm download: https://nodejs.org/en/
- Install Ionic
  - Ionic docs concerning installing: https://ionicframework.com/docs/installation/cli

### Setup

- Run `npm i` while in the root directory to install all the node dependencies.
- Create `src/app/credentials.ts` to house your Firebase and TBA keys using this as a template:

  ```ts
  export const xTBAauthKey = 'your-tba-api-key-goes-here';

  export const firebaseConfig = {
      // firebase config info goes in here
  };

- Firebase config
  - Go to <https://console.firebase.google.com/u/0/> and create a new project - name it whatever you want.
  - Click on "Add Firebase to your web app" and paste the config into the file.
- TBA v3 HTTP API key
  - Go to <https://www.thebluealliance.com/account> and add a new Read API Key called "X-TBA-Auth-Key" and paste its value into the file.

### Running the app

- In a brower through a local development server
  - Open a terminal window in the root directory and run `ionic serve --lab`.
- On a physical device
  - Ionic docs concerning running ionic apps on physical devices: <https://ionicframework.com/docs/intro/deploying/>
