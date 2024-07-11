// "use strict";

// function HTTPError(statusCode, message) {
//   const error = new Error(message);
//   error.statusCode = statusCode;
//   return error;
// }
// console.log('Auth Lambda');
// exports.handler = async (event) => {

//   var payload;
//   try {
//     payload = JSON.parse(event.body);
//     console.log(payload);
//   } catch (error) {
//     throw new HTTPError(409, "Invalid input")
//   };
// };

// const { handler, HTTPError } = require('./handler');

// const testEvent = {
//   body: '{"name":"John","age":30}'
// };

// const testInvalidEvent = {
//   body: 'Invalid JSON String'
// };

// const runTest = async () => {
//   try {
//     await handler(testEvent);
//   } catch (error) {
//     if (error instanceof HTTPError) {
//       console.error(`HTTP Error: ${error.statusCode} - ${error.message}`);
//     } else {
//       console.error('Unknown Error:', error);
//     }
//   }

//   try {
//     await handler(testInvalidEvent);
//   } catch (error) {
//     if (error instanceof HTTPError) {
//       console.error(`HTTP Error: ${error.statusCode} - ${error.message}`);
//     } else {
//       console.error('Unknown Error:', error);
//     }
//   }
// };

// runTest();


const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const parsedData = JSON.parse(body);
        console.log('JSON Payload received:', parsedData);
        res.end('JSON Payload received');
      } catch (error) {
        console.error('Invalid JSON:', error);
        res.statusCode = 400;
        res.end('Invalid JSON');
      }
    });
  } else {
    res.end('Send a POST request to see the payload.');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
