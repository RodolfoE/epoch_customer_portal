Invoke-WebRequest -UseBasicParsing -Uri "http://localhost:3000/api-gateway/portal/customerSite/5742846" `
-WebSession $session `
-Headers @{
"method"="GET"
  "authority"="localhost:3000"
  "path"="/api-gateway/portal/customerSite/5742846"
  "sec-ch-ua"="`" Not A;Brand`";v=`"99`", `"Chromium`";v=`"98`", `"Google Chrome`";v=`"98`""
  "accept"="application/json"
  "authorization"="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFc3RhYmxpc2htZW50SWQiOjEsIldhcmVob3VzZUlkIjo0OTE4LCJpYXQiOjE2NDQ1ODc4NTYsImV4cCI6MTY0NDYwMjI1Niwic3ViIjoiYWRtaW4ifQ.eN2NGm85UI0NDymWRV9RCV7kSukKRSiX4mSxt4XiCXA"
  "accept-language"="pt-BR"
  "sec-ch-ua-mobile"="?0"
  "sec-ch-ua-platform"="`"Windows`""
  "sec-fetch-site"="same-origin"
  "sec-fetch-mode"="cors"
  "sec-fetch-dest"="empty"
  "referer"="http://localhost:3000/order/1524"
  "accept-encoding"="gzip, deflate, br"
  "if-none-match"="W/`"85a-xEYfQuIqfRwLEDzGOY8IEH+MQZk`""
}