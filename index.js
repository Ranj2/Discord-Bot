const Discord = require('discord.js')
const DabiImages = require("dabi-images")
const pornHub = require('pornhub.js')
const GifSearch = require('pornhub.js/src/entity/search/gif')
const porn_choices =  require ('./porn_options.json')
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
                                            ` \n ${prefix}hentai gif for a random hentai gif`+
                                            ` \n ${prefix}mute or ${prefix}m to mute all members in the voice channel that you are in`+
                                            ` \n ${prefix}unmute or ${prefix}u unmute all members in the voice channel that you are in`)
        }

        else if(args[0]==='porn' && args.length===1){
            DabiClient.nsfw.real.random().then((link)=>{
                message.channel.send(link.url)
                random_porn_gif()
            })  
        }

        else if(args[0]==='hentai' && args.length===1){ 
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
    if(message.channel.nsfw===false){
        if(message.member.hasPermission("ADMINISTRATOR") && ( args[0]==='mute' || args[0]=== 'm')){
            
            let channel = message.guild.channels.cache.get(
                message.member.voice.channel.id
              );
            
              for (const [memberID, member] of channel.members) {
                member.voice.setMute(true);
              }

        }
        else if(  message.member.hasPermission("ADMINISTRATOR") && (args[0]==='unmute' || args[0]==='u') ){
                     
            let channel = message.guild.channels.cache.get(
                message.member.voice.channel.id
              );
            
              for (const [memberID, member] of channel.members) {
                member.voice.setMute(false);
              }

        }
    }




    function random_porn_gif(){
        let options = porn_choices.option
        let random_option = options[Math.floor(Math.random() * options.length)]

        pornhub.search('Gif', random_option ,{sexualOrientation: 'straight'}).then(res => {
            let res_length = res.data.length
            let random_url = res.data[Math.floor(Math.random() * res_length)]
            message.channel.send(random_url.url)
        })
        

    }

    function random_hentai_gif(){
        pornhub.search('Gif', 'Sexy',{sexualOrientation: 'straight'}).then(res => {
            console.log(res.data)
        })

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



