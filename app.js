var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


// Telegram Bot
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TG_BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if (msg.text === '/start'){
    let photoPath = "https://turquoise-smiling-halibut-906.mypinata.cloud/ipfs/QmNtf5zbi6CuhVaGZcUf5NUTw8TXZKtU2nh5duxGhYigHM";
    let options = new Object();
    let userName = msg.chat.first_name + (msg.chat.last_name == undefined ? "" : " " + msg.chat.last_name);
    options.caption = `Hi ~ ${userName} \nFlip Coin Cat : All In !!!`;

    let InlineKeyboardMarkup = new Object();
    InlineKeyboardMarkup.inline_keyboard = [
      [
        {
          text: "Play Now !!",
          url: "https://t.me/ryan_hsu_test_bot/myapp"
          // web_app: {
          //   url: "https://t.me/ryan_hsu_test_bot/myapp"
          // }
        }
      ]
    ];

    options.reply_markup = InlineKeyboardMarkup;

    bot.sendPhoto(chatId, photoPath, options);
  }
});
