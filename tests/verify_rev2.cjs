const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),assert=require('assert/strict'),os=require('os');
const ROOT=path.resolve(__dirname,'..'),APP=path.join(ROOT,'Pick_Up_Rev2_2026-10-21.html');
const OUT=process.env.TEST_OUTPUT||fs.mkdtempSync(path.join(os.tmpdir(),'pickup-rev2-results-'));
const real=process.env.CURRENT_BACKUP?JSON.parse(fs.readFileSync(process.env.CURRENT_BACKUP)):null;
const example=(id,days=0,score=8)=>({id,name:'Example '+id,url:'example'+id+'.test',compass:'https://example.test/company/'+id,rep:'Example rep',notes:'Private note — multiline\nkept',ownership:days?'dr':'open',originalDays:days,addedAt:new Date().setHours(0,0,0,0),pickupScore:score,evaluation:'pickup',hqLocation:'United States',naCityState:'New York, NY',locationCount:'12',onNetCount:'2',addressableSpend:'12345.67'});
(async()=>{
 const profile=fs.mkdtempSync(path.join(os.tmpdir(),'pickup-rev2-profile-'));let context=await chromium.launchPersistentContext(profile,{headless:true,acceptDownloads:true});let page=await context.newPage(),errors=[],dialogs=[];
 const attach=()=>{page.on('pageerror',e=>errors.push(e.message));page.on('dialog',async d=>{dialogs.push(d.message());await d.accept()})};attach();
 await page.goto('file://'+APP);
 const reset=async data=>{await page.evaluate(data=>{save(data);selected.clear();currentView='ready';document.getElementById('search').value='';document.getElementById('evaluation-filter').value='all';document.getElementById('ready-filter').value='both';renderList()},data)};
 const edit=async(id,fields)=>{await page.evaluate(()=>setView('all'));await page.evaluate(id=>toggleEdit(id),id);for(const [key,v] of Object.entries(fields)){const l=page.locator('#e-'+key+'-'+id);if(key==='evaluation'||key==='ownership')await l.selectOption(v);else await l.fill(String(v));}await page.locator('#edit-'+id+' button.btn').click()};
 if(real){
  await page.evaluate(d=>{localStorage.removeItem(KEY);localStorage.setItem('pick_up_rev1',JSON.stringify(d.entries));localStorage.setItem('pick_up_rev1_form',JSON.stringify(d.formSettings));renderSettings();renderList()},real);
  assert.deepEqual(await page.evaluate(()=>load()),real.entries,'fallback preserves every real field');assert.deepEqual(await page.evaluate(()=>formSettings()),real.formSettings);
  const baseline=await page.evaluate(()=>load().map(e=>[e.id,daysLeft(e)]));
  await page.evaluate(()=>localStorage.setItem(KEY,'[]'));
  await page.locator('#import-input').setInputFiles(process.env.CURRENT_BACKUP);await page.waitForFunction(n=>load().length===n,real.entries.length);
  assert.deepEqual(await page.evaluate(()=>load()),real.entries,'real file-picker import preserves all fields');
  assert.deepEqual(await page.evaluate(()=>load().map(e=>[e.id,daysLeft(e)])),baseline,'all countdowns unchanged');
  await page.locator('#import-input').setInputFiles(process.env.CURRENT_BACKUP);await page.waitForTimeout(200);assert.deepEqual(await page.evaluate(()=>load()),real.entries,'repeat import unchanged');
  const id=real.entries[0].id,old=real.entries[0];await edit(id,{rep:'Saved rep',notes:'Saved notes',pickupScore:'9'});let e=await page.evaluate(id=>load().find(e=>e.id===id),id);assert.equal(e.rep,'Saved rep');assert.equal(e.addedAt,old.addedAt);assert.equal(e.originalDays,old.originalDays);
  await edit(id,{days:31,ownership:'dr'});e=await page.evaluate(id=>load().find(e=>e.id===id),id);assert.equal(e.originalDays,31);assert.equal(e.addedAt,await page.evaluate(()=>midnightToday()));
 }
 await page.evaluate(()=>{localStorage.setItem(SETTINGS_KEY,JSON.stringify({...FORM_DEFAULTS,currentCount:'91'}));renderSettings()});
 const fixtures=[example(1),example(2),example(3),example(4),example(5,7,10),example(6,8,9),example(7,0,'')];fixtures[0].pickupScore=7;fixtures[2].pickupScore=10;
 await reset(fixtures);
 const names=await page.locator('.company-name').allTextContents();assert(names[0].includes('Example 3'));assert(!names.some(n=>n.includes('Example 6')));assert(names.some(n=>n.includes('Example 7')),'missing score visible');
 assert.equal(await page.locator('.pickup-check:disabled').count(),2,'upcoming/unevaluated unselectable');
 await page.evaluate(()=>setView('all'));assert.equal(await page.locator('.account-row').count(),7);
 await page.locator('input[aria-label="Select Example 1"]').check();await page.locator('input[aria-label="Select Example 2"]').check();await page.locator('input[aria-label="Select Example 3"]').check();await page.locator('input[aria-label="Select Example 4"]').click();assert.equal(await page.evaluate(()=>selected.size),3);
 for(const n of [1,2,3]) {
  await reset([example(1),example(2),example(3),example(4)]);
  await page.evaluate(n=>{for(let id=3;id>3-n;id--)selected.add(id);updateSelection(load())},n);
  const before=await page.evaluate(()=>load());const waiting=page.waitForEvent('download');await page.locator('button', {hasText:'Generate request (Excel)'}).click();await (await waiting).saveAs(path.join(OUT,'pickup-'+n+'.xlsx'));
  assert.deepEqual(await page.evaluate(()=>load()),before,'generation never submits');
  await page.locator('button',{hasText:'Mark submitted'}).click();assert.equal(await page.evaluate(()=>load().filter(e=>stateOf(e)==='requested').length),n);assert.equal(await page.locator('.account-row').count(),n);
  await page.evaluate(()=>setView('all'));assert.equal(await page.locator('.account-row').count(),4-n);
 }
 // 3 account daily max is total across batches, not a required selection size.
 await page.evaluate(()=>{selected.add(4);markSubmitted()});assert.equal(await page.evaluate(()=>load().filter(e=>stateOf(e)==='requested').length),3);
 await page.evaluate(()=>setView('requested'));
 const resolve=async(id,outcome,fields={})=>{await page.locator('#outcome-'+id).evaluate(e=>{e.closest('details').open=true});await page.locator('#outcome-'+id).selectOption(outcome);for(const [key,value]of Object.entries(fields))await page.locator('#'+key+'-'+id).fill(value);await page.evaluate(id=>saveResolution(id),id)};
 // Open details before interacting with controls.
 for(const id of [1,2,3])await page.locator('.resolution').filter({has:page.locator('#outcome-'+id)}).locator('summary').click();
 await resolve(1,'me');assert.equal(await page.evaluate(()=>stateOf(load().find(e=>e.id===1))),'prospect');
 await resolve(2,'other',{'new-rep':'New rep','new-days':'5','resolution-notes':'Assigned elsewhere'});let other=await page.evaluate(()=>load().find(e=>e.id===2));assert.equal(other.rep,'New rep');assert.equal(other.originalDays,5);assert.equal(other.requests[0].outcome,'assigned_to_other');
 await resolve(3,'unassigned',{'followup':new Date().toISOString().slice(0,10),'resolution-notes':'Still open; follow up'});
 assert.equal(await page.locator('summary').filter({hasText:'Needs follow-up (1) — 1 due'}).count(),1);assert.equal(await page.locator('summary').filter({hasText:'Needs follow-up (1)'}).evaluate(e=>e.parentElement.open),false);
 await page.evaluate(()=>setView('ready'));assert(!await page.locator('.company-name').filter({hasText:'Example 3'}).count());assert(await page.locator('.company-name').filter({hasText:'Example 2'}).count());
 await page.evaluate(()=>setView('history'));assert.equal(await page.locator('.account-row').count(),3);assert((await page.locator('#analytics').innerText()).includes('Assigned to another rep'));
 // Resolve the follow-up explicitly; retain notes/history without creating another account.
 await page.evaluate(()=>setView('requested'));await page.locator('summary').filter({hasText:'Needs follow-up (1)'}).click();await page.locator('.resolution summary').click();await resolve(3,'reopen');assert.equal(await page.evaluate(()=>load().length),4);assert.equal(await page.evaluate(()=>stateOf(load().find(e=>e.id===3))),'active');
 // A later date permits another attempt, preserving first request.
 await page.evaluate(()=>{let d=load();for(const e of d)for(const r of e.requests||[])r.submittedAt='2026-01-01T12:00:00Z';save(d);selected.clear();selected.add(3);markSubmitted()});assert.equal(await page.evaluate(()=>load().find(e=>e.id===3).requests.length),2);
 // Confirm rejection and handoff; no implicit Magellan integration.
 await page.evaluate(()=>setView('all'));await edit(4,{evaluation:'reject'});assert.equal(await page.evaluate(()=>stateOf(load().find(e=>e.id===4))),'rejected');assert.equal(await page.evaluate(()=>load().find(e=>e.id===4).magellanReconciliation.verdict),'REJECT');
 const snapshot=await page.evaluate(()=>load());let dl=page.waitForEvent('download');await page.evaluate(()=>exportJSON());await(await dl).saveAs(path.join(OUT,'backup.json'));
 assert.deepEqual(JSON.parse(fs.readFileSync(path.join(OUT,'backup.json'))).entries,snapshot);
 dl=page.waitForEvent('download');await page.evaluate(()=>exportCSV());await(await dl).saveAs(path.join(OUT,'backup.csv'));
 const csv=fs.readFileSync(path.join(OUT,'backup.csv'),'utf8');assert.deepEqual(await page.evaluate(csv=>entriesFromCSV(csv).entries,csv),snapshot,'CSV retains exact lifecycle/history and unknown fields');
 await reset([]);await page.locator('#import-input').setInputFiles(path.join(OUT,'backup.json'));await page.waitForFunction(()=>load().length===4);assert.deepEqual(await page.evaluate(()=>load()),snapshot,'exact backup restores history');
 const settings=await page.evaluate(()=>formSettings());await context.close();context=await chromium.launchPersistentContext(profile,{headless:true});page=await context.newPage();attach();await page.goto('file://'+APP);assert.deepEqual(await page.evaluate(()=>load()),snapshot,'close/reopen persists rep, countdown, resolutions, notes and history');assert.deepEqual(await page.evaluate(()=>formSettings()),settings);
 assert.equal(errors.length,0,errors.join('\n'));
 await context.close();fs.writeFileSync(path.join(OUT,'verification.json'),JSON.stringify({passed:true,realAccounts:real?.entries.length,checks:['real-field/countdown preservation','repeat file import','1/2/3 generation and submission','daily maximum','three resolution paths and follow-up reopening','repeat request history','rep/countdown explicit save','JSON and CSV exact round trip','persistent profile close/reopen','tab placement/ranking','no page errors'],output:OUT},null,2));console.log('PASS',OUT);
})().catch(e=>{console.error(e);process.exit(1)});
