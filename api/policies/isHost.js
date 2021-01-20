const Datastore = require("../services/Datastore/Datastore");

module.exports = function (req, res, proceed) {

  // If `req.me` is set, then we know that this request originated
  // from a logged-in user.  So we can safely proceed to the next policy--
  // or, if this is the last policy, the relevant action.
  // > For more about where `req.me` comes from, check out this app's
  // > custom hook (`api/hooks/custom/index.js`).
  async.series([
    function(callback)
    {
        Personnel.getListePersonnage(req.session.user,callback);
    }
  ],function(err,result){
   //  return res.json(result[0]);
   /*if (req.host.trim() == "http://localhost:9090") {
    return proceed();
    }*/
    //return res.json(result[0]);

    if (req.host.trim() != "tdb.easytech.mg") {
      if(req.host.trim() == "10.128.1.246"){
        // CONTINUE
      }
      else
      {
        //return res.redirect("http://tdb.easytech.mg:9090/");
      }
    }
    if(err)
    {
      return proceed();
    }
    if(result[0])
    {
      if(result[0]!="OK")
      {
        req.session.array_pers_hierarchie = result[0];
        //console.log(req.session.array_pers_hierarchie);
        return proceed();
      }
    }
  });
/*
  if (req.host.trim() == "tdb.easytech.mg") {
    return proceed();
  }

  return res.forbidden("Veuillez vous connecter à la TDB en utilisant le lien qui suit : <a href='http://tdb.easytech.mg:9090/'>http://tdb.easytech.mg:9090/</a><br/>");
*/
};
