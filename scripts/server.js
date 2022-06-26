/* global require, process */
const fs = require('fs');
const http = require('http');
const port = !isNaN(process.argv[2]) ? process.argv[2] : process.env.PORT || 8000;
const CONTENT_TYPES = {
    CSS: {
        contentType: 'text/css',
        pathRegex: /.*\/dist\/index\.css$/,
        filePath: './dist/index.css'
    },
    JS: {
        contentType: 'text/javascript',
        pathRegex: /.*\/dist\/index\.js$/,
        filePath: './dist/index.js'
    },
    HTML: {
        contentType: 'text/html',
        filePath: './public/index.html'
    }
};

const writeHeadWithContentType = (res, contentType) =>
    res.writeHead(200, { 'Content-Type': contentType });

const writeResponse = (filePath, res) =>
    fs.readFile(filePath, 'utf8', (err, data) => res.end(data));

const server = http.createServer();
server.on('request', (req, res) => {
    if (CONTENT_TYPES.CSS.pathRegex.test(req.url)) {
        writeHeadWithContentType(res, CONTENT_TYPES.CSS.contentType);
        writeResponse(CONTENT_TYPES.CSS.filePath, res);
    }
    else if (CONTENT_TYPES.JS.pathRegex.test(req.url)) {
        writeHeadWithContentType(res, CONTENT_TYPES.JS.contentType);
        writeResponse(CONTENT_TYPES.JS.filePath, res);
    }
    else {
        writeHeadWithContentType(res, CONTENT_TYPES.HTML.contentType);
        writeResponse(CONTENT_TYPES.HTML.filePath, res);
    }
});
server.listen(port);
