const http = require('http');

const server = http.createServer((request, response) => {
    let body = []
    request
        .on('error', (err) => {
            console.error(err)
        })
        .on('data', (thunk) => {
            console.log(thunk.toString())
            body.push(thunk)
        })
        .on('end', () => {
            body = Buffer.concat(body).toString()
            response.writeHead(200, { 'Content-Type': 'text/html' })
            // response.end(body)
            // response.end(' Hello World\n');
            response.end(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        body div #myid{width: 100px;background-color: #ff5000}
        body div img{width: 30px;background-color: #ff1111;}
    </style>
</head>
<body>
<div>
   <img id="myid" />
   <img />
</div>
</body>
</html>`);
        })
})

server.listen(8080, () => {
    console.log('正在监听8080端口...')
})
