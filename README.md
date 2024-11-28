# About
This is the corresponding angular frontend of the simple task manager application backend:
https://github.com/nufki/task-manager-backend

Features:
- Simple frontend that allows to list, create, update and delete tasks
- The frontend interacts with the task manager API that is deployed in the backend
- The API is secured by AWS Cognito that issues an ID Token once the user has signed up and is signed in.
- The entire sign-up, sign-in, sign-out, etc. is provided by the AWS amplify library
- Easy gitops with github-actions that will trigger a deployment of the application on your AWS account (S3) 

### other stuff
This application uses:
- bootstrap as the main design library: https://getbootstrap.com/
- ngrx to manage the application state: https://ngrx.io/
- 

# configuration
Configure the AWS cognito parameters that will be available in you AWS account an region: 
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


## useful docs:
- amplify docu: https://docs.amplify.aws/angular/build-a-backend/auth/connect-your-frontend/manage-user-sessions/


## Source map analyser
When I run this application, I noticed that the bundle it generates is a bit large.
When running source-map-analyzer I noticed that amplify does take 40% of the entire bundle :)
Since this is rather a demo project, I did not make a big effort to reduce the bundle size.
````
ng build --configuration production --source-map=true

source-map-explorer dist/task-manager-frontend/browser/main-ANWBVKHE.js --no-border-checks 
````

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
