
module.exports = function(app) {
    let user = require('./controler/userControler');
    let post =require('./controler/postControler')
  
    app.route('/auth')
      .get(user.get)
      .post(user.store)
      .patch(user.update);
  
    app.route('/auth/:userId')
    .patch(user.update);

    app.route('/post')
    .post(post.store);
  };