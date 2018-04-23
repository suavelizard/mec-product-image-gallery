

### Installing/Running ###

#### Quick start
This should install all the client and server dependencies as well as do a production build for the client to be served from the server.
```
cd <project directory>
npm install
npm start
```
The application should be running at http://localhost:8090
#### To run the server tests:
```
cd server
npm run test
```
#### To start the client seperately in dev mode run the following commands:

```
cd client
npm install
npm run dev
```

#### To start the server run the following commands:
```
cd server
npm install
npm start
```
There are a total of 3 `package.json` files: 
1. /package.json - This mostly contains a script to start the whole project in one command. Includes building the client to be served.
2. /client/package.json - The client dependencies and build scripts
3. /server/package.json - The server dependencies

### Development Notes
I used ExpressJS to create a basic API with a single `/products` endpoint that sends a request to the MEC API to retrieve the products. The routes and controllers are seperated into a module in `/server/api/products`. The controllers also make use of some 'standard' response methods in `/server/api/common`.
The result of this calling this endpoint to call the MEC API which is then processed to retrieve the image URLs and send them on to the MEC Imgix server. 

The final result is then sent to the client. The MEC API and the Imgix API are each wrapped in seperate modules in `/server/wrappers`

Due to the costly nature of querying 2 seperate endpoints I also added in a small in-memory cache to help ease the number of requests the server actually needs to respond to fully. This could/should be expanded to reduce the cost.
Some example unit tests for the API are located in `/server/spec`.

The SPA app follows the Vue component architecture. There is a single route that loads the `Home` component in `/client/src/components` this in turn loads the `ProductTile` component and the `Swatch` component.

### Technologies Used
#### Front end
- VueJS - SPA framework
- Axios - Request library
- Bootstrap - CSS library
- SCSS - Styling
- Vue-cli - Generator

#### Backend
- ExpressJS - Web server
- Request Promise - Request library
- Jasmine - Test framework
- memory-cache - Simple in memory cache
- Bluebird - Promise library