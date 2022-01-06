const dotenv = require('dotenv')
dotenv.config()
const { App } = require('@slack/bolt')

const app = new App({
  signingSecret: 'dd3e58aa383191ce3216a91acd1fc684',
  token: 'xoxb-2907859358451-2894590367607-ZpLaZcSU61epfhw9kiKSDoKg'
});

let channelId = '';

app.event('app_mention', async ({ event, say }) => {
  console.log(event);
  console.log('App Message');
});


app.event('message', async ({ event, say }) => {
  console.log('AMANNDAAAAA');
  console.log(event);
  console.log(event.text);
  if (event.text.includes('CREATE_CHANNEL')) {
      const channelName = event.text.split(":");
      console.log(channelName);

      try {
        const result = await app.client.conversations.create({
          name: channelName[1],
        });
        console.log(result);
        console.log(result.channel.id);
        channelId = result.channel.id;
      }
      catch (error) {
        console.error(error);
      }

      try {
        // Call the conversations.create method using the WebClient
        const result = await app.client.conversations.invite({
          channel: channelId,
          users: channelName[2] //"U02SH4FU4H4"
        });
        console.log(result);
        console.log('----------');
      }
      catch (error2) {
        console.error(error2);
      }

      try {
        // Call the chat.postMessage method using the built-in WebClient
        console.log('GATOOOOOOOR');
        console.log('Channel ID: ' + channelId);
        const result = await app.client.chat.postMessage({
          channel: channelId,
          text: "Description of Case: " + channelName[3]
        });
    
        // Print result
        console.log(result);
      }
      catch (error) {
        console.error(error);
      }
      
}

});




// Start your app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running on port 3000! ⚡️');
})();