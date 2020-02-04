# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.2.0](https://github.com/blacha/st/compare/v2.1.0...v2.2.0) (2020-02-04)

**Note:** Version bump only for package @st/frontend





# [2.1.0](https://github.com/blacha/st/compare/v2.0.0...v2.1.0) (2020-02-03)


### Bug Fixes

* don't duplicate player claims ([6a16f4f](https://github.com/blacha/st/commit/6a16f4f3eed890f13c28ce1da6508770c77d557a))
* loading random bases should now work ([4217060](https://github.com/blacha/st/commit/4217060e5d9ae9fb5e5e8dd4244733d95d95b712))
* provide a link to home from every page ([e763146](https://github.com/blacha/st/commit/e763146794eec8c5e73e999381e38caf55777a08))
* some icons need to be limited in width and height ([7c7fbf0](https://github.com/blacha/st/commit/7c7fbf0c2af78dc4a29c4393497b2e06565aeaf0))
* unit icons should scale by the size of the icon ([430d92f](https://github.com/blacha/st/commit/430d92f907601b5dfd470708ae6d353dee8d4e07))
* use a sortable id for timestamp based entries ([8c2af09](https://github.com/blacha/st/commit/8c2af09626083feacea4cd4be31c232588533003))


### Features

* allow players to claim more than one player ([e15bbed](https://github.com/blacha/st/commit/e15bbed0f716c1ba5528c852ec9b5347ff68a8ca))
* filter layouts ([12c2dd4](https://github.com/blacha/st/commit/12c2dd4892125ef05de13b59d2a080cd9708b2cd))
* much improved layout viewer ([1066eb1](https://github.com/blacha/st/commit/1066eb1a8c8f40c228404b0c19f3bed59638b3ba))
* show some layouts on the player info page ([1154d97](https://github.com/blacha/st/commit/1154d9773745b9c5213f0dd843e78ab5051d55ce))
* show where silos would be built ([9a253e0](https://github.com/blacha/st/commit/9a253e0188f597c015e18f6a0db0c9fb51409bfc))
* start showing where power should be built ([e6ad7b1](https://github.com/blacha/st/commit/e6ad7b15cfa9f34336ec53f161b4642d0c31e7f3))
* use fixed width sizes for ids to remove the seperator ([b3d9ae7](https://github.com/blacha/st/commit/b3d9ae7f9e849b61b051e683a523d319d78debb6))





# [2.0.0](https://github.com/blacha/st/compare/v1.0.0...v2.0.0) (2020-01-24)


### Bug Fixes

* claim accept is missing ([7506a5e](https://github.com/blacha/st/commit/7506a5ed0aad28ec98da7c0b01117eff5c6d07f4))
* don't always goto the alliance page ([5038b77](https://github.com/blacha/st/commit/5038b779de8a013a4fa6d1eb7c72668c8be8f9f6))
* improve logic behind failure conditions in claiming players ([6753149](https://github.com/blacha/st/commit/6753149b33bbca60180c3b3d212475e9662f034b))
* missing model id ([2606e6d](https://github.com/blacha/st/commit/2606e6dfcd9ba5c4028dc6e14935ff7f7dcfb184))


* feat!: player names are not case sensitive for ea accounts ([6de1c45](https://github.com/blacha/st/commit/6de1c4502b355d207f4eac8f8760f81470686f73))


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

* force people to login before viewing base data ([6d49066](https://github.com/blacha/st/commit/6d49066847ddbf52b60eb2ac026756dede074e79))
* load what players have been claimed before showing anything ([752b586](https://github.com/blacha/st/commit/752b586de7cbe25a32bdcf2c4ca6b4bad418bf4c))


* feat!: rework database structure to prepare for permissions ([cbbd2d5](https://github.com/blacha/st/commit/cbbd2d51494c8e36773ab04eba9fa0bcb0ea832b))


### BREAKING CHANGES

* major rework of data base tables





## [0.10.1](https://github.com/blacha/st/compare/v0.10.0...v0.10.1) (2020-01-20)


### Bug Fixes

* switch away from npmignore to limit what is published ([26b4cbe](https://github.com/blacha/st/commit/26b4cbe4ffdd5595aba6153e752b41b3d3fb4638))





# [0.10.0](https://github.com/blacha/st/compare/v0.9.0...v0.10.0) (2020-01-20)

**Note:** Version bump only for package @st/frontend





# [0.9.0](https://github.com/blacha/st/compare/v0.8.0...v0.9.0) (2020-01-17)

**Note:** Version bump only for package @st/frontend





# [0.8.0](https://github.com/blacha/st/compare/v0.7.0...v0.8.0) (2020-01-17)


### Bug Fixes

* may #  size slightly larger to stop wrapping ([b141473](https://github.com/blacha/st/commit/b1414732119c106c36cb42034cbd3609e51077ad))
* remove tsconfig.tsbuildinfo from npm ([88c2f46](https://github.com/blacha/st/commit/88c2f4668a3b7e3d5659381101c52c1e948637aa))
* show only the most updated alliance members ([8026d79](https://github.com/blacha/st/commit/8026d79342f2ff71311c65e4f743a26edd17ef67))





# [0.7.0](https://github.com/blacha/st/compare/v0.6.0...v0.7.0) (2020-01-13)

**Note:** Version bump only for package @st/frontend





# [0.6.0](https://github.com/blacha/st/compare/v0.5.0...v0.6.0) (2020-01-09)


### Bug Fixes

* change name to cncta/util ([060039a](https://github.com/blacha/st/commit/060039aad280dfa64f4d293319d4248b7bf40beb))


### Features

* break up into smaller packages ([2574c34](https://github.com/blacha/st/commit/2574c34eb9205a95a63395d8948d8529e4a94fa0))





# [0.5.0](https://github.com/blacha/st/compare/v0.4.0...v0.5.0) (2020-01-03)


### Bug Fixes

* broken routes ([20d88d5](https://github.com/blacha/st/commit/20d88d520e1b5f8fb736d98569dae05837e49f02))
* build/lint issues ([25c92c4](https://github.com/blacha/st/commit/25c92c484e31c4cdfacbe7309db8ce285f0f6abc))





# [0.4.0](https://github.com/blacha/st/compare/v0.3.0...v0.4.0) (2020-01-02)


### Bug Fixes

* baselayout scanner ([a15c9e4](https://github.com/blacha/st/commit/a15c9e4259d7a5095cbcfa6180fbd285beef5dd2))
* disable sort by research ([f3650df](https://github.com/blacha/st/commit/f3650df830799c758b88004cf6b600d6a6bfd59e))





# [0.3.0](https://github.com/blacha/st/compare/v0.2.0...v0.3.0) (2020-01-02)


### Bug Fixes

* dont show alliance if they are not part of one ([40d6fd2](https://github.com/blacha/st/commit/40d6fd28d529365707eddaa38974bd0a79879888))
* star size should be small in chrome ([a2c4e0e](https://github.com/blacha/st/commit/a2c4e0ec1fcb01f0d5b52b550d8801254d780006))


### Features

* initial work on research display ([046b864](https://github.com/blacha/st/commit/046b86432748fd8a4df1dc5c074ef8e9f5a1f8e7))
* show upgraded on alliance page ([277a5cd](https://github.com/blacha/st/commit/277a5cd3d958a02af0ec8ed2f9238147926f4ac6))
* show upgraded star for upgraded units ([2e9eee8](https://github.com/blacha/st/commit/2e9eee8fe214a236c4032860e5be0a5dcd255ed0))





# [0.2.0](https://github.com/blacha/st/compare/v0.1.2...v0.2.0) (2020-01-01)


### Bug Fixes

* force icons to be 32 pixels ([6d4700a](https://github.com/blacha/st/commit/6d4700abedef392aa6f96616e69528eb0d978230))
* remove yarn-error log ([21a6df4](https://github.com/blacha/st/commit/21a6df4fff4a64674592afcb04180ddd1b2a2ac5))


### Features

* make icons slightly larger ([f26139c](https://github.com/blacha/st/commit/f26139c3d4420a920e02fed47c38115504b4171f))
* use icons ([59d5d63](https://github.com/blacha/st/commit/59d5d634ed3afab8e5469080453413e5255881fc))
* use player details to show latest copy of base ([a56c252](https://github.com/blacha/st/commit/a56c252386530f0b35a8dec24e34e8fa1fa913df))
* use standard fonts ([b80b85a](https://github.com/blacha/st/commit/b80b85a106109f6431216de297dbc6fd3d5a6ce2))





## [0.1.1](https://github.com/blacha/st/compare/v0.1.0...v0.1.1) (2020-01-01)


### Bug Fixes

* st- should be private ([f23fb9d](https://github.com/blacha/st/commit/f23fb9d63ff9afb55d5483960632d35d9e490924))
