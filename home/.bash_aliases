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
alias lsof='sudo lsof -Pan -i tcp -i udp'
alias df='df -x"squashfs"'

PATH="$PATH:$HOME/bin"
alias kubeconfig='export KUBECONFIG="$(kind get kubeconfig-path --name="kind")"'
# eval $(minikube docker-env)

GPATH="$HOME/.bin/android-studio/gradle/gradle-5.1.1/bin"
[[ -d "$GPATH" ]] && export PATH="$PATH:$GPATH"
[[ -d "$HOME/Android/Sdk" ]] && export ANDROID_HOME="$HOME/Android/Sdk" && export PATH="$PATH:$ANDROID_HOME/tools"

[[ -s "$HOME/.bash_scripts" ]] && . "$HOME/.bash_scripts"
[[ -s "$HOME/.nvm/nvm.sh" ]] && . "$HOME/.nvm/nvm.sh"

[[ -s "$HOME/.bash_aliases_local" ]] && . "$HOME/.bash_aliases_local"
