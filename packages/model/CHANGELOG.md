# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [4.4.0](https://github.com/blacha/st/compare/v4.3.0...v4.4.0) (2020-03-22)

**Note:** Version bump only for package @st/model





# [4.3.0](https://github.com/blacha/st/compare/v4.2.0...v4.3.0) (2020-02-23)

**Note:** Version bump only for package @st/model





# [4.2.0](https://github.com/blacha/st/compare/v4.1.0...v4.2.0) (2020-02-16)


### Features

* include createdAt for layouts ([0f8187a](https://github.com/blacha/st/commit/0f8187a2867863e76199c6ce5d60dbfa44590ac3))
* initial player permissions updates ([47f35da](https://github.com/blacha/st/commit/47f35da83c4b4446721b2bf9777f985b2ce6e7e0))





# [4.1.0](https://github.com/blacha/st/compare/v4.0.0...v4.1.0) (2020-02-11)

**Note:** Version bump only for package @st/model





# [4.0.0](https://github.com/blacha/st/compare/v3.2.0...v4.0.0) (2020-02-10)

**Note:** Version bump only for package @st/model





# [3.2.0](https://github.com/blacha/st/compare/v3.1.1...v3.2.0) (2020-02-06)

**Note:** Version bump only for package @st/model





# [3.0.0](https://github.com/blacha/st/compare/v2.2.0...v3.0.0) (2020-02-05)


* refactor!: refactoring extension to be more expandable ([a9550e1](https://github.com/blacha/st/commit/a9550e10b9dfc0521a3a8b87a5b8f6de2b81e637))


### Features

* extract player score ([7a5aa59](https://github.com/blacha/st/commit/7a5aa59a5e0a33c024c00c1fcdb14c2d7146cde4))


### BREAKING CHANGES

* this changes a lot of how plugins are put together





# [2.2.0](https://github.com/blacha/st/compare/v2.1.0...v2.2.0) (2020-02-04)


### Features

* start tracking what version everyone has installed ([f8350eb](https://github.com/blacha/st/commit/f8350eb2761ed6f3a2f042135819d585697e05e2))





# [2.1.0](https://github.com/blacha/st/compare/v2.0.0...v2.1.0) (2020-02-03)


### Bug Fixes

* use a sortable id for timestamp based entries ([8c2af09](https://github.com/blacha/st/commit/8c2af09626083feacea4cd4be31c232588533003))


### Features

* use fixed width sizes for ids to remove the seperator ([b3d9ae7](https://github.com/blacha/st/commit/b3d9ae7f9e849b61b051e683a523d319d78debb6))





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
