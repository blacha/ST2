# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/blacha/st/compare/v1.0.0...v2.0.0) (2020-01-24)


* feat!: player names are not case sensitive for ea accounts ([6de1c45](https://github.com/blacha/st/commit/6de1c4502b355d207f4eac8f8760f81470686f73))


### Bug Fixes

* missing model id ([2606e6d](https://github.com/blacha/st/commit/2606e6dfcd9ba5c4028dc6e14935ff7f7dcfb184))


### Features

* accept claims ([c3b74f4](https://github.com/blacha/st/commit/c3b74f42cd2c2ffd1eee6265a95f2e51cd941fb4))
* initial work on claiming a player ux ([b8c352b](https://github.com/blacha/st/commit/b8c352b33f8b7792882edce4e1ebfb0fee05320e))


### BREAKING CHANGES

* this splits PlayerName into two
- PlayerNameDisplay: case sensitive player name
- PlayerNameId: lowercased player name





# [1.0.0](https://github.com/blacha/st/compare/v0.10.1...v1.0.0) (2020-01-23)


### Bug Fixes

* split out firebase models ([5a0d676](https://github.com/blacha/st/commit/5a0d67643fcaabaed6166ffe1868e5a850dd5622))


### Features

* load what players have been claimed before showing anything ([752b586](https://github.com/blacha/st/commit/752b586de7cbe25a32bdcf2c4ca6b4bad418bf4c))
