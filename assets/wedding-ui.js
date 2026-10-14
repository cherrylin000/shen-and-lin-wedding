(function (root) {
  'use strict';
  const config = root.WEDDING_CONFIG;
  const calendar = root.WeddingCalendar;
  const text = {
    zh: {
      watchTitle: '一起见证我们的婚礼', watchSubtitle: '这一刻，与你分享。',
      reserve: '预约直播', watch: '进入直播', replay: '观看回放',
      calendar: '添加日历', apple: '苹果日历', android: '安卓／华为日历', other: '其他日历 / ICS', close: '关闭',
      googleWedding: '保存婚礼直播日程', googleReminder: '保存前晚温馨提醒',
      calendarNote: '下载日历文件后，用手机自带日历打开并导入，包含婚礼直播和前晚 20:00（北京时间）两个日程。请检查两个日程及通知设置。使用 Google 日历时需分别保存。',
      browserNote: '若微信内打不开直播或日历链接，请从右上角菜单选择在浏览器中打开。',
      venue: 'St Matthew-in-the-City · 奥克兰',
      replayNote: '支持直播回放，计划保留至 {replayDate}。'
    },
    en: {
      watchTitle: 'Our Wedding', watchSubtitle: 'A special moment, shared with you.',
      reserve: 'Reserve Livestream', watch: 'Watch Livestream', replay: 'Watch Replay',
      calendar: 'Add to Calendar', apple: 'Apple Calendar', android: 'Android / Huawei Calendar', other: 'Other Calendar / ICS', close: 'Close',
      googleWedding: 'Save wedding livestream', googleReminder: 'Save evening reminder',
      calendarNote: 'Open the downloaded calendar file with your phone’s calendar and import both events: the ceremony and a reminder at 20:00 Beijing time the evening before. Check both events and notification settings. Google events must be saved separately.',
      browserNote: 'If a livestream or calendar link does not open in WeChat, use the top-right menu to open it in your browser.',
      venue: 'St Matthew-in-the-City · Auckland',
      replayNote: 'Replay planned until {replayDate}.'
    }
  };
  function tokens(lang) {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: config.timeZones.nz, month: 'numeric', day: 'numeric' }).formatToParts(new Date(config.start));
    return {
      date: calendar.date(config.start, config.timeZones.nz, lang),
      nzTime: calendar.time(config.start, config.timeZones.nz),
      chinaTime: calendar.time(config.start, config.timeZones.china),
      nzRange: `${calendar.time(config.start, config.timeZones.nz)}–${calendar.time(config.end, config.timeZones.nz)}`,
      chinaRange: `${calendar.time(config.start, config.timeZones.china)}–${calendar.time(config.end, config.timeZones.china)}`,
      chinaFriendlyTime: calendar.time(config.start, config.timeZones.china).replace(/^0/, ''),
      month: parts.find(p => p.type === 'month').value,
      monthName: new Intl.DateTimeFormat('en-US', { timeZone: config.timeZones.nz, month: 'long' }).format(new Date(config.start)),
      day: parts.find(p => p.type === 'day').value,
      replayDate: calendar.date(config.replayUntil + 'T12:00:00Z', 'UTC', lang)
    };
  }
  function interpolate(value, lang) {
    const values = tokens(lang);
    return String(value).replace(/\{(\w+)\}/g, (all, key) => values[key] ?? all);
  }
  function syncLetterCue() {
    const letter = document.querySelector('.letter-content:not([hidden])');
    const cue = document.querySelector('.letter-scroll-cue');
    cue.toggleAttribute('hidden', !letter || letter.scrollHeight - letter.clientHeight - letter.scrollTop <= 2);
  }
  function render(lang) {
    const copy = text[lang] || text.zh;
    const values = tokens(lang);
    document.title = config.siteTitle;
    document.querySelectorAll('[data-live-copy]').forEach(el => { el.textContent = interpolate(copy[el.dataset.liveCopy], lang); });
    document.querySelectorAll('[data-config-venue]').forEach(el => { el.textContent = config.venue; });
    document.querySelector('[data-i18n="name1"]').textContent = config.names[lang][0];
    document.querySelector('[data-i18n="name2"]').textContent = config.names[lang][1];
    document.querySelectorAll('[data-wedding-date]').forEach(el => { el.textContent = values.date; });
    document.querySelectorAll('[data-china-time]').forEach(el => { el.textContent = (lang === 'zh' ? '中国 · ' : 'China · ') + values.chinaRange; });
    document.querySelectorAll('[data-nz-time]').forEach(el => { el.textContent = (lang === 'zh' ? '新西兰 · ' : 'New Zealand · ') + values.nzRange; });
    const stream = document.getElementById('watchLink');
    stream.href = config.streamUrl;
    stream.textContent = Date.now() >= Date.parse(config.end) ? copy.replay : copy.watch;
    const reserve = document.getElementById('reserveLink');
    reserve.hidden = !(config.reservationVerified && config.reservationUrl);
    if (!reserve.hidden) reserve.href = config.reservationUrl;
    document.querySelectorAll('[data-ics-link]').forEach(el => { el.href = `assets/calendar/wedding-${lang}.ics`; });
    document.getElementById('googleWedding').href = calendar.google(config, lang, 0);
    document.getElementById('googleReminder').href = calendar.google(config, lang, 1);
    if (document.getElementById('calendarMenu').open) document.getElementById('calendarMenu').close();
    document.getElementById('googleOptions').hidden = true;
    document.getElementById('googleChoice').setAttribute('aria-expanded', 'false');
    requestAnimationFrame(syncLetterCue);
  }
  document.querySelectorAll('.letter-content').forEach(el => el.addEventListener('scroll', syncLetterCue, { passive: true }));
  window.addEventListener('resize', syncLetterCue);
  const menu = document.getElementById('calendarMenu');
  document.getElementById('openCalendar').addEventListener('click', () => menu.showModal());
  document.getElementById('closeCalendar').addEventListener('click', () => menu.close());
  menu.addEventListener('click', e => { if (e.target === menu) menu.close(); });
  document.getElementById('googleChoice').addEventListener('click', function () {
    const options = document.getElementById('googleOptions'); options.hidden = !options.hidden;
    this.setAttribute('aria-expanded', String(!options.hidden));
  });
  // Browsers can pause the invitation music before opening the livestream.
  document.getElementById('watchLink').addEventListener('click', () => {
    document.getElementById('bgm').pause();
    document.getElementById('muteBtn').classList.add('muted');
  });
  root.WeddingUI = Object.freeze({ render, interpolate, tokens });
})(globalThis);
