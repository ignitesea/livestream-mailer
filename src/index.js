require('dotenv').config();
const fs = require('fs');
const Twilio = require('twilio');

const from = process.env.FROM;
const body = `Ignite Seattle is now live @ https://igniteseattle.com/live\n\n(You asked us to send you a reminder.)`;

const twilio = Twilio(process.env.SID, process.env.TOKEN);
fs.readFileSync('numbers.txt')
  .toString()
  .split("\n")
  .map(number => number.replace(/[^0-9]/g, ''))
  .filter(number => number.length === 10 || number.length === 11)
  .forEach((to, index) => {
    setTimeout(
      () => {
        try {
          twilio.messages.create({ to, from, body });
          console.log(`Sent a message to ${to}.`);
        } catch (err) {
          console.log(`!! Could not message ${to}.`);
        }
      },
      1000 * index
    );
  });
