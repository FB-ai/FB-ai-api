# FB-ai-api
This is backend api for the interface.

### Installation
The project is packaged as a node.js app. Regular installations for running node apps apply.

* (Git) Clone the project.
* Run `npm install` (Installs dependencies)

### Running the app
Add an `env` file based on `env.sample` with database and API configuration.
Start the server with `npm start`, or run `./bin/www` directly.

```bash
node .bin/www
nodemon .bin/www
forever ./bin/www

```

The app runs in development/production based on `NODE_ENV` or in development by default.

The app runs on port `3000` by default.