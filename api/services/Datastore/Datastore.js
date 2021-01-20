
module.exports = {

    getCredentials : function() {
        let user = {
            name : process.env.TDB_DB_USERNAME,
            pass : process.env.TDB_DB_PASS
        };

        return user;
    }

};