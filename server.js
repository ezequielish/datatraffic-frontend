import express from "express";
const app = express();
import React from "react";
import { renderToString } from "react-dom/server";
import { ServerLocation } from "@reach/router";
import { App } from "./dist/ssr/app";

app.use(express.static("dist"));
app.get("*", (req, res) => {
  const html = renderToString(
    <ServerLocation url={req.url}>
      <App />
    </ServerLocation>
  );
  res.write(`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>DataTraffic</title>
    </head>
    <style>
      body,html {
        margin: 0;
        padding: 0;
        font-family: system-ui;
      }
    </style>
    <body>
      <div id="app">${html}</div>
      <div id="modal"></div>
      <script type="text/javascript" src="app.js"></script>
    </body>
  </html>
  
    `);

  res.end();
});

console.log("Express iniciando...");

app.listen(5000, () => {
  console.log("Express se ha Iniciado...");
});
