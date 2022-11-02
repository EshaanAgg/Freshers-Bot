import { Bot } from "https://deno.land/x/grammy@v1.11.2/mod.ts";
import { InlineKeyboard } from "https://deno.land/x/grammy@v1.11.2/mod.ts";

const lectureHalls = `
Here are the halls on our campus:
[LT 1.x](https://goo.gl/maps/RANXpqoEv7jy4KCP6)
[LT 2.x](https://goo.gl/maps/gSNeUjT4S4Wu9bmr6)
[LT 3.x](https://goo.gl/maps/GWSKbvzQ9y4Utn2s5)
`;

const hostels = `
Here are the boy hostels on our campus:
[Aryabhatta](https://goo\.gl/maps/6Ka5C6ykMSpAz73t5)
[DG - 2](https://goo\.gl/maps/qgQCdYfT8iJF79ZK6)
[Morvi](https://goo\.gl/maps/R31Zg6a5WN41g3vF7)
`;

const bot = new Bot(
  "5462906162:AAEg7BD-wh7MgxTTkgZnFmjsMYCUFSLlJOc"
  );
const cal = [
  {text:'English Calender',
cb:'eng',url:'https://res.cloudinary.com/dlba1yian/image/upload/v1667401684/english_calender_idb3rh.png'}, 
{text:'Hindi Calender',cb:'hindi',url:'https://res.cloudinary.com/dlba1yian/image/upload/v1667401774/hindi_calender_fi4r8g.png'}];
const commands = [
  {
    text: "Can't find my LT. Welpp!",
    cb : "LT",
    data: lectureHalls,
  },
  {
    text: "Ugh, which hostel was that again?",
    cb : "Hostel",
    data: hostels,
  },
  {
    text:"Can't remember college events??",
    cb : 'calender',
  }
];

const keyboard = new InlineKeyboard();
commands.forEach((command) => {
  keyboard.text(command.text, command.cb);
  keyboard.row();
})

const calenderKeyboard = new InlineKeyboard();
cal.forEach((c)=>{
  calenderKeyboard.text(c.text,c.cb);
  keyboard.row();
})

bot.on("callback_query:data", async (ctx) => {
  let data = ctx.callbackQuery?.data;
  if(data=='eng'){
          await ctx.answerCallbackQuery("Fetching Data....");
          await ctx.replyWithPhoto("https://res.cloudinary.com/dlba1yian/image/upload/v1667401684/english_calender_idb3rh.png",{
            parse_mode: "Markdown"
          })
        }
        else if(data=='hindi'){
    await ctx.answerCallbackQuery("Fetching Data....");
    await ctx.replyWithPhoto("https://res.cloudinary.com/dlba1yian/image/upload/v1667401774/hindi_calender_fi4r8g.png",{
      parse_mode: "Markdown"
    })
  }
  else if(data=='calender'){
    await ctx.reply("Select Language:",{reply_markup:calenderKeyboard})
  }
  else{commands.forEach(async (command) => {
    if (command.cb == data) {
      await ctx.answerCallbackQuery("Fetching data....");
      await ctx.api.sendMessage(ctx.msg?.chat?.id, command.data, {
        parse_mode: "Markdown"
      });
    }
  })}
})

bot.command("start", async (ctx) =>
  await ctx.reply("Welcome! The bot is up and running. \nSend /commands to see all the available commands.")
);
bot.command("commands", async (ctx) => 
  await ctx.reply("Here are the available commands: ", {reply_markup:keyboard})
)

bot.start();