const TelegramBot = require("node-telegram-bot-api")
const {model} = require("mongoose");
const Escorts = model("Escort");
const {option, menu, absenceMenu} = require("./menus");
const {TELEGRAM_TOKEN_PARENTS} = process.env
const {getRequest, updateRequest} = require("../api");

const ParentBot = new TelegramBot(TELEGRAM_TOKEN_PARENTS, {polling:true});

exports.sendMessageToParent = async (userID,msg)=>{
    await ParentBot.sendMessage(userID,msg);
}

ParentBot.onText(/\/start/, (msg) => {
    const userID = msg.from.id;
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

    ParentBot.on('message', (msg) => {
        const chatId = msg.chat.id;
        const message = msg.text;
        switch (message) {
            case 'Child delay':
                // getChildID according to parent
                // send updateRequest to update attendance report
                ParentBot.sendMessage(chatId, "Thank you for letting me know!");
                ParentBot.sendMessage(chatId, 'See you soon!');
                break;
            case 'Parent delay':
                ParentBot.sendMessage(chatId, "Thank you for letting me know!");
                ParentBot.sendMessage(chatId, 'See you soon!');
                break;
            case 'Child absence':
                ParentBot.sendMessage(chatId,'What is the reason for the absence',absenceMenu);
                break;
            case 'Sickness':
                ParentBot.sendMessage(chatId, "Wish you a speedy recovery");
                break;
            case 'Other':
                ParentBot.sendMessage(chatId, "Thank you for letting me know!");
                break;
            case 'Bye':
                ParentBot.sendMessage(chatId, "Hope to see you around again , Bye");
                break;
            default:
            // send a message to the chat acknowledging receipt of their message
            ParentBot.sendMessage(chatId, 'Hello!');
            ParentBot.sendMessage(chatId,'What would you like to inform me?',menu);
        }
    });