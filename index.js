import axios from "axios";
import { create } from "venom-bot";

const API_URL = "https://pokeapi.co/api/v2";

create({
  session: "chat-gpt",
  multidevice: true,
})
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

async function start(client) {
  client.onAnyMessage(async (message) => {
    const chat = await client.getChatById(message.chatId);
    // console.log("chatId", chat);
    if (message.isMedia) {
    }

    if (message.body && message.body.trim().length > 0) {
      if (message.body.split(" ")[0] === "/poke") {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${
            message.body.toLowerCase().split(" ")[1]
          }`
          // "https://pokeapi.co/api/v2/pokemon/pikachu"
        );

        const data = response.data;

        const imageResponse = await fetch(data.sprites.front_default);

        if (imageResponse.ok) {
          const imageData = await imageResponse.arrayBuffer();
          const base64ImageData = imageData.toString("base64");

            
        // const sticker = await client.sendImageAsSticker(
        //   message.from,
        //   `data:image/png;base64,${base64ImageData}`,
        //   { author: "PokeAPI" },
        //   { pack: "Pokemons", keepScale: true }
        // );


          console.log("imageData", imageData);
          console.log("base64ImageData", base64ImageData);
          // console.log("sticker", sticker);
        } else {
          console.log("Erro ao carregar imagem");
        }

        

        // const imageResponse = await fetch(data.sprites.front_default);
        // const imageResponse = await axios.get(data.sprites.front_default, {
        //   responseType: "arraybuffer",
        // });
        // console.log("imageResponse", imageResponse);
        // const imageData = await imageResponse.buffer();
        // console.log("imageData", imageData);

        // console.log("response.data", response.data);
        // console.log("response.data.sprites.front_default", response.data.sprites.front_default);

        // Baixar a imagem do front_default

        // const imageResponse = await fetch(data.sprites.front_default);
        // const imageData = await imageResponse.buffer();
        // const base64ImageData = imageData.toString("base64");
        // console.log("imageResponse", imageResponse);
        // console.log("imageData", imageData);

        // const messageText = `Nome: ${data.name}\nTipo: ${data.types[0].type.name}`;
        // console.log("messageText", messageText);

        const { name, id, height, weight, type } = response.data;
        const pokemonInfo = `Name: ${name}\nID: ${id}\nHeight: ${height}\nWeight: ${weight}\nTipo: ${data.types[0].type.name}`;

        client.sendText(message.chatId, pokemonInfo);
      }
    }

    // console.log("message.chatId", message.chatId);
    // console.log("message", message);
    // console.log("message.body", message.body);
    // console.log("chat.isGroupMsg", chat.isGroupMsg);

    // if (message.body.toLowerCase() === "pikachu") {
    //   try {
    //     const response = await axios.get(`${API_URL}/pokemon/pikachu`);
    //     const { name, id, height, weight } = response.data;
    //     const pokemonInfo = `Name: ${name}\nID: ${id}\nHeight: ${height}\nWeight: ${weight}`;
    //     client.sendText(message.chatId, pokemonInfo);
    //   } catch (error) {
    //     console.error(error);
    //     client.sendText(message.chatId, "Oops! Something went wrong.");
    //   }
    // }
  });
}
