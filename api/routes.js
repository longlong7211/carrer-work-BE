
module.exports = function(app) {
    let user = require('./controler/userControler');
  
    app.route('/auth')
      .get(user.get)
      .post(user.store);
  
    // app.route('/products/:productId')
    //   .get(productsCtrl.detail)
    //   .put(productsCtrl.update)
    //   .delete(productsCtrl.delete);
  };