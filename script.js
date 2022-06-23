let userName = prompt("qual seu nome?");
function enterChat() {
  const promise = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/participants ",
    { name: userName }
  );
}
enterChat();

function stillThere() {
  const status = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/status",
    { name: userName }
  );
}

setInterval(stillThere, 4000);

function howsTalking() {
  const messages = axios.get(
    "https://mock-api.driven.com.br/api/v6/uol/messages",
    [
      {
        from: "albertinho",
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
}
