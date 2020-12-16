require('dotenv').config();

let token = process.env.TOKEN;

const Bot = require('./bot');
var bot = new Bot(token);

bot.start();