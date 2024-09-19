import fetch from "node-fetch";

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

const TELEGRAM_SERVER = "https://api.telegram.org";
const TELEGRAM_BOT_BASE_URL = `${TELEGRAM_SERVER}/bot${botToken}`;
const TELEGRAM_SEND_MESSAGE_URL = `${TELEGRAM_BOT_BASE_URL}/sendMessage`;

// Function to send a Telegram message
export async function sendMessage(message) {
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  };

  try {
    const response = await fetch(TELEGRAM_SEND_MESSAGE_URL, request);

    const data = await response.json();

    if (data.ok) {
      console.log("Message sent successfully: ", message);
    } else {
      console.error("Failed to send message: ", data);
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
}
