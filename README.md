#Websockets.io - Node.js/Express
===
#Websocket Introduction
>The web was built around the idea that a client’s job is to request data from a server, and a server’s job is to fulfill those requests. This paradigm went unchallenged for a number of years but with the introduction of AJAX around 2005 many people started to explore the possibilities of making connections between a client and server bidirectional.


WebSockets provide a persistent connection between a client and server that both parties can use to start sending data at any time.
<br>
<br>
<br>

#Diagram
===

![image](https://www.pubnub.com/static/images/get-started/websockets_guides.png)
###HTTP Handshake
The client establishes a WebSocket connection through a process known as the WebSocket handshake. This process starts with the client sending a regular HTTP request to the server. An Upgrade header is included in this request that informs the server that the client wishes to establish a WebSocket connection.

Sample Request : 

````
GET /chat HTTP/1.1
Host: example.com:8000
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
````

"Upgrade: websocket" specifically targets the HTTP request and tells it to open a websocket connection


###Open Connection 
Now that the handshake is complete the initial HTTP connection is replaced by a WebSocket connection that uses the same underlying TCP/IP connection. At this point either party can starting sending data.

With WebSockets you can transfer as much data as you like without incurring the overhead associated with traditional HTTP requests. Data is transferred through a WebSocket as messages, each of which consists of one or more frames containing the data you are sending (the payload). In order to ensure the message can be properly reconstructed when it reaches the client each frame is prefixed with 4-12 bytes of data about the payload. Using this frame-based messaging system helps to reduce the amount of non-payload data that is transferred, leading to significant reductions in latency.

###TLDR :
A websocket connection happens through a regular http request called a handshake and then gets replaced with a websocket connection. Websockets use messages to send data back and forth and reduces overall latency using a frame-based system.
<br>
<br>
<br>

#Node.js/Express Example
===
Lets do a quick chat room in Node.js that is provided on the socket.io site.
Prereq:

* Have Node.js installed
* Have Express installed
<br>
<br>
1.Create a server.js file in a new directory
<br>
<br>

````
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


//RENDERING THE INDEX.HTML FILE / HOME PAGE

app.get('/', function(req, res){
  res.sendfile('index.html');
});

// SOCKET.IO METHOD FOR A CONNNECTION - STANDARD WAY FOR SOCKET CONNECTION

io.on('connection', function(socket){
  console.log('a user connected');
   socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

// SOCKET.IO METHOD FOR CHAT MESSAGE SUBMISSION USING EMIT

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

// STANDARD EXPRESS SERVER SETUP

http.listen(3000, function(){
  console.log('listening on *:3000');
});

````
2.Create a index.html file

````

  <head>
    <title>Socket.IO chat</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font: 13px Helvetica, Arial; }
      form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
      form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
      form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
      #messages { list-style-type: none; margin: 0; padding: 0; }
      #messages li { padding: 5px 10px; }
      #messages li:nth-child(odd) { background: #eee; }
    </style>
  </head>
  <body>
    <ul id="messages"></ul>
    <form action="">
      <input id="m" autocomplete="off" /><button>Send</button>
    </form>
    <script src="https://cdn.socket.io/socket.io-1.3.5.js"></script>
<script src="http://code.jquery.com/jquery-1.11.1.js"></script>
<script>
  var socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });
</script>

  </body>
  
````




<br>
<br>
<br>
#Links
===
- [Socket.io - NPM](https://www.npmjs.com/package/socket.io)
- [Treehouse Websocket Intro](http://blog.teamtreehouse.com/an-introduction-to-websockets)
- [Stack Overflow Websocket Architecture](http://stackoverflow.com/questions/30200225/how-does-websockets-server-architecture-work)
