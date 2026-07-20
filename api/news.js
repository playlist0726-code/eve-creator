const FEEDS = [
  { url: 'https://openai.com/news/rss.xml', source: 'OpenAI News', kind: 'news' },
  { url: 'https://deepmind.google/blog/rss.xml', source: 'Google DeepMind', kind: 'news' },
  { url: 'https://blog.google/innovation-and-ai/technology/ai/rss/', source: 'Google AI', kind: 'news' },
  { url: 'https://stability.ai/news-updates?format=rss', source: 'Stability AI', kind: 'news' },
  { url: 'https://www.reddit.com/r/aivideo/.rss', source: 'r/aivideo', kind: 'reddit' },
  { url: 'https://www.reddit.com/r/StableDiffusion/.rss', source: 'r/StableDiffusion', kind: 'reddit' },
  { url: 'https://www.reddit.com/r/aiArt/.rss', source: 'r/aiArt', kind: 'reddit' },
  { url: 'https://news.google.com/rss/search?q=%22AI%20video%20generation%22&hl=en-US&gl=US&ceid=US:en', source: 'Google News', kind: 'news', useItemSource: true },
  { url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UClnFtyUEaxQOCd1s5NKYGFA', source: 'Curious Refuge', kind: 'youtube' },
  { url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCUBqu_z5uP0AZhYtuyFZB3g', source: 'Runway', kind: 'youtube' },
  { url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCpi_ULPErwrxGTDWZey5azQ', source: 'Stability AI', kind: 'youtube' },
  { url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCP7jMXSY2xbc3KCAE0MHQ-A', source: 'Google DeepMind', kind: 'youtube' }
];

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", '#39': "'" };
function decode(value = '') {
  return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/&#(x?[0-9a-f]+);|&([a-z0-9#]+);/gi, (_, number, named) => {
    if (number) return String.fromCodePoint(parseInt(number.replace(/^x/i, ''), /^x/i.test(number) ? 16 : 10));
    return ENTITIES[named.toLowerCase()] || `&${named};`;
  }).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}
function tag(block, names) {
  for (const name of names) {
    const match = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, 'i'));
    if (match) return decode(match[1]);
  }
  return '';
}
function attribute(block, tagName, attr) {
  const match = block.match(new RegExp(`<${tagName}\\b[^>]*\\s${attr}=["']([^"']+)["'][^>]*>`, 'i'));
  return match ? decode(match[1]) : '';
}
function safeUrl(value) {
  try { const url = new URL(value); return /^https?:$/.test(url.protocol) ? url.href : ''; } catch { return ''; }
}
function parseFeed(xml, feed = {}) {
  const blocks = String(xml || '').match(/<(?:item|entry)\b[\s\S]*?<\/(?:item|entry)>/gi) || [];
  return blocks.map((block) => {
    const title = tag(block, ['title']);
    const url = safeUrl(attribute(block, 'link', 'href') || tag(block, ['link']));
    const rawDate = tag(block, ['pubDate', 'published', 'updated', 'dc:date']);
    const published = rawDate && !Number.isNaN(Date.parse(rawDate)) ? new Date(rawDate).toISOString() : '';
    const videoId = tag(block, ['yt:videoId']) || (/youtu\.be\/([\w-]+)/.exec(url)?.[1] || '');
    let thumbnail = safeUrl(attribute(block, 'media:thumbnail', 'url') || attribute(block, 'media:content', 'url'));
    if (!thumbnail && videoId) thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    const sourceUrl = feed.useItemSource ? safeUrl(attribute(block, 'source', 'url')) : '';
    return { title, source: (feed.useItemSource && tag(block, ['source'])) || feed.source || 'Unknown source', source_domain: (() => { try { return new URL(sourceUrl || url).hostname.replace(/^www\./, ''); } catch { return ''; } })(), url, published, ...(thumbnail ? { thumbnail } : {}), kind: feed.kind || 'news', ...(videoId ? { video_id: videoId } : {}) };
  }).filter((item) => item.title && item.url);
}
async function fetchFeed(feed) {
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 7000);
  try { const response = await fetch(feed.url, { headers: { 'User-Agent': 'FirstFrameCommunity/1.0 (+https://eve-creator.vercel.app)' }, signal: controller.signal }); if (!response.ok) throw new Error(`HTTP ${response.status}`); const xml=await response.text(); return parseFeed(xml.slice(0,1500000), feed); }
  finally { clearTimeout(timer); }
}
async function collectNews(feeds = FEEDS) {
  const settled = await Promise.allSettled(feeds.map(fetchFeed)); const failed = [];
  // Keep one high-volume source from crowding every other perspective out of the feed.
  const merged = settled.flatMap((result, index) => { if (result.status === 'fulfilled') return result.value.slice(0, 12); failed.push(feeds[index].url); return []; });
  const seen = new Set();
  const sorted = merged.filter((item) => { const key = item.url.replace(/[?#].*$/, '') || `${item.source}|${item.title}`.toLowerCase(); if (seen.has(key)) return false; seen.add(key); return true; }).sort((a, b) => (Date.parse(b.published) || 0) - (Date.parse(a.published) || 0));
  const clipCounts = new Map();
  const clips = sorted.filter((item) => {
    if (item.kind !== 'youtube' || !item.thumbnail) return false;
    const count = clipCounts.get(item.source) || 0;
    if (count >= 4) return false;
    clipCounts.set(item.source, count + 1); return true;
  }).slice(0, 16);
  return { items: sorted.slice(0, 60), clips, failed };
}
async function handler(req, res) {
  if (req.method !== 'GET') { res.statusCode = 405; res.setHeader('Content-Type', 'application/json'); return res.end(JSON.stringify({ error: 'Method not allowed.' })); }
  try { const payload = await collectNews(); res.statusCode = 200; res.setHeader('Content-Type', 'application/json; charset=utf-8'); res.setHeader('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=3600'); return res.end(JSON.stringify(payload)); }
  catch { res.statusCode = 503; res.setHeader('Content-Type', 'application/json; charset=utf-8'); return res.end(JSON.stringify({ error: 'Live feeds are temporarily unavailable.', items: [], clips: [] })); }
}
handler._test = { decode, parseFeed, collectNews, FEEDS };
module.exports = handler;
