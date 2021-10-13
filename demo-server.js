const path = require('path');
const express = require('express');
const inquirer = require('inquirer');
const env = require('./env');

const questions = [{
  type: 'list',
  name: 'demoName',
  message: 'Which demo do you want to serve? 👀  ',
  choices: [
    'event-driven',
    'regular',
  ],
}];

inquirer.prompt(questions).then(({ demoName }) => {
  const app = express();
  const staticRoot = path.join(__dirname, 'demos');

  if (!demoName) {
    throw new Error('demo name not selected');
  }
  
  app.use(express.static(staticRoot));
  
  app.get('/*', (_req, res) => {  
    res.sendFile(`./src/${demoName}/index.html`, { root: staticRoot });
  });
  
  app.listen(env.PORT || 3000, function () {
    console.log(`app listening on port ${env.PORT || 3000}!\n`)
  });
});
