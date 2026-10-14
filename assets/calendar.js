(function (root) {
  'use strict';
  const utc = value => new Date(value).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  const escapeText = value => String(value).replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,');
  function time(value, zone) {
    return new Intl.DateTimeFormat('en-GB', { timeZone: zone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date(value));
  }
  function date(value, zone, lang) {
    if (lang === 'zh') {
      const parts = new Intl.DateTimeFormat('en-GB', { timeZone: zone, year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(new Date(value));
      const part = type => parts.find(p => p.type === type).value;
      return `${part('year')}年${part('month')}月${part('day')}日`;
    }
    return new Intl.DateTimeFormat(lang === 'zh' ? 'zh-CN' : 'en-US', { timeZone: zone, year: 'numeric', month: lang === 'zh' ? 'numeric' : 'long', day: 'numeric' }).format(new Date(value));
  }
  // RFC 5545 lines are folded at 75 UTF-8 octets, never inside a character.
  function fold(line) {
    const chunks = []; let current = ''; let bytes = 0;
    for (const character of line) {
      const length = new TextEncoder().encode(character).length;
      if (bytes + length > 75) { chunks.push(current); current = ' '; bytes = 1; }
      current += character; bytes += length;
    }
    chunks.push(current); return chunks.join('\r\n');
  }
  function events(config, lang) {
    const copy = config.calendar[lang] || config.calendar.zh;
    const chinaTime = time(config.start, config.timeZones.china);
    const nzTime = time(config.start, config.timeZones.nz);
    const times = lang === 'en' ? `Beijing: ${chinaTime} · Auckland: ${nzTime}` : `北京时间：${chinaTime} · 奥克兰时间：${nzTime}`;
    const linkLabel = lang === 'en' ? 'Watch here:' : '婚礼直播：';
    return [
      { uid: 'hang-hanyun-wedding-20261031@wedding-invite', start: config.start, end: config.end, title: copy.weddingTitle, description: `${copy.weddingDescription}\n${times}\n\n${linkLabel}\n${config.streamUrl}`, location: config.venue },
      { uid: 'hang-hanyun-reminder-20261030@wedding-invite', start: config.reminderStart, end: config.reminderEnd, title: copy.reminderTitle, description: `${copy.reminderDescription.replace('{chinaTime}', chinaTime)}\n${times}\n\n${linkLabel}\n${config.streamUrl}`, location: lang === 'en' ? 'Online · reminder at 20:00 Beijing time' : '线上 · 北京时间 20:00 提醒' }
    ];
  }
  function ics(config, lang, now = new Date()) {
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Hang and Hanyun//Wedding Invitation//ZH', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH'];
    for (const event of events(config, lang)) {
      lines.push('BEGIN:VEVENT', 'UID:' + event.uid, 'DTSTAMP:' + utc(now), 'DTSTART:' + utc(event.start), 'DTEND:' + utc(event.end), 'SUMMARY:' + escapeText(event.title), 'DESCRIPTION:' + escapeText(event.description), 'LOCATION:' + escapeText(event.location), 'URL:' + config.streamUrl, 'STATUS:CONFIRMED', 'TRANSP:TRANSPARENT', 'BEGIN:VALARM', 'ACTION:DISPLAY', 'TRIGGER:PT0M', 'DESCRIPTION:' + escapeText(event.title), 'END:VALARM', 'END:VEVENT');
    }
    lines.push('END:VCALENDAR'); return lines.map(fold).join('\r\n') + '\r\n';
  }
  function google(config, lang, index) {
    const event = events(config, lang)[index];
    const query = new URLSearchParams({ action: 'TEMPLATE', text: event.title, dates: `${utc(event.start)}/${utc(event.end)}`, details: event.description, location: event.location, ctz: config.timeZones.china });
    return 'https://calendar.google.com/calendar/render?' + query.toString();
  }
  const api = Object.freeze({ utc, time, date, fold, events, ics, google });
  root.WeddingCalendar = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(globalThis);
