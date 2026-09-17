from pathlib import Path
p=Path('/tmp/apply-beta7.py')
s=p.read_text(encoding='utf-8')
old="if part not in cat: raise SystemExit('equipment part anchor missing')"
new="if part not in cat: part=\"keyboard:['Keyboard','Synth','Stage Piano','MIDI Controller','Module'],\""
if old in s:
    s=s.replace(old,new)
p.write_text(s,encoding='utf-8')
print('beta7 equipment catalog compatibility applied')
