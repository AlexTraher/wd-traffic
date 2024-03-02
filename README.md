# Wave Digital Traffic Map

## Getting Started


## Testing
Tests are written in playwright. You can run them by running `npm run test`

## Where is Strict Mode?
Unfortunately, in order to implement clustering, I had to turn off `React.StrictMode`. Obviously this is not ideal, but I decided that full feature functionality was more important than an optional react future-proofing feature.
There is an open issue in the library discussing it (see [here](https://github.com/JustFly1984/react-google-maps-api/issues/3254)).

## ALEX TODO
- aggregate map setup into single hook and _maybe_ move map to own component
- write readme