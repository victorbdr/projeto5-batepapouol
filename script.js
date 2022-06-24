let userName = prompt("qual seu nome?");
let mensagens = [];
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
    {
      name: userName,
    }
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
        from: userName,
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
// se tiver OK mandar mensagens para o chat
function receiveMessage(receiver) {
  let organizeMessages = document.querySelector(".chatuol");
  organizeMessages.innerHTML = "";
  for (let i = 0; i < receiver.length; i++) {
    if (receiver.type === "status") {
      organizeMessages.innerHTML += `<div class = "status"> <p>${userName} esta online</p>
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
