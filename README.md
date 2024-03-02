# Wave Digital Traffic Map
Coding test to display traffic incidents.

Deployed demo available at: 

## Getting Started
1. run `npm install` to install all deps
2. run `npm run dev` and visit `localhost:5173` to see the application.

You can also run in production mode by running a build `npm run build` and serving the dist folder to any port.

## Testing
Tests are written in playwright. You can run them by running `npm run test`

## Where is Strict Mode?
Unfortunately, in order to implement clustering, I had to turn off `React.StrictMode`. Obviously this is not ideal, but I decided that full feature functionality was more important than an optional react future-proofing feature.
There is an open issue in the library discussing it (see [here](https://github.com/JustFly1984/react-google-maps-api/issues/3254)).