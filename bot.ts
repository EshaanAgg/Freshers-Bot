// deno-lint-ignore-file
import { serve } from "https://deno.land/std@0.160.0/http/server.ts";
import {
  webhookCallback,
  Bot,
  InlineKeyboard,
} from "https://deno.land/x/grammy@v1.11.2/mod.ts";
import { fetchPosts } from "https://deno.land/x/redditposts/src/mod.ts";

console.log("The script is being executed successfully. SANITY CHECK PASSED.");

const lectureHalls = `
Here are the halls on our campus:
[LT 1.x](https://goo.gl/maps/RANXpqoEv7jy4KCP6)
[LT 2.x](https://goo.gl/maps/gSNeUjT4S4Wu9bmr6)
[LT 3.x](https://goo.gl/maps/GWSKbvzQ9y4Utn2s5)
[ABLT](https://goo.gl/maps/nTz39riDTYy9j5oi8)
[ED Hall](https://goo.gl/maps/Fdy51nkoafJZYCiy7)
`;

const lingo = `
### Lingo you would be hearing around all the time in the campus!

Fachha/Fachhi = Fresher 🍼
Lite hai = Take it easy 😌
Chill hai = Ab kaand ho gaya toh choro, sab chill hai 😎
Pel insaan = Overachiever (machau) 💪
Fakka = F grade 🫠
Dassi = 10 cpi 🔟
Maggu = Rote-learner 🤓
BC = Branch Changer 🐍
LC = Limbdi Corner 💞
DG = LC but quieter, DhanrajGiri Corner 🤫
HG = Hyderabad Gate 🥟
VT = Vishwanath Temple 🛕
Lankating = Lanka ki tafri karna 🛍️
BT = Bad Trip (yaar BT ho gayi, fakka laga diya prof ne) 😭
GT = Opposite of BT, Good Trip 👾
+1/++ = Support, agreement 🤝
Proxy = Kisi aur ki roll call par present bolna🥷
`;

const hostels = `
Here are the boys hostels of our campus:
[Aryabhatta](https://goo.gl/maps/6Ka5C6ykMSpAz73t5)
[DG - 2](https://goo.gl/maps/qgQCdYfT8iJF79ZK6)
[Morvi](https://goo.gl/maps/R31Zg6a5WN41g3vF7)
[Vishwakarma](https://www.google.com/maps/place/Aryabhatta+Hostel,+IIT+BHU/@25.2631389,82.98215,17z/data=!3m1!4b1!4m5!3m4!1s0x398e3392e4725649:0x2c7d4cf06e09c1a2!8m2!3d25.2631389!4d82.9843387)
[Limbdi](https://www.google.com/maps/place/Limbdi+Hostel/@25.2619258,82.9834115,17z/truedata=!4m9!1m2!2m1!1slimbdi+hostel+iit+bhu!3m5!1s0x398e331510759d13:0x7e6006655bbbc673!8m2!3d25.2612189!4d82.986068!15sChVsaW1iZGkgaG9zdGVsIGlpdCBiaHWSAQZob3N0ZWzgAQA)
[Rajputana](https://www.google.com/maps/place/Rajputana+Hostel/@25.2619258,82.9834115,17z/data=!4m9!1m2!2m1!1slimbdi+hostel+iit+bhu!3m5!1s0x398e322cf7f20c61:0xa0509b12a256482f!8m2!3d25.2623864!4d82.9862064!15sChVsaW1iZGkgaG9zdGVsIGlpdCBiaHVaFyIVbGltYmRpIGhvc3RlbCBpaXQgYmh1kgELYm95c19ob3N0ZWyaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVTkxkV0ZsYm1oM1JSQULgAQA)
[CVR](https://www.google.com/maps/place/BHU+Tea+Stall+behind+VT/@25.2656838,82.985495,19.19z/data=!4m12!1m6!3m5!1s0x398e3392e4725649:0x2c7d4cf06e09c1a2!2sAryabhatta+Hostel,+IIT+BHU!8m2!3d25.2631389!4d82.9843387!3m4!1s0x398e322ea45bbcef:0x33b526b44ee5b99b!8m2!3d25.265934!4d82.98689)
[Vishweshwaraiya](https://www.google.com/maps/place/Vishweshwaraiya+Hostel/@25.2623035,82.9802092,17z/data=!4m9!1m2!2m1!1sVishweshwaraiya+iit+bhu!3m5!1s0x398e33b047306281:0xeabd3e37be30bf5b!8m2!3d25.2623035!4d82.9839534!15sChdWaXNod2VzaHdhcmFpeWEgaWl0IGJodZIBE2hvdXNpbmdfZGV2ZWxvcG1lbnTgAQA)
[S.N. Bose](https://www.google.com/maps/place/7X7M%2B9CP,+Semi+Cir+Rd+Number+5,+Banaras+Hindu+University,+Varanasi,+Uttar+Pradesh+221005/@25.263262,82.9821268,18.49z/data=!4m8!1m2!2m1!1ssn+bose+iit+bhu!3m4!1s0x398e322dbe736a7d:0x86e7fcb6ffcca0c5!8m2!3d25.2634395!4d82.9837949)
[Dhanrajgiri](https://www.google.com/maps/place/Semi+Cir+Rd+Number+4,+Banaras+Hindu+University,+Varanasi,+Uttar+Pradesh+221005/@25.2638575,82.9856722,18.96z/data=!4m8!1m2!2m1!1sDhanrajgiri+old!3m4!1s0x398e322c37c80dc7:0x236073ec2d3f6a43!8m2!3d25.2639123!4d82.9860629)
[Ramnujan](https://www.google.com/maps/place/7X7M%2BCXC,+Varanasi,+Uttar+Pradesh+221005/@25.2632652,82.9842624,19.19z/data=!4m12!1m6!3m5!1s0x398e3392e4725649:0x2c7d4cf06e09c1a2!2sAryabhatta+Hostel,+IIT+BHU!8m2!3d25.2631389!4d82.9843387!3m4!1s0x398e322db3fa1a31:0x213c8210541d9ef8!8m2!3d25.2635679!4d82.9848351)
[Vivekanand](https://www.google.com/maps/place/Right+To+Information+Center/@25.2603894,82.9861379,17.85z/data=!4m12!1m6!3m5!1s0x398e3392e4725649:0x2c7d4cf06e09c1a2!2sAryabhatta+Hostel,+IIT+BHU!8m2!3d25.2631389!4d82.9843387!3m4!1s0x398e338bed4a2acb:0xa9086e2488b2b45b!8m2!3d25.2591771!4d82.98713)

Here are the girls hostels of our campus:
[S.C Dey](https://www.google.com/maps/place/Aryabhatta+Hostel,+IIT+BHU/@25.2631389,82.98215,17z/data=!3m1!4b1!4m5!3m4!1s0x398e3392e4725649:0x2c7d4cf06e09c1a2!8m2!3d25.2631389!4d82.9843387)
[Gamcha](https://www.google.com/maps/place/Apollo+Pharmacy+Iit+Varanasi/@25.2609645,82.9829897,17.95z/data=!4m5!3m4!1s0x398e338553783233:0x4e2d147c7cd9ddb8!8m2!3d25.2602352!4d82.9845566)
[New Girls](https://www.google.com/maps/place/New+girls+hostel,+IIT+BHU/@25.2610079,82.981693,17z/data=!3m1!4b1!4m5!3m4!1s0x398e33ab82c42891:0x658f95bb01e8de33!8m2!3d25.2610079!4d82.9838817)
`;

const branches = [
  {
    text: "CSE",
    cb: "timetable-cse",
    url: "https://res.cloudinary.com/dlba1yian/image/upload/v1667402214/cse_mnc_bbkjpt.png",
  },
  {
    text: "MNC",
    cb: "timetable-mnc",
    url: "https://res.cloudinary.com/dlba1yian/image/upload/v1667402214/cse_mnc_bbkjpt.png",
  },
  {
    text: "CHEM",
    cb: "timetable-chem",
    url: "https://res.cloudinary.com/dlba1yian/image/upload/v1667401977/chem_ic_time_table_nw2kvt.png",
  },
  {
    text: "EEE",
    cb: "timetable-eee",
    url: "https://res.cloudinary.com/dlba1yian/image/upload/v1667402364/ee_bvvqw7.png",
  },
  {
    text: "MECH",
    cb: "timetable-mech",
    url: "https://res.cloudinary.com/dlba1yian/image/upload/v1667402310/mech_yccnua.png",
  },
  {
    text: "CIVIL",
    cb: "timetable-civil",
    url: "https://res.cloudinary.com/dlba1yian/image/upload/v1667402255/civil_muxls8.png",
  },
  {
    text: "META",
    cb: "timetable-meta",
    url: "https://res.cloudinary.com/dlba1yian/image/upload/v1667402101/meta_lizyla.png",
  },
  {
    text: "BIOCHEM",
    cb: "timetable-biochem",
    url: "https://res.cloudinary.com/dlba1yian/image/upload/v1667401894/biochem_biomedical_pharma_time_table_vxlzpu.png",
  },
  {
    text: "BIOMED",
    cb: "timetable-biomed",
    url: "https://res.cloudinary.com/dlba1yian/image/upload/v1667401894/biochem_biomedical_pharma_time_table_vxlzpu.png",
  },
  {
    text: "PHARMA",
    cb: "timetable-pharma",
    url: "https://res.cloudinary.com/dlba1yian/image/upload/v1667401894/biochem_biomedical_pharma_time_table_vxlzpu.png",
  },
  {
    text: "CERA",
    cb: "timetable-cera",
    url: "https://res.cloudinary.com/dlba1yian/image/upload/v1667402045/cera_matsci_j64hds.png",
  },
  {
    text: "ECE",
    cb: "timetable-ece",
    url: "https://res.cloudinary.com/dlba1yian/image/upload/v1667402413/ece_ep_x0fpls.png",
  },
  {
    text: "IC",
    cb: "timetable-ic",
    url: "https://res.cloudinary.com/dlba1yian/image/upload/v1667401977/chem_ic_time_table_nw2kvt.png",
  },
  {
    text: "MATERIAL SCIENCE",
    cb: "timetable-matsci",
    url: "https://res.cloudinary.com/dlba1yian/image/upload/v1667402045/cera_matsci_j64hds.png",
  },
  {
    text: "MINING",
    cb: "timetable-mining",
    url: "https://res.cloudinary.com/dlba1yian/image/upload/v1667402158/mining_sbv1kb.png",
  },
  {
    text: "AP",
    cb: "timetable-ap",
    url: "https://res.cloudinary.com/dlba1yian/image/upload/v1667402477/arch_a1zuhn.png",
  },
  {
    text: "EP",
    cb: "timetable-ep",
    url: "https://res.cloudinary.com/dlba1yian/image/upload/v1667402413/ece_ep_x0fpls.png",
  },
];

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
const medicalFacilities = `
🏥 [Health Centre](https://www.google.com/maps/place/Student+Health+Centre,+Banaras+Hindu+University/@25.2700312,82.986463,17z/data=!3m1!4b1!4m5!3m4!1s0x398e3228b8d042cd:0xe89a2d87d8ccab17!8m2!3d25.2700312!4d82.9886517)
🚑 [Trauma Centre](https://goo.gl/maps/Z7Nrc3uh7RxfQnfo8)
🧑‍⚕️ [SundarLal Hospital](https://goo.gl/maps/cmSbc6n6pZ4btBJ59)
`;

const gates = `
[🏛️Seer Gate](https://goo.gl/maps/KyG1FkyhHAQyGeGc7)
[🏢Hyderabad Gate](https://goo.gl/maps/mKbkxhGC9gNxQh4M9)
[🏣Lanka Gate](https://goo.gl/maps/BtWYYFKneZs4KzgT7)
[🏬Naraia Gate](https://goo.gl/maps/WrV9ASyZrPfs7bgU6)
`;
const sports = `
Here are the sports grounds on our campus:
[Rajputana](https://goo.gl/maps/DGwywSjg2HoSHYFj8)
[Gymkhana](https://goo.gl/maps/9gYchcEGNT1Zr3Nb9)
[Athletic Ground](https://goo.gl/maps/YSvxWe8VtzvbJwFJ8)
[Students Activity Centre (SAC)](https://goo.gl/maps/b2KPRtkEJan2LcNZ9)
[BHU Pool](https://goo.gl/maps/uxAmEWXRPqcyMRfR7)
`;

const bot = new Bot(Deno.env.get("TELEGRAM_BOT_TOKEN") || "");

const handleUpdate = webhookCallback(bot, "std/http");

const commands = [
  {
    text: "Can't find my LT. Welpp!😥",
    cb: "LT",
    data: lectureHalls,
  },
  {
    text: "What did you just say?😤",
    cb: "Lingo",
    data: lingo,
  },
  {
    text: "Ugh, which hostel was that again?😅",
    cb: "Hostel",
    data: hostels,
  },
  {
    text: "Can't remember my timetable?🕐",
    cb: "timetable",
    data: "",
  },
  {
    text: "Where is my department?🤨",
    cb: "dept",
    data: departments,
  },
  {
    text: "Medical emergency. Help!💉",
    cb: "Medical",
    data: medicalFacilities,
  },
  {
    text: "🚪Gates of IIT BHU",
    cb: "Gates",
    data: gates,
  },
  {
    text: "Wanna play? 😏",
    cb: "Sports",
    data: sports,
  },
  {
    text: "🤣Memes",
    cb: "Memes",
    data: "",
  },
  {
    text: "Getting Bored, Want jokes??😂😂",
    cb: "jokes",
    data: "",
  },
  {
    text: "Uff!! Can't recall upcoming events😭",
    cb: "calender",
    data: "",
  },
];

const calenders = [
  {
    text: "English Calender",
    cb: "calender-english",
    url: "https://res.cloudinary.com/dlba1yian/image/upload/v1667401684/english_calender_idb3rh.png",
  },
  {
    text: "Hindi Calender",
    cb: "calender-hindi",
    url: "https://res.cloudinary.com/dlba1yian/image/upload/v1667401774/hindi_calender_fi4r8g.png",
  },
];

const keyboard = new InlineKeyboard();
commands.forEach((command) => {
  keyboard.text(command.text, command.cb);
  keyboard.row();
});

const branchKeyboard = new InlineKeyboard();
branches.forEach((branch, index) => {
  branchKeyboard.text(branch.text, branch.cb);
  if (index % 2 == 1) branchKeyboard.row();
});

const memesKeyboard = new InlineKeyboard();
memesKeyboard.text("🤣", "Memes");

const calenderKeyboard = new InlineKeyboard();
calenders.forEach((c) => {
  calenderKeyboard.text(c.text, c.cb);
});

const fetchJokes = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": Deno.env.get("RapidAPI-Key"),
    "X-RapidAPI-Host": "jokeapi-v2.p.rapidapi.com",
  },
};

bot.on("callback_query:data", async (ctx) => {
  let data = ctx.callbackQuery?.data;
  if (data.includes("calender")) {
    if (data == "calender") {
      await ctx.answerCallbackQuery("Fetching data...");
      await ctx.reply("Select Calender language: ", {
        reply_markup: calenderKeyboard,
      });
    } else {
      calenders.forEach(async (calender) => {
        if (calender.cb === data) {
          await ctx.replyWithPhoto(calender.url);
        }
      });
    }
  } else if (data == "jokes") {
    let response = await fetch(
      "https://jokeapi-v2.p.rapidapi.com/joke/Any?type=twopart",
      fetchJokes
    );
    let res = await response.json();
    ctx.answerCallbackQuery("Fetching data....");
    ctx.api.sendMessage(ctx.msg?.chat?.id, res.setup, {
      parse_mode: "Markdown",
    });
    setTimeout(
      () =>
        ctx.api.sendMessage(ctx.msg?.chat?.id, res.delivery, {
          parse_mode: "Markdown",
        }),
      5000
    );
  } else if (data === "Memes") {
    const memes = await fetchPosts("memes", {
      sort: "new",
      limit: 100,
      filterNSFW: true,
      amount: 100,
    });
    await ctx.answerCallbackQuery("Here are some memes for you");
    const meme = memes[Math.floor(Math.random() * memes.length)];
    await ctx.replyWithPhoto(meme.imageURL);
    await ctx.api.sendMessage(ctx.chat?.id, "Want more?", {
      reply_markup: memesKeyboard,
    });
  } else if (data.includes("timetable")) {
    if (data == "timetable") {
      await ctx.answerCallbackQuery("Fetching data...");
      await ctx.reply("Select your branch: ", { reply_markup: branchKeyboard });
    } else {
      branches.forEach(async (branch) => {
        if (branch.cb === data) {
          await ctx.replyWithPhoto(branch.url);
        }
      });
    }
  } else {
    commands.forEach(async (command) => {
      if (command.cb == data) {
        await ctx.answerCallbackQuery("Fetching data....");
        await ctx.reply(command.data, {
          parse_mode: "Markdown",
        });
      }
    });
  }
});

var bannerImageRequestObject = {
  template: "j14WwV5VQmjjZa7XrB",
  modifications: [
    {
      name: "name",
      text: "You can change this text",
      color: null,
      background: null,
    },
  ],
  webhook_url: null,
  transparent: false,
  metadata: null,
};

async function generateOrientationEndImage(username: string) {
  bannerImageRequestObject.modifications[0].name = username;

  var response = await fetch("https://api.bannerbear.com/v2/images", {
    method: "POST",
    body: JSON.stringify(bannerImageRequestObject),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Deno.env.get("BANNERBEAR_API_KEY")}`,
    },
  });
  let res = await response.json();
  var image = fetch(`https://api.bannerbear.com/v2/images/${res["uid"]}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${Deno.env.get("BANNERBEAR_API_KEY")}`,
    },
  });
  return image;
}

bot.command("end", async (ctx) => {
  var image = await generateOrientationEndImage(ctx.message?.chat?.first_name);
  await ctx.reply(
    "Here is a custom badge just for YOU! Congrats on making it to the end!"
  );
  await ctx.replyWithPhoto(image);
});

bot.command("start", async (ctx) => {
  await ctx.reply(
    `Welcome ${ctx.message?.chat?.first_name}! The bot is up and running. Send /commands to see all the available commands.`
  );
});

bot.command("commands", async (ctx) => {
  await ctx.reply("Here are the available commands: ", {
    reply_markup: keyboard,
  });
});

// Handler for all messages that aren't valid commands or callbacks
bot.on("message", async (ctx) => {
  await ctx.reply(
    `
    I don't seem to recognise this command.
    You can check the commands by clicking the "Menu" option beside your keyboard!
    `,
    {
      parse_mode: "Markdown",
    }
  );
});

serve(async (req) => {
  if (req.method === "POST") {
    const url = new URL(req.url);
    if (url.pathname.slice(1) === bot.token) {
      try {
        return await handleUpdate(req);
      } catch (err) {
        console.error(err);
      }
    }
  }
  return new Response();
});
