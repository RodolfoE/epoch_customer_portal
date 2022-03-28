import fetchNode from 'node-fetch';
import querystring from 'querystring';
import express from 'express';
const app = express();
import http from 'http';
import request from 'request';

const url = 'http://localhost:3002/' //

const getToken = async () => {
    try{
        var postData = querystring.stringify(
            {   
                grant_type: 'authorization_code', 
                code: process.argv[3], 
                client_id: 'oidcCLIENT', 
                client_secret: 'MySecret', 
                redirect_uri: 'https://oidcdebugger.com/debug' 
            }
        );       

        const dataSubmit = await fetchNode(`${url}api/auth/oidc/token?client_id=oidcCLIENT`, 
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
    const endpoint = 'http://localhost:8080/security/api/auth/oidc/reg';
    var options = {
      url: endpoint,
      json: true,
      method: 'POST',
      body: {
          grant_types: ["authorization_code", "refresh_token"],      
          redirect_uris: [ 'http://localhost:8083/login/callback'],
          response_types: ["code"],
          access_token: "jhosoyuntokendeacessoinicial"
      },
      headers: {
        //ContentType: 'application/x-www-form-urlencoded'
        authorization: 'Bearer jhosoyuntokendeacessoinicial'
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

console.log(process.argv);

switch(process.argv[2]){
    case '1': getToken(); break;
    case '2': getMe(process.argv[3]); break;
    case '3': registerClient();
}

app.get('/reg', (req, res, next) => {
    console.log("/reg reached");
    res.send({ ok: 'ok' })
});

const httpServer = http.createServer(app)
httpServer.listen(8083,() =>{
    console.log(`Http Server Running on port 8083`)
})