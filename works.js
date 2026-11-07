
window.TOPICS = {
  cool: { en: 'AMO',          zh: '原子分子光物理', c: 'var(--accent)' },
  art:  { en: 'Quantum', zh: '量子', c: 'var(--pink)' }
};

window.WORKS = [
  { section: 'lab', slug: 'mot-simulator', topic: 'cool', featured: true,
    en: 'Cesium MOT Simulator', zh: '銫原子 MOT 模擬器',
    en_d: 'Observe how magnetic and optical fields cool and trap a cloud of cesium atoms.',
    zh_d: '觀察磁與光如何冷卻並捕抓銫原子雲。' },
  { section: 'series', slug: 'qursive', topic: 'art', featured: true,
    en: 'Qursive', zh: 'Qursive',
    en_d: 'A quantum sensory experiment. A field of spheres dances on its own.',
    zh_d: '一場量子感官實驗。球體各自起舞。' }
];

window.SECTIONS = {
  lab:    { en: 'Explorable knowledge', zh: '互動知識' },
  series: { en: 'Series',              zh: '創作系列' }
};


window.workCardsHTML = function (list, root, zh, current) {
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  return list.map(function (t) {
    var tp = window.TOPICS[t.topic] || { en: t.topic, zh: t.topic, c: 'var(--accent)' };
    var hide = current && current !== 'all' && t.topic !== current;
    var href = root + t.section + '/' + t.slug + '/';
    return '<a class="work-card" href="' + href + '" target="_self" data-topic="' + t.topic + '"' + (hide ? ' hidden' : '') + '>' +
      '<div class="work-thumb"><img src="' + href + 'thumb.webp" alt="" loading="lazy" decoding="async" width="960" height="600">' +
      '<span class="play">' + (zh ? '開啟 →' : 'Open →') + '</span></div>' +
      '<div class="work-meta"><span class="work-topic" style="--c:' + tp.c + '">' + esc(zh ? tp.zh : tp.en) + '</span></div>' +
      '<strong>' + esc(zh ? t.zh : t.en) + '</strong><span class="work-desc">' + esc(zh ? t.zh_d : t.en_d) + '</span></a>';
  }).join('');
};
