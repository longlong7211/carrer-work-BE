
module.exports = function(app) {
    let user = require('./controler/userControler');
  
    app.route('/auth')
      .get(user.get)
      .post(user.store)
      .patch(user.update);
  
    app.route('/auth/:userId')
    .patch(user.update);
  };