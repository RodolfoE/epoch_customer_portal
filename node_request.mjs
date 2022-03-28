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
        "body": "{\"customerId\":\"5769851\",\"representativeId\":null,\"startDate\":\"2022-01-01 00:00:00\",\"endDate\":\"2022-02-22 23:59:59\",\"pendingApproval\":null}",
        "method": "POST"
      });
    
    doSomethingWith(await response.json());
})(); 

const doSomethingWith = (resp) => {
    console.log(resp);
}