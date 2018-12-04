# FalconScoutApp
Ionic remake of the original android scouting app used by FRC 5190 during the FIRST Power Up season.

## Features
- Uses Cloud Firestore for the storage of all scouting data.
- Uses The Blue Alliance's v3 HTTP API for retrieval of event and team specific information such as the teams competing and their ccwm.
- Uses Google Apps Scripts for adding scouting data to an external Google Sheets page.
- Uses Infragistics' Ignite UI for Angular for detailed graphs and filterable, pagable grids.

## Usage
- Installing Ionic
  - Intructions for installing ionic can be found here: https://ionicframework.com/docs/intro/installation/

- Setting up the app
  - Run `npm i` while in the root directory to install all the node dependencies.
  - Create file `src/app/credentials.ts` to house our Firebase and TBA keys.
  - Firebase config
      - Go to https://console.firebase.google.com/u/0/ and create a new project - name it whatever you want.
      - Click on "Add Firebase to your web app" and copy the config into the `src/app/credentials.ts` file.    
  - TBA v3 HTTP API key
      - Go to https://www.thebluealliance.com/account and add a new Read API Key called "X-TBA-Auth-Key" and copy it's value into the `src/app/credentials.ts` file.
  - Make sure you name the consts in your `src/app/credentials.ts` file like so: 
    ```
    export const xTBAauthKey = 'your-tba-api-key-goes-here';

    export const firebaseConfig = {
        // firebase config info goes in here
    };
    ```

- Running the app
  - Running it in a brower
    - Open a terminal window in the root directory and run `ionic serve --lab`.
  - Running it on a physical device
    - Intructions for running ionic apps on physical devices can be found here: https://ionicframework.com/docs/intro/deploying/ 

<!-- ## Screenshots

![scouting form 1/2](https://user-images.githubusercontent.com/25257426/43988744-edfc4bd4-9d09-11e8-9864-8dc4bc4308fd.png)
![scouting form 2/2](https://user-images.githubusercontent.com/25257426/43988747-f0144ea8-9d09-11e8-8a01-31dc83bab095.png)
![teams page](https://user-images.githubusercontent.com/25257426/43988766-8c992ce4-9d0a-11e8-8a7a-dcf44a4e15e1.png)
![details page](https://user-images.githubusercontent.com/25257426/43996957-879e5cd6-9d9c-11e8-925f-3b3ba010f6f2.png) -->