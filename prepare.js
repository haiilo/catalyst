const isCi = process.env.CI !== undefined
// #region agent log
fetch('http://127.0.0.1:7245/ingest/a53d94c4-bb14-4c00-8cee-e4c7e61eb768',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'67fbf2'},body:JSON.stringify({sessionId:'67fbf2',runId:'pre-fix',hypothesisId:'H4',location:'prepare.js:2',message:'root prepare script entered',data:{isCi,node:process.version},timestamp:Date.now()})}).catch(()=>{});
// #endregion
if (!isCi) {
  require('husky').install()
}
