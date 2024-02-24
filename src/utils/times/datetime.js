const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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

function GetFirstDateAndLastDateOfMonth() {
   var date = new Date(), y = date.getFullYear(), m = date.getMonth();
   var firstDate = new Date(y, m, 1);
   var lastDate = new Date(y, m + 1, 0);

   return {
      firstDate,
      lastDate
   }
}

function GetFirstAndLastDatesPerMonthOfYear() {
   const today = new Date();
   const currentYear = today.getFullYear();
   const currentMonth = today.getMonth() + 1; // Bulan dimulai dari 0 (Januari)

   const datesPerMonth = [];
   for (let month = 1; month <= currentMonth; month++) {
      const firstDate = new Date(currentYear, month - 1, 1); // 1 untuk tanggal pertama
      const lastDate = new Date(currentYear, month, 0); // 0 untuk tanggal terakhir bulan sebelumnya

      const monthName = monthNames[month - 1];

      datesPerMonth.push(
         {
            month: monthName,
            firstDate: firstDate.toLocaleDateString(),
            lastDate: lastDate.toLocaleDateString()
         });
   }

   return datesPerMonth;
}



module.exports = {
   ConvertDateTimeUTC,
   GetFirstDateAndLastDateOfMonth,
   GetFirstAndLastDatesPerMonthOfYear
};