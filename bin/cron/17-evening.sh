#!/bin/bash

~/bin/run-node ~/projects/node/speedtest-slack

choseisan() {
  ~/bin/run-node ~/projects/node/post-slack --text '調整さん <https://chouseisan.com/s?h=256ccb038d624b0ea61c37aff7eb177c|Click here>'
}

day3() {
  ~/bin/run-node ~/projects/node/itnews
  ~/bin/run-node ~/projects/node/news
}

day6() {
  ~/bin/run-node ~/projects/node/it
}

# 木曜日
[ $(date '+%u') -eq 4 ] && choseisan

# 3日おき
[ $(expr \( $(date +%s) - $(date -d'2015/10/22' +%s) \) / 60 / 60 / 24 % 3) -eq 0 ] && day3

# 6日おき
[ $(expr \( $(date +%s) - $(date -d'2015/10/22' +%s) \) / 60 / 60 / 24 % 6) -eq 0 ] && day6
