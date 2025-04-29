import http from 'node:http';
import url from 'node:url';

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);

  if (pathname === '/') {
    // res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Hello World</h1>');
  } else if (pathname === '/api/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
  } else if (pathname === '/api/oauth/Login') {
  
    res.end('');
  } else {
  }
});

server.listen(3002, () => {
  console.log('Server running at http://localhost:3002/');
});
