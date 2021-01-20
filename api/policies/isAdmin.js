module.exports = function (req, res, proceed) {

  // If `req.me` is set, then we know that this request originated
  // from a logged-in user.  So we can safely proceed to the next policy--
  // or, if this is the last policy, the relevant action.
  // > For more about where `req.me` comes from, check out this app's
  // > custom hook (`api/hooks/custom/index.js`).

  async.series([
    function (next) {
      Gpao.getDroit(req.session.user,next);
    }
  ],function (err,result) {
    if(err) {
      //--•
      // Bading request.
      return res.badRequest(err);
    }else {
      if (result[0].length>0){
        if(result[0][0].nivaux>=2)
          return proceed();
        else
          return res.forbidden("La page que vous voulez atteindre requiert un accès administrateur <br/>");
      } else {
        //--•
        // Otherwise, this request did not come from a logged-in user.
        return res.forbidden("La page que vous voulez atteindre requiert un accès administrateur <br/>");
      }
    }
  });



};
