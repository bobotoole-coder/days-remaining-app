const {chromium}=require('playwright');
const fs=require('fs'), path=require('path'), assert=require('assert/strict'), os=require('os');
const ROOT=path.resolve(__dirname,'..'), APP=path.join(ROOT,'Pick_Up_Rev1_2026-10-14.html');
const LEGACY=path.join(ROOT,'Days_Remaining_Rev1.3_2026-09-26.html');
const OUT=process.env.TEST_OUTPUT||fs.mkdtempSync(path.join(os.tmpdir(),'pickup-test-'));
const fixtures=process.env.LEGACY_JSON?JSON.parse(fs.readFileSync(process.env.LEGACY_JSON,'utf8')).entries:[{id:1,name:'Legacy Example',url:'legacy.example',compass:'https://example.test/1',rep:'Example rep',notes:'first line\nsecond line "quoted"',originalDays:90,addedAt:new Date(2026,8,25).getTime()}];
(async()=>{
 const profile=fs.mkdtempSync(path.join(os.tmpdir(),'pickup-profile-'));
 let context=await chromium.launchPersistentContext(profile,{headless:true,acceptDownloads:true});
 let page=await context.newPage();let errors=[];page.on('pageerror',e=>errors.push(e.message));
 let dialogs=[];page.on('dialog',async d=>{dialogs.push(d.message());await d.accept()});
 await page.goto('file://'+LEGACY);
 await page.evaluate(d=>localStorage.setItem('days_remaining_v2',JSON.stringify(d)),fixtures);
 const baseline=await page.evaluate(()=>load().map(e=>({id:e.id,days:daysLeft(e)})));
 await page.goto('file://'+APP);
 assert.deepEqual(await page.evaluate(()=>load()),fixtures,'legacy browser storage is untouched');
 assert.deepEqual(await page.evaluate(()=>load().map(e=>({id:e.id,days:daysLeft(e)}))),baseline,'DR calendar countdown parity');
 assert.equal(await page.locator('.account-row').count(),fixtures.length);
 const normalized=await page.evaluate(d=>mergeEntries([],d,'JSON backup'),fixtures);
 assert.equal(normalized.merged.length,fixtures.length,'real backup row count reconciles');
 for(let i=0;i<fixtures.length;i++) for(const key of Object.keys(fixtures[i])) assert.deepEqual(normalized.merged[i][key],fixtures[i][key],`JSON preserves ${key}`);
 assert.equal(await page.evaluate(d=>{const first=mergeEntries([],d,'JSON backup');return mergeEntries(first.merged,d,'JSON backup').updated},fixtures),0,'repeat JSON import unchanged');
 if(process.env.LEGACY_JSON) {
  await page.evaluate(()=>localStorage.setItem(KEY,'[]'));
  await page.locator('#import-input').setInputFiles(process.env.LEGACY_JSON);
  await page.waitForFunction(n=>load().length===n,fixtures.length);
  const imported=await page.evaluate(()=>load());
  assert.deepEqual(imported,fixtures,'actual file upload preserves every legacy field');
 }
 // Editing only score/flags must not reset the DR anchor date.
 const id=fixtures[0].id;
 await page.evaluate(id=>toggleEdit(id),id);
 await page.locator('#e-pickupScore-'+id).fill('8');
 await page.locator('#e-onHold-'+id).check();
 await page.evaluate(id=>saveEdit(id),id);
 const edited=await page.evaluate(id=>load().find(e=>e.id===id),id);
 assert.equal(edited.originalDays,fixtures[0].originalDays);assert.equal(edited.addedAt,fixtures[0].addedAt);assert.equal(edited.notes,fixtures[0].notes);
 const jsonDownload=page.waitForEvent('download');await page.evaluate(()=>exportJSON());
 const jd=await jsonDownload;await jd.saveAs(path.join(OUT,'backup.json'));
 const backed=JSON.parse(fs.readFileSync(path.join(OUT,'backup.json'),'utf8'));
 assert.deepEqual(backed.entries,await page.evaluate(()=>load()));
 // CSV full multiline-note and timestamp round trip, plus legacy CSV compatibility.
 const csvDownload=page.waitForEvent('download');await page.evaluate(()=>exportCSV());
 const cd=await csvDownload;await cd.saveAs(path.join(OUT,'backup.csv'));
 const csv=fs.readFileSync(path.join(OUT,'backup.csv'),'utf8');
 const csvRestored=await page.evaluate(csv=>mergeEntries([],entriesFromCSV(csv).entries,'csv').merged,csv);
 assert.equal(csvRestored.length,fixtures.length);
 for(let i=0;i<fixtures.length;i++) {assert.equal(csvRestored[i].notes,backed.entries[i].notes);assert.equal(csvRestored[i].addedAt,backed.entries[i].addedAt);assert.equal(csvRestored[i].originalDays,backed.entries[i].originalDays)}
 if(process.env.LEGACY_CSV) {const oldCSV=fs.readFileSync(process.env.LEGACY_CSV,'utf8');const r=await page.evaluate(csv=>entriesFromCSV(csv),oldCSV);assert.equal(r.entries.length,fixtures.length);assert.equal(r.invalid,0);}
 // Synthetic UI accounts are kept out of real backup and repository.
 await page.evaluate(()=>save([]));await page.evaluate(()=>renderList());
 for(let i=1;i<=4;i++) {
  await page.locator('#inp-name').fill('Example '+i);await page.locator('#inp-url').fill('example'+i+'.test');
  await page.locator('#inp-compass').fill('https://example.test/company/'+i);
  await page.locator('#inp-ownership').selectOption(i<=3?'open':'dr');
  await page.locator('#inp-days').fill('40');await page.locator('#inp-pickupScore').fill(String(i));
  await page.locator('#inp-hqLocation').fill('United States');await page.locator('#inp-naCityState').fill('New York, NY');
  await page.locator('#inp-locationCount').fill('12+');await page.locator('#inp-onNetCount').fill('2 confirmed');
  await page.locator('#inp-addressableSpend').fill('12345.67');
  await page.locator('#inp-notes').fill('Private note — never in form');
  if(i===1) {await page.locator('#inp-onHold').check();await page.locator('#inp-hasDuplicates').check()}
  await page.evaluate(()=>addEntry());
 }
 assert.equal(await page.locator('.account-row').count(),4);
 const saved=await page.evaluate(()=>load());assert.equal(saved[0].onHold,true);assert.equal(saved[0].hasDuplicates,true);
 for(const sort of ['days-asc','days-desc','name','rep','added','score-asc','score-desc']) {
  await page.selectOption('#sort-select',sort);
  const names=await page.locator('.company-name').allTextContents();assert.ok(names[3].includes('Example 4'),'open always first: '+sort);
 }
 assert.ok((await page.locator('.company-name').first().textContent()).includes('Example 3'),'score descending');
 await page.locator('#inp-name').fill('Different name');await page.locator('#inp-url').fill('https://www.example1.test/path');await page.locator('#inp-days').fill('10');
 await page.evaluate(()=>addEntry());assert.equal(await page.locator('.account-row').count(),4,'domain duplicate blocked');
 await page.evaluate(()=>{const data=load();const panelId=data[1].id;toggleEdit(panelId);document.getElementById('e-url-'+panelId).value=data[0].url;saveEdit(panelId)});
 assert.equal((await page.evaluate(()=>load()))[1].url,saved[1].url,'duplicate edit blocked');
 const tm=await page.evaluate(()=>entriesFromCSV('Company Name,Company URL,Status,Days Remaining\nNew DR,new.test,DR,9\nOpen co,open.test,Pick Up,\nNo,bad.test,TAKEN,2'));
 assert.equal(tm.entries.length,2);assert.equal(tm.nonDr,1);assert.equal(tm.entries[1].ownership,'open');assert.equal(tm.entries[1].originalDays,0);
 await page.locator('.pickup-check').nth(0).check();await page.locator('.pickup-check').nth(1).check();await page.locator('.pickup-check').nth(2).check();
 await page.locator('.pickup-check').nth(3).click();assert.equal(await page.locator('.pickup-check:checked').count(),3);
 await page.evaluate(()=>exportPickupForm());assert.ok(dialogs.at(-1).includes('header'),'count required');
 await page.locator('summary').click();await page.locator('#header-currentCount').fill('91');
 const beforeExport=await page.evaluate(()=>load());
 for(let count=3;count>=1;count--) {
  const dlPromise=page.waitForEvent('download');await page.evaluate(()=>exportPickupForm());const dl=await dlPromise;await dl.saveAs(path.join(OUT,`pickup-${count}.xlsx`));
  assert.deepEqual(await page.evaluate(()=>load()),beforeExport,'export does not mutate accounts');
  if(count>1) await page.locator('.pickup-check:checked').last().uncheck();
 }
 // Unknown imported fields and newer enrichments survive old-format incremental reimport.
 assert.equal(await page.evaluate(()=>{const a=load()[0];return mergeEntries([{...a,unknownFutureField:'keep'}],[{id:a.id,name:a.name,originalDays:a.originalDays,addedAt:a.addedAt}], 'JSON').merged[0].unknownFutureField}),'keep');
 const expected=await page.evaluate(()=>load()),settings=await page.evaluate(()=>formSettings());
 const legacyUntouched=await page.evaluate(()=>JSON.parse(localStorage.getItem(LEGACY_KEY)));assert.deepEqual(legacyUntouched,fixtures);
 await page.screenshot({path:path.join(OUT,'app.png'),fullPage:true});
 await context.close();
 context=await chromium.launchPersistentContext(profile,{headless:true});page=await context.newPage();await page.goto('file://'+APP);
 assert.deepEqual(await page.evaluate(()=>load()),expected,'close/reopen persistence');assert.deepEqual(await page.evaluate(()=>formSettings()),settings,'header persistence');
 await page.evaluate(()=>{save([]);localStorage.removeItem(SETTINGS_KEY)});
 page.on('dialog',async d=>await d.accept());await page.locator('#import-input').setInputFiles(path.join(OUT,'backup.json'));
 await page.waitForFunction(n=>load().length===n,backed.entries.length);
 assert.deepEqual(await page.evaluate(()=>load()),backed.entries,'exact new JSON restore');
 assert.deepEqual(await page.evaluate(()=>formSettings()),backed.formSettings,'JSON header restore');
 assert.deepEqual(errors,[]);await context.close();
 console.log(JSON.stringify({passed:true,legacyRecords:fixtures.length,checks:'countdowns, JSON/CSV import, all legacy fields, exact JSON restore, idempotency, duplicate add/edit, enrichment, flags, sorting, selection limit, XLSX 1–3, non-mutating export, close/reopen',output:OUT},null,2));
})().catch(e=>{console.error(e);process.exit(1)});
