const RestrictionPage = require("../services/RestrictionPage");

 
module.exports = function(req, res, proceed) {
    var idPers = req.session.user;
    let nomMenu = req.param('menu');
    
    if(nomMenu === undefined || nomMenu === null) return res.redirect('/ldtOp?quota=0');

    RestrictionPage.checkIfAccessible(nomMenu, idPers,
        (err, isAccessible) => {
            if(err) {
                console.log(err);
                return res.redirect('/ldtOp?quota=0');
            }

            if(isAccessible) {
                RestrictionPage.decrementQuota(nomMenu, idPers,
                    (decremErr, nouveauQuota) => {
                        if(decremErr) {
                            console.log(decremErr);
                            return res.redirect('/ldtOp');
                        }

                        req.session[nomMenu] = nouveauQuota;

                        return proceed(); 
                    }
                );
            } else {
                return res.redirect('/ldtOp?quota=1');
            }
        }
    );
  
}