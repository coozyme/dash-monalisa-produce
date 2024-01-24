function ConvertDateTimeUTC(tm) {
   // tm = tm.replace('Z', '');
   console.log('LOG-tm-before', tm)
   var dt = new Date(tm);
   const dta = dt.toLocaleDateString()
   const tme = dt.toLocaleTimeString()





   // console.log('LOG-tm', tme, dta)
   // console.log('LOG-dateParts', tm)
   // var dateParts = tm.split('T')[0].split('-');
   // var timeParts = tm.split('T')[1].split(':');
   // var trow = dt_st.split('.')[1].split(':');
   // var year = dta();
   // Months are 0-based in JavaScript
   // var month = dta.getMonth();
   // var day = dta.getDate();
   // var hour = tme.getHours();
   // var minute = tme.getMinutes();

   // return day + '/' + month + '/' + year + ' ' + hour + ':' + minute;
   return dta + ' ' + tme;
}
module.exports = {
   ConvertDateTimeUTC
};