const { webkit } = require('playwright');
const expect = require('expect');
const { addAttach } = require("jest-html-reporters/helper");
var using = require('jasmine-data-provider');

let browser;
let page;
let pic;



beforeAll(async () => {
  browser = await webkit.launch({
    headless: false , slowMo: 50 
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


it('should display correct '+ data.url, async () => {
  await page.goto(data.url);
  pic = await page.screenshot();
  await addAttach(pic, data.url, this.global);
}, 30000)

})



