const Discord = require('discord.js')
const cheerio = require('cheerio')
const request = require('request')
const DabiImages = require("dabi-images")
const hentai = require('dabi-images/tags/nsfw/hentai')
const DabiClient = new DabiImages.Client()
const Bot = new Discord.Client()
const prefix = '-' 


//when the bot is called
Bot.on('message', (message)=>{
    try{
    
    if(!message.content.startsWith(prefix)|| message.author.bot)return;

    //slicing the command into a string array
    const args = message.content.slice(prefix.length).split(" ")
    
    
    if(args[0]==='meme'){
        //image(args[0])   
    }

    if(args[0]==='porn'){
        if(message.channel.nsfw===true){
            DabiClient.nsfw.real.random().then((link)=>{
                message.channel.send(link.url)
            })  
        }else{ 
            message.channel.send('https://memegenerator.net/img/instances/67078805/what-are-you-doing.jpg')
            message.channel.send('You must be in a nsfw channel to use this command')
        } 
    }

    if(args[0]==='hentai'){
        if(message.channel.nsfw===true){
            const hentai_options = ['ass','thighs','panties','feet']
            choice = hentai_options [Math.floor(Math.random() * hentai_options.length)]
            hentai(choice)  
        }else{ 
            message.channel.send('https://memegenerator.net/img/instances/67078805/what-are-you-doing.jpg')
            message.channel.send('You must be in a nsfw channel to use this command')
        }
    }
    
}catch(e){       
console.log(e)
}

function hentai(choice){
    if(choice==='ass'){
        DabiClient.nsfw.hentai.ass().then((link)=>{
            message.channel.send(link.url)
        })
    }
    else if(choice==='thighs'){
        DabiClient.nsfw.hentai.thighs().then((link)=>{
            message.channel.send(link.url)
        })
    }
    else if(choice==='panties'){
        DabiClient.nsfw.hentai.panties().then((link)=>{
            message.channel.send(link.url)
        })
    }
    else if(choice==='feet'){
        DabiClient.nsfw.hentai.feet().then((link)=>{
            message.channel.send(link.url)
        })
    }

}

});

Bot.login(process.env.token)



