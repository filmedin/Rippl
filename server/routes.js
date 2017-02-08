var controller = require('./controllers');

module.exports = function(app, express) {
  app.get('/analyze/:handle', controller.getAnalysis);
  app.get('/verify', controller.getRequestToken);
  app.get('/oauth', controller.getAccessToken);
  app.get('/rippl/user/:username', controller.getUserScores);
  app.get('/testuser', controller.createTestUser);
  app.get('/geo', controller.getSearchTweets);
  app.get('/home', function(req, res) {
    console.log('here');
    req.session.regenerate(function(err) {
      if (err) {
        console.log('Session regeneration error');
        res.status(404).end();
      }
      console.log('Session regenerated');
      res.status(200).end();
    });
  });

  app.get('/logout', function(req, res) {
    console.log('Logging out!');
    req.session.destroy(function(err) {
      if (err) {
        console.error('Session destruction error!');
        res.status(404).end();
      }
      console.log('Session destroyed');
      res.status(200).end();
    });
  });

  // app.post('/analyze', controller);
  // app.put('/analyze', controller);
  // app.delete('/analyze', controller);

  // Handle errors or errant requests
  app.use(function(req, res) {
    console.log('Unhandled server request');
    console.log(req.body);
    res.status(404).end();
  });
};