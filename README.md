# CalKoWlator

This is a derivative of the original project which has since been removed from Github (github.com/ernokstein). I've simply forked a fork I found and rehosted it on Github pages because I am bad at math and I need this thing.

Calculate hits, wounds, and nerve probabilities for Mantic's Kings of War game

## Installation

nodejs packages supporting this code can be installed with:

`npm install`

## Development server

Runs with [Angular CLI](https://angular.io/cli). Install with `npm install -g @angular/cli` assuming you have
nodejs already installed.

`make run`

_or_

`NODE_OPTIONS=--openssl-legacy-provider ng serve`

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Deploy

If you've forked this, you can deploy your own copy to Github pages.

`make deploy`

It will end up at `https://your-github-uname.github.io/calkowlator` by default.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
