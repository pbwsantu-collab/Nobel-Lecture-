const $=s=>document.querySelector(s),app=$('#app');
let S=JSON.parse(localStorage.nl||'{"fs":18,"t":"","bm":[],"nt":{},"read":[],"vocab":[]}');
const save=()=>localStorage.nl=JSON.stringify(S);
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
function apply(){document.documentElement.style.setProperty('--fs',S.fs+'px');document.documentElement.dataset.t=S.t}
function sz(d){S.fs=Math.min(30,Math.max(14,S.fs+d*2));apply();save()}
function theme(){S.t={'':'dark',dark:'hr',hr:''}[S.t];apply();save()}

function words(t,q){
  return esc(t)
    .replace(/\[(\d+)\]/g,'<sup onclick="note($1)">$1</sup>')
    .replace(/([A-Za-z’'-]+)/g,m=>{
      let key=m.toLowerCase().replace(/'/g,'');
      let h=m;
      if(q&&m.toLowerCase().includes(q))h=`<mark>${m}</mark>`;
      const has=DICT[key]||DICT[m.toLowerCase()];
      return `<span class="w${has?' has-mean':''}" data-w="${key}" onclick="dict('${key}')">${h}</span>`;
    });
}

function card(h){const c=$('#card');c.innerHTML=h+'<p><button class="b" onclick="$(\'#card\').hidden=true">Close</button></p>';c.hidden=false}
function dict(w){
  const d=DICT[w]||DICT[w.toLowerCase()];
  if(!S.vocab.includes(w)){S.vocab.push(w);save()}
  if(d){
    card(`<b>${w}</b> ${d[0]||''} <i>${d[1]||''}</i><br>English: ${d[2]||''}<br><b>বাংলা:</b> ${d[3]||''} ${d[4]?`(${d[4]})`:''}<br>Example: ${d[5]||''}<br><button class="b" onclick="bm('w:${w}')">🔖 Bookmark</button>`);
  }else{
    card(`<b>${w}</b><br>Meaning not added yet — will be expanded. <br><small>Click other highlighted words that have meanings.</small>`);
  }
}
function note(n){card(`<b>${n}. ${NOTES[n][0]}</b><br>${NOTES[n][1]}`)}
function bm(k){S.bm=S.bm||[];if(!S.bm.includes(k))S.bm.push(k);save();alert('Bookmarked')}

let currentUtter=null, highlightTimers=[];
function clearHighlights(){
  document.querySelectorAll('.w.speaking').forEach(el=>el.classList.remove('speaking'));
  highlightTimers.forEach(t=>clearTimeout(t));
  highlightTimers=[];
}
function speak(text, paraId){
  speechSynthesis.cancel();
  clearHighlights();
  const clean=text.replace(/\[\d+\]/g,'');
  const u=new SpeechSynthesisUtterance(clean);
  u.lang='en-US';
  u.rate=0.95;
  currentUtter=u;

  let wordIdx=0;
  const spans = paraId ? Array.from(document.querySelectorAll(`#${paraId} .w`)) : [];
  u.onboundary = (e)=>{
    if(e.name==='word' && spans.length){
      clearHighlights();
      if(wordIdx < spans.length){
        spans[wordIdx].classList.add('speaking');
        spans[wordIdx].scrollIntoView({behavior:'smooth',block:'center'});
        wordIdx++;
      }
    }
  };

  if(spans.length){
    let delay=0;
    spans.forEach((sp,i)=>{
      const wlen = (sp.textContent||'').length;
      const t = setTimeout(()=>{
        if(currentUtter!==u)return;
        clearHighlights();
        sp.classList.add('speaking');
        if(i%4===0) sp.scrollIntoView({behavior:'smooth',block:'center'});
      }, delay);
      highlightTimers.push(t);
      delay += Math.max(180, wlen*70);
    });
  }

  u.onend = ()=>{ clearHighlights(); currentUtter=null; };
  u.onerror = ()=>{ clearHighlights(); currentUtter=null; };
  speechSynthesis.speak(u);
}

function mark(n){if(!S.read.includes(n)){S.read.push(n);save()}}
function pct(){return Math.round(S.read.length/10*100)}
function go(v,a){speechSynthesis.cancel();clearHighlights();$('#card').hidden=true;scrollTo(0,0);V[v](a)}

const V={
home(){app.innerHTML=`<div class="c"><h2>NOBEL LECTURE<br>Mother Teresa</h2><p>A Realm of English (B) Selection · Pages 82–91<br><span class="tag">Bilingual Interactive Learning PWA</span></p>
<p>Reading Progress: ${pct()}%</p><div class="bar"><i style="width:${pct()}%"></i></div></div>
<div class="grid"><button onclick="go('read')">📖 Read the Text</button><button onclick="go('words')">🔤 Word Meanings</button><button onclick="go('notes')">📝 Footnotes</button><button onclick="go('search')">🔎 Search</button><button onclick="go('bm')">🔖 My Bookmarks</button><button onclick="go('prog')">📊 Progress</button>
<button onclick="go('more')">📚 Author, Background, Analysis, Themes</button><button onclick="go('qa')">❓ Questions</button></div>`},

read(){app.innerHTML=PAGES.map((p,i)=>`<div class="c"><span class="tag">Page ${p.n}</span> <b>${p.title}</b>`+
  p.paras.map((q,j)=>{
    const pid=`p${i}_${j}`;
    let bnHtml='';
    if(q.sents && q.sents.length){
      bnHtml = `<button class="b" onclick="this.nextElementSibling.hidden^=1">বাংলায় অর্থ (প্রতি বাক্য)</button>
      <div class="bn" hidden>${q.sents.map(s=>`<p><b>EN:</b> ${esc(s.en||'')}<br><b>বাংলা:</b> ${s.bn||''}</p>`).join('')}</div>`;
    }else if(q.bn){
      bnHtml = `<button class="b" onclick="this.nextElementSibling.hidden^=1">বাংলায় অর্থ</button>
      <div class="bn" hidden>${q.bn}<br><span class="tag">${q.k||''}</span></div>`;
    }else if(q.k){
      bnHtml = `<span class="tag">${q.k}</span>`;
    }
    return `<p id="${pid}">${words(q.t)}</p>${bnHtml}
    <p>
      <button class="b" onclick="speak(PAGES[${i}].paras[${j}].t,'${pid}')">🔊</button>
      <button class="b" onclick="speechSynthesis.pause()">⏸</button>
      <button class="b" onclick="speechSynthesis.resume()">▶️</button>
      <button class="b" onclick="speechSynthesis.cancel();clearHighlights()">⏹</button>
      <button class="b" onclick="bm('p:${i}_${j}')">🔖</button>
    </p>
    <textarea placeholder="My note" oninput="S.nt['${i}_${j}']=this.value;save()">${S.nt[i+'_'+j]||''}</textarea>`;
  }).join('')+
  `<p><button class="b" onclick="mark(${p.n});this.textContent='✓ Read'">Mark page read</button></p></div>`
).join('')},

words(){app.innerHTML='<div class="c"><h3>Word Meanings ('+Object.keys(DICT).length+' entries)</h3><p class="tag">Words with yellow underline have Bengali meanings. Aim ~60%+ coverage of key vocabulary.</p>'+
  Object.keys(DICT).sort().map(w=>`<p><span class="w has-mean" onclick="dict('${w}')"><b>${w}</b></span> — ${DICT[w][3]||''}</p>`).join('')+'</div>'},

notes(){app.innerHTML='<div class="c"><h3>Footnotes</h3>'+Object.entries(NOTES).map(([n,v])=>`<p><sup>${n}</sup> <b>${v[0]}</b>: ${v[1]}</p>`).join('')+'</div>'},

search(){app.innerHTML='<div class="c"><input id="q" placeholder="Search text, words, notes…" oninput="V.res(this.value)"><div id="r"></div></div>'},
res(q){q=q.trim().toLowerCase();if(q.length<2){$('#r').innerHTML='';return}let o=[];
  PAGES.forEach(p=>p.paras.forEach(x=>(x.t+' '+(x.bn||'')).toLowerCase().includes(q)&&o.push(`<p><span class="tag">p.${p.n}</span> ${words(x.t.slice(0,160),q)}…</p>`)));
  Object.keys(DICT).forEach(w=>(w+DICT[w].join(' ')).toLowerCase().includes(q)&&o.push(`<p>🔤 <b>${w}</b> — ${DICT[w][3]}</p>`));
  Object.values(NOTES).forEach(v=>(v.join(' ')).toLowerCase().includes(q)&&o.push(`<p>📝 <b>${v[0]}</b>: ${v[1]}</p>`));
  $('#r').innerHTML=o.join('')||'No results'},

bm(){app.innerHTML='<div class="c"><h3>My Bookmarks</h3>'+(S.bm.map(k=>k[0]=='q'?`<p>❓ ${QA[k.slice(2)].q}</p>`:k[0]=='w'?`<p>🔤 ${k.slice(2)}</p>`:`<p>📄 ${PAGES[k.slice(2).split('_')[0]].paras[k.slice(2).split('_')[1]].t.slice(0,120)}…</p>`).join('')||'None yet.')+'</div>'},

prog(){app.innerHTML=`<div class="c"><h3>Progress</h3><p>Pages read: ${S.read.length}/10<br>Words opened: ${S.vocab.length}<br>Bookmarks: ${S.bm.length}<br>Notes: ${Object.values(S.nt).filter(Boolean).length}</p></div>`},

more(){app.innerHTML=`<div class="c"><h3>Author, Background, Analysis, Themes</h3>
<p><b>Author:</b> Mother Teresa (1910–1997) – Roman Catholic nun, founded Missionaries of Charity, Nobel Peace Prize 1979, canonized 2016.</p>
<p><b>Background:</b> Delivered in Oslo, 10 December 1979, after receiving the Nobel Peace Prize.</p>
<p><b>Main Themes:</b> Love begins at home; poverty of loneliness; abortion as destroyer of peace; small acts of kindness; “You did it to me”; prayer of St. Francis.</p>
<p><b>Style:</b> Simple, personal, spiritual, full of concrete stories from Calcutta and the West.</p></div>
<div class="grid"><button onclick="go('search')">🔎 Search</button><button onclick="go('bm')">🔖 Bookmarks</button><button onclick="go('prog')">📊 Progress</button><button onclick="go('notes')">📝 Footnotes</button></div>`},

qa(){app.innerHTML='<div class="c"><h3>Questions</h3>'+(typeof QA!=='undefined'?QA.map((q,i)=>`<p><b>Q${i+1}.</b> ${q.q}<br><button class="b" onclick="this.nextElementSibling.hidden^=1">Show Answer</button><div class="bn" hidden>${q.a||''}</div></p>`).join(''):'<p>Questions coming soon.</p>')+'</div>'}
};

apply();go('home');
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');
