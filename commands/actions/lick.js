const axios = require('axios');     // axios package to make a GET request to the Tenor API and retrieve a gif
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { tenorAPI } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('lick')
    .setDescription('lick someone :)')
    .addUserOption(option => option.setName('cuteuser').setDescription('Person to lick').setRequired(true)),

    async execute(interaction) {
        const query = 'anime lick';
        const limit = 25;
        const mediaFilter = 'minimal';
        const lick = interaction.options.getUser('cuteuser');
        
        const { data } = await axios.get(`https://tenor.googleapis.com/v2/search?q=${query}&key=${tenorAPI}&limit=${limit}&media_filter=${mediaFilter}`);
        
        // Choose a random gif 
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const gifUrl = data.results[randomIndex].media_formats.gif.url;

        // filter out gifs that do not match intended search
        while (gifUrl == `https://media.tenor.com/ZIfFiEBuKsAAAAAC/kiss-anime.gif`) {

            const { data } = await axios.get(`https://tenor.googleapis.com/v2/search?q=${query}&key=${tenorAPI}&limit=${limit}&media_filter=${mediaFilter}`);

            // Choose a random gif 
            randomIndex = Math.floor(Math.random() * data.results.length);
            gifUrl = data.results[randomIndex].media_formats.gif.url;
        }

        const lickEmbed = new EmbedBuilder()
        .setDescription(`${interaction.user.username} licked ${lick} ❤️`)
        .setImage(gifUrl);

        await interaction.reply({ embeds: [lickEmbed] });
    },
};