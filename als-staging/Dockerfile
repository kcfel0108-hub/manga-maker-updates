FROM node:22-alpine
WORKDIR /app
COPY . .
RUN cat ui-assets.part00 ui-assets.part01 ui-assets.part02 ui-assets.part03 ui-assets.part04 ui-assets.part05 ui-assets.part06 ui-assets.part07 ui-assets.part08 > /tmp/ui-assets.tgz.b64 \
  && base64 -d /tmp/ui-assets.tgz.b64 > /tmp/ui-assets.tgz \
  && tar -xzf /tmp/ui-assets.tgz -C public \
  && sed -i 's/0\.6\.0-beta\.2/0.6.0-beta.4/g' public/app.js public/app.css \
  && sed -i 's/0\.6\.0-beta\.3/0.6.0-beta.4/g' server.mjs \
  && rm -f /tmp/ui-assets.tgz /tmp/ui-assets.tgz.b64 ui-assets.part00 ui-assets.part01 ui-assets.part02 ui-assets.part03 ui-assets.part04 ui-assets.part05 ui-assets.part06 ui-assets.part07 ui-assets.part08 ui-assets.tgz.b64 _temp_part04
ENV ALS_PUBLIC_WEB=1
ENV ALS_PUBLIC_PROVIDERS=itunes,wikidata
ENV ALS_ENV=production
EXPOSE 8787
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD node -e "const http=require('http'); const port=process.env.PORT||8787; const r=http.get({host:'127.0.0.1',port,path:'/api/health'},x=>process.exit(x.statusCode===200?0:1)); r.on('error',()=>process.exit(1)); r.setTimeout(4000,()=>{r.destroy();process.exit(1)});"
CMD ["node","server.mjs"]
