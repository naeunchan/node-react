const http = require("http");
const fs = require("fs");
const url = require("url");

function templateHTML(title, list, data) {
  const template = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>WEB1 - ${title}</title>
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      <h2>${title}</h2>
      <p>
        ${data}
      </p>
    </body>
  </html>
  `;

  return template;
}

function getFileList(fileList) {
  let list = "<ul>";

  for (let i = 0; i < fileList.length; i++) {
    list += `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
  }
  list += "</ul>";

  return list;
}

const app = http.createServer((req, res) => {
  const _url = req.url;
  const queryData = url.parse(_url, true).query;
  const pathname = url.parse(_url, true).pathname;

  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir("./data", function (error, fileList) {
        const title = "Welcome";
        const data = "Hello, Node.js!";
        const list = getFileList(fileList);

        const template = templateHTML(title, list, data);
        res.writeHead(200);
        res.end(template);
      });
    } else {
      fs.readdir("./data", function (error, fileList) {
        const title = queryData.id;
        const list = getFileList(fileList);

        fs.readFile(`data/${title}`, "utf8", function (error, data) {
          const template = templateHTML(title, list, data);
          res.writeHead(200);
          res.end(template);
        });
      });
    }
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

app.listen(3000);
