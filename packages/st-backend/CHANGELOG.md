# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.1.0](https://github.com/blacha/st/compare/v3.0.0...v3.1.0) (2020-02-05)


### Features

* allow fetching of world data ([adf50fe](https://github.com/blacha/st/commit/adf50feca1115b34bf31a4931c5d592217c6162f))





# [3.0.0](https://github.com/blacha/st/compare/v2.2.0...v3.0.0) (2020-02-05)


* refactor!: refactoring extension to be more expandable ([a9550e1](https://github.com/blacha/st/commit/a9550e10b9dfc0521a3a8b87a5b8f6de2b81e637))


### Features

* extract player score ([7a5aa59](https://github.com/blacha/st/commit/7a5aa59a5e0a33c024c00c1fcdb14c2d7146cde4))


### BREAKING CHANGES

* this changes a lot of how plugins are put together





# [2.2.0](https://github.com/blacha/st/compare/v2.1.0...v2.2.0) (2020-02-04)


### Features

* allow disabling of modules ([6a546aa](https://github.com/blacha/st/commit/6a546aa175c75bfd442df54e36a009731704bed8))
* give all routes a nice name ([aa8cb70](https://github.com/blacha/st/commit/aa8cb7071b3eeae6ff73461432443b1427e1e9ac))
* start tracking what version everyone has installed ([f8350eb](https://github.com/blacha/st/commit/f8350eb2761ed6f3a2f042135819d585697e05e2))
* supply basic extension metrics on every request ([e3b35c9](https://github.com/blacha/st/commit/e3b35c97c1f4c49980420decd66460fdc205e3a8))





# [2.1.0](https://github.com/blacha/st/compare/v2.0.0...v2.1.0) (2020-02-03)


### Bug Fixes

* don't duplicate player claims ([6a16f4f](https://github.com/blacha/st/commit/6a16f4f3eed890f13c28ce1da6508770c77d557a))
* json requests should be application/json ([2088454](https://github.com/blacha/st/commit/20884543eeaa9c96e78b258e6e6c0ca8a4512292))


### Features

* use fixed width sizes for ids to remove the seperator ([b3d9ae7](https://github.com/blacha/st/commit/b3d9ae7f9e849b61b051e683a523d319d78debb6))





# [2.0.0](https://github.com/blacha/st/compare/v1.0.0...v2.0.0) (2020-01-24)


* feat!: player names are not case sensitive for ea accounts ([6de1c45](https://github.com/blacha/st/commit/6de1c4502b355d207f4eac8f8760f81470686f73))


### Bug Fixes

* missing model id ([2606e6d](https://github.com/blacha/st/commit/2606e6dfcd9ba5c4028dc6e14935ff7f7dcfb184))


### Features

* accept claims ([c3b74f4](https://github.com/blacha/st/commit/c3b74f42cd2c2ffd1eee6265a95f2e51cd941fb4))
* better error messages ([4d44ff0](https://github.com/blacha/st/commit/4d44ff0086bfdeaa2fb614466357afcadb03e297))
* initial work on claiming a player ux ([b8c352b](https://github.com/blacha/st/commit/b8c352b33f8b7792882edce4e1ebfb0fee05320e))


### BREAKING CHANGES

* this splits PlayerName into two
- PlayerNameDisplay: case sensitive player name
- PlayerNameId: lowercased player name





# [1.0.0](https://github.com/blacha/st/compare/v0.10.1...v1.0.0) (2020-01-23)


### Bug Fixes

* split out firebase models ([5a0d676](https://github.com/blacha/st/commit/5a0d67643fcaabaed6166ffe1868e5a850dd5622))
* url of install tracker ([3e176e0](https://github.com/blacha/st/commit/3e176e0a460e759fcf940cdedf0538ca8e5d954f))


### Features

* load what players have been claimed before showing anything ([752b586](https://github.com/blacha/st/commit/752b586de7cbe25a32bdcf2c4ca6b4bad418bf4c))


* feat!: rework database structure to prepare for permissions ([cbbd2d5](https://github.com/blacha/st/commit/cbbd2d51494c8e36773ab04eba9fa0bcb0ea832b))


### BREAKING CHANGES

* major rework of data base tables





## [0.10.1](https://github.com/blacha/st/compare/v0.10.0...v0.10.1) (2020-01-20)


### Bug Fixes

* switch away from npmignore to limit what is published ([26b4cbe](https://github.com/blacha/st/commit/26b4cbe4ffdd5595aba6153e752b41b3d3fb4638))





# [0.10.0](https://github.com/blacha/st/compare/v0.9.0...v0.10.0) (2020-01-20)

**Note:** Version bump only for package @st/backend





# [0.9.0](https://github.com/blacha/st/compare/v0.8.0...v0.9.0) (2020-01-17)

**Note:** Version bump only for package @st/backend





# [0.8.0](https://github.com/blacha/st/compare/v0.7.0...v0.8.0) (2020-01-17)


### Bug Fixes

* remove tsconfig.tsbuildinfo from npm ([88c2f46](https://github.com/blacha/st/commit/88c2f4668a3b7e3d5659381101c52c1e948637aa))





# [0.7.0](https://github.com/blacha/st/compare/v0.6.0...v0.7.0) (2020-01-13)

**Note:** Version bump only for package @st/backend





# [0.6.0](https://github.com/blacha/st/compare/v0.5.0...v0.6.0) (2020-01-09)


### Bug Fixes

* change name to cncta/util ([060039a](https://github.com/blacha/st/commit/060039aad280dfa64f4d293319d4248b7bf40beb))


### Features

* break up into smaller packages ([2574c34](https://github.com/blacha/st/commit/2574c34eb9205a95a63395d8948d8529e4a94fa0))





# [0.5.0](https://github.com/blacha/st/compare/v0.4.0...v0.5.0) (2020-01-03)


### Bug Fixes

* broken routes ([20d88d5](https://github.com/blacha/st/commit/20d88d520e1b5f8fb736d98569dae05837e49f02))
* reset the timestamp to submitted time ([ff6eeec](https://github.com/blacha/st/commit/ff6eeec91f75c70e5b71f2e73f30a05707d9b675))





# [0.4.0](https://github.com/blacha/st/compare/v0.3.0...v0.4.0) (2020-01-02)

**Note:** Version bump only for package @st/backend





# [0.3.0](https://github.com/blacha/st/compare/v0.2.0...v0.3.0) (2020-01-02)


### Features

* don't allow base ids to be unpacked ([4e54b1a](https://github.com/blacha/st/commit/4e54b1a0a8b8411985a67aab71f3d80e51117f2a))
* layouts should not be defaulting to 0 ([609b6e6](https://github.com/blacha/st/commit/609b6e6dab31f4d53d01eb4bf4d3d989e139e822))
* overwrite updatedAt timestamp ([187c931](https://github.com/blacha/st/commit/187c931b07e5c73dded5cd67dde9e12b50f5a05f))





# [0.2.0](https://github.com/blacha/st/compare/v0.1.2...v0.2.0) (2020-01-01)


### Bug Fixes

* get nearby objects should actually return objects ([7a5b545](https://github.com/blacha/st/commit/7a5b545dc30c0d58b7d7cbc2edfa7bc75642c928))


### Features

* use player details to show latest copy of base ([a56c252](https://github.com/blacha/st/commit/a56c252386530f0b35a8dec24e34e8fa1fa913df))





## [0.1.1](https://github.com/blacha/st/compare/v0.1.0...v0.1.1) (2020-01-01)

**Note:** Version bump only for package @st/backend
