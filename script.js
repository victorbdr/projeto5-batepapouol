let userName = prompt("qual seu nome?");
let messages = [];
//Entrar no chat
function enterChat() {
  const promise = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/participants ",
    { name: userName }
  );
  promise.then(enter);
  promise.catch(unable);
}
enterChat();
function enter(response) {
  console.log(response.data);
}
function unable(error) {
  console.log("status code" + error.response.status);
}
//Checar status
function stillThere() {
  const status = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/status",
    { name: userName }
  );
  status.catch(taOff);
}
// atualiza a cada 5s
setInterval(stillThere, 5000);

function taOff(error) {
  alert("Nome ja esta em uso, ecolha outro");
  console.log(error.response.status);
  console.log(error.response.data);
  userName = prompt("qual seu nome?");
}
// puxar mensagens da api
function whosTalking() {
  const showMessages = axios.get(
    "https://mock-api.driven.com.br/api/v6/uol/messages"
  );
  showMessages.then(receiveMessage);
  showMessages.catch(errorReceiving);
}
whosTalking();

function receiveMessage(receive) {
  let messageOrganize = document.querySelector(".chatuol");
  messageOrganize.innerHTML = "";
  for (let i = 0; i < receive.data.length; i++) {
    if (receive.data[i].type === "message") {
      messageOrganize.innerHTML += `<div class="message"><span>
      (${receive.data[i].time})</span><b class ="boldtext">${receive.data[i].from}</b> para <b class ="boldtext">${receive.data[i].text}</b>:</div>`;
    } else if (receive.data[i].type === "status") {
      messageOrganize.innerHTML += `<div class="status"><span>
      (${receive.data[i].time})</span><b class ="boldtext">${receive.data[i].from}</b> ${receive.data[i].text}</div>`;
    }
    if (receive.data[i].type === "private_message") {
      messageOrganize.innerHTML += `<div class="privateMessage"><span>
      (${receive.data[i].time})</span><b class ="boldtext">${receive.data[i].from}</b> reservadamente para <b class ="boldtext">${receive.data[i].text}</b>:</div>`;
    }
    messageOrganize.scrollIntoView();
  }
}

function errorReceiving(error) {
  let statusCode = error.response.status;
  if (statusCode === 400) {
    console.log("Não foi possível fazer o load da pagina");
  }
}
