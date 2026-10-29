const fs=require('fs'),path=require('path'),os=require('os'),assert=require('assert/strict'),{chromium}=require('/root/.openclaw/tools/playwright/node_modules/playwright');
(async()=>{
const root=path.resolve(__dirname,'..'),url='file://'+root+'/Pick_Up_Rev2.7_2026-10-29.html',tmp=fs.mkdtempSync(path.join(os.tmpdir(),'pickup27-')),errors=[],dialogs=[];let ctx,p;
async function open(profile){ctx=await chromium.launchPersistentContext(profile,{headless:true,acceptDownloads:true,timezoneId:'America/New_York'});p=await ctx.newPage();p.on('pageerror',e=>errors.push(e.message));p.on('dialog',d=>{dialogs.push(d.message());return d.accept()});await p.goto(url)}
async function imp(file){await p.locator('#import-input').setInputFiles(file);await p.waitForFunction(()=>document.getElementById('import-input').value==='')}
async function download(fn,file){const wait=p.waitForEvent('download');await p.evaluate(fn);await(await wait).saveAs(file)}
const convert=e=>e.pickupScore===undefined||e.pickupScore===null||e.pickupScore===''?e:{...e,pickupScore:Number(e.pickupScore)*10,pickupScoreScale:100};
let count=0;
await open(tmp+'/real');
if(process.env.PICKUP_BACKUP){const b=JSON.parse(fs.readFileSync(process.env.PICKUP_BACKUP)),expected=b.entries.map(convert);count=b.entries.length;
await imp(process.env.PICKUP_BACKUP);const check=async()=>{assert.deepEqual(await p.evaluate(()=>load()),expected);assert.deepEqual(await p.evaluate(()=>formSettings()),b.formSettings);assert.deepEqual(await p.evaluate(()=>resolvedLedger()),b.resolutionLedger)};await check();const timers=await p.evaluate(()=>load().map(e=>[e.id,daysLeft(e),canRequest(e)]));
await imp(process.env.PICKUP_BACKUP);await check();assert.deepEqual(await p.evaluate(()=>load().map(e=>[e.id,daysLeft(e),canRequest(e)])),timers);assert(dialogs.some(s=>s.includes(`0 added, 0 updated, ${count} skipped`)));
await download(()=>exportJSON(),tmp+'/real.json');const exported=JSON.parse(fs.readFileSync(tmp+'/real.json'));assert.equal(exported.pickupScoreScale,100);assert.equal(exported.appRevision,'2.7');assert.deepEqual(exported.entries,expected);
// Representative request generation remains available, without submitting.
const workbook=await p.evaluate(()=>{const e=load().find(canRequest);return e?Array.from(pickupWorkbook([e],formSettings())):null});assert(workbook&&workbook[0]===80&&workbook[1]===75);await check();
await p.reload();await check();await ctx.close();await open(tmp+'/real');await check();await ctx.close();await open(tmp+'/restore');await imp(tmp+'/real.json');await imp(tmp+'/real.json');await check();
await download(()=>exportCSV(),tmp+'/real.csv');await ctx.close();await open(tmp+'/csv');await imp(tmp+'/real.csv');assert.deepEqual(await p.evaluate(()=>load()),expected);
// Fallback migration must not write to predecessor keys.
await p.evaluate(b=>{localStorage.clear();localStorage.setItem('pick_up_rev24',JSON.stringify({format:'pick-up-state-v24',entries:b.entries,resolutionLedger:b.resolutionLedger}));localStorage.setItem('pick_up_rev24_form',JSON.stringify(b.formSettings))},b);const old=await p.evaluate(()=>localStorage.getItem('pick_up_rev24'));await p.reload();await check();await p.evaluate(()=>save(load()));assert.equal(await p.evaluate(()=>localStorage.getItem('pick_up_rev24')),old);
await p.goto('file://'+root+'/Pick_Up_Rev2.6_2026-10-28.html');assert.deepEqual(await p.evaluate(()=>load()),b.entries);
}
await ctx.close();await open(tmp+'/synthetic');assert.match(await p.title(),/^Rev2.7/);
const e={id:900001,name:'Synthetic score',url:'example.test',compass:'',rep:'',notes:'Keep evidence 4/10',originalDays:120,addedAt:Date.now(),pickupScore:4,evaluation:'pickup',requests:[{id:'old',outcome:'denied',snapshot:{pickupScore:4}}]};
fs.writeFileSync(tmp+'/old.json',JSON.stringify({entries:[e]}));await imp(tmp+'/old.json');assert.equal((await p.evaluate(()=>load()))[0].pickupScore,40);assert.deepEqual((await p.evaluate(()=>load()))[0].requests,e.requests);
await p.evaluate(()=>{document.getElementById('inp-pickupScore').value='1'});
// Exercise the actual editor reader and its integer/range validation.
for(const score of ['1','4','43','48','100','0','101','42.5','']){const result=await p.evaluate(v=>{document.getElementById('inp-pickupScore').value=v;return readExtra('inp-')},score);if(['0','101','42.5'].includes(score))assert.equal(result,null);else{assert(result);assert.equal(result.pickupScore,score===''?'':Number(score));if(score!=='')assert.equal(result.pickupScoreScale,100)}}
assert.equal(await p.locator('#inp-pickupScore').getAttribute('max'),'100');
const before=await p.evaluate(()=>load()[0]);await p.evaluate(()=>{let d=load();d[0].pickupScore=4;save(d);setView('all')});assert.equal((await p.evaluate(()=>load()))[0].pickupScore,4);assert.match(await p.locator('#list').textContent(),/Score: 4\/100/);
await download(()=>exportJSON(),tmp+'/low.json');await ctx.close();await open(tmp+'/low');await imp(tmp+'/low.json');await imp(tmp+'/low.json');assert.equal((await p.evaluate(()=>load()))[0].pickupScore,4);
// Plain CSV distinguishes legacy scores from explicit new-scale scores.
for(const [csv,score] of [['Company Name,Days Remaining,Pick Up Score\nLegacy CSV,10,4',40],['Company Name,Days Remaining,Pick Up Score,Pick Up Score Scale\nNew CSV,10,4,100',4]]){fs.writeFileSync(tmp+'/plain.csv',csv);await imp(tmp+'/plain.csv');assert.equal((await p.evaluate(()=>load())).at(-1).pickupScore,score)}
const stable=await p.evaluate(()=>load());fs.writeFileSync(tmp+'/invalid.json',JSON.stringify({pickupScoreScale:100,entries:[{...e,pickupScore:101}]}));await imp(tmp+'/invalid.json');assert.deepEqual(await p.evaluate(()=>load()),stable);assert(dialogs.some(s=>s.includes('Invalid Pick Up Score')));
// Restore isolated single-record fixture before sorting checks.
await p.evaluate(e=>save([e]),stable[0]);
// Blank scores always sort last; 43 and 48 are distinct in both directions.
await p.evaluate(()=>{const b=load()[0];save([43,48,'',100,1].map((score,i)=>({...b,id:900010+i,name:'Score '+i,url:'score'+i+'.test',pickupScore:score,pickupScoreScale:100})));document.getElementById('sort-select').value='score-asc';setView('all')});
let scores=await p.locator('.score-large').allTextContents();assert.deepEqual(scores,['Score: 1/100','Score: 43/100','Score: 48/100','Score: 100/100','Score: —']);await p.selectOption('#sort-select','score-desc');scores=await p.locator('.score-large').allTextContents();assert.deepEqual(scores,['Score: 100/100','Score: 48/100','Score: 43/100','Score: 1/100','Score: —']);
await p.screenshot({path:tmp+'/scores.png',fullPage:true});assert.deepEqual(errors,[]);await ctx.close();console.log(JSON.stringify({passed:true,realBackupAccounts:count,legacyScoreMigration:true,repeatImportJsonCsvRestore:true,closeReopen:true,predecessorFallbackIntact:true,historyTimersSettingsLedgerPreserved:true,lowScoresNotRescaled:true,rangeAndSorting:true,requestWorkbookGenerated:true,errors},null,2));
})().catch(e=>{console.error(e);process.exit(1)});
