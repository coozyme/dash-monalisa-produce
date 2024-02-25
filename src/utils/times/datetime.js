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

function GetThisMonthAndYear() {
   const today = new Date();
   const thisMonth = today.getMonth() + 1; // Bulan dimulai dari 0, tambahkan 1 untuk mendapatkan bulan aktual
   const thisYear = today.getFullYear();

   return { month: thisMonth, year: thisYear };
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
            year: currentYear,
            firstDate: firstDate.toLocaleDateString(),
            lastDate: lastDate.toLocaleDateString()
         });
   }

   return datesPerMonth;
}

function GetWeekdayDates(month, year) {
   const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
   const dates = [];
   const today = new Date();

   // Looping untuk setiap tanggal dalam bulan
   for (let date = 1; date <= 31; date++) {
      const currentDate = new Date(year, month - 1, date); // Bulan dimulai dari 0
      const currentDay = currentDate.getDay(); // Mendapatkan hari dalam bentuk angka (0-6)
      console.log('LOG-currentDate.toLocaleDateString', currentDate.toLocaleDateString())
      console.log('LOG-today.toLocaleDateString', today.toLocaleDateString())
      // Menambahkan tanggal jika hari merupakan salah satu hari kerja
      if (currentDate.toLocaleDateString() != today.toLocaleDateString()) {
         if (currentDay >= 1 && currentDay <= 5) {
            dates.push({
               date: currentDate.toLocaleDateString(),
               day: weekdays[currentDay]
            });
         }
         continue
      } else {
         break
      }
   }

   return dates;
}

// Contoh pemanggilan fungsi untuk bulan Februari 2024
// const year = 2024;
// const month = 2; // Februari
// const weekdayDates = getWeekdayDates(year, month);
// console.log(weekdayDates);


function getFirstMondaysAndSaturdays() {
   const today = new Date();
   const year = today.getFullYear();
   const month = today.getMonth(); // Bulan dimulai dari 0

   const firstDateOfMonth = new Date(year, month, 1);
   const firstDayOfMonth = firstDateOfMonth.getDay(); // Mendapatkan hari dalam bentuk angka (0-6)

   const firstMonday = firstDateOfMonth.getDate() + (8 - firstDayOfMonth); // 8 - hari awal untuk mendapatkan Senin pertama
   const firstSaturday = firstDateOfMonth.getDate() + (6 - firstDayOfMonth) + 6; // 6 - hari awal untuk mendapatkan Sabtu pertama

   const mondays = [];
   const saturdays = [];
   const newData = []

   // Menambahkan tanggal-tanggal Senin dalam bulan ini
   for (let i = firstMonday; i <= 31; i += 7) {
      mondays.push(new Date(year, month, i));
      const ob = {
         monday: new Date(year, month, i),
         saturdays: new Date(year, month, i)
      }
      newData.push(ob)
   }

   // Menambahkan tanggal-tanggal Sabtu dalam bulan ini
   for (let i = firstSaturday; i <= 31; i += 7) {
      saturdays.push(new Date(year, month, i));
   }

   return { mondays, saturdays };
}

module.exports = {
   ConvertDateTimeUTC,
   GetFirstDateAndLastDateOfMonth,
   GetFirstAndLastDatesPerMonthOfYear,
   GetWeekdayDates,
   GetThisMonthAndYear
};