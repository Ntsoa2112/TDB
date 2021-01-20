
module.exports = function (req, res, proceed) {

  // If `req.me` is set, then we know that this request originated
  // from a logged-in user.  So we can safely proceed to the next policy--
  // or, if this is the last policy, the relevant action.
  // > For more about where `req.me` comes from, check out this app's
  // > custom hook (`api/hooks/custom/index.js`).
  if (req.session.id_departement == 12 || req.session.id_departement == 23) {
    return proceed();
  }

  //--•
  // Otherwise, this page go to -> Forbuden
  return res.forbidden("La page que vous voulez atteindre requiert un accès Neocles <br/>");

};
