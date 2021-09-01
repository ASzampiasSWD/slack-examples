const { App } = require('@slack/bolt');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/locateip', (req, res) => {
    console.log(req.body); 
    console.log(req.body.text);
    let geoip = require('geoip-lite');
    let ip = req.body.text;
    let geo = geoip.lookup(ip);
    console.log(geo);

    let data = {
        response_type: 'in_channel', // public to the channel
        text: JSON.stringify(geo),
        attachments:[
          {
            image_url: 'https://http.cat/302.jpg'
          }
      ]};
      res.json(data);
      
  });
  

const server = app.listen(3000, () => {  
    console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});


