const { webkit } = require('playwright');
const expect = require('expect');
const { addAttach } = require("jest-html-reporters/helper");
const chalk = require('chalk');
var using = require('jasmine-data-provider');
const log = console.log

let browser;
let page;
let pic;


beforeAll(async () => {
  browser = await webkit.launch({
    headless: true, slowMo: 50
  });
})

beforeEach(async () => {
  page = await browser.newPage();
  context = await browser.newContext();
});


afterAll(async () => {
  await context.close();
  await browser.close();
})

afterEach(async () => {
  await page.close();
});

using(
  [
     { url: 'http://whatsmyuseragent.org/' },
     { url: 'http://google.com/'},
     { url: 'https://playwright.dev/'},
     { url: 'http://facebook.com/'},
     { url: 'http://youtube.com/'}
  ]
  , function (data) {



    test(`Should display correct page 1 ${data.url}`, async () => {


      try {
        await page.goto(data.url);
        expect("carlos").toEqual("carlos")

        // Body

        log(chalk.bold.green("-- Test Completed --"))
      
      } catch (error) {
        log(chalk.bold.red("-- Save Screenshot --"))
        pic = await page.screenshot();
        await addAttach(pic, data.url, this.global);

        log(chalk.bold.red("-- Test Failed --"))
        throw new Error(error) 
    }

  })

})




