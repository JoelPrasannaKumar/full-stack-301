const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");

const token = "7729522946:AAGr-n6O8_9tdiEAgbZgSEQsKwp4FPw4U5o";
const omdbApiToken = "47a2d81a";

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (mg) => {
    const movieTitle = mg.text;
    const url = `http://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${omdbApiToken}`;

    try {
        const response = await axios.get(url);
        const movieData = response.data;

        if (movieData.Response === "True") {
            const ratings = movieData.Ratings || [];
            const ratingValue = ratings.length > 0 ? ratings[0].Value : "N/A";

            bot.sendMessage(mg.chat.id, 'Title: ' + movieData.Title);
            bot.sendMessage(mg.chat.id, 'Actors: ' + movieData.Actors);
            bot.sendMessage(mg.chat.id, 'Rating: ' + ratingValue);
        } else {
            bot.sendMessage(mg.chat.id, 'Movie not Found');
        }
    } catch (error) {
        bot.sendMessage(mg.chat.id, "Error fetching movie details. Please try again.");
        console.error("Error:", error.message);
    }
});
