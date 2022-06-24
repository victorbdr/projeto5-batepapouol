let userName = prompt("qual seu nome?");
let mensagens;

function enterChat() {
  const promise = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/participants ",
    { name: userName }
  );
  promise.then(Correct);
  promise.catch(Incorrect);
}
enterChat();
function Correct(response) {
  console.log(response.data);
}
function Incorrect(error) {
  console.log("status code" + error.response.status);
}

function stillThere() {
  const status = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/status",
    {
      name: userName,
    }
  );
  status.catch(taOff);
}
setInterval(stillThere, 5000);
function taOff(error) {
  if (error.response.status === 400) {
    console.log("ta errado isso ai");
  }
}

function whosTalking() {
  const messages = axios.get(
    "https://mock-api.driven.com.br/api/v6/uol/messages",
    [
      {
        from: userName,
        to: "Todos",
        text: "entra na sala...",
        type: "status",
        time: "08:01:17",
      },
      {
        from: "João",
        to: "Todos",
        text: "Bom dia",
        type: "message",
        time: "08:02:50",
      },
    ]
  );
  promise.then(receiveMessage);
  promisse.catch(errorReceiving);
}
function receiveMessage(receiver) {
  let allMessages = receiver;
  let organizeMessages = document.querySelector(".chatuol");
  organizeMessages.innerHTML = "";
  for (let i = 0; i < mensagens.length; i++) {
    if (allMessages.type === "message") {
      organizeMessages.innerHTML += `<div class = "mensagens"> 
      </div>
      `;
    }
  }
}
receiveMessage();
function errorReceiving(error) {
  let statusCode = error.response.status;
  if (statusCode === 400) {
    console.log("Não foi possível fazer o load da pagina");
  }
}
//function contact() {
//const sendMessages = axios.post(
//"https://mock-api.driven.com.br/api/v6/uol/messages",
//{
// from: "nome do usuário",
//  to: "nome do destinatário (Todos se não for um específico)",
//  text: "mensagem digitada",
//  type: "message",
// }
// );
// promise.then(sentMessage);
// promisse.catch(errorSending);
//}
//function sentMessage() {
// setInterval(receiveMessage, 3000);
//}
