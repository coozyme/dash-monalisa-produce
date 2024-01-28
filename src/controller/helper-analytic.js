const getCountPercentageStatusProduction = (totalDataProduction, totalData) => {
   const percentage = (totalData / totalDataProduction) * 100;
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
         data.color = '#b8acff'
         return data;
      case 'ON_HOLD':
         data.status = 'ON HOLD'
         data.color = '#f9db7b'
         return data;
      default:
         return data;
   }
}

module.exports = {
   getColorStatus,
   getCountPercentageStatusProduction
}