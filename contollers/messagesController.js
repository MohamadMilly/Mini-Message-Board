const NotFoundErrorMessage = require("../errors/notFoundMessage");
const db = require("../db/queries");

async function getMessage(req, res) {
  const { messageId } = req.params;

  const message = await db.getMessage(Number(messageId));
  if (!message) {
    throw new NotFoundErrorMessage("This Message is no longer available");
  }
  res.render("message", { message: message });
}

module.exports = { getMessage };
