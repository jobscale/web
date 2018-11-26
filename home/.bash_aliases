HISTSIZE=100000
HISTFILESIZE=2000000

export PROMPT_DIRTRIM=3

if [ "$(which sudo 2>/dev/null)" != "" ]
then
    alias sudo='sudo -E'
else
    alias sudo=''
fi

[[ "" == "${DISPLAY}" ]] && export DISPLAY='localhost:0.0'

alias ul='less_with_unbuffer'
alias diff='colordiff'
alias netstat='netstat -anptu'
alias rsync='rsync -tlrHhv --delete'

[[ -d "$HOME/Android/Sdk" ]] && export ANDROID_HOME="$HOME/Android/Sdk" && export PATH="$PATH:$ANDROID_HOME/tools"
[[ -d "$HOME/.bin/android-studio/gradle/gradle-4.4/bin" ]] && export PATH="$PATH:$HOME/.bin/android-studio/gradle/gradle-4.4/bin"

[[ -s "$HOME/.bash_scripts" ]] && . "$HOME/.bash_scripts"
[[ -s "$HOME/.nvm/nvm.sh" ]] && . "$HOME/.nvm/nvm.sh"

[[ -s "$HOME/.bash_aliases_local" ]] && . "$HOME/.bash_aliases_local"
