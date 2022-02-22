/** Always pay attention to where the request url and its correct port*/

import fetch from 'node-fetch';
import { readFile } from 'fs/promises';

( async () => {

    const response = await fetch("http://localhost:3330/api-gateway/portal/order", {
        "headers": {
          "accept": "application/json",
          "accept-language": "pt-BR",
          "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFc3RhYmxpc2htZW50SWQiOjEsIldhcmVob3VzZUlkIjo0ODc4LCJpYXQiOjE2NDU1NTQzMTksImV4cCI6MTY0NTU2ODcxOSwic3ViIjoiYWRtaW4ifQ.0sHKx9SjbYgmAyN-nDcm734l9TNC-FOHbb2uAEOP-q0",
          "content-type": "application/json",
          "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Google Chrome\";v=\"98\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "cookie": "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImFkbWluQHdhYnRlYy5jb20iLCJpYXQiOjE2NDU1NTQzMTksImV4cCI6MTY0ODE0NjMxOSwic3ViIjoiYWRtaW4ifQ.ZSjOcN1oZSXiXpvVz-PblKl0oakAYnMXBItJaSYkVVM",
          "Referer": "http://localhost:3000/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "{\"customerId\":\"5769851\",\"representativeId\":null,\"startDate\":\"2022-01-23 00:00:00\",\"endDate\":\"2022-02-22 23:59:59\",\"pendingApproval\":null}",
        "method": "POST"
      });
    
    doSomethingWith(await response.json());
}); 



const doSomethingWith = (response) => {
    console.log('valor calculado frontend: ' + totalLiquidImpost(response.ItemsOrdem));
    console.log('valor calculado backend: ' + totalPriceOrder(response.ItemsOrdem));
}



/** retornado direto para o front-end */
const totalPriceOrder = (products) => {
    let totalPrice = 0;

    products.forEach(itemOrder => {
        totalPrice += (itemOrder.Quantity * (itemOrder.PriceOrigin - ((itemOrder.PriceOrigin * itemOrder.Discount) / 100).toFixed(2))) + itemOrder.ValueIpi + itemOrder.ValueST;
    });

    return totalPrice.toFixed(2);
};


/** calculado no front-end */
const totalLiquidImpost = (itemList) => {
    let totalLiquidImpost = 0;
  
    for (let x = 0; x < itemList.length; x += 1) {
      totalLiquidImpost += itemList[x].ValueST + itemList[x].ValueIpi + (itemList[x].Quantity * parseFloat((itemList[x].PriceOrigin - itemList[x].PriceOrigin * (calcDiscount(itemList[x].DiscountInf)/100)).toFixed(2)))
    }
  
    return totalLiquidImpost.toFixed(2)
}


const calcDiscount = (value) => {
    let totalDiscount = 0;
    if (!value) return totalDiscount;
    // Somatório de desconto total para desconto em cascata
    const arrayDiscount = value.split('+');
  
    for (let x = 0; x < arrayDiscount.length; x += 1) {
        if (x === 0) {
            totalDiscount = parseFloat(arrayDiscount[x]);
        } else {
            totalDiscount = (totalDiscount - (totalDiscount * (parseFloat(arrayDiscount[x]) / 100)) + parseFloat(arrayDiscount[x]));
        }
    }
    return parseFloat(totalDiscount.toFixed(2))
  }

  
doSomethingWith(
    JSON.parse(await readFile(new URL('json1.json', import.meta.url)))
);