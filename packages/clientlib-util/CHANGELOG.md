# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [4.4.0](https://github.com/blacha/st/compare/v4.3.0...v4.4.0) (2020-03-22)


### Bug Fixes

* new server update breaks patcher ([72807c6](https://github.com/blacha/st/commit/72807c6835d571f55fadc94c5fb9c1a89fda3bf0))





# [4.2.0](https://github.com/blacha/st/compare/v4.1.0...v4.2.0) (2020-02-16)


### Bug Fixes

* correct patching of NPCBase.$Id to get the actual base id ([df4b17c](https://github.com/blacha/st/commit/df4b17ccdb999cf97022fba1e3a119be7a23acc7))
* support unkown worlds ([e0f6a5b](https://github.com/blacha/st/commit/e0f6a5b59ceff152f54784800b48e00fa37d8929))


### Features

* adding firestorm 13 ([9e9c43d](https://github.com/blacha/st/commit/9e9c43d0d1694985655f7b710a6f15d337ba5a02))





# [4.1.0](https://github.com/blacha/st/compare/v4.0.0...v4.1.0) (2020-02-11)


### Bug Fixes

* lint issues ([02a6572](https://github.com/blacha/st/commit/02a657295943a3603c23e8e045e2da1de656599c))


### Features

* force a poll while waiting for a base to scan ([b313b82](https://github.com/blacha/st/commit/b313b82db8fae7309bc3794e4904fc30dac102b2))





# [4.0.0](https://github.com/blacha/st/compare/v3.2.0...v4.0.0) (2020-02-10)


### Bug Fixes

* drop max fail count to make it take less time to fail when scanning ([f9de6ad](https://github.com/blacha/st/commit/f9de6ad6af842cc0540efe8ebeed46a562917a30))
* wait for cities needs a little more time on slow connections ([2de52f8](https://github.com/blacha/st/commit/2de52f88b55b2830e01bf1e1e5b4297efd277332))


### Features

* calculate distance between two points ([23640eb](https://github.com/blacha/st/commit/23640ebd9e45991d43e6e0e049dc9b563c9d69f1))





# [3.2.0](https://github.com/blacha/st/compare/v3.1.1...v3.2.0) (2020-02-06)

**Note:** Version bump only for package @cncta/util





# [3.0.0](https://github.com/blacha/st/compare/v2.2.0...v3.0.0) (2020-02-05)

**Note:** Version bump only for package @cncta/util





# [2.2.0](https://github.com/blacha/st/compare/v2.1.0...v2.2.0) (2020-02-04)

**Note:** Version bump only for package @cncta/util





# [2.1.0](https://github.com/blacha/st/compare/v2.0.0...v2.1.0) (2020-02-03)


### Bug Fixes

* use a sortable id for timestamp based entries ([8c2af09](https://github.com/blacha/st/commit/8c2af09626083feacea4cd4be31c232588533003))


### Features

* add all world names ([2cf2a61](https://github.com/blacha/st/commit/2cf2a615ae1281a9241585d8f5d9642e37cbab7f))
* filter layouts ([12c2dd4](https://github.com/blacha/st/commit/12c2dd4892125ef05de13b59d2a080cd9708b2cd))
* use fixed width sizes for ids to remove the seperator ([b3d9ae7](https://github.com/blacha/st/commit/b3d9ae7f9e849b61b051e683a523d319d78debb6))





# [2.0.0](https://github.com/blacha/st/compare/v1.0.0...v2.0.0) (2020-01-24)


* feat!: player names are not case sensitive for ea accounts ([6de1c45](https://github.com/blacha/st/commit/6de1c4502b355d207f4eac8f8760f81470686f73))


### Features

* count the number of records removed in a cleanup ([fe7e8a7](https://github.com/blacha/st/commit/fe7e8a73b2cc39a690bebb155034ee3fdbe3c457))


### BREAKING CHANGES

* this splits PlayerName into two
- PlayerNameDisplay: case sensitive player name
- PlayerNameId: lowercased player name





# [1.0.0](https://github.com/blacha/st/compare/v0.10.1...v1.0.0) (2020-01-23)


* feat!: rework database structure to prepare for permissions ([cbbd2d5](https://github.com/blacha/st/commit/cbbd2d51494c8e36773ab04eba9fa0bcb0ea832b))


### BREAKING CHANGES

* major rework of data base tables





## [0.10.1](https://github.com/blacha/st/compare/v0.10.0...v0.10.1) (2020-01-20)


### Bug Fixes

* switch away from npmignore to limit what is published ([26b4cbe](https://github.com/blacha/st/commit/26b4cbe4ffdd5595aba6153e752b41b3d3fb4638))





# [0.10.0](https://github.com/blacha/st/compare/v0.9.0...v0.10.0) (2020-01-20)


### Features

* better base91 implementation ([a6e2860](https://github.com/blacha/st/commit/a6e286029be6509e0b0e6689081156bc1b2203fb))
* switch to a base-n implementation to share the logic between 58 and 91 ([8dc124c](https://github.com/blacha/st/commit/8dc124c384e69d9662733b99facb37da89018c69))





# [0.9.0](https://github.com/blacha/st/compare/v0.8.0...v0.9.0) (2020-01-17)

**Note:** Version bump only for package @cncta/util





# [0.8.0](https://github.com/blacha/st/compare/v0.7.0...v0.8.0) (2020-01-17)


### Bug Fixes

* make the scanner much faster to see if the base is loaded ([5e9d1f3](https://github.com/blacha/st/commit/5e9d1f3223ef6dcba08d50820e5d5c73d306ff62))


### Features

* auto scan when player is idle. ([f6cbd13](https://github.com/blacha/st/commit/f6cbd13b2fb15d6bec48b5359884d30d28fcd17f))





# [0.7.0](https://github.com/blacha/st/compare/v0.6.0...v0.7.0) (2020-01-13)


### Features

* expand types for qx widgets and docs ([665a33d](https://github.com/blacha/st/commit/665a33d642e7f6f53c7832289372deb325368d00))
* restrict patched functions to functions that exist on the prototype ([f992fa2](https://github.com/blacha/st/commit/f992fa2c45223efdde8ee1ac2309c5f529a6036a))
* switch to typed extractors ([d0bbf6d](https://github.com/blacha/st/commit/d0bbf6d0f4464a3e405faae60158f6b1724aa509))
* switching to a typed patcher ([ed74f8d](https://github.com/blacha/st/commit/ed74f8d06db1c65417bd9db5938dda0898bbe0c6))





# [0.6.0](https://github.com/blacha/st/compare/v0.5.0...v0.6.0) (2020-01-09)


### Bug Fixes

* change name to cncta/util ([060039a](https://github.com/blacha/st/commit/060039aad280dfa64f4d293319d4248b7bf40beb))
