#!/bin/bash

~/bin/run-node ~/projects/node/speedtest-slack

# 3日おき
if [ $(expr \( $(date +%s) - $(date -d'2015/10/22' +%s) \) / 60 / 60 / 24 % 3) != 0 ]
then
    exit
fi

~/bin/run-node ~/projects/node/itnews
~/bin/run-node ~/projects/node/news

# 6日おき
if [ $(expr \( $(date +%s) - $(date -d'2015/10/22' +%s) \) / 60 / 60 / 24 % 6) != 0 ]
then
    exit
fi

~/bin/run-node ~/projects/node/it
