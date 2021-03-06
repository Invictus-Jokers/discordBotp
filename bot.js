require('dotenv').config();
const mergeImg = require('merge-img');
const Discord = require('discord.js');
const Canvas = require('canvas');
const bot = new Discord.Client();


const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

let flip = async (msg) => {
    let msgArr = msg.content.split(" ");
    
    if (msgArr.length <= 2) {
        let multiple = Number(msgArr[1]);
        if (msgArr.length === 1) {
            multiple = 1;
        }
        let tail = "img/tail.png";
        let head = "img/head.png";
        let returnA = [];
        if (multiple === NaN) {
            multiple = 1;
        }
        for (let i = 0; i < multiple; i++) {
            let random = Math.round(Math.random());
            if (random === 0) returnA.push(tail);
            else returnA.push(head);


        }
        //  msg.channel.send( {files: returnA});
        //  console.log(returnA);
        // Save image as file

        let out = await mergeImg(returnA, { Canvas: Canvas });
        out.write('img/out.png', () => {
            console.log('done')
            msg.channel.send({ files: ['img/out.png'] });

        });
    }
    else{
    msg.channel.send("invalid message");
    
    }
}


let highlow = (msg)=>{
    let x  = Math.floor((Math.random() * 10) + 1);
    let msgArr = msg.content.split(" ");
    if (x < 5 && msgArr[1].toLowerCase() === 'low'){
        msg.channel.send(`The number was ${x} You win a cookie!~`);
    }
    else if( x > 5 && msgArr[1].toLowerCase() === 'high'){
        msg.channel.send(`The number was ${x} You win a cookie!~`);
    }
    else{
        msg.channel.send(`Sorry, It's just not your day yet. The number was ${x}`);
    };
};



bot.on('message', async (msg) => {
    if (msg.content === 'ping') {
        msg.reply('pong');
        msg.channel.send('pong');

    }

    if (msg.content.startsWith('!kick')) {
        if (msg.mentions.users.size) {
            const taggedUser = msg.mentions.users.first();
            msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
        } else {
            msg.reply('Please tag a valid user!');
        }
    }

    if (msg.content.startsWith('!flip')) {
        msg.channel.send(await flip(msg));
    }

    if (msg.content.startsWith('!highlow')) {
        msg.channel.send(highlow(msg));
    }

    if (msg.content.toLowerCase() == 'hello' || msg.content.toLowerCase() === 'hi') {
        msg.channel.send('Hello! Welcome to the Seneca Practice Bot');
    }

    if (msg.content.toLowerCase() == "!details") {
        msg.channel.send(`This bot is your everything.`)
    }

    if (msg.content == '!roll') {
        let roll = (Math.floor(Math.random() * 10) + 1);
        if (roll < 5)
            msg.channel.send(`You Won! Here's a cookie`);
        else
            msg.channel.send(`Sorry, It's just not your day yet.`);
    }

});

