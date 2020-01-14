require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = 'token here';

bot.login(TOKEN);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

let flip = (msg)=>{
    let random  = Math.round(Math.random());
    if(random === 0)
            msg.channel.send("tail", {files: ["img/tail.png"]});
        else
            msg.channel.send("head", {files: ["img/head.png"]});
}

bot.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong');
        msg.channel.send('pong');

    } if (msg.content.startsWith('!kick')) {
        if (msg.mentions.users.size) {
            const taggedUser = msg.mentions.users.first();
            msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
        } else {
            msg.reply('Please tag a valid user!');
        }
    } if (msg.content === '!flip'){
        
        flip(msg);
    }
});
