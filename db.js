const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Mohammed Milly",
    added: formatDateTime(new Date()),
  },
];

let nextId = 2;

function formatDateTime(date) {
  const pad = (n) => n.toString().padStart(2, "0");
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

async function addNewMessage(user, text) {
  const newMessage = {
    id: nextId++,
    text,
    user,
    added: formatDateTime(new Date()),
  };
  messages.push(newMessage);
}

async function getMessage(id) {
  return messages.find((message) => message.id === id);
}

module.exports = { messages, addNewMessage, getMessage };
