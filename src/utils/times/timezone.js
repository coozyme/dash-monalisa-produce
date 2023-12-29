function TimeZoneIndonesia() {
   const date = new Date()
   const timeZone = 'Asia/Bangkok';
   if (typeof date === 'string') {
      return new Date(
         new Date(date).toLocaleString('en-US', {
            timeZone,
         }),
      );
   }

   return new Date(
      date.toLocaleString('en-US', {
         timeZone,
      }),
   );
}
module.exports = {
   TimeZoneIndonesia
};