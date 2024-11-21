export function getDeliveryOption(deliveryOptionsId){
  let deliveryOption;

    deliveryOptions.forEach((option) => {
      if(option.id===deliveryOptionsId){
        deliveryOption=option;
      }
    });
    return deliveryOption; /* || deliveryOption[0]; */
}



export const deliveryOptions=[{
  id:'1',
  deliveryDays:7,
  priceCents:0
},
{
  id:'2',
  deliveryDays:3,
  priceCents:499
},
{ 
  id:'3',
  deliveryDays:1,
  priceCents:999
}]