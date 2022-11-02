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

const timeTableCommand =[

]
const branches = [
  {
   text: "CSE",
   cb: "cse",
   type:"image",
   url:"https://res.cloudinary.com/dlba1yian/image/upload/v1667402214/cse_mnc_bbkjpt.png"
  },
  {
   text: "MNC",
   cb: "mnc",
    type:"image",
    url:"https://res.cloudinary.com/dlba1yian/image/upload/v1667402214/cse_mnc_bbkjpt.png"
  },
  {
   text: "CHEM",
   cb: "chem",
    type:"image",
    url:"https://res.cloudinary.com/dlba1yian/image/upload/v1667401977/chem_ic_time_table_nw2kvt.png"
  },
  {
   text: "EEE",
    cb: "eee",
    type:"image",
    url:"https://res.cloudinary.com/dlba1yian/image/upload/v1667402364/ee_bvvqw7.png"
  },
  {
   text: "MECH",
    cb: "mech",
    type:"image",
    url:"https://res.cloudinary.com/dlba1yian/image/upload/v1667402310/mech_yccnua.png"
  },
  {
   text: "CIVIL",
    cb: "civil",
    type:"image",
    url:"https://res.cloudinary.com/dlba1yian/image/upload/v1667402255/civil_muxls8.png"
  },
  {
   text: "META",
    cb: "meta",
    type:"image",
    url:"https://res.cloudinary.com/dlba1yian/image/upload/v1667402101/meta_lizyla.png"
  },
  {
   text: "BIOCHEM",
    cb: "biochem",
    type:"image",
    url:"https://res.cloudinary.com/dlba1yian/image/upload/v1667401894/biochem_biomedical_pharma_time_table_vxlzpu.png"
  },
  {
   text: "BIOMED",
    cb: "biomed",
    type:"image",
    url:"https://res.cloudinary.com/dlba1yian/image/upload/v1667401894/biochem_biomedical_pharma_time_table_vxlzpu.png"
  },
  {
    text: "PHARMA",
    cb: "pharma",
    type:"image",
    url:"https://res.cloudinary.com/dlba1yian/image/upload/v1667401894/biochem_biomedical_pharma_time_table_vxlzpu.png"
  },
  {
   text: "CERA",
    cb: "cera",
    type:"image",
    url:"https://res.cloudinary.com/dlba1yian/image/upload/v1667402045/cera_matsci_j64hds.png"
  },
  {
   text: "ECE",
    cb: "ece",
    type:"image",
    url:"https://res.cloudinary.com/dlba1yian/image/upload/v1667402413/ece_ep_x0fpls.png"
  },
  {
    text:"IC",
    cb:"ic",
    type:"image",
    url:"https://res.cloudinary.com/dlba1yian/image/upload/v1667401977/chem_ic_time_table_nw2kvt.png"
  },
  {
    text:"MATSCI",
    cb:"matsci",
    type:"image",
    url:"https://res.cloudinary.com/dlba1yian/image/upload/v1667402045/cera_matsci_j64hds.png"
  },
  {
    text:"MINING",
    cb:"mining",
    type:"image",
    url:"https://res.cloudinary.com/dlba1yian/image/upload/v1667402158/mining_sbv1kb.png"
  },
  {
    text:"AP",
    cb:"ap",
    type:"image",
    url:"https://res.cloudinary.com/dlba1yian/image/upload/v1667402477/arch_a1zuhn.png"
  },
  {
    text:"EP",
    cb:"ep",
    type:"image",
    url:"https://res.cloudinary.com/dlba1yian/image/upload/v1667402413/ece_ep_x0fpls.png"
  }
]
const bot = new Bot(
  "5786471028:AAFs-OdMIUOVL4Gzt4JcmFGdGjzwvxEmG3A"
);
const commands = [
  {
    text: "Can't find my LT. Welpp!",
    cb : "LT",
    data: lectureHalls,
    type: "text",
  },
  {
    text: "Ugh, which hostel was that again?",
    cb : "Hostel",
    data: hostels,
    type: "text",
  },
  {
    text:"Can't remember my timetable?",
    cb:"Timetables",
    data:hostels,
    type:"text",
  }
];

const keyboard = new InlineKeyboard();
commands.forEach((command) => {
  keyboard.text(command.text, command.cb);
  keyboard.row();
})
const branchKeyboard = new InlineKeyboard();
branches.forEach((branch) => {
  branchKeyboard.text(branch.text, branch.cb);
  branchKeyboard.row();
})

bot.on("callback_query:data", async (ctx) => {
  // let type = ctx.callbackQuery?.type;
  // console.log(type);
  
  let data = ctx.callbackQuery?.data;
  console.log(data);
  if(data == "LT" || data == "Hostel" || data == "Timetables"){
    commands.forEach(async (command) => {
      console.log(command.cb);
      if(command.cb === "Timetables") {{
        await ctx.answerCallbackQuery("Fetching data...");
        await ctx.reply("Select your Branch", {reply_markup:branchKeyboard});
      }}
      else if (command.cb == data) {
        await ctx.answerCallbackQuery("Fetching data....");
        if(command.type === "image") {
          console.log(command); 
          await ctx.replyWithPhoto(command);
        }
        if(command.type === "text") {
        await ctx.api.sendMessage(ctx.msg?.chat?.id, command.data, {
          parse_mode: "Markdown"
        });
      }
      }
    })
  }
  else {
  branches.forEach(async(branch) => {
    if(branch.cb === data){
     await ctx.replyWithPhoto(branch.url);
    //  await ctx.api.sendMessage("Here you go");
    }
  })
}
})


bot.command("start", async (ctx) =>
  await ctx.reply("Welcome! The bot is up and running. \nSend /commands to see all the available commands.")
);

bot.command("commands", async (ctx) => 
  await ctx.reply("Here are the available commands: ", {reply_markup:keyboard})
)

bot.start();