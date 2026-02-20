// #region agent log
fetch('http://127.0.0.1:7245/ingest/a53d94c4-bb14-4c00-8cee-e4c7e61eb768',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'67fbf2'},body:JSON.stringify({sessionId:'67fbf2',runId:'pre-fix',hypothesisId:'H1',location:'.pnpmfile.cjs:2',message:'pnpmfile loaded',data:{node:process.version},timestamp:Date.now()})}).catch(()=>{});
// #endregion

let firstPackageLogged = false;

module.exports = {
  hooks: {
    readPackage(pkg) {
      if (!firstPackageLogged) {
        firstPackageLogged = true;
        // #region agent log
        fetch('http://127.0.0.1:7245/ingest/a53d94c4-bb14-4c00-8cee-e4c7e61eb768',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'67fbf2'},body:JSON.stringify({sessionId:'67fbf2',runId:'pre-fix',hypothesisId:'H2',location:'.pnpmfile.cjs:13',message:'pnpm readPackage hook called',data:{name:pkg.name||null,version:pkg.version||null},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
      }
      return pkg;
    },
  },
};
