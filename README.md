# openchs-admin-client
UI application for management of reference and meta data.

You will need `yarn` package mananger to be installed globally to run this project. Follow the instructions on https://yarnpkg.com/en/docs/install to install `yarn` if it is not already installed on your machine.

To check this out on local machine, clone this repo and run:

`yarn install`

`yarn start`

If you want to connect to prod, staging, or uat api from local machine then run

`yarn start-prod` or `yarn start-staging` or `yarn start-uat` respectively.

Also, you will have to start the server from adminui branch. To do this run:

`git checkout adminui` from your local server repository.

Start the server after switching the branch:

`make start_server`

Go to localhost:3000 to see the UI.
