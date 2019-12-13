var socket = io.connect('https://bruhchat-node.herokuapp.com');

function submitAccountInfo(){
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var userid = socket.id;
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  socket.emit('createAccount', {
    username: username,
    password: password,
    userid: userid
  })
    console.log(socket.id);
}


socket.on('usernameTaken', function(data){
  console.log("user name taken")
  var m1 = document.createElement("P");
  m1.innerText = "Username taken please try again."
  m1.className = "font"
  document.getElementById("container").appendChild(m1);


})

socket.on('usernameMade', function(data){
  var m1 = document.createElement("P");
  m1.innerText = "Account succesfully created!";
  m1.className = "font"
  document.getElementById("container").appendChild(m1);

})
