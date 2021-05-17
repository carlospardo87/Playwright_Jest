//const { chromium } = require('playwright');
const {webkit} = require('playwright');
const expect = require('expect');
const { addAttach } = require("jest-html-reporters/helper");
var using = require('jasmine-data-provider');
const chalk = require('chalk');
const log = console.log
const assert = require('assert');


let browser, pic, context, page
let iter = 0


beforeAll(async () => {
  browser = await webkit.launch({
    headless: false, slowMo: 50
  });
 // await browser.close();

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
    {firstName:'user1', address:'address1', city: "city1", state: 'state1', zip:"zip1", cc: 'card1', nameCard:  'user1' },
    {firstName:'user2', address:'address2', city: "city2", state: 'state2', zip:"zip2", cc: 'card2', nameCard:  'user2' },
    {firstName:'user3', address:'address3', city: "city3", state: 'state3', zip:"zip3", cc: 'card3', nameCard:  'user3' }
  ]
  , function (data) {


    test(`Should purchase fly - ${data.firstName}`, async () => {
        
      let url = "https://blazedemo.com/"
  

      try {
        await page.goto(url);
        await page.click('text=Find Flights');

        // Click text=Choose This Flight
        await page.click('text=Choose This Flight');
        assert.strictEqual(page.url(), url + 'purchase.php');

        // Fill [placeholder="First Last"]
        await page.fill('[placeholder="First Last"]', data.firstName);


        // Fill [placeholder="123 Main St."]
        await page.fill('[placeholder="123 Main St."]', data.address);

      
        // Fill [placeholder="Anytown"]
        await page.fill('[placeholder="Anytown"]', data.city);


        // Fill [placeholder="State"]
        await page.fill('[placeholder="State"]', data.state);

        // Fill [placeholder="12345"]
        await page.fill('[placeholder="12345"]', data.zip);


        // Fill [placeholder="Credit Card Number"]
        await page.fill('[placeholder="Credit Card Number"]', data.cc);


        // Fill [placeholder="John Smith"]
        await page.fill('[placeholder="John Smith"]', data.nameCard);

        // Check input[name="rememberMe"]
        await page.check('input[name="rememberMe"]');

        // Click text=Purchase Flight
        await page.click('text=Purchase Flight');
        assert.strictEqual(page.url(), url+'confirmation.php');

        // Click text=Thank you for your purchase today!
        assert.strictEqual(await page.innerText('h1'), 'Thank you for your purchase today!')
        


        log(chalk.bold.green("-- Test Completed --"+ ++iter))

      } catch (error) {
        log(chalk.bold.red("-- Save Screenshot --"))
        pic = await page.screenshot();
        await addAttach(pic, url, this.global);

        log(chalk.bold.red("-- Test Failed --"))
        throw new Error(error)
      }

    }, 15000)

  });




