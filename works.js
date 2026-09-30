
window.TOPICS = {
  cool: { en: 'Laser cooling',          zh: '雷射冷卻', c: 'var(--accent)' },
  art:  { en: 'Interactive installation', zh: '互動裝置', c: 'var(--pink)' }
};

window.WORKS = [
  { section: 'lab', slug: 'cesium-mot-simulator', topic: 'cool', featured: true,
    en: 'Cesium MOT Simulator', zh: '銫原子 MOT 模擬器',
    en_d: 'Observe how magnetic and optical fields cool and trap a cloud of cesium atoms.',
    zh_d: '觀察磁場與光場如何冷卻並捕抓一團銫原子雲。' },
  { section: 'series', slug: 'qhoreutics', topic: 'art', featured: true,
    en: 'Qhoreutics', zh: 'Qhoreutics',
    en_d: 'A quantum sensory experiment. A field of spheres dances on its own; click one and steer its state.',
    zh_d: '一場量子感官實驗。球體各自起舞，點選一顆並操控狀態。' }
];

window.SECTIONS = {
  lab:    { en: 'Interactive physics', zh: '互動物理' },
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
