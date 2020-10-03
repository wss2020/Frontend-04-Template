/**
在我们开始去编写 toy browser 的第一行代码之前，我们首先要去准备一个环境，我们想要有 browser ，
一定要访问一个服务端的这样的一个网页，所以咱们这边先用 Node.js 简单的用几行代码，我们写一个服务
端的小的这样的服务端，然后我们把它运行起来，这样我们就可以接下来根据服务端去写，客户端的代码了，
那么我们大家一起来看一看 server.js 的代码。
**/

const http = require('http');

http.createServer((requset,response)=>{
    let body = [];
    requset.on('error',(err)=>{
        console.log(err);
    }).on('data',(chunk)=>{
        body.push(chunk.toString());
    }).on('end',()=>{
        body = Buffer.concat(body).toString();
        console.log("body:",body);
        response.writeHead(200,{'Content-Type':'text/html'});
        response.end(' Hello World\n');
    })
}).listen(8080);

console.log("server started");

/***
 这个代码基本上就是完全来自于网上一个例子，我们通过 require http 包，然后调用 http 的
 createServer ,按照它的格式在这个里面，我们去接收它的 request 里面的内容，然后 request
 我们需要接收一个 on error ，一个 on data 和 一个 on end ，三个不同的这样的事件，
 on error 我们就简单的，打印出来这个 error 就可以了；
 on data 我们把这个数据暂存到，一个叫做 body 的这样的一个数组里；
 然后我们会把 body 去做一次 concat，然后把这个数组里的内容拼起来，然后我们 加一个 console.log ,
 为了方便我们去解析，然后因为我们其实并不是去根据request ,然后去处理什么东西，所以我们这里
 就写死一个 response 的值，我们写一个 head ，写一个 end 就可以了，注意我们至少要写一个
 Content-Type ,然后 body 的部分我们可以随便写一段 HTML 代码，我们这里暂时先写一个
 hello world ,然后后面我们根据一些需要，我们可以改成一些我们自己想要的 HTML 代码，
 然后让我们的浏览器去解析，这就是我们的一个服务端的环境的搭建;

 接下来我们要开始写我们的 toy browser ，就是我们的客户端代码，在写代码之前还有一个工作
 就是我们要了解一下 HTTP 协议。


 * **/




/**
 POST / HTTP /1.1                                        Request

 Host:127.0.0.1                                          headers
 Content-Type:application/x-www-form-urlencoded

 field=aaa&code=x%3D1                                    body

  那么接下来我们来看看 HTTP 协议的 request 部分，HTTP 协议它是一个叫做文本型的协议，
文本型协议一般来说我们是跟二进制型的协议相对的，文本型的协议就意味着说这个协议里面，所有
的内容都是字符串，它的每一个字节都会被理解成我们的字符串的一部分，比如说我们要传个1 ，
我们不会说直接把 1 这个比特给它传过去，也不会把这个 1 放到一个字节里面去传过去，而是会用
一个字符1，也就是我们的 Unicode 或者 ASCll 编码里面的1 然后来传输这个值，而 HTTP 协议
正是这样一种文本型的协议，所以因为 HTTP 协议是在 TCP 协议的上层，所以说流淌在 TCP 协议的
流里面的所有的内容其实都可以视为是字符；
  然后我们来看 HTTP 协议的 request 的第一行叫做 request line ， request line 又
包含了三个部分，
例子： POST / HTTP /1.1
第一个部分叫做 method ，method 大家最常见的是 POST 和 GET ,当然了HTTP 协议还规定了
一些，其他的 method , 比如说 DELETE、PUT、options ，那么我们在这里就不去展开 method
了，总之我们这里应该就只会用到 POST 和 GET ；
第二项，就是一个路径是 path，path 默认它就是一个斜杠了，我们去浏览器访问的时候也可以看到在，
我们的域名后面的斜杠后面的内容就是路径，这个是作为 HTTP 协议的一个内容被放上去的，
最后是一个 HTTP 和 HTTP 版本，这里我们用了一个老的版本 1.1 ,实际上我们HTTP 协议已经有
2.0  3.0 这些新版本了，我们用一个比较简单早期的版本，这样编码起来简单一点。


 Host:127.0.0.1
 Content-Type:application/x-www-form-urlencoded
 上面这个部分，叫做 headers ，headers 它是包含多行的，它会每一行它是以一个冒号分隔的
 key 和 value 这样的一个键值对的结构，headers 的行数不固定，headers 的结束是以一个
 空行为标志进行结束的，上面最后是有一个空白行的。


 field=aaa&code=x%3D1
 然后后面是有一个body 的部分，这个 body 的部分它是由 Content-Type 来决定的，Content-Type
 规定了什么格式，那么body 就用什么格式来写，总体上可以认为body 也是一个 kv 的结构，但是
 视 Content-Type 不同，它这里面的不同的会用不同的分隔的字符 和 不同的格式，然后所有
 HTTP 里面的换行，按照规定都是 \r\n ，它是两个字符组成的一个换行符，这也是一个比较容易
 去解析错的地方，这是 HTTP request .

 * **/









