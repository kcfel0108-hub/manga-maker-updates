# ARTIST LIVE SHEET v0.6.0-beta.11 clean runtime build
FROM node:22-alpine
WORKDIR /app

# The release runtime is already verified as a complete unit.
# No historical beta patch chain is executed in this build.
COPY beta11-runtime-core.tgz.b64 /tmp/beta11-runtime-core.tgz.b64
RUN base64 -d /tmp/beta11-runtime-core.tgz.b64 > /tmp/beta11-runtime-core.tgz \
  && tar -xzf /tmp/beta11-runtime-core.tgz -C /app \
  && rm -f /tmp/beta11-runtime-core.tgz /tmp/beta11-runtime-core.tgz.b64

ENV ALS_PUBLIC_WEB=1
ENV ALS_PUBLIC_PROVIDERS=itunes,wikidata
ENV ALS_ENV=production
EXPOSE 8787

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD node -e "const http=require('http'); const port=process.env.PORT||8787; const r=http.get({host:'127.0.0.1',port,path:'/api/health'},x=>process.exit(x.statusCode===200?0:1)); r.on('error',()=>process.exit(1)); r.setTimeout(4000,()=>{r.destroy();process.exit(1)});"

CMD ["node","server.mjs"]
