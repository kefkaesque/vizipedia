# Vizipedia

## Overview ##

Vizipedia is an application that takes the vast knowledge of Wikipedia and delivers it in a way that is visually appealing, engaging, and interactive.

Simply visit https://vizipedia.herokuapp.com to use the application.

## Motivation ##

Wikipedia is the de facto reference of the Internet, but falls short as a learning resource. One obstacle is the readability. Much more information is provided than necessary for most use cases; as a result, key information is lost to the reader in the sea of words. The visual layout also remains largely unchanged since its founding in 2001.

## Installation ##

To work on the source code, after cloning the repo you must run npm install.
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

## Testing ##

This repo uses mocha + chai for testing. Ensure that mocha is installed with:

```
npm install -g mocha
```

Then, you can run the tests with: 

```
npm test
```
