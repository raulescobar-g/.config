fpath+=${ZDOTDIR:-~}/.zsh_functions
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

. "$HOME/.cargo/env"
alias ls='eza'
alias vim='nvim'
alias cat='bat'
alias cd='z'
alias ll="eza -l -g --icons --git"
alias llt="eza -1 --icons --tree --git-ignore"
alias sf="fzf --preview 'bat --color=always --style=numbers --line-range=:500 {}' | xargs nvim"
alias vim='nvim'
alias vi='nvim'
alias code='nvim'
alias zshrc='source ~/.zshrc'
alias grep='rg'

fnr() {
  grep -l "$2" "$1" | grep -v \.git | xargs sed -i "" -e "s/$2/$3/g"
}
loc() {
  find "$1" -name '*.*' | xargs wc -l | sort -nr
}
eval $(/opt/homebrew/bin/brew shellenv)
eval "$(starship init zsh)"
eval "$(zoxide init zsh)"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
echo "\n"

for i in {30..37}; do echo -ne "\033[1;$i""m o\033[0m"; done
PF_COL1=5 PF_COL2=7 PF_COL3=6 PF_ASCII="Catppuccin" pfetch

# opam configuration
[[ ! -r /Users/raulescobar/.opam/opam-init/init.zsh ]] || source /Users/raulescobar/.opam/opam-init/init.zsh  > /dev/null 2> /dev/null



eval "$(zellij setup --generate-auto-start zsh)"

