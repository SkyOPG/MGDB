const { ComponentType, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')
const dl = require('../db/dl.json');

module.exports = {
    async execute(interaction, client){
        const button1 = new ButtonBuilder()
        .setCustomId("next")
        .setEmoji("⏩")
        .setStyle(ButtonStyle.Secondary);
        const button2 = new ButtonBuilder()
        .setCustomId('prev')
        .setEmoji('⏪')
        .setStyle(ButtonStyle.Secondary);
        const row = new ActionRowBuilder()
        .addComponents(
            button2,
            button1
        )
        let page = 1;
        let arr = new Array();
        let a;
        let limit;
        let at;
        
        if(page === 1) {
            a = page * 9 + 2;
            limit = 1 + 2;
        } else { 
            a = page * 9 + 2;
            limit = a - 8;
        }
        at = limit;

        while(at <= a){
            const db = dl[at]
            console.log(`${db}`)
            const top = db["#"]
            const name = db["Level Name"];
            const ID = db["ID"];
            const victor = db["First Victor"];
            const points = Math.floor(db["Points"]);
            if(name !== undefined)
            arr.push({ name: `**#${top}: ${name}**`, value:`> Points: \`${points}\`\n> ID: \`${ID}\`\n> First Victor: \`${victor}\``, inline: true });
            at++;
        }
        const msg = await interaction.reply({ embeds: [{
            fields: arr,
            title: "Demons | Moroccan DL",
            color: 3447003,
            thumbnail: {
                url: 'https://cdn.discordapp.com/avatars/1129381791178948619/83a253ea5f350ad3e40f64e6b1aa97ae.webp'
              }
        }], components: [row] });
        const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 99999999 });

collector.on('collect', async i => {
	if (i.user.id === interaction.user.id) {
		switch(i.customId){
            case "next": {
                const arr = new Array();
                page++;
                if(page === 1) {
                    a = page * 9 + 2;
                    limit = 1 + 2;
                } else { 
                    a = page * 9 + 2;
                    limit = a - 8;
                }
                at = limit;
                while(at <= a){
                    const db = dl[at]
                    console.log(`${db}`)
                    const top = db["#"]
                    const name = db["Level Name"];
                    const ID = db["ID"];
                    const victor = db["First Victor"];
                    const points = Math.floor(db["Points"]);
                    if(name !== undefined)
                    arr.push({ name: `**#${top}: ${name}**`, value:`> Points: \`${points}\`\n> ID: \`${ID}\`\n> First Victor: \`${victor}\``, inline: true });
                    at++;
                }
                await msg.edit({ embeds: [{
                    fields: arr,
                    title: "Demons | Moroccan DL",
                    color: 3447003,
                    thumbnail: {
                        url: 'https://cdn.discordapp.com/avatars/1129381791178948619/83a253ea5f350ad3e40f64e6b1aa97ae.webp'
                      }
                }], components: [row] })
                i.deferUpdate().catch(() => {})
            } break; 
            case "prev": {
                const arr = new Array();
                page--;
                if(page === 1) {
                    a = page * 9 + 2;
                    limit = 1 + 2;
                } else { 
                    a = page * 9 + 2;
                    limit = a - 8;
                }
                at = limit;
                while(at <= a){
                    const db = dl[at]
                    console.log(`${db}`)
                    const top = db["#"]
                    const name = db["Level Name"];
                    const ID = db["ID"];
                    const victor = db["First Victor"];
                    const points = Math.floor(db["Points"]);
                    if(name !== undefined)
                    arr.push({ name: `**#${top}: ${name}**`, value:`> Points: \`${points}\`\n> ID: \`${ID}\`\n> First Victor: \`${victor}\``, inline: true });
                    at++;
                }
                await msg.edit({ embeds: [{
                    fields: arr,
                    title: "Demons | Moroccan DL",
                    color: 3447003,
                    thumbnail: {
                        url: 'https://cdn.discordapp.com/avatars/1129381791178948619/83a253ea5f350ad3e40f64e6b1aa97ae.webp'
                      }
                }], components: [row] }) 
                i.deferUpdate().catch(() => {})               
            } break;
        }
	} else {
		i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
	}
});
collector.on('end', collected => {
	msg.edit(`Time ended`);
});
    }
}