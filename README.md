# Vizipedia

## Overview ##

Vizipedia is an application that takes the vast knowledge of Wikipedia and delivers it in a way that is visually engaging, interactive, and social.

Simply visit https://vizipedia.herokuapp.com to use the application.

## Motivation ##

Wikipedia is the de facto reference of the Internet, and has so much more potential as a community learning resource. We created Vizipedia to provide a sense of community and allow users to find new content in a fun and exciting way. Users can access the millions of articles curated by the Wikipedia community -- visually enhanced and augmented with social features. 

## Installation ##

To work on the source code, after cloning the repo you must run npm install, both in the root folder and in the client.
To start your local server run npm start. You must also run a worker server.
To start a worker server first install RabbitMQ with

```
brew install rabbitmq
```

Then you can start a rabbitmq server by running the command in your bash:

```
rabbitmq-server
```

After you have a rabbitmq server, you can run the worker.js file with:

```
node worker.js
```

## API Endpoints ##

Our server is built with a RESTful API. For example, articles, user profile data, and playlist data can be found respectively at:

``` /api/wiki ```
``` /api/profile ```
``` /api/playlist ```

## Testing ##

This repo uses mocha + chai for testing. Ensure that mocha is installed with:

```
npm install -g mocha
```

Then, you can run the tests with: 

```
npm test
```

## Build System ##

Tasks such as minification and concatenation are automated with Gulp. To have Gulp watch for changes in your css and client js files, run

```
gulp
```
in your command line. Other specific tasks can be found in gulpfile.js
