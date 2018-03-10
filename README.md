## SpotifyJam

_Come jam with your friends with synchonized Spotify music!_

Demo Build:
[Demo](https://spotifyjam-299d8.firebaseapp.com/)

Make sure to install Redux Dev Tools for time-travel and debugging:
[Chrome Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

Tools:

* [Visual Studio Code](https://code.visualstudio.com/)
  * [Prettier Plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
* [GitKraken](https://www.gitkraken.com/)

## Frontend Development

```
cd frontend/spotifyjam/
```

## Run Local Site

1.  yarn (install)
2.  yarn dev (run)

## Deploy Build

1.  npm install -g firebase-tools
2.  firebase login
3.  yarn build (production build)
4.  Remove sourcemap (two ways) either:
    a. delete the .map
    b. export GENERATE_SOURCEMAP=false
5.  firebase deploy

## Backend Development

```
cd server/
```

## Run Local Server

_server_

1.  npm install
2.  node server.js

_client_

1.  node test-client.js

* available
* create test-room
* join test-room
* send hello!

## Deploy Server

1.  git pull origin master
2.  export PROJECT_ID="$(gcloud config get-value project -q)"
3.  vi Dockerfile //Edit any build directives
4.  docker build -t gcr.io/${PROJECT*ID}/(docker-proj-name):(docker-tag) . *//(docker-proj-name) = spotifyjam\_
5.  gcloud docker -- push gcr.io/${PROJECT*ID}/(docker-proj-name):(docker-tag) *//push docker build to gcloud\_
6.  _//(port-no) should match the port the server uses, (service-name) = spotifyjam-backend_
    * gcloud container clusters get-credentials (service-name) --zone us-central1-a --project ${PROJECT_ID}
    * kubectl run (service-name) --image=gcr.io/${PROJECT_ID}/(docker-proj-name):(docker-tag) --port (port-no)
    * kubectl set image deployment/(service-name) (service-name)=gcr.io/${PROJECT_ID}/(docker-proj-name):(docker-tag)
7.  kubectl expose deployment (service-name) --type=LoadBalancer --port (port-no) --target-port (user-port) _//(user-port) should match the port the client uses_

## Managing Packages

(frontend) yarn remove "package-name"

1.  rm -rf node_modules
2.  npm cache clean
3.  yarn (reinstall)

## Stack

* React
* React-Redux
* React-Router-Dom
* Redux-Thunk
* React-Router-Redux
* Redux-Persist
* Reselect
* Node with OOP (User/Room Classes)
* Socket.io
* Socket.io Middleware
* Spotify-Web-API-js
* Firebase Hosting
* Google Cloud Kubernetes
* Ant.d UI Library
