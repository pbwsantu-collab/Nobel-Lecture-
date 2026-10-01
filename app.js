const $=s=>document.querySelector(s),app=$('#app');
let S=JSON.parse(localStorage.nl||'{"fs":18,"t":"","bm":[],"nt":{},"read":[],"vocab":[]}');
const save=()=>localStorage.nl=JSON.stringify(S);
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
function apply(){document.documentElement.style.setProperty('--fs',S.fs+'px');document.documentElement.dataset.t=S.t}
function sz(d){S.fs=Math.min(30,Math.max(14,S.fs+d*2));apply();save()}
function theme(){S.t={'':'dark',dark:'hr',hr:''}[S.t];apply();save()}
function words(t,q){return esc(t).replace(/\[(\d+)\]/g,'<sup onclick="note($1)">$1</sup>').replace(/([A-Za-z’'-]+)/g,m=>{let h=m;if(q&&m.toLowerCase().includes(q))h=`<mark>${m}</mark>`;return `<span class="w" onclick="dict('${m.toLowerCase().replace(/'/g,'')}')">${h}</span>`})}
function card(h){const c=$('#card');c.innerHTML=h+'<p><button class="b" onclick="$(\'#card\').hidden=true">Close</button></p>';c.hidden=false}
function dict(w){const d=DICT[w];if(!S.vocab.includes(w)){S.vocab.push(w);save()}
card(d?`<b>${w}</b> ${d[0]} <i>${d[1]}</i><br>English: ${d[2]}<br>বাংলা: ${d[3]} (${d[4]})<br>Example: ${d[5]}<br><button class="b" onclick="bm('w:${w}')">🔖 Bookmark</button>`:`<b>${w}</b><br>Meaning not added yet — add it to DICT in data.js.`)}
function note(n){card(`<b>${n}. ${NOTES[n][0]}</b><br>${NOTES[n][1]}`)}
function bm(k){S.bm=S.bm||[];if(!S.bm.includes(k))S.bm.push(k);save();alert('Bookmarked')}
function speak(t){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='en-US';speechSynthesis.speak(u)}
function mark(n){if(!S.read.includes(n)){S.read.push(n);save()}}
function pct(){return Math.round(S.read.length/10*100)}
function go(v,a){speechSynthesis.cancel();$('#card').hidden=true;scrollTo(0,0);V[v](a)}
const V={
home(){app.innerHTML=`<div class="c"><h2>NOBEL LECTURE<br>Mother Teresa</h2><p>A Realm of English (B) Selection · Pages 82–91<br><span class="tag">Bilingual Interactive Learning PWA</span></p>
<p>Reading Progress: ${pct()}%</p><div class="bar"><i style="width:${pct()}%"></i></div></div>
<div class="grid"><button onclick="go('read')">📖 Read the Text</button><button onclick="go('words')">🔤 Word Meanings</button><button onclick="go('notes')">📝 Footnotes</button><button onclick="go('search')">🔎 Search</button><button onclick="go('bm')">🔖 My Bookmarks</button><button onclick="go('prog')">📊 Progress</button></div>`},
read(){app.innerHTML=PAGES.map((p,i)=>`<div class="c"><span class="tag">Page ${p.n}</span> <b>${p.title}</b>`+p.paras.map((q,j)=>`<p id="p${i}_${j}">${words(q.t)}</p>${q.bn?`<button class="b" onclick="this.nextElementSibling.hidden^=1">বাংলায় অর্থ</button><div class="bn" hidden>${q.bn}<br><span class="tag">${q.k||''}</span></div>`:(q.k?`<span class="tag">${q.k}</span>`:'')}
<p><button class="b" onclick="speak(PAGES[${i}].paras[${j}].t.replace(/\\[\\d+\\]/g,''))">🔊</button> <button class="b" onclick="speechSynthesis.pause()">⏸</button> <button class="b" onclick="speechSynthesis.cancel()">⏹</button> <button class="b" onclick="bm('p:${i}_${j}')">🔖</button></p><textarea placeholder="My note" oninput="S.nt['${i}_${j}']=this.value;save()">${S.nt[i+'_'+j]||''}</textarea>`).join('')+`<p><button class="b" onclick="mark(${p.n});this.textContent='✓ Read'">Mark page read</button></p></div>`).join('')},
words(){app.innerHTML='<div class="c"><h3>Word Meanings</h3>'+Object.keys(DICT).sort().map(w=>`<p><span class="w" onclick="dict('${w}')"><b>${w}</b></span> — ${DICT[w][3]}</p>`).join('')+'</div>'},
notes(){app.innerHTML='<div class="c"><h3>Footnotes</h3>'+Object.entries(NOTES).map(([n,v])=>`<p><sup>${n}</sup> <b>${v[0]}</b>: ${v[1]}</p>`).join('')+'</div>'},
search(){app.innerHTML='<div class="c"><input id="q" placeholder="Search text, words, notes…" oninput="V.res(this.value)"><div id="r"></div></div>'},
res(q){q=q.trim().toLowerCase();if(q.length<2){$('#r').innerHTML='';return}let o=[];
PAGES.forEach(p=>p.paras.forEach(x=>(x.t+' '+(x.bn||'')).toLowerCase().includes(q)&&o.push(`<p><span class="tag">p.${p.n}</span> ${words(x.t.slice(0,160),q)}…</p>`)));
Object.keys(DICT).forEach(w=>(w+DICT[w].join(' ')).toLowerCase().includes(q)&&o.push(`<p>🔤 <b>${w}</b> — ${DICT[w][3]}</p>`));
Object.values(NOTES).forEach(v=>(v.join(' ')).toLowerCase().includes(q)&&o.push(`<p>📝 <b>${v[0]}</b>: ${v[1]}</p>`));
$('#r').innerHTML=o.join('')||'No results'},
bm(){app.innerHTML='<div class="c"><h3>My Bookmarks</h3>'+(S.bm.map(k=>k[0]=='q'?`<p>❓ ${QA[k.slice(2)].q}</p>`:k[0]=='w'?`<p>🔤 ${k.slice(2)}</p>`:`<p>📄 ${PAGES[k.slice(2).split('_')[0]].paras[k.slice(2).split('_')[1]].t.slice(0,120)}…</p>`).join('')||'None yet.')+'</div>'},
prog(){app.innerHTML=`<div class="c"><h3>Progress</h3><p>Pages read: ${S.read.length}/10<br>Words opened: ${S.vocab.length}<br>Bookmarks: ${S.bm.length}<br>Notes: ${Object.values(S.nt).filter(Boolean).length}</p></div>`},
more(){app.innerHTML='<div class="grid"><button onclick="go(\'search\')">🔎 Search</button><button onclick="go(\'bm\')">🔖 Bookmarks</button><button onclick="go(\'prog\')">📊 Progress</button><button onclick="go(\'notes\')">📝 Footnotes</button></div>'}};
apply();go('home');
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');
