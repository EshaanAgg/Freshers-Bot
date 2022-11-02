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

const departments = `
Here are the locations of the department buildings of our college:
[1. Architecture, Planning and Design](https://goo.gl/maps/vf77vxFhVaLWJXLm7)
[2. Ceramic Engineering and Technology](https://goo.gl/maps/ETLzw8L2opSQi4vT9)
[3. Chemical Engineering](https://goo.gl/maps/ETLzw8L2opSQi4vT9)
[4. Civil Engineering](https://goo.gl/maps/nbEXG8bNAdDPAGtW7)
[5. Computer Science and Technology](https://goo.gl/maps/aiUYVTmzee1CA1hu8)
[6. Electrical Engineering](https://goo.gl/maps/331gmEAioPF6jrat7)
[7. Electronics Engineering](https://goo.gl/maps/MmUHGRYnsSPLC58y6)
[8. Mechanical Engineering](https://goo.gl/maps/MmUHGRYnsSPLC58y6)
[9. Metallurgical Engineering](https://goo.gl/maps/TRoh2Efn7z5EERjZ7)
[10. Mining Engineering](https://goo.gl/maps/kEz7Qmabpmghuf779)
[11. Pharmaceutical Engineering and Technology](https://goo.gl/maps/kVLpLYvH1rAHJXVa9)
[12. Chemistry(IC)](https://goo.gl/maps/rP51MpE6bJvbWKL96)
[13. Mathematical Sciences (MnC)](https://goo.gl/maps/VDfJKr3XXSnJdi6R7)
[14. Engineering Physics](https://goo.gl/maps/HLVtNaFfwfxQN5Z2A)
[15. Biochemical Engineering](https://goo.gl/maps/R9gAEDpvH4e1WLao6)
[16. Biomedical Engineering](https://goo.gl/maps/7C148GEaraaeqzvdA)
[17. Materical Science and Technology](https://goo.gl/maps/yu7BrD6WrgDvzfNw6)
`;


const bot = new Bot(
  "5462906162:AAEg7BD-wh7MgxTTkgZnFmjsMYCUFSLlJOc"
);
const commands = [
  {
    text: "Can't find my LT. Welpp!😥",
    cb: "LT",
    data: lectureHalls,
  },
  {
    text: "Ugh, which hostel was that again?😅",
    cb: "Hostel",
    data: hostels,
  },
  {
    text: "Where is my department?🤨",
    cb: "dept",
    data: departments
  }
];

const keyboard = new InlineKeyboard();
commands.forEach((command) => {
  keyboard.text(command.text, command.cb);
  keyboard.row();
})

bot.on("callback_query:data", async (ctx) => {
  let data = ctx.callbackQuery?.data;
  commands.forEach(async (command) => {
    if (command.cb == data) {
      await ctx.answerCallbackQuery("Fetching data....");
      await ctx.api.sendMessage(ctx.msg.chat.id, command.data, {
        parse_mode: "Markdown"
      });
      await ctx.api.sendMessage(ctx.msg.chat.id, "Try other commands here. ", { reply_markup: keyboard })
    }
  })
})

bot.command("start", async (ctx) =>
  await ctx.reply("Welcome! The bot is up and running. \nSend /commands to see all the available commands.")
);
bot.command("commands", async (ctx) =>
  await ctx.reply("Here are the available commands: ", { reply_markup: keyboard })
)

bot.start();