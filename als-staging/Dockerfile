# ARTIST LIVE SHEET v0.6.0-beta.11 clean runtime build
FROM node:22-alpine
WORKDIR /app

# Reconstruct the verified beta.11 runtime directly.
# Historical beta patch scripts are intentionally NOT executed.
COPY beta11s.part00 beta11s.part01 beta11s.part02 beta11s.part03 \
     beta11s.tail0 beta11s.tail1 \
     beta11s.tail2a beta11s.tail2b beta11s.tail2c beta11s.tail2d beta11s.tail2e \
     beta11s.tail3 /tmp/beta11parts/

RUN cat \
      /tmp/beta11parts/beta11s.part00 \
      /tmp/beta11parts/beta11s.part01 \
      /tmp/beta11parts/beta11s.part02 \
      /tmp/beta11parts/beta11s.part03 \
      /tmp/beta11parts/beta11s.tail0 \
      /tmp/beta11parts/beta11s.tail1 \
      /tmp/beta11parts/beta11s.tail2a \
      /tmp/beta11parts/beta11s.tail2b \
      /tmp/beta11parts/beta11s.tail2c \
      /tmp/beta11parts/beta11s.tail2d \
      /tmp/beta11parts/beta11s.tail2e \
      /tmp/beta11parts/beta11s.tail3 \
      > /tmp/beta11-runtime-text.tgz.b64 \
  && echo '5a51f0ee937922659352ecf94311935359ad983a4ad08db53d7d591420d7becc  /tmp/beta11-runtime-text.tgz.b64' | sha256sum -c - \
  && base64 -d /tmp/beta11-runtime-text.tgz.b64 > /tmp/beta11-runtime-text.tgz \
  && echo '0a9a6b64d184f8673add6cb3090041c5ea5b30890a8514fa1f4ab0c4c5825a65  /tmp/beta11-runtime-text.tgz' | sha256sum -c - \
  && tar -xzf /tmp/beta11-runtime-text.tgz -C /app \
  && test -f /app/server.mjs \
  && test -f /app/public/app.js \
  && grep -q '0.6.0-beta.11' /app/server.mjs \
  && echo 'ARTIST LIVE SHEET beta11 clean runtime verified' \
  && rm -rf /tmp/beta11parts /tmp/beta11-runtime-text.tgz.b64 /tmp/beta11-runtime-text.tgz

# Binary assets are stable and stored directly in the repository.
COPY public/icons /app/public/icons
COPY public/og-card.png /app/public/og-card.png

ENV ALS_PUBLIC_WEB=1
ENV ALS_PUBLIC_PROVIDERS=itunes,wikidata
ENV ALS_ENV=production
EXPOSE 8787

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD node -e "const http=require('http'); const port=process.env.PORT||8787; const r=http.get({host:'127.0.0.1',port,path:'/api/health'},x=>process.exit(x.statusCode===200?0:1)); r.on('error',()=>process.exit(1)); r.setTimeout(4000,()=>{r.destroy();process.exit(1)});"

CMD ["node","server.mjs"]
