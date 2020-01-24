# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/blacha/st/compare/v1.0.0...v2.0.0) (2020-01-24)


### Features

* adding ranking data commands ([7f62ef1](https://github.com/blacha/st/commit/7f62ef11a9e2d510165c59ff3d5683772031a43c))
* check player exist command ([0d972f8](https://github.com/blacha/st/commit/0d972f8f3bbe21aebc5c8ffc85cbbdb896fdc347))
* improve typing of ranking data requests ([3e30584](https://github.com/blacha/st/commit/3e30584633c493b1be5470c2042881f40a12dca1))
* support for mail deletion ([1a3de84](https://github.com/blacha/st/commit/1a3de844d0a21279a11b6550c6be8d41d3a61986))


* feat!: player names are not case sensitive for ea accounts ([6de1c45](https://github.com/blacha/st/commit/6de1c4502b355d207f4eac8f8760f81470686f73))


### BREAKING CHANGES

* this splits PlayerName into two
- PlayerNameDisplay: case sensitive player name
- PlayerNameId: lowercased player name





# [1.0.0](https://github.com/blacha/st/compare/v0.10.1...v1.0.0) (2020-01-23)


### Bug Fixes

* split out firebase models ([5a0d676](https://github.com/blacha/st/commit/5a0d67643fcaabaed6166ffe1868e5a850dd5622))


### Features

* use named types for ids ([86176f3](https://github.com/blacha/st/commit/86176f346b65a4034dd995ff3d853de0d656b568))





## [0.10.1](https://github.com/blacha/st/compare/v0.10.0...v0.10.1) (2020-01-20)


### Bug Fixes

* switch away from npmignore to limit what is published ([26b4cbe](https://github.com/blacha/st/commit/26b4cbe4ffdd5595aba6153e752b41b3d3fb4638))





# [0.10.0](https://github.com/blacha/st/compare/v0.9.0...v0.10.0) (2020-01-20)


### Bug Fixes

* broken tests ([cadcc43](https://github.com/blacha/st/commit/cadcc43857a17037b9b3cfcbeac14d33bfcd67f6))


### Features

* basic mail types ([d0e70a7](https://github.com/blacha/st/commit/d0e70a785885b6e4cab37e9ccc0aec2be729c2f7))
* improve typing of net commands ([a9f97f2](https://github.com/blacha/st/commit/a9f97f2e7873d23d65c28752b766300b3315e37e))
* poi type enum ([8121d6e](https://github.com/blacha/st/commit/8121d6e26ab55850c81de22ccdf18d88ed0a949d))
* send simple command types ([0395217](https://github.com/blacha/st/commit/0395217c7f2ca84707adbf1cf38738344b653d6c))





# [0.9.0](https://github.com/blacha/st/compare/v0.8.0...v0.9.0) (2020-01-17)

**Note:** Version bump only for package @cncta/clientlib





# [0.8.0](https://github.com/blacha/st/compare/v0.7.0...v0.8.0) (2020-01-17)


### Bug Fixes

* remove tsconfig.tsbuildinfo from npm ([88c2f46](https://github.com/blacha/st/commit/88c2f4668a3b7e3d5659381101c52c1e948637aa))


### Features

* adding alliance support state types ([062c0e7](https://github.com/blacha/st/commit/062c0e78c0119ea398e0526f26bde889f1ee71f9))





# [0.7.0](https://github.com/blacha/st/compare/v0.6.0...v0.7.0) (2020-01-13)


### Features

* expand types for qx widgets and docs ([665a33d](https://github.com/blacha/st/commit/665a33d642e7f6f53c7832289372deb325368d00))
* restrict patched functions to functions that exist on the prototype ([f992fa2](https://github.com/blacha/st/commit/f992fa2c45223efdde8ee1ac2309c5f529a6036a))
* switching to a typed patcher ([ed74f8d](https://github.com/blacha/st/commit/ed74f8d06db1c65417bd9db5938dda0898bbe0c6))





# [0.6.0](https://github.com/blacha/st/compare/v0.5.0...v0.6.0) (2020-01-09)


### Bug Fixes

* layout scanner ([f77d76a](https://github.com/blacha/st/commit/f77d76a02b95a87d85cdd2051b71efb62b76991b))


### Features

* add sector updated event ([f08a94b](https://github.com/blacha/st/commit/f08a94b4dadc116419892a252616160bf8e355e2))
* adding cities events ([07874eb](https://github.com/blacha/st/commit/07874eb386027186d63381256a60f82fdccbe4f5))
* adding clientlib time ([99b31ef](https://github.com/blacha/st/commit/99b31efce5cd6478aef4eddca1861587adfd71e6))
* break up into smaller packages ([2574c34](https://github.com/blacha/st/commit/2574c34eb9205a95a63395d8948d8529e4a94fa0))
* load own player research data ([c6c127e](https://github.com/blacha/st/commit/c6c127e16daca16e10ee04148b74390da5ec08fc))
* support chat events ([bfff91b](https://github.com/blacha/st/commit/bfff91b04bda365f65a1ff57015a483baae7da18))
* support typing events ([83e696e](https://github.com/blacha/st/commit/83e696e7d201dfc1cd885bb93153930638ca5c59))





# [0.5.0](https://github.com/blacha/st/compare/v0.4.0...v0.5.0) (2020-01-03)


### Bug Fixes

* build/lint issues ([25c92c4](https://github.com/blacha/st/commit/25c92c484e31c4cdfacbe7309db8ce285f0f6abc))
* duration functions should be static ([5c6bb4a](https://github.com/blacha/st/commit/5c6bb4a639b8701982f43b5acf8f895189d93777))
* incorrect patch data for offense/defense units ([4c65bf4](https://github.com/blacha/st/commit/4c65bf4f4b1ba0ec4c9bb9506eb6eeb6e112cf9b))
* remove unused vars ([9037a45](https://github.com/blacha/st/commit/9037a45d096ed7a17b0a6b92a67b7c537bb80744))


### Features

* add types for region cities ([24521cb](https://github.com/blacha/st/commit/24521cb5e48da3aa500e150b889005dc69427cc8))
* alliance member data fetching/events ([066f627](https://github.com/blacha/st/commit/066f62736ea540e452c8ce3724bacce7f034b16a))
* allow patcher to replace functions ([8b8db1c](https://github.com/blacha/st/commit/8b8db1c8a96d7abbeb5614d4c1b4929dcde3a4da))
* expand on vis typings ([612ff48](https://github.com/blacha/st/commit/612ff48ede3797b6cf8fa988e63cbff21719a5b6))
* readd kill info module. ([c7744b7](https://github.com/blacha/st/commit/c7744b781353756d0951fd509c49b34e86f0f06e))





# [0.4.0](https://github.com/blacha/st/compare/v0.3.0...v0.4.0) (2020-01-02)


### Features

* patch npc camps to show camp/outpost level ([5db6443](https://github.com/blacha/st/commit/5db6443315ebd81307675b644e31aa3ee023306d))





# [0.3.0](https://github.com/blacha/st/compare/v0.2.0...v0.3.0) (2020-01-02)


### Bug Fixes

* add unit tests for research ([eac8e36](https://github.com/blacha/st/commit/eac8e369857d205f37ab549779b3e50085ba3ee1))


### Features

* extract research information from bases ([3ffc216](https://github.com/blacha/st/commit/3ffc216f304f2856d55284aaa7b0461635fd80d9))
* show upgraded on alliance page ([277a5cd](https://github.com/blacha/st/commit/277a5cd3d958a02af0ec8ed2f9238147926f4ac6))





# [0.2.0](https://github.com/blacha/st/compare/v0.1.2...v0.2.0) (2020-01-01)


### Bug Fixes

* eslint issues ([2231f8e](https://github.com/blacha/st/commit/2231f8e9806efaf38e7edd1bd31067138c74015f))
* get nearby objects should actually return objects ([7a5b545](https://github.com/blacha/st/commit/7a5b545dc30c0d58b7d7cbc2edfa7bc75642c928))
* make clientlib public ([f625452](https://github.com/blacha/st/commit/f62545287f28faf50b0b5ac6649cc9cce3ef8737))


### Features

* limit to show camps near main offense ([6ed906b](https://github.com/blacha/st/commit/6ed906ba735e4d9831362e14516267c1a77cef81))
* show newest spawned camps ([b985c89](https://github.com/blacha/st/commit/b985c896a3f5e1feb6f6c5354c0ccc124e48f0af))





## [0.1.1](https://github.com/blacha/st/compare/v0.1.0...v0.1.1) (2020-01-01)


### Bug Fixes

* duplicate test name ([58be048](https://github.com/blacha/st/commit/58be0482e1e6e6df76c025df0d11a59a5461d6ce))
