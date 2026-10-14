(function (root) {
  'use strict';
  const config = Object.freeze({
    siteTitle: '沈航 × 林涵昀 婚礼预约',
    names: { zh: ['沈航', '林涵昀'], en: ['Hang', 'Hanyun'] },
    venue: 'St Matthew-in-the-City, Auckland, New Zealand',
    venueName: 'St Matthew-in-the-City',
    timeZones: { china: 'Asia/Shanghai', nz: 'Pacific/Auckland' },
    start: '2026-10-31T10:30:00+13:00',
    end: '2026-10-31T11:00:00+13:00',
    reminderStart: '2026-10-30T20:00:00+08:00',
    reminderEnd: '2026-10-30T20:15:00+08:00',
    streamUrl: 'https://view.oneroomstreaming.com/index.php?data=MTc4NzIwNDE4NjQyNzU0OCZvbmVyb29tLWFkbWluJmNvcHlfbGluaw==',
    reservationUrl: null,
    reservationVerified: false,
    replayUntil: '2026-12-31',
    replayUntilVerified: false,
    calendar: {
      zh: {
        weddingTitle: '沈航 & 林涵昀｜婚礼直播',
        weddingDescription: '一起见证沈航与林涵昀的婚礼。',
        reminderTitle: '明早有婚礼直播，今晚早点睡 🌙',
        reminderDescription: '明天早上 {chinaTime}（北京时间），欢迎来见证我们的婚礼。今晚早点休息，明早见！'
      },
      en: {
        weddingTitle: 'Hang & Hanyun | Wedding Livestream',
        weddingDescription: "Join us online for Hang & Hanyun's wedding ceremony.",
        reminderTitle: 'Wedding Tomorrow! Get Some Rest 🌙',
        reminderDescription: 'Our wedding livestream starts tomorrow at {chinaTime} Beijing time. Get some rest, and see you in the morning!'
      }
    }
  });
  root.WEDDING_CONFIG = config;
  if (typeof module !== 'undefined' && module.exports) module.exports = config;
})(globalThis);
