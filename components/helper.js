const bcrypt = require("bcrypt");
var crypto = require("crypto");
const saltRounds = 10;

const hashPassword = async (password) => {
  const securepassword = await bcrypt.hash(password, saltRounds);
  console.log("securepassword");
  console.log(securepassword);
  return securepassword;
};
function createUUID(len) {
    var buf = [],
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        charlen = chars.length,
        length = len || 32;
        
    for (var i = 0; i < length; i++) {
        buf[i] = chars.charAt(Math.floor(Math.random() * charlen));
    }
    
    return buf.join('');
}

const getCurrentDateTime=()=>{
    var oDate = new Date();
    var nHrs = oDate.getHours();
    var nMin = oDate.getMinutes();
    var nDate = oDate.getDate();
    var nMnth = oDate.getMonth();
    var nYear = oDate.getFullYear();

    // con.log(nDate + '' + nMnth + ' - ' + nYear);
    // con.log(nHrs + ' : ' + nMin);
    return nDate + '/' + nMnth + '/' + nYear +'   '+nHrs + ' : ' + nMin

}



module.exports = { hashPassword,createUUID ,getCurrentDateTime};