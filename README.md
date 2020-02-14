# Media-And-Info-Service

## Getting Started for Development
- Run `npm install`
- Seed the database `npm run seed`
- Start up webpack with `npm run build:dev`
- Start up the server with `npm run start:dev`

## Getting Started for Adding This Service to Your Proxy Server
- Git clone the repo
- In your proxy server's index.html page, add `<div id="photos-and-info"></div>` and `<script src="http://localhost:3001/bundle.js"></script>`
- cd into Media-Carousel-Service
- Run `npm install`
- Seed the database `npm run seed`
- Run webpack `npm run build:dev`
- Start up the server `npm run start:dev`


## CRUD API

 | Endpoints           | Type    | Operation               |
 | ------------------  | ------- | ------------------------|
 | /api/experiences/id | GET     | retrieves an experience |
 | /api/experiences    | POST    | creates an experience   |
 | /api/experiences/id | PUT     | updates an experience   |
 | /api/experiences/id | DELETE  | deletes an experience   |
