# FB-ai-api
This is backend api for the interface.

### Installation
The project is packaged as a node.js app. Regular installations for running node apps apply.

* (Git) Clone the project.
* Run `npm install` (Installs dependencies)

### Requirements
A PostgreSQL server.

### Running the app
Add an `env` file based on `env.sample` with database and API configuration. The `env` file contains authentication for a Facebook app to user and the PostgreSQL server to connect to.


Start the server with `npm start`, or run `./bin/www` directly.

```bash
node .bin/www
nodemon .bin/www
forever ./bin/www

```

The app runs in development/production based on `NODE_ENV` or in development by default.

The app runs on port `3000` by default.

### Endpoints

**/session/start** to start session on the backend. Starts session on backend bby redirecting to Facebook for authentication.

**/session/refresh** starts/refreshes session by accepting code returned from facebook.

**/session/logout** to destroy the session on the server.

**/user** gives basic user information of authenticated user.

**/user/posts** lists posts with content of the user.

**POST /post** receives content to create a new post. doesn't create a post right away on facebook, but only preserves it on the server.