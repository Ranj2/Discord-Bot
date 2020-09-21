const Discord = require('discord.js')
const DabiImages = require("dabi-images")
const pornHub = require('pornhub.js')
const GifSearch = require('pornhub.js/src/entity/search/gif')
const pornhub = new pornHub();
const DabiClient = new DabiImages.Client()
const Bot = new Discord.Client()
const prefix = '/' 


//when the bot is called
Bot.on('message', (message)=>{
    try{
    
    if(!message.content.startsWith(prefix)|| message.author.bot)return;

    //slicing the command into a string array
    const args = message.content.slice(prefix.length).split(" ")
    


    if(message.channel.nsfw===true){
        
        if(message.channel.nsfw===true && args[0]==='help'){
                    message.channel.send(`This is a NSFW bot \n to use the bot type these commands`+
                                            ` \n ${prefix}porn to see a random irl porn image`+
                                            ` \n ${prefix}hentai to see a random hentai image`+
                                            ` \n ${prefix}porn gif for a random porn gif`+
                                            ` \n ${prefix}hentai gif for a random hentai gif`)
        }

        else if(args[0]==='porn'){
            DabiClient.nsfw.real.random().then((link)=>{
                message.channel.send(link.url)
            })  
        }

        else if(args[0]==='hentai'){ 
            const hentai_options = ['ass','thighs','panties','feet']
            choice = hentai_options [Math.floor(Math.random() * hentai_options.length)]
            random_hentai(choice)  
        }

        else if(args[0]==='porn' && args[1]==='gif'){
            random_porn_gif()
        }

        else if(args[0]==='hentai' && args[1]==='gif'){
            random_hentai_gif()
        }
        
    }

    else{ 
        message.channel.send('https://memegenerator.net/img/instances/67078805/what-are-you-doing.jpg')
        message.channel.send('You must be in a nsfw channel to use this command')
    } 




    function random_porn_gif(){

    }
    function random_hentai_gif(){

    }
    function random_hentai(choice){
        if(choice==='ass'){
            DabiClient.nsfw.hentai.ass().then((link)=>{
                message.channel.send(link)
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


}catch(e){       
    console.log(e)
}

});

Bot.login(process.env.token)



