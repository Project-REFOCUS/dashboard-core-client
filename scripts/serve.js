const { createBuildConfig } = require('./options');
const http = require('http');

const internalPort = 9001;
const esbuildPluginProxyConfiguration = {
    esbuild: {
        servedir: './dist',
        port: internalPort
    },
    proxy: {
        port: 8000,
        path: '/',
        filters: [
            { name: 'esbuild', methods: ['GET'], urls: ['/'] },
            { name: 'esbuildJsAssets', methods: ['GET'], urls: ['.*js'] },
            { name: 'esbuildCssAssets', methods: ['GET'], urls: ['.*css'] },
            { name: 'esbuildSourceMap', methods: ['GET'], urls: ['.*js.map'] },
        ],
        esbuild: {
            host: 'localhost',
            port: internalPort,
            path: '/'
        },
        esbuildJsAssets: {
            host: 'localhost',
            port: internalPort,
            path: '/js/index.js'
        },
        esbuildCssAssets: {
            host: 'localhost',
            port: internalPort,
            path: '/js/index.css'
        },
        esbuildSourceMap: {
            host: 'localhost',
            port: internalPort,
            path: '/js/index.js.map'
        }
    }
};

require('esbuild').serve(esbuildPluginProxyConfiguration.esbuild, createBuildConfig(true)).then(esbuildServer => {
    const configKeywords = new Set(['filters', 'port']);
    const proxies = new Map();
    const { host: esbuildHost, port: esbuildPort } = esbuildServer;
    proxies.set('default', { host: esbuildHost, port: esbuildPort });
    Object.keys(esbuildPluginProxyConfiguration.proxy).forEach(proxyName => {
        if (!configKeywords.has(proxyName)) {
            proxies.set(proxyName, esbuildPluginProxyConfiguration.proxy[proxyName]);
        }
    });
    http.createServer((req, res) => {
        const { headers, method, url: path } = req;
        const constructedBody = [];
        req.on('data', chunk => constructedBody.push(chunk));
        req.on('end', () => {
            const httpRequest = { headers, method, path };
            const matchedFilter = esbuildPluginProxyConfiguration.proxy.filters.find(filter =>
                filter.methods.includes(method) && (!filter.urls || filter.urls.some(url => new RegExp(url + '$').test(path)))
            );
            const configuredProxy = matchedFilter && esbuildPluginProxyConfiguration.proxy[matchedFilter.name];
            if (configuredProxy) {
                httpRequest.headers.host = `${configuredProxy.host}:${configuredProxy.port}`;
                httpRequest.hostname = configuredProxy.host;
                httpRequest.port = configuredProxy.port;
                if (configuredProxy.path) {
                    httpRequest.path = configuredProxy.path.replace('[url]', path);
                }
            }
            else {
                httpRequest.headers.host = `${esbuildHost}:${esbuildPort}`;
                httpRequest.hostname = esbuildHost;
                httpRequest.port = esbuildPort;
                httpRequest.path = esbuildPluginProxyConfiguration.proxy.path;
            }
            const proxyRequest = http.request(httpRequest, proxyResponse => {
                res.writeHead(proxyResponse.statusCode, proxyResponse.headers);
                proxyResponse.pipe(res, { end: true });
            });
            constructedBody.length && proxyRequest.write(constructedBody.join());
            proxyRequest.end();
        });
    }).listen(esbuildPluginProxyConfiguration.proxy.port);
});
