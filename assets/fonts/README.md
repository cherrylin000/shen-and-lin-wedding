# Wedding invite fonts

| Use | English | Chinese |
|---|---|---|
| Couple names | Dancing Script Semibold (600) | 瑞美加张清平硬笔楷书 Regular |
| Hero kicker | Cormorant Garamond Semibold | 思源宋体 Regular (Source Han Serif SC) |
| Section titles | Parisienne (existing) | 思源宋体 Regular |
| Church name | Playfair Display Regular | 思源宋体 Regular |
| Body and UI | Inter (existing) | 霞鹜文楷 Regular (LXGW WenKai) |

English fonts are self-hosted WOFF2, including Inter and Parisienne. The English letter body uses Cedarville Cursive Regular; its font size is unchanged.

## Sources and licenses

- Cedarville Cursive: https://github.com/google/fonts/tree/main/ofl/cedarvillecursive — cedarville-cursive-OFL.txt

- Playfair Display: https://fonts.google.com/specimen/Playfair+Display — playfair-display-OFL.txt
- Dancing Script: https://fonts.google.com/specimen/Dancing+Script — dancing-script-OFL.txt
- Cormorant Garamond: https://fonts.google.com/specimen/Cormorant+Garamond — cormorant-garamond-OFL.txt
- 瑞美加张清平硬笔楷书: https://www.100font.com/thread-242.htm; author release http://www.cnprint.org/bbs/thread/165/342208/. Downloaded from jaywcjlove/free-font docs/fonts/其他字体/瑞美加张清平硬笔楷书.ttf. Original TTF retained unchanged. Author allows free use and embedding; prohibits font resale, modified redistribution and renaming.
- 思源宋体: Adobe Source Han Serif release, OTF/SimplifiedChinese/SourceHanSerifSC-Regular.otf — source-han-serif-LICENSE.txt. WOFF2 subset covers the existing page plus upcoming section labels. Extend the subset when headings change.
- 霞鹜文楷: https://github.com/lxgw/LxgwWenKai/releases/tag/v1.522 — lxgw-wenkai-OFL.txt. The lxgw-wenkai-current.woff2 subset was rebuilt from the original TTF to cover the current page, including 国 and the updated invitation subtitle. Extend the subset when new text is added.

Unused former font files remain available for reverting the design.

Performance edition: the two fixed Chinese names are displayed with SVG outline
artwork generated from the unchanged original 瑞美加张清平硬笔楷书 font. Accessible
Chinese name text remains in the headings. This removes the 8.8 MB full font from
the publication bundle without distributing a modified font or changing the
letterforms. Original font and pre-optimization HTML remain in the workspace.
If the Chinese names change, regenerate assets/optimized/name-1.svg and name-2.svg.

The performance edition uses source-han-serif-headings.woff2 (about 32 KB) for
the current Chinese chapter titles, story headings, hero kicker and calendar
dialog heading. Extend it with scripts/optimize-heading-font.py when headings
change. The original full Source Han source/subsets remain available locally.

## Palette

- Hero names: #ECAEC7
- Hero invitation subtitle: #9cb88d
- Body text: #594b5d
- Section titles: #c07d87

English hero subtitle uses Noto Serif Light (300), subset for the exact invitation line. Source: google/fonts ofl/notoserif. License: noto-serif-OFL.txt. Rebuild if the English subtitle changes.
