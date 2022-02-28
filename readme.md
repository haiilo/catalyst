TODO


### Linking with COYO for local development
For linking the local catalyst project with COYO do the following:

* ``npm install`` core and angular project
* ``npm run build`` in the core project  
* ``npm run link-lib`` in top level folder. This will create the symlinks for the libraries that can be used by yarn.
* In COYO project folder coyo-frontend/ngx run ``yarn link @haiilo/catalyst`` and ``yarn link @haiilo/catalyst-angular``
* If you change something inside the library you just need to rebuild it and it will be available in COYO (sometimes you might need to restart COYO frontend)