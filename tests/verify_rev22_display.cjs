const {chromium}=require('playwright');
const fs=require('fs'),assert=require('assert/strict'),path=require('path');
(async()=>{
const browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1100,height:950},timezoneId:'America/New_York'});let errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
await page.goto('file://'+path.resolve('Pick_Up_Rev2.2_2026-10-23.html'));
const backup=JSON.parse(fs.readFileSync(process.env.CURRENT_BACKUP));await page.locator('#import-input').setInputFiles(process.env.CURRENT_BACKUP);
assert.deepEqual(await page.evaluate(()=>load()),backup.entries);
const counts=await page.evaluate(()=>{const a=load().filter(e=>stateOf(e)==='active'),r=a.filter(available),s=a.filter(e=>daysLeft(e)>0&&daysLeft(e)<=7);return {ready:r.length,evaluated:r.filter(evaluationComplete).length,soon:s.length,soonEvaluated:s.filter(evaluationComplete).length,selectable:r.filter(canRequest).length}});
const nums=await page.locator('.stat-num').allTextContents();assert.deepEqual(nums,[String(counts.ready),String(counts.soon),'290']);
assert.equal(await page.locator('.account-details[open]').count(),0);
assert.equal(await page.locator('.pickup-check').first().evaluate(e=>getComputedStyle(e).width),'26px');
assert.equal(await page.locator('.pickup-check').first().evaluate(e=>getComputedStyle(e).borderTopColor),'rgb(17, 17, 17)');
assert.equal(await page.locator('.score-large').first().evaluate(e=>getComputedStyle(e).fontSize),'28px');
await page.getByRole('button',{name:'Expand all details',exact:true}).click();assert.equal(await page.locator('.account-details[open]').count(),await page.locator('.account-details').count());
await page.getByRole('button',{name:'Collapse all details',exact:true}).click();assert.equal(await page.locator('.account-details[open]').count(),0);
await page.locator('#evaluation-filter').selectOption('needs');assert.equal(await page.locator('.account-row').count(),counts.ready-counts.evaluated+counts.soon-counts.soonEvaluated);
await page.locator('#evaluation-filter').selectOption('all');await page.screenshot({path:'/tmp/pickup22-display.png'});
assert.deepEqual(await page.evaluate(()=>load()),backup.entries,'display never mutates account evidence');assert.deepEqual(errors,[]);console.log(JSON.stringify(counts));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
