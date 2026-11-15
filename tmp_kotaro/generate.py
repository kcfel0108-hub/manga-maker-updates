import json,urllib.request,urllib.parse,time,wave,io,subprocess,zipfile,re
from pathlib import Path
BASE="http://127.0.0.1:50021"
OUT=Path("output"); OUT.mkdir(exist_ok=True)
SECTIONS=[
("01_Monolith_to_Rebels", """渋谷CYCLONE、楽しんでますか！
改めまして、SLOTHREATです。
PARAMENA、新体制おめでとう。
こんな大事な日に呼んでくれて、ありがとうございます。
まだまだいけますか、渋谷！
Rebels！"""),
("02_Rebels_to_Fractured_Aether", """ありがとう！
SLOTHREATです。
年末も近いということで、ライブも残すこと今日を含めてあと4本になりました。
なんで見逃して欲しくないので少し告知させて下さい。
まず11月29日。
沖縄・石垣島で開催される、ulma sound junction主催の『ISHIGAKIFEST初の沖縄野外なのでぜひ旅行と共に遊びに来てくれると嬉しいです。
続いて12月4日
イタリアのプログレッシブ・メタルバンド、DGMの来日公演に、オープニングアクトとして出演します。是非応援しに来てください
そして12月20日
『APARADOXIA』リリースツアーのEXTRA SHOW、年内最後の主催でヤバいバンド集めて年末らしく、思いっきり騒げる一日にしているので、ぜひ遊びに来てください！
そして今日は、その『APARADOXIA』でfeaturingしたくれたあの人も、このイベントに出てます。
だったらもう、この曲をやるしかないよなサイクロン！
インドネシアでかましまくってたボーカル。
呼んでもいいですか！
Kneeya from ovEnola
Fractured Aether！""")
]
REPL={"渋谷CYCLONE":"渋谷サイクロン","SLOTHREAT":"スロースリート","PARAMENA":"パラメナ","Rebels":"レベルズ","ulma sound junction":"ウルマサウンドジャンクション","ISHIGAKIFEST":"イシガキフェスト","DGM":"ディージーエム","APARADOXIA":"アパラドキシア","EXTRA SHOW":"エクストラショー","featuring":"フィーチャリング","Kneeya from ovEnola":"ニーヤ、フロム、オベノラ","Fractured Aether":"フラクチャード・イーサー"}
def req(path,params,data=None):
    url=BASE+path+"?"+urllib.parse.urlencode(params)
    b=None if data is None else json.dumps(data,ensure_ascii=False).encode()
    if b is None:b=b""
    with urllib.request.urlopen(urllib.request.Request(url,data=b,headers={"Content-Type":"application/json"},method="POST"),timeout=120) as f:return f.read()
def synth(line):
    for a,b in REPL.items():line=line.replace(a,b)
    q=json.loads(req("/audio_query",{"text":line,"speaker":12}))
    q["speedScale"]=1.02;q["intonationScale"]=1.05;q["outputSamplingRate"]=48000
    return req("/synthesis",{"speaker":12},q)
def join(wavs,pauses,target):
    fmt=None
    with wave.open(str(target),"wb") as dst:
        for i,blob in enumerate(wavs):
            with wave.open(io.BytesIO(blob),"rb") as f:
                p=f.getparams()
                if fmt is None:fmt=p;dst.setparams(p)
                else:assert (p.nchannels,p.sampwidth,p.framerate)==(fmt.nchannels,fmt.sampwidth,fmt.framerate)
                dst.writeframes(f.readframes(f.getnframes()))
                if pauses[i]:dst.writeframes(b"\x00"*int(p.framerate*pauses[i])*p.nchannels*p.sampwidth)
def encode(p):
    for ext,codec in [("mp3",["-c:a","libmp3lame","-q:a","2"]),("m4a",["-c:a","aac","-b:a","192k"])]:
        subprocess.run(["ffmpeg","-y","-loglevel","error","-i",str(p),*codec,str(p.with_suffix("."+ext))],check=True)
for _ in range(90):
    try:
        with urllib.request.urlopen(BASE+"/speakers",timeout=4) as f:
            speakers=json.load(f)
        if any(s["name"]=="白上虎太郎" and any(st["id"]==12 for st in s["styles"]) for s in speakers):break
        raise RuntimeError("白上虎太郎のspeaker 12がありません")
    except Exception as e:
        time.sleep(2)
else:raise RuntimeError("VOICEVOX起動失敗")
wavs=[]
for name,body in SECTIONS:
    parts=[]
    for line in body.splitlines():
        if not line.strip():continue
        print(name,repr(line),flush=True)
        parts.append(synth(line.strip()))
    target=OUT/(name+".wav")
    join(parts,[.38]*(len(parts)-1)+[.2],target);encode(target);wavs.append(target)
full=OUT/"SHIBUYA_MC_KOTARO_FULL.wav"
all_parts=[]
for p in wavs:
    with open(p,"rb") as f:all_parts.append(f.read())
join(all_parts,[2.0,0],full);encode(full)
(OUT/"MC_original.txt").write_text("\n\n".join(s[1] for s in SECTIONS),encoding="utf-8")
(OUT/"CREDIT.txt").write_text("VOICEVOX:白上虎太郎\n読み上げ用に固有名詞の発音のみ調整。原文はMC_original.txt。\n",encoding="utf-8")
with zipfile.ZipFile("SHIBUYA_MC_KOTARO_ALL.zip","w",zipfile.ZIP_DEFLATED) as z:
    for p in OUT.iterdir():z.write(p,p.name)
print("DONE",[(p.name,p.stat().st_size) for p in OUT.iterdir()],flush=True)
