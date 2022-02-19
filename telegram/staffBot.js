const TelegramBot = require("node-telegram-bot-api")
const {model} = require("mongoose");
const Staff = model("StaffMember");
const {TELEGRAM_TOKEN_STAFF} = process.env

const StaffBot = new TelegramBot(TELEGRAM_TOKEN_STAFF, {polling:true});

exports.sendMessageToStaff = async (userID,msg)=>{
    await StaffBot.sendMessage(userID,msg);
}

StaffBot.onText(/\/start/, (msg) => {
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
    StaffBot.sendMessage(userID,'Hi!');
    StaffBot.sendMessage(userID,'How can we contact you?',option);
    });

    StaffBot.on("contact", async (msg)=>{
        const userID = msg.from.id;
        const phone = msg.contact.phone_number;
        const staff = await Staff.findOne({_telegramID:userID})    
        if (!staff){
            await Staff.updateOne({_phone:phone},{_telegramID:userID});
        }
        StaffBot.sendMessage(msg.chat.id,'Thank you!');
    });

    // StaffBot.on('polling_error', (error) => console.log('StaffBot', error));
