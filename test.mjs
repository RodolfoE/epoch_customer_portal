import fetchNode from 'node-fetch';
import querystring from 'querystring';
import express from 'express';
const app = express();
import http from 'http';
import request from 'request';
import axios from 'axios';
import { dirname } from 'path';

const url = /*'https://dev.portal.my.sms-group.com/security/'// */'http://localhost:3002/';


/**
 * To get the authorization code locally, use the following url
 * http://localhost:3002/api/auth/oidc/auth
 * To get in dev environment, use
 * https://dev.portal.my.sms-group.com/security/api/auth/oidc/auth
 */
const getToken = async () => {
    try{
        var postData = querystring.stringify(
            {   
                grant_type: 'authorization_code', 
                code: process.argv[3], 
                client_id: '1', 
                client_secret: 'u7A5S5wo-honqqZ-4ikQ1_Gm0cYMO66cEEnIXZC6ZB9HrZu8XPOL4-5Z97ZXKO2PGMVZIPWkTeY0adkjv-VyUQ', 
                redirect_uri: 'http://http://oidcdebugger.com/debug'
            }
        );       
        console.log(postData);
        const dataSubmit = await fetchNode(`${url}api/auth/oidc/token`, 
        {
            "method": "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postData.length
            },
            body: postData
        });
        console.log(dataSubmit);
        const result = await dataSubmit.json();
        console.log(result);
    } catch (err){
        console.log("Error: ", err);
    }
};

const getMe = async (access_token) => {
    try{
        const dataSubmit = await fetchNode(`${url}api/auth/oidc/me?access_token=${access_token}`, 
        {
            "method": "GET"
        });
        console.log(dataSubmit);
        const result = await dataSubmit.json();
        console.log(result);
    }
    catch (err){
        console.log(err);
    }
}

const registerClient = async () => {
    const endpoint = `${url}api/auth/oidc/reg`;
    var options = {
      url: endpoint,
      json: true,
      method: 'POST',
      body: {
          id: 1,
          grant_types: ["authorization_code", "refresh_token"],      
          redirect_uris: [ 'http://localhost:8083/login/callback'],
          response_types: ["code"],
          access_token: "jhosoyuntokendeacessoinicial"
      },
      headers: {
        //ContentType: 'application/x-www-form-urlencoded'
        authorization: 'Bearer jhosoyuntokendeacessoinicial',
       'Cookie': '@sms:token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbkB2ZXR0YS5kaWdpdGFsIiwiZmlyc3RfbmFtZSI6IlBsYXRmb3JtIiwibGFzdF9uYW1lIjoiQWRtaW5pc3RyYXRvciIsImlzX2FkbWluIjp0cnVlLCJlbWFpbCI6bnVsbCwic3RhdHVzIjoiQUNUSVZFIiwic2VjdXJpdHkiOnt9LCJpYXQiOjE2NTA2MzI0NzQsImV4cCI6MTY1MDYzMzM3NH0.z_8HSG-wHmoBKGPBv2sscTW6IrZ4yy9BFYDFglLvmmo'
      }
    };
    request.post(options, (err, res, body) => {
      if (err) {
          return console.log(err);
      }
      console.log(`Status: ${res.statusCode}`);
      console.log(body);
      process.exit(1);
  });
}


/**
 * Working code in Customer portal
 */
 const oauthFlowInCustomerPortal = async () => {
    try{
        const authentication_code = await axios.get(
            `http://localhost:3002/api/auth/oidc/auth?${querystring.stringify({
              client_id: '1',
              response_mode: 'fragment',
              redirect_uri: 'https://oidcdebugger.com/debug',
              response_type: 'code',
              grant_type:'authorization_code',
              scope: 'openid',
              client_secret: '2xWMUibc_PoCAtFxqRu8Qs1bXXZRC-XdXPhHlm-xjuabmoHtm8kFUC9d-B1H9Ur6sgjWi1jXlwDxUDO-dBUCeQ'
            })}`, { headers: { Cookie: '@sms:token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbkB2ZXR0YS5kaWdpdGFsIiwiZmlyc3RfbmFtZSI6IlBsYXRmb3JtIiwibGFzdF9uYW1lIjoiQWRtaW5pc3RyYXRvciIsImlzX2FkbWluIjp0cnVlLCJlbWFpbCI6bnVsbCwic3RhdHVzIjoiQUNUSVZFIiwic2VjdXJpdHkiOnt9LCJpYXQiOjE2NTA5ODI1NjcsImV4cCI6MTY1OTk4MjU2N30.8jWhRb1jkttsYhUnJDvRCbl2OF7cjxUWQYyyM5XQAW0'}}
          );
        console.log(authentication_code.data);
        /*const html = document.createElement('div');
        html.innerHTML = authentication_code.data;
        console.log(html.querySelector("[name='code']").value);*/
    } catch (err){
        console.log(err, 'blakdjwf');
    }
    
}


//console.log(process.argv);

switch(process.argv[2]){
    case '1': getToken(); break;
    case '2': getMe(process.argv[3]); break;
    case '3': registerClient();
    case '4': oauthFlowInCustomerPortal();
    case '0': break;
}
console.log(dirname(''))
app.use(express.static(dirname + './'));

app.get('/authentication', (req, res, next) => {
    res.sendFile('C://Users//rodolfo.rezende//Documents//script//gettingAuthorizationCode.html');
});

app.get('/', (req, res, next) => {
    res.sendFile('C://Users//rodolfo.rezende//Documents//script//gettingToken.html');
});

const httpServer = http.createServer(app)
httpServer.listen(8083, () =>{
    console.log(`Http Server Running on port 8083`)
})

/**
 * 
      const result2 = await axios.post(
        '/security/api/auth/oidc/token',
        QueryString({
          client_id: application?.id + '',
          grant_type: 'authorization_code',
          redirect_uri: 'http://localhost:3000',
          client_secret: application?.secret,
          code: value,
        }),
      );
 */