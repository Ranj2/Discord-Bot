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
            DabiClient.nsfw.hentai.panties().then((link)=>{
                message.channel.send(link.url)
            })  
        }else{ 
            message.channel.send('https://memegenerator.net/img/instances/67078805/what-are-you-doing.jpg')
            message.channel.send('You must be in a nsfw channel to use this command')
        }
    }
    
}catch(e){       
console.log(e)
}
});



    


function image(message){
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + `${message}`,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
           }

        };
        request(options, function(error, response, responseBody) {
            if (error) {
                return;
            }
  
  
            $ = cheerio.load(responseBody);
  
  
            var links = $(".image a.link");
  
            var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
  
            console.log(urls);
  
            if (!urls.length) {
                return;
            }
  
            // Send result
            console.log(message.channel)
            message.channel.send(urls[Math.floor(Math.random() * urls.length)]).catch(console.error);
        });
}
Bot.login(process.env.token)



