# ARTIST LIVE SHEET v0.6.0-beta.11 clean runtime build
FROM node:22-alpine
WORKDIR /app

# Stable binary assets already stored in GitHub.
COPY public/icons /app/public/icons
COPY public/og-card.png /app/public/og-card.png

# Verified beta.11 text runtime split only to avoid connector upload truncation.
# This reconstructs one clean release archive; no historical beta patch chain runs here.
COPY beta11text.part00 beta11text.part01 beta11text.part02 /tmp/beta11parts/
RUN cat /tmp/beta11parts/beta11text.part00 /tmp/beta11parts/beta11text.part01 /tmp/beta11parts/beta11text.part02 > /tmp/beta11-runtime-text.tgz.b64 \
  && echo '5a51f0ee937922659352ecf94311935359ad983a4ad08db53d7d591420d7becc  /tmp/beta11-runtime-text.tgz.b64' | sha256sum -c - \
  && base64 -d /tmp/beta11-runtime-text.tgz.b64 > /tmp/beta11-runtime-text.tgz \
  && echo '0a9a6b64d184f8673add6cb3090041c5ea5b30890a8514fa1f4ab0c4c5825a65  /tmp/beta11-runtime-text.tgz' | sha256sum -c - \
  && tar -xzf /tmp/beta11-runtime-text.tgz -C /app \
  && rm -rf /tmp/beta11parts /tmp/beta11-runtime-text.tgz.b64 /tmp/beta11-runtime-text.tgz

ENV ALS_PUBLIC_WEB=1
ENV ALS_PUBLIC_PROVIDERS=itunes,wikidata
ENV ALS_ENV=production
EXPOSE 8787

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD node -e "const http=require('http'); const port=process.env.PORT||8787; const r=http.get({host:'127.0.0.1',port,path:'/api/health'},x=>process.exit(x.statusCode===200?0:1)); r.on('error',()=>process.exit(1)); r.setTimeout(4000,()=>{r.destroy();process.exit(1)});"

CMD ["node","server.mjs"]
