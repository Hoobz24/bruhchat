var socket = io.connect('https://bruhchat-node.herokuapp.com');
var name;

function sendData(){
  var message = document.getElementById("message").value;
  console.log("sending");
  socket.emit('message', {
    message: message,
    sender: name
  })
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function getName(){
  var number = getUrlVars()["u"];
  console.log(number);
  socket.emit('nameRequest', {
    userid: number
  })
}


function request(){

  socket.emit('requestQuery', {
    username: "hoobz",
    password: "test",
    sessionId: socket.id
  })
}

function submitAccountInfo(){
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  socket.emit('createAccount', {
    username: username,
    password: password
  })
}

socket.on('nameTrue', function(data){
  console.log("Logged in as " + data.name);
  name = data.name;
  document.getElementById('nameField').innerText = "Logged in as " + name;

})

socket.on('nameFalse', function(data){
  window.location.replace("https://bruhchat.000webhostapp.com/home.html");
})

socket.on('usernameTaken', function(data){
  var m1 = document.createElement("P");
  m1.innerText = "[" + dateTime + "] " + "Username taken please try again." + ": " + data.message;
  document.getElementById("textBox").appendChild(m1);
  document.getElementById("textBox").scrollTop = document.getElementById("textBox").scrollHeight;

})

socket.on('usernameMade', function(data){
  var m1 = document.createElement("P");
  m1.innerText = "[" + dateTime + "] " + "Account succesfully created!" + ": " + data.message;
  document.getElementById("textBox").appendChild(m1);
  document.getElementById("textBox").scrollTop = document.getElementById("textBox").scrollHeight;

})


socket.on('message', function(data){

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  var m1 = document.createElement("P");
  m1.innerText = "[" + dateTime + "] " + data.sender + ": " + data.message;

  document.getElementById("textBox").appendChild(m1);
  document.getElementById("textBox").scrollTop = document.getElementById("textBox").scrollHeight;

});
