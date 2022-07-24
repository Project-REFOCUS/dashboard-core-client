# project refocus development
# dashboard-core-web-client
The source code for the core client facing dashboard user interface application

## Getting started

### Dependencies
This project requires NodeJS to be run locally. The preferred way to install is with 
[NVM](https://github.com/nvm-sh/nvm#installing-and-updating). 
This project works with Node version 12.16.1 and greater.

This project also uses [yarn](https://classic.yarnpkg.com/en/docs/install) as the preferred method of managing node module dependencies as
opposed to npm. 

### Installation
Clone this project on your local machine
```
$ git clone git@github.com:Project-REFOCUS/dashboard-core-web-client.git
$ cd dashboard-core-web-client
```
To install the required dependencies:
```
$ yarn install
```

## Development environment
Build the project with esbuild:
```
$ yarn build
```

Start the embedded server and start developing
```
$ yarn start
```

Then default port will be 8000. Access the web app in your browser at:
```
http://127.0.0.1:8000/
```

You can change the port number by adding a port number argument to the `yarn start` command:
```
$ yarn start 8080
```

Then access the web app at 
```
http://127.0.0.1:8080/
```