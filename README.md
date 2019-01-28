# FalconScoutApp
Ionic remake of the original android scouting app used by FRC 5190 during the FIRST Power Up season.

## About
- Uses `Cloud Firestore` for the storage of all scouting data.
- Uses `The Blue Alliance v3 HTTP API` for retrieval of event and team specific information such as the teams competing and their ccwm.
- Uses `Google Apps Scripts` for adding scouting data to an external Google Sheets page.
<!-- - Uses `Infragistics Ignite UI for Angular` for detailed graphs and filterable, pagable grids. -->

## For Users
- Download the APK (for Android) or IPA (for iOS) file on your device from [here](https://github.com/Link07109/FalconScoutApp/releases) and install it.

## For Developers
- Pre-Setup
  - Install node and npm
    - node and npm download: https://www.npmjs.com/get-npm
  - Install Ionic
    - Ionic docs concerning installing: https://ionicframework.com/docs/installation/cli

- Setup
  - Run `npm i` while in the root directory to install all the node dependencies.
  - Create `src/app/credentials.ts` to house your Firebase and TBA keys using this as a template: 
    - ```
      export const xTBAauthKey = 'your-tba-api-key-goes-here';

      export const firebaseConfig = {
          // firebase config info goes in here
      };
    - Firebase config
      - Go to https://console.firebase.google.com/u/0/ and create a new project - name it whatever you want.
      - Click on "Add Firebase to your web app" and paste the config into the file.    
    - TBA v3 HTTP API key
      - Go to https://www.thebluealliance.com/account and add a new Read API Key called "X-TBA-Auth-Key" and paste it's value into the file.

- Running
  - Brower through a development server
    - Open a terminal window in the root directory and run `ionic serve --lab`.
  - Physical device
    - Ionic docs concering running ionic apps on physical devices: https://ionicframework.com/docs/intro/deploying/
