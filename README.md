# Rick and Morty Character Management Application

## Overview
This application allows users to list, create, and update characters from the Rick and Morty universe. It consists of an Angular 17 frontend and a backend powered by AWS Lambda functions managed through AWS CDK.

## Setup and Run Instructions

### Frontend

1. **Install Angular CLI:**
   ```bash
   npm install -g @angular/cli
   ```

2. **Install Project Dependencies:**
   Navigate to the `frontend` directory and run:
   ```bash
   npm install
   ```

3. **Run the Frontend Locally:**
   To run the frontend locally, you need to use `local-cors-proxy` to handle CORS issues.
   
   - Install `local-cors-proxy` globally:
     ```bash
     npm install -g local-cors-proxy
     ```
   
   - Start the proxy:
     ```bash
     lcp --proxyUrl https://wvkpf3pc7j.execute-api.us-east-1.amazonaws.com
     ```
   
   - Access the proxy server at:
     ```bash
     http://localhost:8010/proxy
     ```

   - Update `src/environments/environment.ts` to:
     ```typescript
     export const environment = {
       production: false,
       apiUrl: 'http://localhost:8010/proxy/prod'
     };
     ```

   - Start the Angular application:
     ```bash
     ng serve
     ```
   
   Your frontend should now be running at `http://localhost:4200`.

### Backend

1. **Install AWS CLI:**
   Follow the instructions from the [AWS CLI User Guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) to install and configure the AWS CLI.

2. **Configure AWS CLI:**
   ```bash
   aws configure
   ```

3. **Install AWS CDK:**
   ```bash
   npm install -g aws-cdk
   ```

4. **Navigate to Backend Directory:**
   ```bash
   cd backend/cdk-app
   ```

5. **Install Backend Dependencies:**
   ```bash
   npm install
   ```

6. **Deploy the Application using CDK:**

   - **Bootstrap the environment:**
     ```bash
     cdk bootstrap
     ```

   - **Deploy the stack:**
     ```bash
     cdk deploy
     ```

   - **Destroy the stack (if needed):**
     ```bash
     cdk destroy
     ```

### AWS Lambda Functions
The backend consists of multiple Lambda functions located in the `backend/cdk-app/lambdas` directory. Each function handles different operations like fetching, registering, updating, and populating characters.

### Additional Notes

- **Environment Configuration:**
  The environment configurations are defined in `src/environments/environment.ts` and `src/environments/environment.prod.ts`.

- **Running Tests:**
  To run the tests for both frontend and backend, use the following commands:

  - **Frontend:**
    ```bash
    ng test
    ```

  - **Backend:**
    ```bash
    npm test
    ```

## Optional: Deploying the Entire Application Stack using AWS CloudFormation

1. **Prerequisites:**
   Ensure you have the AWS CLI and CDK installed and configured.

2. **Deployment Steps:**

   - **Prepare the CloudFormation Template:**
     Ensure your CDK stack is correctly defined in `lib`.

   - **Deploy the Stack:**
     ```bash
     cdk deploy
     ```

   - **Validate Deployment:**
     Check the AWS Management Console to ensure all resources are correctly created.

   - **Destroy the Stack:**
     If you need to tear down the stack, run:
     ```bash
     cdk destroy
     ```

3. **Parameters and Validation:**
   Ensure you provide the necessary parameters when deploying and validate the deployment by testing the endpoints and application functionality.