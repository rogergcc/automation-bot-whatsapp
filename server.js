"use strict";
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const puppeteer = require("puppeteer");

const CONFIG = require("./app/config/config");
// const morgan = require('morgan')
// const createError = require('http-errors')
const bodyParser = require("body-parser");

//https://www.npmjs.com/package/image-to-ascii
//other project

// const App = express()
// App.use(bodyParser.json())
// // App.use(morgan('dev'))
// App.use(express.json())
// App.use(express.urlencoded({ extended: true }))

// App.post('/webhooks/telegram', (req, res, next) => {
//   console.log(req.body);

//   res.send({ status: "ok" });

// });

const isNumeric = (num) =>
  (typeof num === "number" || (typeof num === "string" && num.trim() !== "")) &&
  !isNaN(num);

async function scrape(url) {
  //   const browser = await puppeteer.launch({ headless: false });

  //same web browser chrome, same account.
  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    args: ["--user-data-dir=./Google/Chrome/User Data/"],
  });

  const page = await browser.newPage();
  //   await page.setUserAgent(
  //     "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  //   );
  await page.goto(url);
  await page.waitForSelector("._1MXsz");

  //   await page.waitForSelector("span [title='Teagretoyteelimino']");


  const target = await page.$("span[title='Teagretoyteelimino']");
  await target.click();

//   const contactName = "Teagretoyteelimino";
//   await page.click(`span[title='${contactName}']`);



  const inp = await page.$(
    "#main > footer > div._3ee1T._1LkpH.copyable-area > div._3uMse > div > div._3FRCZ.copyable-text.selectable-text"
  );

  for (let i = 0; i < 3; i++) {
    await inp.type("ok this is magic:_");
    await page.keyboard.press("Enter");
  }
}

scrape("https://web.whatsapp.com");

// App.listen(CONFIG.PORT, function (error) {
//   if (error) return console.log(error);
//   console.log(`Servidor corriendo en el Puerto: ${CONFIG.HOST}:${CONFIG.PORT}`);
// });
