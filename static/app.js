const socket = io();
socket.on('message', function(data) {
  console.log(data);
})

let html = document.documentElement;
const maxHeight = html.scrollHeight;
let allowScrollToView = true;

let msg = document.getElementById("msg");
let msgs = document.getElementById("messages");
let form = document.getElementById("chat-form");

let sendMsg = (e) => {
  if(msg.value.length > 0){
    socket.emit('chat_message', msg.value);
  } else {
    console.log('no text typed...');
  }
  msg.value = "";
  msg.focus();

  return false;
}

socket.on('chat_message', (msg) => {
  let li = document.createElement("li");
  li.innerHTML = msg;
  msgs.appendChild(li);

  if(allowScrollToView){
    li.scrollIntoView();
  }

})

socket.on('is_online', (username) => {
  let li = document.createElement("li");
  li.innerHTML = username;
  msgs.appendChild(li);
})

// A prompt will appear to enter username
let username = prompt('Enter Name');
socket.emit('username', username);

// Use the enter key to send text
msg.addEventListener('keydown', (e) => {
  if(e.key === 'Enter) {
    e.preventDefault();
    sendMsg();
  }
})

// Check if scroll to view is allowed
window.addEventListener('scroll', (e) => {
  if(html.scrollTop >= (html.scrollHeight - maxHeight)) {
    allowScrollToView = true;
  } else {
    allowScrollToView = false
  }
});
