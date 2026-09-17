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
  const CARD_MESSAGE = `HAPPY BIRTHDAY TAARIQ HASSANNNN aka  my pretty boy, the love of my absolute life, my eyes, my heart and my brain the Taariq Hassan.  I can not believe that you are 24 now!!!! You are so old hehe. I am still young ig. #webothunctbh.  I can not believe that I have been with you since you were 21. I felt like were just kids when we started our life out together. It was truly the absolute best. Just young dumb broke highschools kids except you wined and dined me every night LOL. You truly took such good care of me in every humanly way possible. You actually still do in every way possible. You have changed my life so much since we met. Beyond words. I am thinking damn we met when you were 20, I was jsut 19, and we have changed and growed so much together in so many ways. You taught me how to dress, how to smell good ( hard to admit), how to walk properly, how to talk, how to hold myself to a high standard, how to talk to people properly, how to gain knowledge. Like genuinely the amount you have contributed my life is insane, it is unimaginable. You are always by my side when I need something at all. LIke you always tell me right now "oh I can't give you anything". Like genuinely what do you even mean bro. You have given me the world and more in the last 3 years we have been together. You have given me purpose, an identity, taste, and you also made me fat lets not forget about that, but seriously you even made me enjoy food more. You have done so much for me, you are truly the most essentially part of my life. You are my other heart, my other half. You are my oxygen when I breathe, you are the milk to my coffee, you are the salsa to my steak quesadillas.  Everything you have done for me is beyond words and just beyond everything. I love you so so so much baby and i truly wanted to show you how much you mean to me. How much you do for me on a daily basis. When I need something your the first person to get it. When I feel sick your the first person to help me. When I want to cry about somehtring you are the first person I can lean on. No matter what your state is, when you se my tears, your first instinct is to help me and make me feel better. Like truly i think my life would be absolute complete dog shit without you. You mean a lot to me.

Ok enough about everything you do for me, lets talk about everything we did TOGETHER. Omg I literally doom scroll on our camera roll and the amount of pictures, memories, candid photos, funny text messages we have is endless. The amount of time we spent together with each other can not even be matched up to anything. The amount of memories we have together is just incredible. First year we were together, we would always go to the boardwalk and sit on our bench and just watch people walk by. I remember we would always talk about how excited we were for school to start so we can spend time with each other. I would always grab your face and remind you how fucked we are….and look at us 3 years later just as fucked. Anyways when the year started, we would always be at wild detectives. I remember you always getting a chai tea latte and we would be there til 12 am. Afterwards we would be taking a nap infront of my dorm in your car. We then had our ichigo phase, we loved that ramen place so much and then our yama phase, we would always get that creamy seafood udon everynight along with sushi. You sadly then got pneumonia and then we were off to abroad together. During abroad, that was literally the best time ever. Our staircase chronicles, our late night walks and food finds, us having the best pho of our lives in prague, us having the best ramen in amsterdam and your famous stroop waffles. Us looking at museums together, going shopping together, being cold and shivering together, and even getting lost together in amsterdam. We truly enjoyed every moment, every step of the way. Then we came back and had so much fun because I was non zabiha. We would go to taco la banqueta, in and out, and just try every food out there. Our lives ( my life) was truly changed. Then sadly you graduated and came summer. Where we went to houston like fat and horny assess and had a hella fun time. After houston, we started my senior year together with a new home at Moore. Everyday was so much fun. Our late night 7 eleven runs for some yummy ramen, our taco runs, us watching pent house in my room, us going to walmart, crumbl, trader joes. We would just be doing everything, cuddling, and watching a show everynight. Us sharing a cig on the roof tops of hamon. Us sneaking into moody and pulling all nighters. We had so so much fun these last two years. I know this last year has been not so fun for us and has been hard, but we still made so many great memories. We went so many times to northpartk and the scent room, we found out about jinghe and bros and kept spamming that, we have had so many movie dates, and we have spent so many days just hanging out in turbo or sweet hut together. Every year with you has been a blessing. Walking down memory lane is just another blessing. Everything we did together and shared together, will forever be engrained in my mind and I will forever be grateful.

Sooooo whats next!??? Well I want to say baby first of all that I am so so so so proud of you. I am proud of the man that can handle any problem, the man that can find a solution to everything, the man that has been steadfast on his deen, the man who is always curious to learn, to grown, to become a better person than he was yesterday, the man that loves with his entire heart, the man who is so selfless that even through everything you are going through, I am still teh first priority in your mind. The man who is so generous, so selfless with his time with his love I can not even put it into words. I am so so proud of the man you have become. You demonstrate every single quality of a good muslim man, and a extradoirdinary amazing loving husband ( which I am so excited to call you). I know everything has been hard recently, and you have been put through immense stress and a very big test, but just know that the man that I love and admire is a output of everything. You have demonstrated even more strength, love, and patience in times where you truly have felt rock bottom, you just keep becoming an even more amazing man and character day by day. Maybe that is why you are being put into this test, to reach to your max potential as a husband, as a muslim, as a entrepernuer. Hoenstly I am not worried about you. I know you are very worried, and I know you are really stressed, but Allah is al rizaq, and he will give you your rizq one way or another. Trust in his plan, in him, and he will maybe get you that money through a job or other means. But he is al rizaq and he will take care of his servant that has shown so much devotion and ibadah and love towards him. I am really excited to step into this next chapter with you baby. I am so so excited, to be your WIFEEE and you MY HUSBAND and spend the rest of our lives together. Spend every morning, every coffee, lunch, dinner, trip, and moment with you. Truly I am so excited. I hope allah blesses our marriage and makes us the happiest couple ever.

I hope allah protects you from any evil eye, any evil intentions of anyone and any poor health. I make dua that all grants you happiness, and cures your depression and brings you calmness, relaxness, and takes away your anxiety. I make dua that allah replaces every single thing that you are stressed about with bliss and happiness and gives you inshallah the life you dreamed about. I make dua that allah allows you to sleep well, takes away your insomnia, your heart palpitations and the constant pressure on your heart. I make dua that allah grants you teh job, the career of your dreams, gets you into the medschool of your dreams and allows us to have teh wedding of our dreams. I make dua that allah gives you health, and happiness and prosperity. I make dua that allah grants you a clear mind where you can concentrate and focus and really tap into your max potential. I make dua that allah grants you every single one of your dreams, your wishes, your happiensses, and truly allows you to live the life you have always dreamt of by my side. I make dua that allah makes me worthy of being your wife, and just grants us a amazing life in this world and the next. May allah forgive both of our sins, and allow us to enter the highest ranks of jannah together inshallah with our family. AMEEENNN.

Lastly, before we close out, I just wanted to say. I LOVE YOU BABYYYYYY. I love you so so much. Words can not even put into perspective how much you truly mean to me baby. Like actually, i love your smile, your laugh, your hugs, your kisses, your touch, everything just means so much to me. I love the way you look at me, i love the way you chuckle when I make a joke, i love the way your eyes glisten when you look at me, i love the way you are so gentle with me ( only after abusing me). I love the way that you kiss my forehead, the way you say my love. The way you hold my hand, the way you squeeze my thighs when you drive. The way you always hold my door for me, the way you hug me, the way you hold my chin when you talk to me, the way you slap my ass and work your other magic #ifykyk. I love everything about you. When i see you, my days is a 10000 times better. When you smile, I have to smile 10 times harder. When you are gone, I am just searching for your scent, the way you smell, your presence. When you talk to me, i love to listen and I can listen endlessly.  When we eat, i love to enjoy every meal with you and just talk about everything to you. You truly are my yin to my yang. My left to my right, my delina to my pegasus. You are my right hand, you are my everything. Not a day goes by still that when I see you, I dont have the time of my life. When we literally leave a hangout I just replay how cute and fun everything was. You truly make my life so much better and I did not know what love is till I met you. I did not know what people meant when they say you find your soulmate till I met you. You are my everything baby truly. You are my soul, my heart, my everything. I did not know what love is till i met you and I am so grateful that allah has given me the opportunity to experience this love with you, my future husband. moreover, I am so grateful to be loved by you. Your love is a one in a billion, and I am so so grateful everyday that i get to experience it, and be the one you cherish and hold so close to your heart, because I hold you so close to mine.

Happy happy birthday again my love inshallah I can not wait to celebrate with you and our love together. I dont care what you say, we will go out and have so much fun because truly you deserve this and a million times more. I hope I can give you the best day. I love you to the moon and back. Happy birthday again to my future hubby`;

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
  function seedEntry(title){
    return { id: 'seed-' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-'), title: title, note: '', status: 'queued' };
  }
  const DEFAULT_ENTRIES = {
    movies:      ['The Last Kingdom (movie)', 'Peaky Blinders (movie)', 'The Pianist', 'Demon Slayer (movie)'].map(seedEntry),
    restaurants: ['Normans', 'Stella', 'Masume'].map(seedEntry),
    cafes:       ['Cafe Olivia', 'The Wild Detectives', 'The Kilo Coffee', 'Hyphen - Space', 'Cafe Maiko'].map(seedEntry),
    perfumes:    ['Dior Tobacolor', 'Il Padrino (Sospiro)', 'Pegasus (PDM)', 'Hibiscus Mahajad'].map(seedEntry),
    books:       ['The Odyssey'].map(seedEntry),
    goals:       ['Become husband and wife forever ❤️'].map(seedEntry)
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
      questCache[key] = await getJSON('entries:' + key, DEFAULT_ENTRIES[key] || []);
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
          '<div class="quest-note"></div>' +
        '</div>' +
        '<button class="quest-status ' + statusClass + '">' + (entry.status === 'done' ? '✓ ' : '') + statusLabel + '</button>' +
        '<button class="remove-btn" title="remove">✕</button>';
      card.querySelector('.quest-title').textContent = entry.title;
      card.querySelector('.quest-note').textContent = entry.note || '';
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
