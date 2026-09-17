(() => {
'use strict';
const out=[];
const add=(category,brands,kinds,part='')=>{
  for(const brand of brands) for(const kind of kinds) out.push({id:`builtin_${category}_${out.length+1}`,category,brand,kind,part:part||kind,model:'',builtin:true});
};
const addPart=(brands,parts)=>{
  for(const brand of brands) for(const part of parts) out.push({id:`builtin_drums_${out.length+1}`,category:'drums',brand,kind:part,part,model:'',builtin:true});
};
const micBrands=['Shure','Sennheiser','Audio-Technica','AKG','Neumann','Electro-Voice','sE Electronics','RØDE','Lewitt','Audix','Telefunken','Beyerdynamic','DPA','Earthworks','Aston','Heil Sound','MXL','Samson','Nady','Sony','Warm Audio','Avantone','CAD Audio','Blue','Countryman'];
add('vocal',micBrands,['Dynamic Vocal Mic','Condenser Vocal Mic','Wireless Handheld','Wireless Bodypack','Headset Mic']);
add('mic',micBrands,['Dynamic Mic','Condenser Mic','Instrument Mic','Boundary Mic','Shotgun Mic']);
const guitarBrands=['Fender','Gibson','Ibanez','ESP','E-II','Schecter','PRS','Jackson','Charvel','Gretsch','Yamaha','Suhr','Music Man','G&L','Reverend','Duesenberg','Rickenbacker','Epiphone','Squier','Dean','Solar','Mayones','Ormsby','Strandberg','Kiesel','Caparison','Fernandes','Tokai','Bacchus','Fujigen'];
add('guitar',guitarBrands,['Electric Guitar','7-string Guitar','8-string Guitar','Baritone Guitar','Acoustic Guitar']);
const ampBrands=['Marshall','Mesa/Boogie','Orange','EVH','Peavey','Fender','Vox','Bogner','Diezel','ENGL','Hughes & Kettner','Soldano','Friedman','Randall','Laney','Blackstar','Revv','Victory','PRS','Suhr','Magnatone','Matchless','Bad Cat','Morgan','Tone King','Kemper','Line 6','Neural DSP','Fractal Audio','Positive Grid'];
add('amp',ampBrands,['Guitar Amp Head','Guitar Combo Amp','1x12 Cabinet','2x12 Cabinet','4x12 Cabinet']);
const bassBrands=['Fender','Squier','Music Man','Ibanez','Warwick','Spector','Dingwall','Lakland','Sadowsky','Yamaha','ESP','Schecter','Rickenbacker','Fodera','Sandberg','G&L','Bacchus','Fujigen','Atelier Z','Moon','Tokai','Greco','Aria Pro II','Jackson','Kiesel','Mayones'];
add('bass',bassBrands,['4-string Bass','5-string Bass','6-string Bass','Multiscale Bass','Fretless Bass']);
const bassAmpBrands=['Ampeg','Markbass','Darkglass','Aguilar','Gallien-Krueger','Mesa/Boogie','Orange','Hartke','Trace Elliot','Ashdown','TC Electronic','Fender','EBS','Phil Jones Bass','GR Bass','Bergantino','Eich','Warwick','Laney','Peavey','Eden','SWR','Acoustic','Bugera','Blackstar'];
add('bass',bassAmpBrands,['Bass Amp Head','Bass Combo','Bass Cabinet','Bass Preamp','Bass DI/Preamp']);
const keyBrands=['Yamaha','Roland','Korg','Nord','Kurzweil','Casio','Kawai','Arturia','Native Instruments','Novation','Akai Professional','M-Audio','Studiologic','Moog','Sequential','Oberheim','Behringer','Teenage Engineering','ASM','Modal Electronics','Waldorf','Elektron','Dexibell','Viscount','Hammond','Crumar'];
add('keyboard',keyBrands,['Stage Piano','Synthesizer','Workstation','MIDI Keyboard','Organ']);
const djBrands=['Pioneer DJ','AlphaTheta','Denon DJ','Rane','Technics','Numark','Native Instruments','Allen & Heath','Reloop','Hercules','Roland','Akai Professional','Novation','Elektron','Ableton','Teenage Engineering','Korg','Boss','Yamaha','Mackie','Behringer','Tascam'];
add('dj',djBrands,['DJ Controller','DJ Mixer','Media Player','Turntable','Sampler']);
const monitorBrands=['d&b audiotechnik','L-Acoustics','Meyer Sound','JBL Professional','Yamaha','QSC','Electro-Voice','RCF','Mackie','Turbosound','Martin Audio','Nexo','Adamson','Midas','Behringer','PreSonus','FBT','HK Audio','Alto Professional','Bose Professional','EAW','Fulcrum Acoustic','Outline','Clair Brothers','TW Audio'];
add('monitor',monitorBrands,['Active Wedge Monitor','Passive Wedge Monitor','Side Fill','Drum Fill','Powered Speaker']);
const diBrands=['Radial Engineering','BSS','Countryman','Rupert Neve Designs','Palmer','Whirlwind','Klark Teknik','Behringer','ART','Samson','Orchid Electronics','RNDI','Avalon','Warm Audio','IK Multimedia','TC Electronic','Fishman','LR Baggs','Tech 21','Darkglass','Aguilar','EBS','Ampeg','Boss','Mooer'];
add('di',diBrands,['Active DI','Passive DI','Stereo DI','Reamp Box','Instrument Preamp/DI']);
const playbackBrands=['Apple','Microsoft','Dell','HP','Lenovo','ASUS','Acer','MSI','Razer','Samsung','LG','Panasonic','Dynabook','VAIO','Intel','Minisforum','Beelink','Framework','Gigabyte','Huawei'];
add('laptop',playbackBrands,['Laptop','Mini PC','Playback Computer','Backup Computer','Tablet']);
const interfaceBrands=['Focusrite','RME','Universal Audio','MOTU','PreSonus','Audient','SSL','Antelope Audio','Apogee','Steinberg','Tascam','Zoom','Roland','Mackie','Behringer','M-Audio','Native Instruments','Arturia','IK Multimedia','Avid','Allen & Heath','Yamaha','Sound Devices','iConnectivity','Cymatic Audio'];
add('laptop',interfaceBrands,['Audio Interface','USB Interface','Thunderbolt Interface','Playback Interface','MIDI Interface']);
const iemBrands=['Shure','Sennheiser','Audio-Technica','LD Systems','Xvive','Galaxy Audio','Mipro','Lectrosonics','Wisycom','Nux','Fischer Amps','Behringer','Midas','Allen & Heath','Yamaha','Soundcraft','Mackie','PreSonus','Westone','64 Audio','Ultimate Ears','JH Audio','Campfire Audio','Etymotic','Fender'];
add('iem',iemBrands,['Wireless IEM System','IEM Transmitter','IEM Receiver','Wired IEM Amp','In-ear Monitor']);
const pedalBrands=['Boss','Ibanez','Electro-Harmonix','MXR','Strymon','Eventide','TC Electronic','Line 6','Neural DSP','Kemper','Fractal Audio','Zoom','DigiTech','Walrus Audio','EarthQuaker Devices','JHS Pedals','Wampler','Keeley','Fulltone','Mesa/Boogie','Friedman','Darkglass','Tech 21','Source Audio','Mooer','NUX','Hotone','Voodoo Lab','Radial Engineering','Mission Engineering'];
add('pedal',pedalBrands,['Overdrive/Distortion','Delay/Reverb','Modulation','Multi Effects','Switcher/Controller']);
const powerBrands=['Furman','Tripp Lite','APC','CyberPower','Eaton','Panamax','Samson','ART','Radial Engineering','Juice Goose','Kikusui','TASCAM','Yamaha','Behringer','Mackie','Belkin','Anker','Sanwa Supply','Elecom','Buffalo','Oyaide','Hosa','Klotz','Canare','Neutrik'];
add('power',powerBrands,['Power Conditioner','Power Distributor','UPS','Power Strip','Rack Power Unit']);
const drumShellBrands=['Tama','Pearl','Yamaha','DW','Gretsch','Ludwig','Sonor','Mapex','Canopus','Sakae','PDP','Rogers','Natal','British Drum Co','Craviotto','Noble & Cooley','Orange County Drum & Percussion','Dixon','Premier','Spaun','C&C Custom Drums','Odery','ddrum','Trick Drums'];
addPart(drumShellBrands,['Kick Drum','Snare Drum','Rack Tom','Floor Tom','Side Snare','Octoban','Concert Tom','Drum Throne','Hi-Hat Stand','Snare Stand','Cymbal Stand','Kick Pedal']);
const cymbalBrands=['Zildjian','Sabian','Paiste','Meinl Cymbals','Istanbul Agop','Istanbul Mehmet','Bosphorus','UFIP','Dream Cymbals','Wuhan','TRX Cymbals','Soultone','Agean','Stagg','Masterwork','Turkish Cymbals','Anatolian','Diril','Pergamon','Murathan'];
addPart(cymbalBrands,['Hi-Hat','Crash Cymbal','Ride Cymbal','China Cymbal','Splash Cymbal','Effects Cymbal','Stack Cymbal','Bell']);
const drumHeadBrands=['Remo','Evans','Aquarian','Attack'];
addPart(drumHeadBrands,['Kick Batter Head','Kick Resonant Head','Snare Batter Head','Snare Resonant Head','Tom Batter Head','Tom Resonant Head']);
const drumHardwareBrands=['Tama','Pearl','Yamaha','DW','Gibraltar','Trick Drums','Axis','Mapex','Sonor','Ludwig','Canopus','Ahead'];
addPart(drumHardwareBrands,['Double Kick Pedal','Single Kick Pedal','Remote Hi-Hat','Rack System','Clamp','Cymbal Boom Arm','Drum Key','Stick Holder']);
const otherBrands=['K&M','Hercules Stands','On-Stage','Ultimate Support','Gator Cases','SKB','Pelican','Hosa','Canare','Neutrik','Sommer Cable','Mogami','Radial Engineering','Whirlwind','Aviom','Hear Technologies','Clear-Com','Eartec','SoundTools','RapcoHorizon','Stage Ninja','ProCo','Road Ready','Middle Atlantic','Penn Elcom'];
add('other',otherBrands,['Stand','Rack/Case','Cable/Multicore','Stage Accessory','Communication/Utility']);
const categoryFallbacks={vocal:['Vocal Mic','Wireless Mic','Headset','Lavalier','Talkback'],guitar:['Guitar','Amp','Cabinet','Modeler','FX'],bass:['Bass','Amp','Cabinet','Preamp','DI'],keyboard:['Keyboard','Synth','Stage Piano','MIDI Controller','Module'],dj:['Controller','Mixer','Player','Sampler','Turntable'],mic:['Mic','Instrument Mic','Boundary Mic','Condenser Mic','Dynamic Mic'],amp:['Head','Combo','Cabinet','Power Amp','Modeler'],monitor:['Wedge','Side Fill','Drum Fill','Powered Speaker','Passive Monitor'],di:['Active DI','Passive DI','Stereo DI','Reamp','Preamp DI'],laptop:['Computer','Audio Interface','Playback Device','MIDI Interface','Tablet'],iem:['IEM System','Transmitter','Receiver','Wired Pack','Earphones'],pedal:['Drive','Delay/Reverb','Modulation','Multi FX','Switcher'],power:['Conditioner','Distributor','UPS','Strip','Rack Power'],other:['Stand','Case','Cable','Rack','Utility']};
const fallbackBrands=['Generic / Venue','Own Gear','Rental','Custom','No Brand','House Gear','Backline','Touring Rack','Spare','Other'];
for(const [category,kinds] of Object.entries(categoryFallbacks)){const count=out.filter(x=>x.category===category).length;if(count<100){let i=0;while(out.filter(x=>x.category===category).length<110){const brand=fallbackBrands[i%fallbackBrands.length]; const kind=kinds[Math.floor(i/fallbackBrands.length)%kinds.length];out.push({id:`fallback_${category}_${i}`,category,brand,kind,part:kind,model:'',builtin:true}); i++;}}}
const categories={};
for(const item of out){(categories[item.category]??=[]).push(item);}
window.ALS_EQUIPMENT_CATALOG={version:1,items:out,categories,counts:Object.fromEntries(Object.entries(categories).map(([k,v])=>[k,v.length]))};
})();
