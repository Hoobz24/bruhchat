var express = require('express');
var socket = require('socket.io');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://hoobz:Thinlad900@bruh-chat-r13tw.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
const bcrypt = require('bcrypt');
const saltRounds = 10;

var users = [];

var app = express();
var server = app.listen(4000, function(){
  console.log('listening to requests on port 4000');
});

app.use(express.static('public'));

var io = socket(server);


io.on('connection', function (socket) {
  console.log('made socket connection', socket.id);
  socket.on('message', function (data) {
    console.log(data);
    socket.emit('message',data);
    socket.broadcast.emit('message',data)
  });

  socket.on('requestQuery', function (socket){
    MongoClient.connect(uri, function(err, db) {
      if(err) throw err;
      var dbo = db.db("bruhChat");
      var query = { password: "test"};
      dbo.collection("accounts").find(query).toArray(function(err, result){
        if (err) throw err;
        console.log(result);
        db.close();
      });
      client.close();
    });

  });

  socket.on('nameRequest', function(data){
    console.log("getting name");
    var exists = false;
    var name = "";
    for(var i = 0; i < users.length; i++){
      if(users[i].id == data.userid){
        console.log("You are logged in as " + users[i].username);
        name = users[i].username;
        exists = true;
      }
    }

    if(exists){
      socket.emit('nameTrue', {
        res: true,
        name: name
      });
    } else if(exists == false){
      socket.emit('nameFalse', {
        res: false
      });
    }

  });

  socket.on('userForm', function(data){
    const password = data.password;
    const username = data.username;
    const id = data.id;
    console.log("testing hash")
    MongoClient.connect(uri, function(err, db){
      if(err) throw err;
      var dbo = db.db("bruhChat");
      var query = { username: username};
      dbo.collection("accounts").find(query).toArray(function(err, result){
        if(err) throw err;
        console.log(result);
        if(result.length > 0){
        console.log("Hash found.")
        bcrypt.compare(password, result[0].hash, function(err, res){
          console.log(result[0].hash);
          var usersOn = {
            id: id,
            username: username
          }
          users.push(usersOn)
          console.log(username + " with " + password + " is " + res);
          console.log(users);
          socket.emit('hashEnd', {
            success: res
          })
          db.close();
        });
      } else{
        console.log("No hash found.")
        socket.emit('hashEnd', {
          success: false
        })
      }

      });
      client.close();
    });
  });

  socket.on('createAccount', function (data){
    const userPassword = data.password;
    const username = data.username;
    const session = data.userid;
    console.log(data.userid);

    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(userPassword, salt);

    MongoClient.connect(uri, function(err, db){
      if(err) throw err;
      var dbo = db.db("bruhChat");
      var document = {username: username, hash: hash};
      var query = {username: username};
      var open;
      var searching = true;

        dbo.collection("accounts").find(query).toArray(function(err, result){
        if (err) throw err;
        searching = false;

        if(result.length < 1){
          console.log("Username available")
          dbo.collection("accounts").insert(document, {w: 1}, function(err, records){
            console.log("New account added as " + username + " with hash: " + hash);
            db.close();
          })
          console.log(session);
          socket.emit('usernameMade', {
            status: "sucess"
          })
          db.close();
          return;
        } else {
          console.log(session);
          console.log("An account with this username already exists.")
          socket.emit('usernameTaken', {
            status: "failed"
          })
          db.close();
          return;
        }
      });

      client.close();
    });
  });
});
