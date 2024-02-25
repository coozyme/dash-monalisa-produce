const CalculateMaterialProduction = (data) => {
   let totalMeter = 0;
   let totalKg = 0;
   if (data?.length === 0) return {
      totalMeter: totalMeter,
      totalKg: totalKg
   }
   console.log('LOG-data-material', data)
   data.forEach((item) => {
      // const meter = 0
      if (item?.unit?.toUpperCase() === "KG") {

         totalKg += item?.quantity;
      } else {
         totalMeter += ConvertToMeter(item.unit, item.quantity);
      }
   });
   console.log('LOG-totalCalculation', totalMeter, totalKg)

   return {
      totalMeter: totalMeter,
      totalKg: totalKg
   };
}

// 1 Lembar -> Meter = * 1.5
// 1 Yard -> Meter  = * 0.9144

const ConvertToMeter = (unit, quantity) => {
   console.log('LOG-ConvertToMeter', unit, quantity)
   // switch (unit.toUpperCase()) {
   //    case "METER":
   //       return quantity;
   //    case "YARD":
   //       return quantity * 0.9144;
   //    case "LEMBAR":
   //       return quantity * 1.5;
   //    case "ROLL":
   //       return quantity * 50;
   //    default:
   //       return quantity
   // }
   const u = unit.toUpperCase()
   if (u === "METER") {
      return quantity
   } else if (u === "YARD") {
      return quantity * 0.9144
   } else if (u === "LEMBAR") {
      return quantity * 1.5
   } else if (u === "ROLL") {
      return quantity * 50
   } else {
      return quantity
   }
}

function PercentageCalcuate(oldValue, newValue) {
   const calculate = ((newValue - oldValue) / oldValue) * 100;
   return Math.abs(calculate).toFixed(2);
}

module.exports = {
   ConvertToMeter,
   CalculateMaterialProduction,
   PercentageCalcuate
}