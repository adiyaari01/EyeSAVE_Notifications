const TelegramBot = require("node-telegram-bot-api")
const {model} = require("mongoose");
const Escorts = model("Escort");

const ParentBot = new TelegramBot(TELEGRAM_TOKEN_PARENTS, {polling:true});

exports.sendMessageToParent = async (userID,msg)=>{
    await ParentBot.sendMessage(userID,msg);
}

ParentBot.onText(/\/start/, (msg) => {
    const userID = msg.from.id;
    var option = {
        "parse_mode": "Markdown",
        "reply_markup": {
            "one_time_keyboard": true,
            "keyboard": [[{
                text: "My phone number",
                request_contact: true
            }], ["Cancel"]]
        }
    };
    ParentBot.sendMessage(userID,'Hi!');
    ParentBot.sendMessage(userID,'How can we contact you?',option);
    });
    ParentBot.on("contact", async (msg)=>{
        const userID = msg.from.id;
        const phone = msg.contact.phone_number;
        const parent = await Escorts.findOne({_telegramID:userID})    
        if (!parent){
            await Escorts.updateOne({_phone:phone},{_telegramID:userID});
        }
        ParentBot.sendMessage(msg.chat.id,'Thank you!');
    })

    // ParentBot.on('message', (msg) => {
    //     const chatId = msg.chat.id;
      
    //     // send a message to the chat acknowledging receipt of their message
    //     ParentBot.sendMessage(chatId, 'Received your message');
    // });