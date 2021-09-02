const dotenv = require('dotenv')
dotenv.config()
const { App } = require('@slack/bolt')
const store = require('./store')

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN
});


app.event('app_home_opened', async ({ event, say }) => {
  // Look up the user from DB
  console.log(event);
  let user = store.getUser(event.user);

  if (!user) {
    user = {
      user: event.user,
      channel: event.channel
    };
    store.addUser(user);

    await say(`Welcome Amanda!`);
    console.log('It worked!!');
  } else {
    await say('Visiting Again!');
    console.log('visiting again');
  }
});

app.event('channel_created', async ({ event, say }) => {
  console.log(event);
  console.log(event.channel["name"]);
  await say("A new channel " + event.channel["name"] + " has been created.");
});

app.event('channel_deleted', async ({ event, say }) => {
  console.log(event);
  console.log('Channel has been deleted');
});

// Start your app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running on port 3000! ⚡️');
})();


