"use strict";
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const puppeteer = require("puppeteer");
const CONFIG = require("./app/config/config");
const bodyParser = require("body-parser");

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

  const contactName = "Teagretoyteelimino";
  
  const target = await page.$(`span[title='${contactName}']`);
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

