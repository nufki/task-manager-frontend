# About
This is the corresponding frontend of the simple task manager backend:
https://github.com/nufki/task-manager-backend
Feature:
- Simple frontend that allows to manage simple that are being stored using AWS
- Simple user login that allows to interact with a task manager API on the backend that is backed by AWS cognito using AWS amplify
- Easy gitops with github-actions that will trigger a deployment of the application on your AWS account (S3) 

# configuration
Configure AWS cognito parameter in: 
`amplifyconfiguration.json`
```
{
  "aws_project_region": "YOUR-REGION",
  "aws_cognito_region": "YOUR-REGION",
  "aws_user_pools_id": "YOUR-POOL_ID",
  "aws_user_pools_web_client_id": "YOUR-POOL-CLIENT-ID"
}
```

## install
`ng build`

## run development server
`ng serve`

## useful docs on amplify
amplify docu: https://docs.amplify.aws/angular/build-a-backend/auth/connect-your-frontend/manage-user-sessions/


# Angular specific stuff that ships with the CLI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
