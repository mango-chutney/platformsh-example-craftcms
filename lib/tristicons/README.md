# Tristicons

## Usage

```
$ yarn add "https://github.com/mango-chutney/tristicons/archive/master.tar.gz"
# Preferably, pin to the current master commit:
$ yarn add "https://github.com/mango-chutney/tristicons/archive/$(curl https://api.github.com/repos/mango-chutney/tristicons/git/refs/heads/master | jq .object.sha --raw-output).tar.gz"
# Or any commit:
$ yarn add "https://github.com/mango-chutney/tristicons/archive/a8bfdd8.tar.gz"
```

## Hacking

1.  Install
    [Font Custom](https://github.com/FontCustom/fontcustom#installation). You
    can use `nix-shell` in the root of this repo if you have Nix and `direnv`
    installed.
2.  `yarn run start`
