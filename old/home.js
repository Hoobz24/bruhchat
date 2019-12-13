var socket = io.connect('https://bruhchat-node.herokuapp.com');

function hashTest(){
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  console.log("Sending Hash form");
  socket.emit('userForm', {
    id: socket.id,
    username: username,
    password: password
  })
}

function goCreate(){
  window.location.replace("https://bruhchat.000webhostapp.com/accountCreation.html");
}

function goHome(){
  window.location.replace("https://bruhchat.000webhostapp.com/mainHome.html");
}

socket.on('hashEnd', function(data){
  if(data.success == true){
      window.location.replace("https://bruhchat.000webhostapp.com/client-index.html?u=" + socket.id)
  } else {
    var m1 = document.createElement("P");
    m1.innerText = "Password or username is incorrect."
    m1.className = "font"
    document.getElementById("container").appendChild(m1);
  }

})
