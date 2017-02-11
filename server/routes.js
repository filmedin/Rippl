var controller = require('./controllers');

module.exports = function(app, express) {

  app.get('/analyze/:handle', controller.getAnalysis);
  app.get('/delete/:handle', controller.deleteHandle);
  app.get('/rippl/:locationId', controller.getScores);
  app.get('/trends', controller.updateTrends);
  app.get('/getTrends/:locationId', controller.getTrends);
  app.get('/ripplTrend/loc/:locationId/trend/:trend', controller.getTrendAnalysis);

  // Handle errors or errant requests
  app.use(function(req, res) {
    console.log('Unhandled server request');
    console.log(req.body);
    res.status(404).end();
  });
};