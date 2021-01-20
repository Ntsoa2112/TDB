
module.exports = {
    getDateNow: function() {
        let now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth() + 1;
        let yyyy = now.getFullYear();
        let hh = now.getHours();
        let MM = now.getMinutes();
        let ss = now.getSeconds();
    
        if(dd < 10) dd = '0' + dd;
        if(mm < 10) mm = '0' + mm;
        if(hh < 10) hh = '0' + hh;
        if(MM < 10) MM = '0' + MM;
        if(ss < 10) ss = '0' + ss;
    
        let results =  {
          date : yyyy + '-' + mm + '-' + dd,
          heure : hh + ':' + MM + ':' + ss
        }
    
        return results;
    },
}