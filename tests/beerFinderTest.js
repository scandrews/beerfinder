var Nightmare = require('nightmare');
var nightmare = Nightmare({show:true});

nightmare
  .goto('http://localhost:3000/')
  .click('.btn_login ')
  
  .type('.text', 'test@test.com')
  .type('.password', 'test')
  .click('.btn ')

  .wait()

  
  .screenshot("test-dahboard-page.png")
  
  .wait()

  
  .evaluate(function () {
    return document.querySelector('.jumbotron').href;
  })
  .end()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
