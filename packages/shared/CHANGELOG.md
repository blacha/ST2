# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [4.5.0](https://github.com/blacha/st/compare/v4.4.0...v4.5.0) (2020-04-11)

**Note:** Version bump only for package @st/shared





# [4.4.0](https://github.com/blacha/st/compare/v4.3.0...v4.4.0) (2020-03-22)


### Bug Fixes

* adding missing infected forgotten units ([078defc](https://github.com/blacha/st/commit/078defc2b7f3b38a4ea04ef04af107b31c39a6c9))





# [4.3.0](https://github.com/blacha/st/compare/v4.2.0...v4.3.0) (2020-02-23)

**Note:** Version bump only for package @st/shared





# [4.2.0](https://github.com/blacha/st/compare/v4.1.0...v4.2.0) (2020-02-16)


### Bug Fixes

* allow worldIds that are higher than 411 ([0647295](https://github.com/blacha/st/commit/0647295a7ce9a364aa7008a0970b3ef33e0016c9))


### Features

* initial player permissions updates ([47f35da](https://github.com/blacha/st/commit/47f35da83c4b4446721b2bf9777f985b2ce6e7e0))





# [4.1.0](https://github.com/blacha/st/compare/v4.0.0...v4.1.0) (2020-02-11)

**Note:** Version bump only for package @st/shared





# [4.0.0](https://github.com/blacha/st/compare/v3.2.0...v4.0.0) (2020-02-10)

**Note:** Version bump only for package @st/shared





# [3.2.0](https://github.com/blacha/st/compare/v3.1.1...v3.2.0) (2020-02-06)

**Note:** Version bump only for package @st/shared





# [3.0.0](https://github.com/blacha/st/compare/v2.2.0...v3.0.0) (2020-02-05)


### Features

* extract player score ([7a5aa59](https://github.com/blacha/st/commit/7a5aa59a5e0a33c024c00c1fcdb14c2d7146cde4))





# [2.2.0](https://github.com/blacha/st/compare/v2.1.0...v2.2.0) (2020-02-04)


### Features

* start tracking what version everyone has installed ([f8350eb](https://github.com/blacha/st/commit/f8350eb2761ed6f3a2f042135819d585697e05e2))
* supply basic extension metrics on every request ([e3b35c9](https://github.com/blacha/st/commit/e3b35c97c1f4c49980420decd66460fdc205e3a8))





# [2.1.0](https://github.com/blacha/st/compare/v2.0.0...v2.1.0) (2020-02-03)


### Bug Fixes

* json requests should be application/json ([2088454](https://github.com/blacha/st/commit/20884543eeaa9c96e78b258e6e6c0ca8a4512292))
* urls should not have // in them ([c08558b](https://github.com/blacha/st/commit/c08558bc69d893f59b1de67977fd76c739b7534c))
* use a sortable id for timestamp based entries ([8c2af09](https://github.com/blacha/st/commit/8c2af09626083feacea4cd4be31c232588533003))


### Features

* filter layouts ([12c2dd4](https://github.com/blacha/st/commit/12c2dd4892125ef05de13b59d2a080cd9708b2cd))
* show where silos would be built ([9a253e0](https://github.com/blacha/st/commit/9a253e0188f597c015e18f6a0db0c9fb51409bfc))
* start showing where power should be built ([e6ad7b1](https://github.com/blacha/st/commit/e6ad7b15cfa9f34336ec53f161b4642d0c31e7f3))
* use fixed width sizes for ids to remove the seperator ([b3d9ae7](https://github.com/blacha/st/commit/b3d9ae7f9e849b61b051e683a523d319d78debb6))





# [2.0.0](https://github.com/blacha/st/compare/v1.0.0...v2.0.0) (2020-01-24)


* feat!: player names are not case sensitive for ea accounts ([6de1c45](https://github.com/blacha/st/commit/6de1c4502b355d207f4eac8f8760f81470686f73))


### Features

* accept claims ([c3b74f4](https://github.com/blacha/st/commit/c3b74f42cd2c2ffd1eee6265a95f2e51cd941fb4))


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


### Features

* better base91 implementation ([a6e2860](https://github.com/blacha/st/commit/a6e286029be6509e0b0e6689081156bc1b2203fb))
* parse and decode sector data ([b3ac867](https://github.com/blacha/st/commit/b3ac86774d536ad9d37b97a5e75aa44fc948f979))





# [0.9.0](https://github.com/blacha/st/compare/v0.8.0...v0.9.0) (2020-01-17)

**Note:** Version bump only for package @st/shared





# [0.8.0](https://github.com/blacha/st/compare/v0.7.0...v0.8.0) (2020-01-17)


### Bug Fixes

* remove tsconfig.tsbuildinfo from npm ([88c2f46](https://github.com/blacha/st/commit/88c2f4668a3b7e3d5659381101c52c1e948637aa))


### Features

* auto scan when player is idle. ([f6cbd13](https://github.com/blacha/st/commit/f6cbd13b2fb15d6bec48b5359884d30d28fcd17f))
* improve console logging in the browser ([23381b0](https://github.com/blacha/st/commit/23381b0458f5cdd9df7eadbe2b213e173d22c5de))





# [0.7.0](https://github.com/blacha/st/compare/v0.6.0...v0.7.0) (2020-01-13)

**Note:** Version bump only for package @st/shared





# [0.6.0](https://github.com/blacha/st/compare/v0.5.0...v0.6.0) (2020-01-09)


### Bug Fixes

* change name to cncta/util ([060039a](https://github.com/blacha/st/commit/060039aad280dfa64f4d293319d4248b7bf40beb))


### Features

* break up into smaller packages ([2574c34](https://github.com/blacha/st/commit/2574c34eb9205a95a63395d8948d8529e4a94fa0))





# [0.5.0](https://github.com/blacha/st/compare/v0.4.0...v0.5.0) (2020-01-03)


### Bug Fixes

* allow bases to produce crystal ([ba1a5a3](https://github.com/blacha/st/commit/ba1a5a30d4f285575872c4ce2711ef74c001549e))
* broken routes ([20d88d5](https://github.com/blacha/st/commit/20d88d520e1b5f8fb736d98569dae05837e49f02))
* build/lint issues ([25c92c4](https://github.com/blacha/st/commit/25c92c484e31c4cdfacbe7309db8ce285f0f6abc))





# [0.4.0](https://github.com/blacha/st/compare/v0.3.0...v0.4.0) (2020-01-02)

**Note:** Version bump only for package @st/shared





# [0.3.0](https://github.com/blacha/st/compare/v0.2.0...v0.3.0) (2020-01-02)


### Bug Fixes

* add unit tests for research ([eac8e36](https://github.com/blacha/st/commit/eac8e369857d205f37ab549779b3e50085ba3ee1))


### Features

* don't allow base ids to be unpacked ([4e54b1a](https://github.com/blacha/st/commit/4e54b1a0a8b8411985a67aab71f3d80e51117f2a))
* extract research information from bases ([3ffc216](https://github.com/blacha/st/commit/3ffc216f304f2856d55284aaa7b0461635fd80d9))
* initial work on research display ([046b864](https://github.com/blacha/st/commit/046b86432748fd8a4df1dc5c074ef8e9f5a1f8e7))
* show upgraded on alliance page ([277a5cd](https://github.com/blacha/st/commit/277a5cd3d958a02af0ec8ed2f9238147926f4ac6))





# [0.2.0](https://github.com/blacha/st/compare/v0.1.2...v0.2.0) (2020-01-01)


### Bug Fixes

* remove console.log ([bb34e34](https://github.com/blacha/st/commit/bb34e34a7400aace3473b9bdda64d81b487a6fff))


### Features

* use player details to show latest copy of base ([a56c252](https://github.com/blacha/st/commit/a56c252386530f0b35a8dec24e34e8fa1fa913df))





## [0.1.1](https://github.com/blacha/st/compare/v0.1.0...v0.1.1) (2020-01-01)

**Note:** Version bump only for package @st/shared
