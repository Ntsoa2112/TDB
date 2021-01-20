module.exports = function (req, res, proceed) {

  // If `req.me` is set, then we know that this request originated
  // from a logged-in user.  So we can safely proceed to the next policy--
  // or, if this is the last policy, the relevant action.
  // > For more about where `req.me` comes from, check out this app's
  // > custom hook (`api/hooks/custom/index.js`).
  if (req.session.droit==1 || req.session.niveaux == 0 || req.session.niveaux == 1) {

    return proceed();
  }

  return res.forbidden("Il faut avoir le droit CP ou ACP minimum pour accéder à cette page <br/><a href='/ldtOp'>Aller sur la page d'accueil</a>");

};
