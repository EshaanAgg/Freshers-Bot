# Fresher's Survival Bot

### How to run locally
1. Install Deno from [here](https://deno.land/).
2. Clone this repo locally and `cd` into it.
3. Run `deno run --allow-net --allow-env bot.ts`
4. Go to `@FresherSurvivalBot` on telegram to access the bot.
5. Send `/start` command.

### How to contribute
1. Change the constants like `lectureHalls` and `hostels` to contain more information in the form of fancier markdown. These constants are parsed as markdown and then act as reponses to the commands. 
2. Define a new constant, and then add the detail about that constant in the `commands` array.
