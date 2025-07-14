# BudgetTracker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.

### Enviroment
Angular CLI: 16.2.16<br />
Node: 18.20.8<br />
Package Manager: npm 10.8.2<br />

### Packages used:
- ng-bootstrap<br />
- highcharts-angular<br />
- ngx-mask<br />
- ngx-pagination<br />

## Installation
Run `node --version` and `ng --version` in Terminal to verify if correct Node.js and Angular version are installed. If not, Node.js can be installed from [Node.js](https://nodejs.org/en) website and Angular 16 can be installed by running `npm i -g @angular/cli@16` after installation of Node.js.

After verifying installation of Node.js and Angular, install project depenendencies by running command: `npm i`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.


## Data handling
This application uses localStorage to store data. All the transactions (income and expenses) are stored as JSON string. A helper (StorageHelper) has been used to facilitate create, update, delete, and retrive operations.
