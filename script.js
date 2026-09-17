(function(){

  /* ---------- storage helpers (browser localStorage) ---------- */
  function getJSON(key, fallback){
    try{
      const raw = localStorage.getItem(key);
      if (raw === null) return fallback;
      return JSON.parse(raw);
    }catch(e){ return fallback; }
  }
  function setJSON(key, value){
    try{
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    }catch(e){ return false; }
  }

  /* ---------- navigation ---------- */
  function navigateTo(id){
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo({top:0, behavior:'smooth'});
  }
  document.querySelectorAll('[data-back]').forEach(btn => btn.addEventListener('click', () => goToHub()));

  /* ---------- player names ---------- */
  let players = { p1:'Player One', p2:'Taariq' };
  const p1El = document.getElementById('p1Name');
  const p2El = document.getElementById('p2Name');

  function currentPlayerLabel(){ return players.p1 + ' & ' + players.p2; }

  function makeEditable(el, field){
    el.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'text'; input.className = 'name-input'; input.value = players[field];
      el.replaceWith(input);
      input.focus(); input.select();
      function commit(){
        const val = input.value.trim() || players[field];
        players[field] = val;
        input.replaceWith(el);
        el.textContent = val;
        setJSON('players', players);
      }
      input.addEventListener('blur', commit);
      input.addEventListener('keydown', e => { if (e.key === 'Enter') input.blur(); });
    });
  }
  makeEditable(p1El, 'p1');
  makeEditable(p2El, 'p2');

  async function loadPlayers(){
    const stored = await getJSON('players', null);
    if (stored){ players = stored; p1El.textContent = players.p1; p2El.textContent = players.p2; }
  }

  /* ---------- Book of Us ---------- */
  const CARD_MESSAGE = `Happy 24th birthday to the love of my life, my best friend, and my future husband. 🤍 It’s crazy to think we met when we were only 19 and 20, and now we’ve spent the last few years growing, changing, traveling, eating way too much food, laughing, struggling, and making the best memories together. You have changed my life in more ways than I could ever explain. You’ve loved me, taken care of me, taught me so much, and have always been the person I can depend on no matter what.

I am so incredibly proud of the man you have become. Your strength, patience, generosity, love, curiosity, and devotion to your deen make me admire you more every day. Even through everything you’ve been going through, I know Allah has an incredible plan for you. I make dua that He gives you peace, happiness, health, success, endless rizq, and everything your heart desires.

Most of all, I’m so grateful that I get to love you and be loved by you. I cannot wait to call you my husband and spend every morning, meal, trip, milestone, and ordinary little moment of life by your side. You are my heart, my other half, my Delina to my Pegasus, and truly my favorite person in this world.

Happy birthday, my pretty boy. I love you more than words could ever explain. May Allah protect you, bless you, and bless the beautiful life we are building together. Inshallah, this is only the beginning. 🤍`;

  let reasons = [];
  let slides = [];
  let slideIndex = 0;
  const bookLoading = document.getElementById('bookLoading');
  const bookContent = document.getElementById('bookContent');
  const bookWrap = document.getElementById('bookWrap');
  const reasonTag = document.getElementById('reasonTag');
  const slideLabel = document.getElementById('slideLabel');
  const slideText = document.getElementById('slideText');
  const slideQuote = document.getElementById('slideQuote');
  const reasonProgress = document.getElementById('reasonProgress');
  const prevReason = document.getElementById('prevReason');
  const nextReason = document.getElementById('nextReason');
  const reasonToast = document.getElementById('reasonToast');
  const reasonToastSub = document.getElementById('reasonToastSub');

  // splits long text across as many card "pages" as it takes to fit, measured against
  // the actual rendered width/height of the slide-text box so it never gets cut off.
  // breaks text into words, remembering which ones start a new paragraph (blank line
  // in the source) so pagination can keep paragraph breaks instead of running everything together.
  function tokenizeParagraphs(text){
    const tokens = [];
    text.split(/\n\s*\n/).forEach((para, pi) => {
      para.split(/\s+/).filter(Boolean).forEach((word, wi) => {
        tokens.push({ text: word, paraBreak: pi > 0 && wi === 0 });
      });
    });
    return tokens;
  }
  function joinTokens(tokens){
    return tokens.map((t, i) => (i === 0 ? '' : t.paraBreak ? '\n\n' : ' ') + t.text).join('');
  }

  function paginateText(text){
    const tokens = tokenizeParagraphs(text);
    if (!tokens.length) return [''];
    const maxHeight = parseFloat(getComputedStyle(slideText).maxHeight) || slideText.clientHeight || 9999;
    const width = slideText.clientWidth;
    if (!width) return [text];

    const measurer = document.createElement('div');
    measurer.style.cssText = 'position:absolute; visibility:hidden; left:-9999px; top:0; white-space:pre-wrap; pointer-events:none; max-height:none;';
    measurer.className = slideText.className;
    measurer.style.width = width + 'px';
    document.body.appendChild(measurer);

    const pages = [];
    let start = 0;
    while (start < tokens.length){
      let lastGood = start;
      for (let end = start; end < tokens.length; end++){
        measurer.textContent = joinTokens(tokens.slice(start, end + 1));
        if (measurer.scrollHeight > maxHeight){
          if (end === start) lastGood = start; // a single word taller than the page — keep it anyway
          break;
        }
        lastGood = end;
      }
      pages.push(joinTokens(tokens.slice(start, lastGood + 1)));
      start = lastGood + 1;
    }
    document.body.removeChild(measurer);
    return pages.length ? pages : [''];
  }

  function buildSlides(){
    const messagePages = paginateText(CARD_MESSAGE);
    const messageSlides = messagePages.map((text, i) => ({
      type: 'message',
      text: text,
      label: '✍️ MY MESSAGE TO YOU' + (messagePages.length > 1 ? ' (' + (i + 1) + '/' + messagePages.length + ')' : ''),
      quote: ''
    }));
    const reasonSlides = reasons.map((r, i) => ({
      type: 'reason',
      text: r.text,
      label: '💕 reasons, one at a time',
      quote: '— added by ' + (r.addedBy || 'someone special') + (r.date ? ', ' + r.date : ''),
      reasonNum: i + 1
    }));
    slides = messageSlides.concat(reasonSlides);
  }

  function renderSlide(){
    bookWrap.style.display = 'flex';
    if (!slides.length) buildSlides();
    const total = slides.length;
    slideIndex = Math.min(Math.max(slideIndex, 0), total - 1);
    const s = slides[slideIndex];
    slideLabel.textContent = s.label;
    slideText.textContent = s.text;
    slideQuote.textContent = s.quote;
    reasonTag.textContent = s.type === 'reason'
      ? 'reason ' + s.reasonNum + ' of ' + reasons.length
      : (reasons.length ? 'a message for you' : 'a message for you — add the first reason below');
    reasonProgress.style.width = ((slideIndex + 1) / total * 100) + '%';
    prevReason.disabled = slideIndex === 0;
    nextReason.disabled = slideIndex === total - 1;
  }
  prevReason.addEventListener('click', () => { slideIndex--; renderSlide(); });
  nextReason.addEventListener('click', () => { slideIndex++; renderSlide(); });

  // widths only settle once #screen-book is actually visible, so re-paginate whenever
  // the card is opened, and again on resize while it's on screen.
  function refreshSlides(){
    buildSlides();
    renderSlide();
  }
  let slideResizeTimer = null;
  window.addEventListener('resize', () => {
    if (!document.getElementById('screen-book').classList.contains('active')) return;
    clearTimeout(slideResizeTimer);
    slideResizeTimer = setTimeout(refreshSlides, 200);
  });

  async function loadReasons(){
    reasons = await getJSON('reasons', []);
    bookLoading.style.display = 'none';
    bookContent.style.display = 'block';
  }

  document.getElementById('showReasonForm').addEventListener('click', () => {
    document.getElementById('reasonForm').classList.toggle('show');
  });
  document.getElementById('reasonForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('reasonInput');
    const text = input.value.trim();
    if (!text) return;
    reasons.push({ text: text, addedBy: currentPlayerLabel(), date: new Date().toLocaleDateString() });
    await setJSON('reasons', reasons);
    input.value = '';
    document.getElementById('reasonForm').classList.remove('show');
    buildSlides();
    slideIndex = slides.length - 1;
    renderSlide();
    reasonToastSub.textContent = 'the card now holds ' + reasons.length + ' reason' + (reasons.length === 1 ? '' : 's') + '. it never runs out.';
    reasonToast.classList.add('show');
    setTimeout(() => reasonToast.classList.remove('show'), 2200);
  });

  /* ---------- Quest Log ---------- */
  const CATEGORIES = [
    { key:'movies',      tabIcon:'🎬', tabLabel:'Movies',      itemIcon:'🎬', doneLabel:'WATCHED',      queuedLabel:'WATCHLIST',   emptyText:'no movies added yet.' },
    { key:'books',       tabIcon:'📚', tabLabel:'Books',       itemIcon:'📚', doneLabel:'READ',         queuedLabel:'TO READ',     emptyText:'no books added yet.' },
    { key:'restaurants', tabIcon:'🍜', tabLabel:'Restaurants', itemIcon:'🍜', doneLabel:'BEEN THERE',   queuedLabel:'WANT TO TRY', emptyText:'no restaurants added yet.' },
    { key:'cafes',       tabIcon:'☕', tabLabel:'Cafés',       itemIcon:'☕', doneLabel:'TRIED',        queuedLabel:'TO TRY',      emptyText:'no cafés added yet.' },
    { key:'perfumes',    tabIcon:'🌸', tabLabel:'Perfumes',    itemIcon:'🌸', doneLabel:'FAVORITE',     queuedLabel:'WISHLIST',    emptyText:'no perfumes added yet.' },
    { key:'goals',       tabIcon:'🎯', tabLabel:'Goals',       itemIcon:'🎯', doneLabel:'ACHIEVED',     queuedLabel:'IN PROGRESS', emptyText:'no goals added yet.' }
  ];
  function seedEntry(title, reason, status){
    return {
      id: 'seed-' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: title,
      note: reason || '',
      status: status || 'queued'
    };
  }
  // [title, reason] pairs for things you've already done together — marked "done" since
  // the reason is the memory, not a to-do.
  function seedDone(pairs){
    return pairs.map(([title, reason]) => seedEntry(title, reason, 'done'));
  }
  const DEFAULT_ENTRIES = {
    movies: seedDone([
      ['Odyssey', 'The best movie we’ve ever watched together — our very first 70mm, and a night I’ll never forget sharing with you'],
      ['Hamlet', 'One of my favorite movies we’ve ever watched together — I still think about it'],
      ['Bulgonia', 'A random pick that turned into one of our funniest movie nights together'],
      ['Obsession', 'We went in bracing for scary and just ended up laughing — that thing wasn’t even scary']
    ]),
    restaurants: seedDone([
      ['Charles', 'Where we celebrated our first six months together — the start of everything'],
      ['Mister Charles', 'Our very first birthday dinner together, and the first of so many more to come'],
      ['Sister', 'Where we marked a year and a half together, still just as in love'],
      ['Saint Martin', 'Our two-year anniversary dinner — two years in and still falling deeper for you'],
      ['El Canto', 'Where we celebrated three years together, and three years of the best memories of my life'],
      ['Taco La Banqueta', 'Life-changing tacos, for real, the best in the game — one of our favorite little rituals together']
    ]),
    cafes: seedDone([
      ['Wild Detectives', 'The very first coffee shop we made ours — chai lattes and hours that flew by'],
      ['Turbo', 'Our favorite spot to grab coffee and play games together for hours'],
      ['Sweet Hut Bakery', 'Our newest favorite boba spot, already full of good memories'],
      ['Habitat', 'Our best recent find, and already one of our favorite places to be together'],
      ['Ottos', 'Our go-to for the best late-night vibes together'],
      ['Buzz and Bustle', 'Our favorite spot to study side by side']
    ]),
    perfumes: seedDone([
      ['Pegasus', 'The OG scent that made me fall in love with you all over again every time I smell it'],
      ['Intense Cafe', 'My favorite perfume you’ve ever given me — I think of you every time I wear it'],
      ['Stronger With You', 'One of your OG signature scents, strong and unmistakably you'],
      ['Jamaican Tobacco', 'I genuinely miss this one — we need to bring her back'],
      ['Gris Chanel Extrait', 'My new favorite, one you picked out for me, and I’ve been obsessed ever since'],
      ['Moon Light Pathclou Van Cleef', 'I miss her for real, bring her back — she was one of my all-time favorites']
    ]),
    books: ['The Odyssey'].map(t => seedEntry(t)),
    goals: ['Become husband and wife forever ❤️'].map(t => seedEntry(t))
  };

  const questCache = {};
  let currentCatKey = CATEGORIES[0].key;

  const catTabsEl = document.getElementById('catTabs');
  CATEGORIES.forEach(cat => {
    const tab = document.createElement('div');
    tab.className = 'cat-tab';
    tab.dataset.key = cat.key;
    tab.textContent = cat.tabIcon + ' ' + cat.tabLabel;
    tab.addEventListener('click', () => switchCategory(cat.key));
    catTabsEl.appendChild(tab);
  });

  function catConfig(key){ return CATEGORIES.find(c => c.key === key); }

  async function switchCategory(key){
    currentCatKey = key;
    Array.from(catTabsEl.children).forEach(t => t.classList.toggle('active', t.dataset.key === key));
    document.getElementById('catHeaderTitle').textContent = catConfig(key).tabLabel.toUpperCase();
    document.getElementById('questLoading').style.display = 'block';
    document.getElementById('questList').innerHTML = '';
    document.getElementById('questEmpty').style.display = 'none';
    document.getElementById('questForm').classList.remove('show');

    if (!(key in questCache)){
      // seeded entries (id starts with "seed-") always refresh from the code's current
      // defaults, so editing DEFAULT_ENTRIES here shows up for returning visitors too —
      // only entries someone actually typed in through the app are kept from storage.
      const stored = await getJSON('entries:' + key, null);
      const defaults = DEFAULT_ENTRIES[key] || [];
      if (stored === null){
        questCache[key] = defaults;
      } else {
        const userAdded = stored.filter(e => !String(e.id).startsWith('seed-'));
        questCache[key] = defaults.concat(userAdded);
      }
      await setJSON('entries:' + key, questCache[key]);
    }
    document.getElementById('questLoading').style.display = 'none';
    renderQuestList();
  }

  function renderQuestList(){
    const cfg = catConfig(currentCatKey);
    const entries = questCache[currentCatKey] || [];
    const doneCount = entries.filter(e => e.status === 'done').length;
    document.getElementById('catCount').textContent = doneCount + ' ' + cfg.doneLabel.toLowerCase() + ' · ' + (entries.length - doneCount) + ' ' + cfg.queuedLabel.toLowerCase();

    const listEl = document.getElementById('questList');
    const emptyEl = document.getElementById('questEmpty');
    if (entries.length === 0){
      emptyEl.textContent = cfg.emptyText;
      emptyEl.style.display = 'block';
      listEl.innerHTML = '';
      return;
    }
    emptyEl.style.display = 'none';
    listEl.innerHTML = '';
    entries.forEach(entry => {
      const card = document.createElement('div');
      card.className = 'quest-card';
      const statusLabel = entry.status === 'done' ? cfg.doneLabel : cfg.queuedLabel;
      const statusClass = entry.status === 'done' ? 'status-done' : 'status-queued';
      card.innerHTML =
        '<div class="quest-icon">' + cfg.itemIcon + '</div>' +
        '<div class="quest-body">' +
          '<div class="quest-title"></div>' +
          '<div class="quest-reason"><span class="quest-reason-label">REASON</span><span class="quest-reason-text"></span></div>' +
        '</div>' +
        '<button class="quest-status ' + statusClass + '">' + (entry.status === 'done' ? '✓ ' : '') + statusLabel + '</button>' +
        '<button class="remove-btn" title="remove">✕</button>';
      card.querySelector('.quest-title').textContent = entry.title;
      const reasonEl = card.querySelector('.quest-reason');
      if (entry.note){
        card.querySelector('.quest-reason-text').textContent = entry.note;
      } else {
        reasonEl.style.display = 'none';
      }
      card.querySelector('.quest-status').addEventListener('click', () => toggleStatus(entry.id));
      card.querySelector('.remove-btn').addEventListener('click', () => removeEntry(entry.id));
      listEl.appendChild(card);
    });
  }

  async function persistCurrentCategory(){
    await setJSON('entries:' + currentCatKey, questCache[currentCatKey]);
  }

  async function toggleStatus(id){
    const entries = questCache[currentCatKey];
    const entry = entries.find(e => e.id === id);
    if (!entry) return;
    entry.status = entry.status === 'done' ? 'queued' : 'done';
    renderQuestList();
    await persistCurrentCategory();
  }
  async function removeEntry(id){
    questCache[currentCatKey] = questCache[currentCatKey].filter(e => e.id !== id);
    renderQuestList();
    await persistCurrentCategory();
  }

  document.getElementById('showQuestForm').addEventListener('click', () => {
    document.getElementById('questForm').classList.toggle('show');
  });
  document.getElementById('questForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const titleInput = document.getElementById('questTitle');
    const noteInput = document.getElementById('questNote');
    const title = titleInput.value.trim();
    if (!title) return;
    const entry = {
      id: Date.now() + '-' + Math.random().toString(36).slice(2),
      title: title,
      note: noteInput.value.trim(),
      status: 'queued',
      addedBy: currentPlayerLabel(),
      date: new Date().toLocaleDateString()
    };
    if (!questCache[currentCatKey]) questCache[currentCatKey] = [];
    questCache[currentCatKey].push(entry);
    titleInput.value = ''; noteInput.value = '';
    document.getElementById('questForm').classList.remove('show');
    renderQuestList();
    await persistCurrentCategory();
  });

  /* ---------- walkable hub (pac-man) ---------- */
  const hubMap = document.getElementById('hubMap');
  const player = document.getElementById('player');
  const facing = document.getElementById('facing');
  const pac1 = document.getElementById('pac1');
  const pac2 = document.getElementById('pac2');
  const warpFlash = document.getElementById('warpFlash');
  const cabinets = Array.from(document.querySelectorAll('.cabinet'));
  const mapW = 800, mapH = 520, spriteW = 44, spriteH = 26;
  let x = 90, y = 330;
  let isWarping = false;
  let facingAngle = 0;
  const REVISIT_COOLDOWN = 1400;
  const keys = {};

  cabinets.forEach(c => {
    c.style.left = c.dataset.x + 'px';
    c.style.top = c.dataset.y + 'px';
    c.dataset.lastEaten = -99999;
  });

  window.addEventListener('keydown', e => { keys[e.key.toLowerCase()] = true; });
  window.addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });

  function goToHub(){
    x = 400; y = 280;
    player.style.left = x + 'px';
    player.style.top = y + 'px';
    navigateTo('screen-hub');
  }

  function warpTo(cabinet){
    isWarping = true;
    warpFlash.classList.add('active');
    setTimeout(() => warpFlash.classList.remove('active'), 200);
    setTimeout(() => {
      navigateTo(cabinet.dataset.screen);
      if (cabinet.dataset.screen === 'screen-book'){
        resetCardClosed();
      }
      if (cabinet.dataset.tabIndex !== undefined && cabinet.dataset.screen === 'screen-quest'){
        const idx = parseInt(cabinet.dataset.tabIndex, 10);
        switchCategory(CATEGORIES[idx].key);
      }
      isWarping = false;
    }, 260);
  }

  function resetCardClosed(){
    const card = document.querySelector('#screen-book .card');
    if (!card) return;
    card.classList.remove('open');
  }

  function launchHearts(){
    const layer = document.getElementById('heartsLayer');
    if (!layer) return;
    const glyphs = ['❤️','💖','💗','💕','💘'];
    for (let i = 0; i < 28; i++){
      const h = document.createElement('div');
      h.className = 'heart-piece';
      h.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
      h.style.left = (Math.random() * 100) + '%';
      h.style.fontSize = (14 + Math.random() * 16) + 'px';
      h.style.setProperty('--drift', (Math.random() * 160 - 80) + 'px');
      h.style.setProperty('--spin', (Math.random() * 60 - 30) + 'deg');
      h.style.animationDuration = (3.6 + Math.random() * 2.6) + 's';
      h.style.animationDelay = (Math.random() * 1.1) + 's';
      layer.appendChild(h);
    }
    setTimeout(() => { layer.innerHTML = ''; }, 7200);
  }

  const bdayCard = document.getElementById('bdayCard');
  const cardCover = document.getElementById('cardCover');
  if (cardCover){
    cardCover.addEventListener('click', () => {
      if (bdayCard.classList.contains('open')) return;
      bdayCard.classList.add('open');
      refreshSlides();
      launchHearts();
    });
  }

  function checkNear(){
    const now = performance.now();
    cabinets.forEach(c => {
      const cx = parseFloat(c.dataset.x);
      const cy = parseFloat(c.dataset.y);
      const dist = Math.hypot((x + spriteW/2) - cx, y - cy);
      c.classList.toggle('active', dist < 75);

      const pellet = c.querySelector('.pellet');
      const lastEaten = parseFloat(c.dataset.lastEaten);
      if (pellet && !isWarping && dist < 32 && (now - lastEaten > REVISIT_COOLDOWN)){
        c.dataset.lastEaten = now;
        pellet.classList.add('eaten');
        setTimeout(() => pellet.classList.remove('eaten'), 500);
        warpTo(c);
      }
    });
  }

  function tick(){
    const hubEl = document.getElementById('screen-hub');
    if (!hubEl.classList.contains('active')){
      requestAnimationFrame(tick);
      return;
    }

    const speed = 4;
    let dx = 0, dy = 0;
    if (keys['arrowleft'] || keys['a']) dx -= speed;
    if (keys['arrowright'] || keys['d']) dx += speed;
    if (keys['arrowup'] || keys['w']) dy -= speed;
    if (keys['arrowdown'] || keys['s']) dy += speed;

    const isMoving = dx !== 0 || dy !== 0;
    player.classList.toggle('walking', isMoving);
    pac1.classList.toggle('paused', !isMoving);
    pac2.classList.toggle('paused', !isMoving);
    if (isMoving){
      facingAngle = Math.atan2(dy, dx) * 180 / Math.PI;
      facing.style.transform = 'rotate(' + facingAngle + 'deg)';
    }

    x = Math.min(Math.max(x + dx, 0), mapW - spriteW);
    y = Math.min(Math.max(y + dy, spriteH), mapH);
    player.style.left = x + 'px';
    player.style.top = y + 'px';
    checkNear();
    requestAnimationFrame(tick);
  }

  /* ---------- init ---------- */
  (async function init(){
    await loadPlayers();
    await loadReasons();
    await switchCategory(CATEGORIES[0].key);
    requestAnimationFrame(tick);
  })();

  /* ---------- chiptune music engine (original loop, not a real song) ---------- */
  let audioCtx = null, musicGain = null, musicMuted = false, musicRunning = false;
  let nextNoteTime = 0, melodyStep = 0;
  let nextChordTime = 0, chordStep = 0;

  // an original I–V–vi–IV progression in C major — the pad + bass retrigger together
  // on each chord so the harmony actually moves instead of a single static drone.
  const CHORDS = [
    { tones:[261.63,329.63,392.00], bass:65.41,  dur:2.0 }, // C
    { tones:[392.00,493.88,587.33], bass:98.00,  dur:2.0 }, // G
    { tones:[440.00,523.25,659.25], bass:110.00, dur:2.0 }, // Am
    { tones:[349.23,440.00,523.25], bass:87.31,  dur:2.0 }  // F
  ];

  // an original 4-bar melody with real phrasing (mixed note lengths, not a flat
  // arpeggio), timed so each phrase lands on a chord tone as the harmony changes.
  const MELODY = [
    {f:392.00,d:0.5},{f:659.25,d:0.5},{f:587.33,d:0.25},{f:659.25,d:0.25},{f:783.99,d:0.5},
    {f:493.88,d:0.5},{f:587.33,d:0.5},{f:523.25,d:0.25},{f:493.88,d:0.25},{f:392.00,d:0.5},
    {f:523.25,d:0.5},{f:440.00,d:0.5},{f:659.25,d:0.25},{f:523.25,d:0.25},{f:440.00,d:0.5},
    {f:440.00,d:0.5},{f:349.23,d:0.5},{f:523.25,d:0.25},{f:440.00,d:0.25},{f:349.23,d:0.5}
  ];

  function ensureAudio(){
    if (!audioCtx){
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return false;
      audioCtx = new Ctx();
      musicGain = audioCtx.createGain();
      musicGain.gain.value = 0.18;
      musicGain.connect(audioCtx.destination);
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return true;
  }

  function playTone(freq, startTime, duration, type, peak){
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, startTime);
    g.gain.linearRampToValueAtTime(peak, startTime + 0.02);
    g.gain.linearRampToValueAtTime(0.0001, startTime + duration);
    osc.connect(g);
    g.connect(musicGain);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }

  function playChord(chord, startTime){
    const dur = chord.dur;
    chord.tones.forEach(freq => {
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, startTime);
      g.gain.linearRampToValueAtTime(0.05, startTime + 0.3);
      g.gain.linearRampToValueAtTime(0.05, startTime + dur - 0.3);
      g.gain.linearRampToValueAtTime(0.0001, startTime + dur);
      osc.connect(g);
      g.connect(musicGain);
      osc.start(startTime);
      osc.stop(startTime + dur + 0.05);
    });
    const bassOsc = audioCtx.createOscillator();
    const bassGain = audioCtx.createGain();
    bassOsc.type = 'sine';
    bassOsc.frequency.value = chord.bass;
    bassGain.gain.setValueAtTime(0.0001, startTime);
    bassGain.gain.linearRampToValueAtTime(0.09, startTime + 0.05);
    bassGain.gain.linearRampToValueAtTime(0.0001, startTime + dur - 0.05);
    bassOsc.connect(bassGain);
    bassGain.connect(musicGain);
    bassOsc.start(startTime);
    bassOsc.stop(startTime + dur + 0.05);
  }

  function schedulerLoop(){
    if (!musicRunning) return;
    const lookahead = audioCtx.currentTime + 0.2;
    while (nextNoteTime < lookahead){
      const note = MELODY[melodyStep % MELODY.length];
      playTone(note.f, nextNoteTime, note.d * 0.9, 'square', 0.35);
      nextNoteTime += note.d;
      melodyStep++;
    }
    while (nextChordTime < lookahead){
      const chord = CHORDS[chordStep % CHORDS.length];
      playChord(chord, nextChordTime);
      nextChordTime += chord.dur;
      chordStep++;
    }
    setTimeout(schedulerLoop, 50);
  }

  function startMusic(){
    if (!ensureAudio() || musicRunning) return;
    musicRunning = true;
    nextNoteTime = audioCtx.currentTime + 0.05;
    nextChordTime = audioCtx.currentTime + 0.05;
    melodyStep = 0;
    chordStep = 0;
    schedulerLoop();
  }

  const soundToggle = document.getElementById('soundToggle');
  soundToggle.addEventListener('click', () => {
    musicMuted = !musicMuted;
    if (musicGain) musicGain.gain.value = musicMuted ? 0 : 0.18;
    soundToggle.textContent = musicMuted ? '🔇' : '🔊';
    if (!musicRunning) startMusic();
  });

  /* ---------- intro sequence ---------- */
  const introScreen = document.getElementById('screen-intro');
  const phoneLid = document.getElementById('phoneLid');
  const phoneScreenText = document.getElementById('phoneScreenText');
  const tapPrompt = document.getElementById('tapPrompt');
  let introStarted = false;

  /* ---------- confetti + balloons ---------- */
  function launchCelebration(){
    const layer = document.getElementById('celebrationLayer');
    const colors = ['var(--blue)','var(--purple)','var(--pink)','var(--yellow)','#ffffff'];

    for (let i = 0; i < 46; i++){
      const p = document.createElement('div');
      p.className = 'confetti-piece';
      p.style.left = (Math.random() * 100) + '%';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.setProperty('--drift', (Math.random() * 140 - 70) + 'px');
      p.style.animationDuration = (3.2 + Math.random() * 2.2) + 's';
      p.style.animationDelay = (Math.random() * 0.8) + 's';
      if (Math.random() > 0.5) p.style.borderRadius = '50%';
      layer.appendChild(p);
    }
    for (let i = 0; i < 7; i++){
      const b = document.createElement('div');
      b.className = 'balloon';
      b.style.left = (8 + Math.random() * 82) + '%';
      b.style.background = colors[i % colors.length];
      b.style.setProperty('--sway', (Math.random() * 70 - 35) + 'px');
      b.style.animationDuration = (6.5 + Math.random() * 2.5) + 's';
      b.style.animationDelay = (Math.random() * 0.8) + 's';
      layer.appendChild(b);
    }
    setTimeout(() => { layer.innerHTML = ''; }, 7000);
  }

  introScreen.addEventListener('click', () => {
    if (introStarted) return;
    introStarted = true;
    tapPrompt.classList.add('hidden');
    startMusic();
    phoneLid.classList.add('open');
    setTimeout(() => {
      phoneScreenText.classList.add('show');
      launchCelebration();
    }, 750);
    setTimeout(() => introScreen.classList.add('zooming'), 5200);
    setTimeout(() => {
      introScreen.style.display = 'none';
      goToHub();
    }, 5760);
  });

})();
