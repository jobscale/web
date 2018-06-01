if [ "$(which sudo 2>/dev/null)" != "" ]
then
    alias sudo='sudo -E'
else
    alias sudo=''
fi  
alias grep='grep --color=auto'
alias ul=less_with_unbuffer
alias netstat='netstat -anptu'
alias rsync='rsync -tlrhv --delete'
    
if [ -f ~/.bash_scripts ]; then
    . ~/.bash_scripts
fi
    
if [ "" = "${DISPLAY}" ]; then
    export DISPLAY='localhost:0.0'
fi