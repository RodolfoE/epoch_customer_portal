/** Always pay attention to where the request url and its correct port*/

import fetch from 'node-fetch';
import { readFile } from 'fs/promises';

( async () => {

    const response = await fetch("http://localhost:3330/api-gateway/portal/customerSite/6006507", {
      "headers": {
        "accept": "application/json",
        "accept-language": "pt-BR",
        "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFc3RhYmxpc2htZW50SWQiOjEsIldhcmVob3VzZUlkIjo0OTE4LCJpYXQiOjE2NDk3OTA5ODEsImV4cCI6MTY0OTgwNTM4MSwic3ViIjoiZ3VpbGhlcm1lLmVzdGV2ZXMifQ.VbhSe6Jant4_zWCIhBSK1lApcWqrSmF1Bz7G0ad3suA",
        "if-none-match": "W/\"2852d-DTcq3Zcv8HpGjaCr+gMoH3rtbxU\"",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "cookie": "_session.legacy=oUrRU5f1xc0Pgs74gzFPr; _session.legacy.sig=teVsftjq8Gujsb-BGQMF10lGM9c; refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6IkdFc3RldmVzQFdhYnRlYy5jb20iLCJpYXQiOjE2NDk3OTA5ODEsImV4cCI6MTY1MjM4Mjk4MSwic3ViIjoiZ3VpbGhlcm1lLmVzdGV2ZXMifQ.XXI5dAF9_wMHaKMil7CvVd5RyrGPjPAKljvOzktboyI",
        "Referer": "http://localhost:3000/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": null,
      "method": "GET"
    });
    
    doSomethingWith(await response.json());
})(); 

const doSomethingWith = (resp) => {
    console.log(resp);
}