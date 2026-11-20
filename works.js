
window.TOPICS = {
  cool: { en: 'AMO',          zh: '原子分子光物理', c: 'var(--accent)' },
  art:  { en: 'Quantum', zh: '量子', c: 'var(--pink)' },
  tool: { en: 'Tool',    zh: '工具', c: 'var(--lemon)' }
};

window.WORKS = [
  { section: 'lab', slug: 'mot-simulator', topic: 'cool', featured: true,
    en: 'Cesium MOT Simulator', zh: '銫原子 MOT 模擬器',
    en_d: 'Observe how magnetic and optical fields cool and trap a cloud of cesium atoms.',
    zh_d: '觀察磁與光如何冷卻並捕抓銫原子雲。' },
  { section: 'gallery', slug: 'qursive', topic: 'art', featured: true,
    en: 'Qursive', zh: 'Qursive',
    en_d: 'A quantum sensory experiment. A field of spheres dances on its own.',
    zh_d: '一場量子感官實驗。球體各自起舞。' },
  // url: the trip planner lives in its own repo; the thumbnail stays at supply/trip-planner/thumb.webp
  { section: 'supply', slug: 'trip-planner', topic: 'tool', featured: true, url: 'https://clinqclinq.studio/trip-planner/',
    en: 'Trip Planner', zh: 'Trip Planner',
    en_d: 'A small tool for viewing and editing AI-generated travel itineraries.',
    zh_d: '方便查看與編輯 AI 生成的旅遊行程的小工具。' }
];

window.SECTIONS = {
  newsstand: { en: 'Newsstand', zh: '報亭' },
  gallery:   { en: 'Gallery',   zh: '展示廳' },
  lab:       { en: 'Lab',       zh: '實驗室' },
  theater:   { en: 'Theater',   zh: '劇場' },
  salon:     { en: 'Salon',     zh: '沙龍' },
  select:    { en: 'Select',    zh: '選物' },
  supply:    { en: 'Supply',    zh: '補給站' }
};


window.workCardsHTML = function (list, root, zh, current) {
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  return list.map(function (t) {
    var tp = window.TOPICS[t.topic] || { en: t.topic, zh: t.topic, c: 'var(--accent)' };
    var hide = current && current !== 'all' && t.topic !== current;
    var href = root + t.section + '/' + t.slug + '/';
    return '<a class="work-card" href="' + (t.url || href) + '" target="_self" data-topic="' + t.topic + '"' + (hide ? ' hidden' : '') + '>' +
      '<div class="work-thumb"><img src="' + href + 'thumb.webp" alt="" loading="lazy" decoding="async" width="960" height="600">' +
      '<span class="play">' + (zh ? '開啟 →' : 'Open →') + '</span></div>' +
      '<div class="work-meta"><span class="work-topic" style="--c:' + tp.c + '">' + esc(zh ? tp.zh : tp.en) + '</span></div>' +
      '<strong>' + esc(zh ? t.zh : t.en) + '</strong><span class="work-desc">' + esc(zh ? t.zh_d : t.en_d) + '</span></a>';
  }).join('');
};
