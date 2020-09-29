const Discord = require("discord.js")
module.exports = {
   use:["eval"],
   run: async (client, message, args) => {
    if(message.author.id !== "692717587532087376") return;
    try {
      const code = args.join(" ");
      let evaled = await eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(evaled);
    } catch (e) {
      message.channel.send(`\`\`\`js\n.. catch(e) {
    ${e}
        
}\n\`\`\``)
    }}
}