const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('assert/strict'),os=require('os'),crypto=require('crypto');
const app=path.resolve(__dirname,'../Pick_Up_Rev2.4_2026-10-26.html');
const backup=JSON.parse(fs.readFileSync(process.env.CURRENT_BACKUP||path.resolve(__dirname,'../../speedynet-reject-2026-10-25/Pick-Up-SpeedyNet-REJECT-2026-10-25.json')));
const out=fs.mkdtempSync(path.join(os.tmpdir(),'pickup24-')),profile=path.join(out,'profile');
(async()=>{let context=await chromium.launchPersistentContext(profile,{headless:true,acceptDownloads:true}),page=await context.newPage();const errors=[],dialogs=[];
const attach=()=>{page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>{dialogs.push(d.message());return d.accept()})};attach();await page.goto('file://'+app);
const input=async file=>{await page.locator('#import-input').setInputFiles(file);await page.waitForFunction(()=>document.getElementById('import-input').value==='')};
// Load predecessor state without modifying its recovery keys.
await page.evaluate(b=>{localStorage.setItem('pick_up_rev2',JSON.stringify(b.entries));localStorage.setItem('pick_up_rev2_form',JSON.stringify(b.formSettings));renderSettings();renderList()},backup);
assert.deepEqual(await page.evaluate(()=>load()),backup.entries);
assert.deepEqual(await page.evaluate(()=>formSettings()),backup.formSettings);
const predecessor=await page.evaluate(()=>[localStorage.getItem('pick_up_rev2'),localStorage.getItem('pick_up_rev2_form')]);
const old=await page.evaluate(()=>load()),oldAnalytics=await page.evaluate(()=>renderAnalytics(load())),timers=await page.evaluate(()=>load().map(e=>[e.id,daysLeft(e)]));
const targets=old.filter(e=>e.evaluation==='reject'||e.lifecycle==='prospect'||e.ownership==='owned');assert(targets.length>0);
const ledger=await page.evaluate(async targets=>Promise.all(targets.map(async e=>({schema:'pickup-resolution-v1',id:e.id,name:e.name,url:e.url,compass:e.compass,verdict:e.lifecycle==='prospect'||e.ownership==='owned'?'PROSPECT':'REJECT',sourceEntrySha256:await entrySHA256(e),prospectId:crypto.randomUUID(),observationId:crypto.randomUUID(),sourceArtifactId:crypto.randomUUID(),verifiedAt:new Date().toISOString(),requests:(e.requests||[]).map(q=>Object.fromEntries(['id','submittedAt','outcome','submittedDateOnly','historical','legacyUnknown','resolvedAt','outcomeRecordedAt'].filter(k=>q[k]!==undefined).map(k=>[k,q[k]])))}))),targets);
// Browser and agent canonical hashing must agree, including non-ASCII notes.
const canonical=x=>JSON.stringify(x,function(k,v){return v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.keys(v).sort().map(k=>[k,v[k]])):v});
for(let i=0;i<targets.length;i++)assert.equal(ledger[i].sourceEntrySha256,crypto.createHash('sha256').update(canonical(targets[i])).digest('hex'));
const keep=old.filter(e=>!targets.some(t=>t.id===e.id)),clean={...backup,entries:keep,resolutionLedger:ledger};const cleanFile=path.join(out,'cleanup.json');fs.writeFileSync(cleanFile,JSON.stringify(clean));
// Local edits after verification prevent deletion; no partial batch removal.
await page.evaluate(id=>{const d=load();d.find(e=>e.id===id).notes+=' New unsynced note';save(d)},targets[0].id);const changed=await page.evaluate(()=>loadState());await input(cleanFile);assert.deepEqual(await page.evaluate(()=>loadState()),changed);assert(dialogs.some(x=>x.includes('changed since Supabase verification')));
await page.evaluate(old=>saveState(old,[]),old);
// Failed browser storage write leaves both the full records and ledger untouched.
await page.evaluate(()=>{window._set=Storage.prototype.setItem;Storage.prototype.setItem=function(){throw Error('Simulated quota')};});await input(cleanFile);assert.deepEqual(await page.evaluate(()=>load()),old);assert.deepEqual(await page.evaluate(()=>resolvedLedger()),[]);await page.evaluate(()=>Storage.prototype.setItem=window._set);
await input(cleanFile);assert.deepEqual(await page.evaluate(()=>load()),keep);assert.deepEqual(await page.evaluate(()=>resolvedLedger()),ledger);assert.equal(await page.evaluate(()=>renderAnalytics(load())),oldAnalytics,'all analytics remain identical');assert.deepEqual(await page.evaluate(()=>load().map(e=>[e.id,daysLeft(e)])),timers.filter(([id])=>!targets.some(e=>e.id===id)));
await input(cleanFile);assert.deepEqual(await page.evaluate(()=>load()),keep);assert.deepEqual(await page.evaluate(()=>resolvedLedger()),ledger);
// Conflicting or malformed receipts never partially change state.
for(const bad of [{...ledger[0],sourceEntrySha256:'not-a-hash'},{...ledger[0],verdict:ledger[0].verdict==='REJECT'?'PROSPECT':'REJECT'}]){
 const file=path.join(out,'bad.json');fs.writeFileSync(file,JSON.stringify({...clean,resolutionLedger:[bad]}));
 const before=await page.evaluate(()=>loadState());await input(file);assert.deepEqual(await page.evaluate(()=>loadState()),before);
}
assert.deepEqual(await page.evaluate(()=>[localStorage.getItem('pick_up_rev2'),localStorage.getItem('pick_up_rev2_form')]),predecessor);
// A legacy exact backup cannot resurrect resolved identities.
const original=path.join(out,'old.json');fs.writeFileSync(original,JSON.stringify(backup));await input(original);assert.deepEqual(await page.evaluate(()=>load()),keep);assert.deepEqual(await page.evaluate(()=>resolvedLedger()),ledger);
// Daily quota includes attempts on removed accounts.
const count=old.flatMap(e=>e.requests||[]).filter(r=>r.submittedAt&&new Date(r.submittedAt).toDateString()===new Date().toDateString()).length;assert.equal(await page.evaluate(()=>submittedToday()),count);
const settings=await page.evaluate(()=>formSettings());let dl=page.waitForEvent('download');await page.evaluate(()=>exportJSON());await(await dl).saveAs(path.join(out,'exact.json'));const exported=JSON.parse(fs.readFileSync(path.join(out,'exact.json')));assert.deepEqual(exported.entries,keep);assert.deepEqual(exported.resolutionLedger,ledger);
await page.evaluate(()=>{saveState([],[]);localStorage.removeItem(SETTINGS_KEY)});await input(path.join(out,'exact.json'));assert.deepEqual(await page.evaluate(()=>load()),keep);assert.deepEqual(await page.evaluate(()=>resolvedLedger()),ledger);assert.deepEqual(await page.evaluate(()=>formSettings()),settings);
await context.close();context=await chromium.launchPersistentContext(profile,{headless:true});page=await context.newPage();attach();await page.goto('file://'+app);assert.deepEqual(await page.evaluate(()=>load()),keep);assert.deepEqual(await page.evaluate(()=>resolvedLedger()),ledger);assert.equal(await page.evaluate(()=>renderAnalytics(load())),oldAnalytics);
// Even a zero-working-account state exports a complete exact recovery backup.
await page.evaluate(()=>saveState([],resolvedLedger()));dl=page.waitForEvent('download');await page.evaluate(()=>exportJSON());await(await dl).saveAs(path.join(out,'zero.json'));assert.equal(JSON.parse(fs.readFileSync(path.join(out,'zero.json'))).resolutionLedger.length,ledger.length);
assert.deepEqual(errors,[]);await context.close();const report={result:'PASS',accounts:old.length,resolvedFixtures:ledger.length,remaining:keep.length,checks:['predecessor-key fallback without mutation','invalid/conflicting receipts blocked','real-field preservation','browser/agent canonical SHA256 agreement','changed-record deletion blocked atomically','quota failure retains originals','verified-receipt removal','exact analytics preservation','daily quota across removed records','repeated import idempotency','legacy resurrection prevention','exact JSON restore including ledger/settings','persistent profile close/reopen','zero-account backup','no page errors'],output:out};fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));})().catch(e=>{console.error(e);process.exit(1)});
