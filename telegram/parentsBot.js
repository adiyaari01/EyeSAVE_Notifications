const TelegramBot = require("node-telegram-bot-api")
const {model} = require("mongoose");
const Escorts = model("Escort");
const Childrren = model("Child")
const ChildAttendance = model("childAttendanceReport")

const {option, menu, absenceMenu} = require("./menus");
const {TELEGRAM_TOKEN_PARENTS} = process.env
const {getRequest, updateRequest} = require("../api");

const ParentBot = new TelegramBot(TELEGRAM_TOKEN_PARENTS, {polling:true});

exports.sendMessageToParent = async (userID,msg)=>{
    await ParentBot.sendMessage(userID,msg);
}


// exports.getChildID = async(userID) => {
//     cons.log(userID);
//     const parent = await Escorts.findOne({_telegramID:userID});
//     // console.log(parent);
//     // const childID = parent._children;
//     //const child = Children.findOne({_id:childID});
//     return 124578966;
// };
// exports.ChildDelay = (userID)=>{
//     const childID = getChildID(userID);
//     // send updateRequest to update attendance report
//     //ChildAttendance.Update({_id:childID},/*{_date:getCurrentDate()},*/{$set:{_childDelay:true}});
//     this.ThanksMessage();
// }

// exports.ThanksMessage = () =>{
//     ParentBot.sendMessage(chatId, "Thank you for letting me know!");
//     ParentBot.sendMessage(chatId, 'See you soon!');
// }

exports.getCurrentDate = ()=>{
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
        if (typeof message!=='undefined'){ 
            switch (message) {
                case 'Child delay':
                    const userID = msg.from.id;
                    const parent = Escorts.findOne({_telegramID:userID});
                    // console.log(parent);
                    // const childID = parent._children;
                    //const child = Children.findOne({_id:childID});
                    // send updateRequest to update attendance report
                    //ChildAttendance.Update({_id:childID},/*{_date:getCurrentDate},*/{$set:{_delay:true}});
                    ParentBot.sendMessage(chatId, "Thank you for letting me know!");
                    ParentBot.sendMessage(chatId, 'See you soon!');
                    break;
                case 'Escort delay':
                    //getChildId according to parent
                    //ChildAttendance.Update({_id:childID},/*{_date:getCurrentDate},*/{$set:{_parentDelay:true}});
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
                case '/start':
                    break;
                default:
                // send a message to the chat acknowledging receipt of their message
                ParentBot.sendMessage(chatId, 'Hello!');
                ParentBot.sendMessage(chatId,'What would you like to inform me?',menu);
            }
        }
    });

    
