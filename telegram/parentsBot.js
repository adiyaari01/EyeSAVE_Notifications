const TelegramBot = require("node-telegram-bot-api")
const {model} = require("mongoose");
const Escorts = model("Escort");
const Children = model("Child")
const ChildAttendance = model("childAttendanceReport")

const {option, menu, absenceMenu} = require("./menus");
const {TELEGRAM_TOKEN_PARENTS} = process.env
const {getRequest, updateRequest} = require("../api");

const ParentBot = new TelegramBot(TELEGRAM_TOKEN_PARENTS, {polling:true});

const getCurrentDate =  () =>{
    let date_ob = new Date();
    // adjust 0 before single digit date
    let day = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    // prints date in YYYY-MM-DD format
    return year + "-" + month + "-" + day;
}
exports.getCurrentDate = getCurrentDate;

exports.sendMessageToParent = async (userID,msg)=>{
    await ParentBot.sendMessage(userID,msg);
}

const getChildID = async (userID) => {
    const parent = await Escorts.findOne({_telegramID:userID}).lean();
    const childID = parent._children[0];
    return childID;
}
exports.getChildID = getChildID;

const updateChildDelay = async (childID)=>{
    const date = getCurrentDate();
    await ChildAttendance.findOneAndUpdate({_childId:childID, _date:date},
    {$set:{_childDelay:true, _childId : childID, _date : date}},{upsert:true});
}
exports.updateChildDelay = updateChildDelay;

const updateEscortDelay = async (childID)=>{
    const date = getCurrentDate();
    await ChildAttendance.findOneAndUpdate({_childId:childID, _date:date},
    {$set:{_escortDelay:true, _childId : childID, _date : date}},{upsert:true});
}
exports.updateEscortDelay = updateEscortDelay();

const ThanksMessage = (chatId) =>{
    ParentBot.sendMessage(chatId, "Thank you for letting me know!");
    ParentBot.sendMessage(chatId, 'See you soon!');
}
exports.ThanksMessage = ThanksMessage;

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

    ParentBot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        const message = msg.text;
        const userID = msg.from.id;
        const childID = await getChildID(userID);
        if (typeof message!=='undefined'){ 
            switch (message) {
                case 'Child delay':
                    console.log(1);
                    await updateChildDelay(childID);
                    ThanksMessage(chatId);
                    break;
                case 'Escort delay':
                    console.log(2);
                    await updateEscortDelay(childID);
                    ThanksMessage(chatId);
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
                case '/start':
                    break;
                default:
                // send a message to the chat acknowledging receipt of their message
                ParentBot.sendMessage(chatId, 'Hello!');
                ParentBot.sendMessage(chatId,'What would you like to inform me?',menu);
            }
        }
    });

    
