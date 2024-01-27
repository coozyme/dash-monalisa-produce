const getCountPercentageStatusProduction = (totalDataProduction, totalDataStatus) => {
   const percentage = (totalDataStatus / totalDataProduction) * 100;
   return `${percentage?.toFixed(2)}%`;
}

const getColorStatus = (statusColor) => {
   const status = statusColor.toUpperCase()
   let data = {
      status: '',
      color: '',
   }
   switch (status) {
      case 'OPEN':
         data.status = status
         data.color = '#d1d3d4'
         return data
      case 'PROCCESS':
         data.status = status
         data.color = '#6495ED'
         return data;
      case 'FINISH':
         data.status = status
         data.color = '#02e00c'
         return data;
      case 'CLOSED':
         data.status = status
         data.color = '#6e819a'
         return data;
      case 'CANCEL':
         data.status = status
         data.color = '#6e819a'
         return data;
      case 'ON_HOLD':
         data.status = status
         data.color = '#6e819a'
         return data;
      default:
         return data;
   }
   // if (status == 'OPEN') {
   //    data.status = status
   //    data.color = '#d1d3d4'
   //    return data
   // } else if (status == 'PROCCESS') {
   //    data.status = status
   //    data.color = '#6495ED'
   //    return data;
   // } else if (status == 'FINISH') {
   //    data.status = status
   //    data.color = '#02e00c'
   //    return data;
   // } else if (status == 'CLOSED') {
   //    data.status = status
   //    data.color = '#6e819a'
   //    return data;
   // } else if (status == 'CANCEL') {
   //    data.status = status
   //    data.color = '#6e819a'
   //    return data;
   // } else if (status == 'ON_HOLD') {
   //    data.status = status
   //    data.color = '#6e819a'
   //    return data;
   // }
}

module.exports = {
   getColorStatus,
   getCountPercentageStatusProduction
}