const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer(function(req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
    console.log('success')
    if('input' in params){
      res.writeHead(200, {'Content-Type': 'application/json'});
      let randomNum= Math.floor(Math.random()*5)
      const choices = ['rock','paper','scissors','lizard','spock']
      let botChoice = choices[randomNum]   
      let userChoice = params['input']
        console.log(userChoice)
      
      const winCheck = () => {

        if (userChoice === botChoice ){
            return 'Tie'
        }else if (userChoice === 'scissors' && botChoice === 'paper'){
            return 'Winner' 
        }else if (userChoice === 'scissors' && botChoice === 'lizard'){
            return 'Winner'
        }else if (userChoice === 'paper' && botChoice === 'rock'){
            return 'Winner'
        }else if (userChoice === 'paper' && botChoice === 'spock'){
            return 'Winner'
        }else if (userChoice === 'rock' && botChoice === 'lizard'){
            return 'Winner'
        }else if (userChoice === 'rock' && botChoice === 'scissors'){
            return 'Winner'
        }else if (userChoice === 'lizard' && botChoice === 'spock'){
            return 'Winner'
        }else if (userChoice === 'lizard' && botChoice === 'paper'){
            return 'Winner'
        }else if (userChoice === 'spock' && botChoice === 'rock'){
            return 'Winner'
        }else if (userChoice === 'spock' && botChoice === 'scissors'){
            return 'Winner'
        }else{
            return 'Loser'
        }
    }
    const winResult = winCheck()
    res.end(JSON.stringify(winResult));
   }
  }
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }

});
server.listen(8000, ()=>console.log('serverIsRunning'));