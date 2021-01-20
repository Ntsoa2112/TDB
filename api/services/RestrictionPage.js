const Restrictions = require("../models/Restrictions");

module.exports = {

    checkIfAccessible : function(nomMenu, idPers, callback) {
        
    
        Restrictions.CheckIfAccessible(nomMenu, idPers,
            (err, results) => {
                if(err) {
                    console.log(err);
                    return callback(err);
                }
                
                let quota = results[0][nomMenu];

                (parseInt(quota) <= 0 || quota === null || quota === undefined) ? callback(null, false) : callback(null, true);
            }
        );

    },


    decrementQuota : function(nomMenu, idPers, callback) {

        Restrictions.decrementQuota(nomMenu, idPers,
            (err, results) => {
                if(err) {
                    console.log(err);
                    return callback(err);
                }

                callback(null, (results && results[0]) ? results[0][nomMenu] : -1);

            }    
        );

    },


    resetQuota : function(nomMenu, callback) {

        Restrictions.resetQuota(nomMenu, 
            (err) => {
                if(err) {
                    console.log(err);
                    return callback(err);
                }

                return callback();
            }  
        );

    },

    resetAllQuota : function(callback) {
        Restrictions.resetAllQuota(
            (err) => {
                if(err) {
                    console.log(err);
                    return callback(err);
                }

                return callback()
            }
        );
    }

};