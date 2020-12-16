const Discord = require('discord.js');
const QRCode = require('qrcode');
const Canvas = require('canvas');

module.exports = class Bot {
    constructor (token) {
        this.token = token;
        this.client = new Discord.Client();
        this.cmds = [];
        this.listener;
        this.prefix = 'qr';
    }

    start() {
        this.client.login(this.token);
        this.listen();
    }

    listen() {
        this.listener = this.client.on('message', msg => {
            msg.args = msg.content.split(' ');
            msg.argcat = msg.content.substring(this.prefix.length).trim();
            if (msg.args[0].toLowerCase() !== this.prefix) return;
            let channel = msg.channel;

            let canvas = Canvas.createCanvas(1024, 1024);
            let ctx = canvas.getContext('2d');
            
            QRCode.toCanvas(canvas, msg.argcat, err => {
                if (err) {
                    console.error(err);
                }
            });

            let img = new Discord.MessageAttachment(canvas.toBuffer(), 'qr.png');

            channel.send(img);
        });
    }

    stopListening() {
        this.listener = undefined;
    }
}