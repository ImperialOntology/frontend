## Quick start

### Requirements:

- **Node.js** version **20.18.3**
- **npm** version **10.8.2**

Make sure you are using the correct versions by installing Node.js from https://nodejs.org/en/download. After installation, verify the versions by running: `node -v` and `npm -v`.

Then continue with these steps:
1. clone the repo:

    ### `git clone git@gitlab.doc.ic.ac.uk:g24mai05/frontend.git`

2. Enter the working directory:

    ###  `cd frontend`

3. Configure the backend API key (REACT_APP_API_KEY) in the .env file.
4. Install dependencies:

    ### `npm ci`

5. Build the project:

    ### `npm run build`

6. Start the application:

    ### `npm start`

### Deployment

1. Do steps 1-3 from above.
2. Build the docker image:

    ### `docker build -t frontend-image .`

3. Deploy by running the docker:

    ### `docker run --env-file .env -p 3000:3000 frontend-image`


The app will be available at http://localhost:3000.