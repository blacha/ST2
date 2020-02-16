# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [4.2.0](https://github.com/blacha/st/compare/v4.1.0...v4.2.0) (2020-02-16)


### Bug Fixes

* correct patching of NPCBase.$Id to get the actual base id ([df4b17c](https://github.com/blacha/st/commit/df4b17ccdb999cf97022fba1e3a119be7a23acc7))





# [4.1.0](https://github.com/blacha/st/compare/v4.0.0...v4.1.0) (2020-02-11)


### Bug Fixes

* lint issues ([02a6572](https://github.com/blacha/st/commit/02a657295943a3603c23e8e045e2da1de656599c))


### Features

* do not log things when the player is offline ([3c2fb5e](https://github.com/blacha/st/commit/3c2fb5efc55e11280976719f8b2e50f2a8765184))
* fix ta bug where unload taking too much time destroying events ([9168b1f](https://github.com/blacha/st/commit/9168b1fb0a9be1b33184623a5034e6aaa0c71620))
* force a poll while waiting for a base to scan ([b313b82](https://github.com/blacha/st/commit/b313b82db8fae7309bc3794e4904fc30dac102b2))
* improve typing of communication manager ([c606af2](https://github.com/blacha/st/commit/c606af2e5ef6c99f081f2a5ae6fe1050af61d256))





# [4.0.0](https://github.com/blacha/st/compare/v3.2.0...v4.0.0) (2020-02-10)


### Bug Fixes

* wait for cities needs a little more time on slow connections ([2de52f8](https://github.com/blacha/st/commit/2de52f88b55b2830e01bf1e1e5b4297efd277332))
* **camp:** only alert on the newest camp or outpost ([ed84c40](https://github.com/blacha/st/commit/ed84c40044f1e0fd23f9aa0025f8d4fe130aac11))
* force hide the main overlay to help reduce the memory leaks ([d9004c1](https://github.com/blacha/st/commit/d9004c1bfb9a8a178da087c45a0e90bb767a7060))


### Features

* if layout is out of range switch to new city ([aafaf89](https://github.com/blacha/st/commit/aafaf894ab5225640cbab7cd36ca2be0f3d4436d))
* improve coloring of cli messages ([b107be5](https://github.com/blacha/st/commit/b107be5ccacb1ba0fe59ce94372afb9ed5344b8c))
* restructure /st commands ([82575c7](https://github.com/blacha/st/commit/82575c704d95c51cebc3139e13c8a0975bef4ffc))
* user actions force polls to fire faster ([a6e426d](https://github.com/blacha/st/commit/a6e426d2f840a290650a8f982ddac9989149a4a8))


### BREAKING CHANGES

* new commands

/st config set <key> <value>
/st alliance scan
/st layout scan
/st plugin enable
/st plugin disable





# [3.2.0](https://github.com/blacha/st/compare/v3.1.1...v3.2.0) (2020-02-06)


### Features

* alert new spawns near your main base ([75a5e51](https://github.com/blacha/st/commit/75a5e5161689edfb6fcf8c06b10793572ce79d71))





## [3.1.1](https://github.com/blacha/st/compare/v3.1.0...v3.1.1) (2020-02-06)


### Bug Fixes

* actually scan while not active ([e05d15b](https://github.com/blacha/st/commit/e05d15b9a807ffc67636f2aca9a38167998358c6))





# [3.1.0](https://github.com/blacha/st/compare/v3.0.0...v3.1.0) (2020-02-05)


### Bug Fixes

* button should not destroy other things using the button interface ([b52b12b](https://github.com/blacha/st/commit/b52b12bb2030ef966430b0d1d103aa0f0085d758))





# [3.0.0](https://github.com/blacha/st/compare/v2.2.0...v3.0.0) (2020-02-05)


### Bug Fixes

* do not start a disabled plugin ([25c7827](https://github.com/blacha/st/commit/25c7827137667b04f571d80c1a5149cc5e7edc77))
* start and stop modules when players start and stop them ([5f7ff5c](https://github.com/blacha/st/commit/5f7ff5cb73a7c5df9ea09b2b24b5410838ab0ecd))


* refactor!: refactoring extension to be more expandable ([a9550e1](https://github.com/blacha/st/commit/a9550e10b9dfc0521a3a8b87a5b8f6de2b81e637))


### Features

* add refresh button ([871ae96](https://github.com/blacha/st/commit/871ae96a92422023a01c3bbd8a5077ddbb81569f))
* allow forcing of alliance scan ([d38c48a](https://github.com/blacha/st/commit/d38c48a0c7ed5e562c04d2f52bcee1973677bbd8))


### BREAKING CHANGES

* this changes a lot of how plugins are put together





# [2.2.0](https://github.com/blacha/st/compare/v2.1.0...v2.2.0) (2020-02-04)


### Features

* allow disabling of modules ([6a546aa](https://github.com/blacha/st/commit/6a546aa175c75bfd442df54e36a009731704bed8))
* basic chat message types ([f44a2dd](https://github.com/blacha/st/commit/f44a2dddef849be8b4a750bc09a302ab404b2ad8))
* cli to conifgure st ([79121f6](https://github.com/blacha/st/commit/79121f60332f1d4b12d436b0c8336b5ea609bee6))
* start tracking what version everyone has installed ([f8350eb](https://github.com/blacha/st/commit/f8350eb2761ed6f3a2f042135819d585697e05e2))
* supply basic extension metrics on every request ([e3b35c9](https://github.com/blacha/st/commit/e3b35c97c1f4c49980420decd66460fdc205e3a8))





# [2.1.0](https://github.com/blacha/st/compare/v2.0.0...v2.1.0) (2020-02-03)


### Bug Fixes

* json requests should be application/json ([2088454](https://github.com/blacha/st/commit/20884543eeaa9c96e78b258e6e6c0ca8a4512292))


### Features

* allow customizing options using st.config.set() ([e5f0c6b](https://github.com/blacha/st/commit/e5f0c6bef47404376f8a9f28641ff2de4b935379))





# [2.0.0](https://github.com/blacha/st/compare/v1.0.0...v2.0.0) (2020-01-24)


### Bug Fixes

* don't crash if there is no main base ([ac1e8ee](https://github.com/blacha/st/commit/ac1e8eec8f0a8f57e85590bd0c823d35f72fa307))


### Features

* count the number of records removed in a cleanup ([fe7e8a7](https://github.com/blacha/st/commit/fe7e8a73b2cc39a690bebb155034ee3fdbe3c457))





# [1.0.0](https://github.com/blacha/st/compare/v0.10.1...v1.0.0) (2020-01-23)


### Bug Fixes

* scan url ([7878401](https://github.com/blacha/st/commit/787840159abbba27079dbdea6e2ac1c671674b48))


* feat!: rework database structure to prepare for permissions ([cbbd2d5](https://github.com/blacha/st/commit/cbbd2d51494c8e36773ab04eba9fa0bcb0ea832b))


### Features

* no point chaching player bases ([46fe067](https://github.com/blacha/st/commit/46fe0678520fbbfbf32b0a53947dbe4386ffdd8a))


### BREAKING CHANGES

* major rework of data base tables





## [0.10.1](https://github.com/blacha/st/compare/v0.10.0...v0.10.1) (2020-01-20)


### Bug Fixes

* switch away from npmignore to limit what is published ([26b4cbe](https://github.com/blacha/st/commit/26b4cbe4ffdd5595aba6153e752b41b3d3fb4638))





# [0.10.0](https://github.com/blacha/st/compare/v0.9.0...v0.10.0) (2020-01-20)

**Note:** Version bump only for package @st/extension





# [0.9.0](https://github.com/blacha/st/compare/v0.8.0...v0.9.0) (2020-01-17)

**Note:** Version bump only for package @st/extension





# [0.8.0](https://github.com/blacha/st/compare/v0.7.0...v0.8.0) (2020-01-17)


### Bug Fixes

* only log idle changes ([8b5aa23](https://github.com/blacha/st/commit/8b5aa2307b9c120169b3fab98f8b6a4791a885b8))
* remove tsconfig.tsbuildinfo from npm ([88c2f46](https://github.com/blacha/st/commit/88c2f4668a3b7e3d5659381101c52c1e948637aa))


### Features

* adding a util to track when a player is idle. ([28e701e](https://github.com/blacha/st/commit/28e701eea81432952545315814b9bb71c26d1223))
* auto scan when player is idle. ([f6cbd13](https://github.com/blacha/st/commit/f6cbd13b2fb15d6bec48b5359884d30d28fcd17f))





# [0.7.0](https://github.com/blacha/st/compare/v0.6.0...v0.7.0) (2020-01-13)


### Bug Fixes

* layout scanner should use the cache ([558daac](https://github.com/blacha/st/commit/558daacb3a70e07ea8a25e5a718bf4b99a7cbcb4))
* remove unused import ([acfd1f9](https://github.com/blacha/st/commit/acfd1f924293e300d7fdcc1f760b82fa0e056846))


### Features

* move custom patches to base module impl ([acf9191](https://github.com/blacha/st/commit/acf9191b7d592898299f1a2b22e44f0ead89872b))
* switch to text for statu's so its easier to debug ([e37f402](https://github.com/blacha/st/commit/e37f4024e3fedee843c1e7375ff3306b7e36159c))
* switch to typed extractors ([d0bbf6d](https://github.com/blacha/st/commit/d0bbf6d0f4464a3e405faae60158f6b1724aa509))
* switching to a typed patcher ([ed74f8d](https://github.com/blacha/st/commit/ed74f8d06db1c65417bd9db5938dda0898bbe0c6))





# [0.6.0](https://github.com/blacha/st/compare/v0.5.0...v0.6.0) (2020-01-09)


### Bug Fixes

* change name to cncta/util ([060039a](https://github.com/blacha/st/commit/060039aad280dfa64f4d293319d4248b7bf40beb))
* layout scanner ([f77d76a](https://github.com/blacha/st/commit/f77d76a02b95a87d85cdd2051b71efb62b76991b))
* webgl version does not support alpha ([83faa99](https://github.com/blacha/st/commit/83faa99ecb02eeceb814e413b28df5c76a5294c9))


### Features

* break up into smaller packages ([2574c34](https://github.com/blacha/st/commit/2574c34eb9205a95a63395d8948d8529e4a94fa0))
* support typing events ([83e696e](https://github.com/blacha/st/commit/83e696e7d201dfc1cd885bb93153930638ca5c59))
* use city and region events to determine when to update the tracker ([487a35c](https://github.com/blacha/st/commit/487a35c09b63fbc6f71e125a617c9aff774c7277))





# [0.5.0](https://github.com/blacha/st/compare/v0.4.0...v0.5.0) (2020-01-03)


### Bug Fixes

* build/lint issues ([25c92c4](https://github.com/blacha/st/commit/25c92c484e31c4cdfacbe7309db8ce285f0f6abc))
* remove unused var ([1782925](https://github.com/blacha/st/commit/1782925778de76f64c4163b6746d742f38b83f0d))


### Features

* explain what kill info does ([3419a2b](https://github.com/blacha/st/commit/3419a2bd8982929874ed66b0fd5417dfa5d37b83))
* explain what the camp tracker does ([69ac016](https://github.com/blacha/st/commit/69ac01646f9a5fa3803b715a320c593a06345740))
* improve coloring of bases ([a08eee3](https://github.com/blacha/st/commit/a08eee317756f2a70c5fcd51f376bedf6a4d7652))
* new online tracker for alliance members ([99e6692](https://github.com/blacha/st/commit/99e6692c8ef7caabca11492fa9bc1e29f1877fb4))
* readd kill info module. ([c7744b7](https://github.com/blacha/st/commit/c7744b781353756d0951fd509c49b34e86f0f06e))





# [0.4.0](https://github.com/blacha/st/compare/v0.3.0...v0.4.0) (2020-01-02)


### Bug Fixes

* baselayout scanner ([a15c9e4](https://github.com/blacha/st/commit/a15c9e4259d7a5095cbcfa6180fbd285beef5dd2))


### Features

* use the layer near the canvas for overlays ([f94ffa9](https://github.com/blacha/st/commit/f94ffa9713d8892bb4b73ab70d0492d63f2e0390))





# [0.3.0](https://github.com/blacha/st/compare/v0.2.0...v0.3.0) (2020-01-02)


### Bug Fixes

* add unit tests for research ([eac8e36](https://github.com/blacha/st/commit/eac8e369857d205f37ab549779b3e50085ba3ee1))


### Features

* extract research information from bases ([3ffc216](https://github.com/blacha/st/commit/3ffc216f304f2856d55284aaa7b0461635fd80d9))
* initial work on research display ([046b864](https://github.com/blacha/st/commit/046b86432748fd8a4df1dc5c074ef8e9f5a1f8e7))
* show upgraded star for upgraded units ([2e9eee8](https://github.com/blacha/st/commit/2e9eee8fe214a236c4032860e5be0a5dcd255ed0))





# [0.2.0](https://github.com/blacha/st/compare/v0.1.2...v0.2.0) (2020-01-01)


### Bug Fixes

* eslint issues ([2231f8e](https://github.com/blacha/st/commit/2231f8e9806efaf38e7edd1bd31067138c74015f))
* flush base cache to get the base id faster ([d5365d1](https://github.com/blacha/st/commit/d5365d1d41c8a37eb53719bcb726664ed6718995))
* remove console.log ([bb34e34](https://github.com/blacha/st/commit/bb34e34a7400aace3473b9bdda64d81b487a6fff))
* scanner should now actually scan ([9a2b385](https://github.com/blacha/st/commit/9a2b38537735e7bbcf8c9fe647b1ffeb43f63a28))
* update camp index ([3ba6c7e](https://github.com/blacha/st/commit/3ba6c7e558d8fd4bc6cf3bf6f087f32fec99de18))


### Features

* color older camps yellowish ([84fa819](https://github.com/blacha/st/commit/84fa819684090e4170f5a1d509df2b5a48b574b5))
* limit to show camps near main offense ([6ed906b](https://github.com/blacha/st/commit/6ed906ba735e4d9831362e14516267c1a77cef81))
* show newest spawned camps ([b985c89](https://github.com/blacha/st/commit/b985c896a3f5e1feb6f6c5354c0ccc124e48f0af))
* use standard fonts ([b80b85a](https://github.com/blacha/st/commit/b80b85a106109f6431216de297dbc6fd3d5a6ce2))





## [0.1.1](https://github.com/blacha/st/compare/v0.1.0...v0.1.1) (2020-01-01)


### Bug Fixes

* st- should be private ([f23fb9d](https://github.com/blacha/st/commit/f23fb9d63ff9afb55d5483960632d35d9e490924))
