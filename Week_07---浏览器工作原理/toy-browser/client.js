const net = require("net");
const parser = require("./parser");

class Request {
    constructor(options) {
        this.method = options.method || "GET";
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || "/";
        this.body = options.body || {};
        this.headers = options.headers || {};
        if (!this.headers["Content-Type"]) {
            this.headers["Content-Type"] = "application/x-www-form-urlencoded";
        }

        if (this.headers["Content-Type"] === "application/json")
            this.bodyText = JSON.stringify(this.body);
        else if (this.headers["Content-Type"] === "application/x-www-form-urlencoded")
            this.bodyText = Object.keys(this.body)
                .map(key => `${key}=${encodeURIComponent(this.body[key])}`)
                .join('&');
        this.headers["Content-Length"] = this.bodyText.length;
    }

    send(connection) {
        return new Promise((resolve, reject) => {
            const parser = new ResponseParser;
            if (connection) {
                connection.write(this.toString());
            } else {
                connection = net.createConnection({
                    host: this.host,
                    port: this.port,
                }, () => {
                    connection.write(this.toString());
                })
            }
            connection.on('data', (data) => {
                // console.log(data.toString());
                parser.receive(data.toString());
                if (parser.isFinished) {
                    resolve(parser.response);
                    connection.end();
                }
            })
            connection.on('err', (err) => {
                reject(err);
                connection.end();
            })
        })
    }

    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r\n ${Object.keys(
            this.headers
        ).map(key => `${key}: ${this.headers[key]}`)
            .join('\r\n')}\r\n\r\n${this.bodyText}`
    }
}

class ResponseParser {
    constructor() {
        this.statusLine = "";
        this.headers = {};
        this.headerName = "";
        this.headerValue = "";

        this.bodyParser = null;
        this.current = this.WAITING_STATUS_LINE;
    }

    get isFinished() {
        return this.bodyParser && this.bodyParser.isFinished;
    }

    get response() {
        this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
        return {
            statusCode: RegExp.$1,
            statusText: RegExp.$2,
            headers: this.headers,
            body: this.bodyParser.content.join('')
        }
    }

    receive(string) {
        // console.log(string);
        for (let i = 0; i < string.length; i++) {
            this.current(string.charAt(i));
        }
    }

    WAITING_STATUS_LINE(char) {
        if (char === '\r') {
            this.current = this.WAITING_HEADER_LINE_END;
        } else {
            this.statusLine += char;
        }
    }

    WAITING_HEADER_LINE_END(char) {
        if (char === '\n') {
            this.current = this.WAITING_HEADER_NAME;
        }
    }

    WAITING_HEADER_NAME(char) {
        if (char === ':') {
            this.current = this.WAITING_HEADER_SPACE;
        } else if (char === '\r') {
            this.current = this.WAITING_HEADER_BLOCK_END;
            if (this.headers['Transfer-Encoding'] === 'chunked')
                this.bodyParser = new TrunkedBodyParser()
        } else {
            this.headerName += char;
        }
    }

    WAITING_HEADER_SPACE(char) {
        if (char === ' ') {
            this.current = this.WAITING_HEADER_VALUE;
        }
    }

    WAITING_HEADER_BLOCK_END(char) {
        if (char === '\n') {
            this.current = this.WAITING_BODY;
        }
    }

    WAITING_BODY(char){
        this.bodyParser.receiveChar(char);
    }

    WAITING_HEADER_VALUE(char) {
        if (char === '\r') {
            this.current = this.WAITING_HEADER_LINE_END;
            this.headers[this.headerName] = this.headerValue;
            this.headerName = "";
            this.headerValue = "";
        } else {
            this.headerValue += char;
        }
    }
}

class TrunkedBodyParser {
    constructor() {
        this.current = this.WAITING_LENGTH
        this.length = 0
        this.content = []
        this.isFinished = false
    }

    WAITING_LENGTH(char) {
        if (char === '\r') {
            if (this.length === 0) {
                this.isFinished = true
                this.current = this.WAITING_NEW_LINE
            } else {
                this.current = this.WAITING_LENGTH_END
            }
        } else {
            this.length *= 16
            this.length += parseInt(char, 16)
        }
    }
    WAITING_LENGTH_END(char){
        if (char === '\n') {
            this.current = this.READING_TRUNK
        }
    }
    READING_TRUNK(char){
        this.content.push(char)
        this.length--
        if (this.length === 0) {
            this.current = this.WAITING_NEW_LINE
        }
    }
    WAITING_NEW_LINE(char){
        if (char === '\r') {
            this.current = this.WAITING_NEW_LINE_END
        }
    }
    WAITING_NEW_LINE_END(char){
        if (char === '\n') {
            this.current = this.WAITING_LENGTH
        }
    }
    receiveChar(char) {
        this.current(char);
    }
}

void async function () {
    let request = new Request({
        method: "POST",
        host: "127.0.0.1",
        port: "8080",
        path: "/",
        headers: {
            ["X-Foo2"]: "customed"
        },
        body: {
            name: "winter"
        }
    });
    let response = await request.send();
    console.log('--------------------------')
    console.log(response);

    let dom = parser.parseHTML(response.body);

    console.log(dom);

}();
