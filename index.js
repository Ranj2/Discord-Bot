const Discord = require('discord.js')
const cheerio = require('cheerio')
const request = require('request')
const Bot = new Discord.Client()
const prefix = '-' 
Bot.login('NzUyMTM1MTUwOTg4Njg5NDIw.X1TOcQ.vt2T9dJzYks-IZNdxGbpDF1KQOw')

//when the bot is called
Bot.on('message', (message)=>{
    
    if(!message.content.startsWith(prefix)|| message.author.bot)return;

    //slicing the command into a string array
    const args = message.content.slice(prefix.length).split(" ")
    
    
    if(args[0]==='meme'){
        image(args[0])   
    }
    if(args[0]==='kik'){
        
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
            message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
        });
}



