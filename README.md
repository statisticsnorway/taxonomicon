# Taxonomicon


A front-end application made for manually coding texts to a certain category. \
A text to be coded preferably comes in this format:
```
  {
    "groupById" : <SOME ID>,
    "text" : <SOME TEXT>,
    "predictions" : [
        {
            "code": <SOME CODE>,
            "probability" : <SOME NUMBER>
        },
        ...
    ],
    "context" : <YOUR HEARTS DESIRES (some json blob)>
  }
```

To run locally, add .env.local file with a test bearer token

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The configuration for the development environment can be found in the `.env.dev` file. \
Any changes to the environment for local development should be made there.

For local testing with backend clone and run [taxonomicon-backend](https://github.com/statisticsnorway/taxonomicon-backend)


### `yarn test`

Currently, there are no tests, and no test configuration

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

### `yarn buildenv:dev`

Same as above, but builds with `.env.dev` environment

### `yarn eject`

**Would you ever do this?**

## Docker

### `docker build -t taxonomicon -f Dockerfile.dev .`
This will build a Docker-image containing the application and the development environment, for testing purposes.

## Testing
Currently there are no tests, but it is encouraged to check for vulnerabilities in code, dependencies and image with Snyk.

From command line, assuming you have the [Snyk cli](https://docs.snyk.io/snyk-cli/getting-started-with-the-cli):\
 - Authenticate: `snyk auth`
 - Dependencies vulnerabilities: `snyk test`
 - Code vulnerabilites: `snyk code test`
 - Image vulnerabilites: `snyk container test`

## Learn More

I can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
