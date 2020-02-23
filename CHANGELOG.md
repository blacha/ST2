# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [4.3.0](https://github.com/blacha/st/compare/v4.2.0...v4.3.0) (2020-02-23)


### Features

* allow v2 urls ([69b7aeb](https://github.com/blacha/st/commit/69b7aebf53c2f6785bbe3b78e43053942b7818b9))
* compress server responses ([92d7b52](https://github.com/blacha/st/commit/92d7b5233fc3512420d8616deb7c29bc8df89b04))
* more options for layout filtering ([205a124](https://github.com/blacha/st/commit/205a1249e4ead8f0b95372a6efa8f90c3769f59f))





# [4.2.0](https://github.com/blacha/st/compare/v4.1.0...v4.2.0) (2020-02-16)


### Bug Fixes

* allow worldIds that are higher than 411 ([0647295](https://github.com/blacha/st/commit/0647295a7ce9a364aa7008a0970b3ef33e0016c9))
* correct patching of NPCBase.$Id to get the actual base id ([df4b17c](https://github.com/blacha/st/commit/df4b17ccdb999cf97022fba1e3a119be7a23acc7))
* support unkown worlds ([e0f6a5b](https://github.com/blacha/st/commit/e0f6a5b59ceff152f54784800b48e00fa37d8929))


### Features

* adding firestorm 13 ([9e9c43d](https://github.com/blacha/st/commit/9e9c43d0d1694985655f7b710a6f15d337ba5a02))
* include createdAt for layouts ([0f8187a](https://github.com/blacha/st/commit/0f8187a2867863e76199c6ce5d60dbfa44590ac3))
* initial player permissions updates ([47f35da](https://github.com/blacha/st/commit/47f35da83c4b4446721b2bf9777f985b2ce6e7e0))





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
* drop max fail count to make it take less time to fail when scanning ([f9de6ad](https://github.com/blacha/st/commit/f9de6ad6af842cc0540efe8ebeed46a562917a30))
* force hide the main overlay to help reduce the memory leaks ([d9004c1](https://github.com/blacha/st/commit/d9004c1bfb9a8a178da087c45a0e90bb767a7060))


### Features

* adding typings for setting current own cityId ([6ffd4af](https://github.com/blacha/st/commit/6ffd4afe74779b7db4a3aa79825b16197625e1b4))
* allow filtering by time in layout view ([17faec3](https://github.com/blacha/st/commit/17faec3231d02453b9b7305150a793d12971755c))
* calculate distance between two points ([23640eb](https://github.com/blacha/st/commit/23640ebd9e45991d43e6e0e049dc9b563c9d69f1))
* if layout is out of range switch to new city ([aafaf89](https://github.com/blacha/st/commit/aafaf894ab5225640cbab7cd36ca2be0f3d4436d))
* improve coloring of cli messages ([b107be5](https://github.com/blacha/st/commit/b107be5ccacb1ba0fe59ce94372afb9ed5344b8c))
* restructure /st commands ([82575c7](https://github.com/blacha/st/commit/82575c704d95c51cebc3139e13c8a0975bef4ffc))
* types to show and hide the main overlay ([c756e03](https://github.com/blacha/st/commit/c756e03225af6fe2ae4b362257eb8f967e25d212))
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
* force a somewhat stable sort when duplicate keys are found ([67898f6](https://github.com/blacha/st/commit/67898f6d4fa7ec65b7ef72e605f63dcd15f2ad06))
* show base count and updated icons ([b052605](https://github.com/blacha/st/commit/b0526058a0a5853f166abd770caf5904afa5848e))
* typing around bbcodes ([166b646](https://github.com/blacha/st/commit/166b6463fa8639fba88da94f488c367e569130bf))





## [3.1.1](https://github.com/blacha/st/compare/v3.1.0...v3.1.1) (2020-02-06)


### Bug Fixes

* actually scan while not active ([e05d15b](https://github.com/blacha/st/commit/e05d15b9a807ffc67636f2aca9a38167998358c6))





# [3.1.0](https://github.com/blacha/st/compare/v3.0.0...v3.1.0) (2020-02-05)


### Bug Fixes

* button should not destroy other things using the button interface ([b52b12b](https://github.com/blacha/st/commit/b52b12bb2030ef966430b0d1d103aa0f0085d758))


### Features

* allow fetching of world data ([adf50fe](https://github.com/blacha/st/commit/adf50feca1115b34bf31a4931c5d592217c6162f))





# [3.0.0](https://github.com/blacha/st/compare/v2.2.0...v3.0.0) (2020-02-05)


### Bug Fixes

* do not start a disabled plugin ([25c7827](https://github.com/blacha/st/commit/25c7827137667b04f571d80c1a5149cc5e7edc77))
* improve rendering of bigger alliances ([7959514](https://github.com/blacha/st/commit/795951417256defe1bd3f6b78733e31203fd8a4b))
* start and stop modules when players start and stop them ([5f7ff5c](https://github.com/blacha/st/commit/5f7ff5cb73a7c5df9ea09b2b24b5410838ab0ecd))


* refactor!: refactoring extension to be more expandable ([a9550e1](https://github.com/blacha/st/commit/a9550e10b9dfc0521a3a8b87a5b8f6de2b81e637))


### Features

* add refresh button ([871ae96](https://github.com/blacha/st/commit/871ae96a92422023a01c3bbd8a5077ddbb81569f))
* adding some analytics to the site to see who is viewing what ([f77e455](https://github.com/blacha/st/commit/f77e455160dd888006b89d31baa14d1d228c0e81))
* allow forcing of alliance scan ([d38c48a](https://github.com/blacha/st/commit/d38c48a0c7ed5e562c04d2f52bcee1973677bbd8))
* extract player score ([7a5aa59](https://github.com/blacha/st/commit/7a5aa59a5e0a33c024c00c1fcdb14c2d7146cde4))


### BREAKING CHANGES

* this changes a lot of how plugins are put together





# [2.2.0](https://github.com/blacha/st/compare/v2.1.0...v2.2.0) (2020-02-04)


### Features

* allow disabling of modules ([6a546aa](https://github.com/blacha/st/commit/6a546aa175c75bfd442df54e36a009731704bed8))
* basic chat message types ([f44a2dd](https://github.com/blacha/st/commit/f44a2dddef849be8b4a750bc09a302ab404b2ad8))
* cli to conifgure st ([79121f6](https://github.com/blacha/st/commit/79121f60332f1d4b12d436b0c8336b5ea609bee6))
* give all routes a nice name ([aa8cb70](https://github.com/blacha/st/commit/aa8cb7071b3eeae6ff73461432443b1427e1e9ac))
* start tracking what version everyone has installed ([f8350eb](https://github.com/blacha/st/commit/f8350eb2761ed6f3a2f042135819d585697e05e2))
* supply basic extension metrics on every request ([e3b35c9](https://github.com/blacha/st/commit/e3b35c97c1f4c49980420decd66460fdc205e3a8))





# [2.1.0](https://github.com/blacha/st/compare/v2.0.0...v2.1.0) (2020-02-03)


### Bug Fixes

* don't duplicate player claims ([6a16f4f](https://github.com/blacha/st/commit/6a16f4f3eed890f13c28ce1da6508770c77d557a))
* json requests should be application/json ([2088454](https://github.com/blacha/st/commit/20884543eeaa9c96e78b258e6e6c0ca8a4512292))
* loading random bases should now work ([4217060](https://github.com/blacha/st/commit/4217060e5d9ae9fb5e5e8dd4244733d95d95b712))
* provide a link to home from every page ([e763146](https://github.com/blacha/st/commit/e763146794eec8c5e73e999381e38caf55777a08))
* some icons need to be limited in width and height ([7c7fbf0](https://github.com/blacha/st/commit/7c7fbf0c2af78dc4a29c4393497b2e06565aeaf0))
* unit icons should scale by the size of the icon ([430d92f](https://github.com/blacha/st/commit/430d92f907601b5dfd470708ae6d353dee8d4e07))
* urls should not have // in them ([c08558b](https://github.com/blacha/st/commit/c08558bc69d893f59b1de67977fd76c739b7534c))
* use a sortable id for timestamp based entries ([8c2af09](https://github.com/blacha/st/commit/8c2af09626083feacea4cd4be31c232588533003))
* use the correct package for version information ([e1aef25](https://github.com/blacha/st/commit/e1aef25495757b7bc0f92628ab41226dcb7204d2))


### Features

* add all world names ([2cf2a61](https://github.com/blacha/st/commit/2cf2a615ae1281a9241585d8f5d9642e37cbab7f))
* allow customizing options using st.config.set() ([e5f0c6b](https://github.com/blacha/st/commit/e5f0c6bef47404376f8a9f28641ff2de4b935379))
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
* don't crash if there is no main base ([ac1e8ee](https://github.com/blacha/st/commit/ac1e8eec8f0a8f57e85590bd0c823d35f72fa307))
* improve logic behind failure conditions in claiming players ([6753149](https://github.com/blacha/st/commit/6753149b33bbca60180c3b3d212475e9662f034b))
* missing model id ([2606e6d](https://github.com/blacha/st/commit/2606e6dfcd9ba5c4028dc6e14935ff7f7dcfb184))


### Features

* accept claims ([c3b74f4](https://github.com/blacha/st/commit/c3b74f42cd2c2ffd1eee6265a95f2e51cd941fb4))
* adding ranking data commands ([7f62ef1](https://github.com/blacha/st/commit/7f62ef11a9e2d510165c59ff3d5683772031a43c))
* better error messages ([4d44ff0](https://github.com/blacha/st/commit/4d44ff0086bfdeaa2fb614466357afcadb03e297))
* check player exist command ([0d972f8](https://github.com/blacha/st/commit/0d972f8f3bbe21aebc5c8ffc85cbbdb896fdc347))
* count the number of records removed in a cleanup ([fe7e8a7](https://github.com/blacha/st/commit/fe7e8a73b2cc39a690bebb155034ee3fdbe3c457))
* improve typing of ranking data requests ([3e30584](https://github.com/blacha/st/commit/3e30584633c493b1be5470c2042881f40a12dca1))
* initial work on claiming a player ux ([b8c352b](https://github.com/blacha/st/commit/b8c352b33f8b7792882edce4e1ebfb0fee05320e))
* support for mail deletion ([1a3de84](https://github.com/blacha/st/commit/1a3de844d0a21279a11b6550c6be8d41d3a61986))


* feat!: player names are not case sensitive for ea accounts ([6de1c45](https://github.com/blacha/st/commit/6de1c4502b355d207f4eac8f8760f81470686f73))


### BREAKING CHANGES

* this splits PlayerName into two
- PlayerNameDisplay: case sensitive player name
- PlayerNameId: lowercased player name





# [1.0.0](https://github.com/blacha/st/compare/v0.10.1...v1.0.0) (2020-01-23)


### Bug Fixes

* firebase permissions ([3ac277d](https://github.com/blacha/st/commit/3ac277dfd0c85864eb8ba766266ae165abfc3cba))
* scan url ([7878401](https://github.com/blacha/st/commit/787840159abbba27079dbdea6e2ac1c671674b48))
* split out firebase models ([5a0d676](https://github.com/blacha/st/commit/5a0d67643fcaabaed6166ffe1868e5a850dd5622))
* url of install tracker ([3e176e0](https://github.com/blacha/st/commit/3e176e0a460e759fcf940cdedf0538ca8e5d954f))


### Features

* force people to login before viewing base data ([6d49066](https://github.com/blacha/st/commit/6d49066847ddbf52b60eb2ac026756dede074e79))
* load what players have been claimed before showing anything ([752b586](https://github.com/blacha/st/commit/752b586de7cbe25a32bdcf2c4ca6b4bad418bf4c))
* no point chaching player bases ([46fe067](https://github.com/blacha/st/commit/46fe0678520fbbfbf32b0a53947dbe4386ffdd8a))
* replace __VERSION__ with something useful ([98cc2b9](https://github.com/blacha/st/commit/98cc2b9fc536ef49e366d049b5e1672ce3b40f00))
* use named types for ids ([86176f3](https://github.com/blacha/st/commit/86176f346b65a4034dd995ff3d853de0d656b568))


* feat!: rework database structure to prepare for permissions ([cbbd2d5](https://github.com/blacha/st/commit/cbbd2d51494c8e36773ab04eba9fa0bcb0ea832b))


### BREAKING CHANGES

* major rework of data base tables





## [0.10.1](https://github.com/blacha/st/compare/v0.10.0...v0.10.1) (2020-01-20)


### Bug Fixes

* switch away from npmignore to limit what is published ([26b4cbe](https://github.com/blacha/st/commit/26b4cbe4ffdd5595aba6153e752b41b3d3fb4638))





# [0.10.0](https://github.com/blacha/st/compare/v0.9.0...v0.10.0) (2020-01-20)


### Bug Fixes

* broken tests ([cadcc43](https://github.com/blacha/st/commit/cadcc43857a17037b9b3cfcbeac14d33bfcd67f6))


### Features

* basic mail types ([d0e70a7](https://github.com/blacha/st/commit/d0e70a785885b6e4cab37e9ccc0aec2be729c2f7))
* better base91 implementation ([a6e2860](https://github.com/blacha/st/commit/a6e286029be6509e0b0e6689081156bc1b2203fb))
* headless game client ([0c6c5cb](https://github.com/blacha/st/commit/0c6c5cb01d82a49a505d211a22a1192be608dcea))
* improve sector parser ([634af87](https://github.com/blacha/st/commit/634af8728c8b9cb1b299a9c33308c3a3e03161c7))
* improve typing of net commands ([a9f97f2](https://github.com/blacha/st/commit/a9f97f2e7873d23d65c28752b766300b3315e37e))
* load and parse world data ([0a97630](https://github.com/blacha/st/commit/0a976309c52e30fe95315f3c04249aa0e2b04f09))
* parse and decode sector data ([b3ac867](https://github.com/blacha/st/commit/b3ac86774d536ad9d37b97a5e75aa44fc948f979))
* poi type enum ([8121d6e](https://github.com/blacha/st/commit/8121d6e26ab55850c81de22ccdf18d88ed0a949d))
* send simple command types ([0395217](https://github.com/blacha/st/commit/0395217c7f2ca84707adbf1cf38738344b653d6c))
* switch to a base-n implementation to share the logic between 58 and 91 ([8dc124c](https://github.com/blacha/st/commit/8dc124c384e69d9662733b99facb37da89018c69))





# [0.9.0](https://github.com/blacha/st/compare/v0.8.0...v0.9.0) (2020-01-17)


### Features

* switch to new domain ([ec137a7](https://github.com/blacha/st/commit/ec137a7071eff4ac41b01025c680cbcd8f834206))





# [0.8.0](https://github.com/blacha/st/compare/v0.7.0...v0.8.0) (2020-01-17)


### Bug Fixes

* make the scanner much faster to see if the base is loaded ([5e9d1f3](https://github.com/blacha/st/commit/5e9d1f3223ef6dcba08d50820e5d5c73d306ff62))
* may #  size slightly larger to stop wrapping ([b141473](https://github.com/blacha/st/commit/b1414732119c106c36cb42034cbd3609e51077ad))
* only log idle changes ([8b5aa23](https://github.com/blacha/st/commit/8b5aa2307b9c120169b3fab98f8b6a4791a885b8))
* remove tsconfig.tsbuildinfo from npm ([88c2f46](https://github.com/blacha/st/commit/88c2f4668a3b7e3d5659381101c52c1e948637aa))
* show only the most updated alliance members ([8026d79](https://github.com/blacha/st/commit/8026d79342f2ff71311c65e4f743a26edd17ef67))


### Features

* adding a util to track when a player is idle. ([28e701e](https://github.com/blacha/st/commit/28e701eea81432952545315814b9bb71c26d1223))
* adding alliance support state types ([062c0e7](https://github.com/blacha/st/commit/062c0e78c0119ea398e0526f26bde889f1ee71f9))
* auto scan when player is idle. ([f6cbd13](https://github.com/blacha/st/commit/f6cbd13b2fb15d6bec48b5359884d30d28fcd17f))
* improve console logging in the browser ([23381b0](https://github.com/blacha/st/commit/23381b0458f5cdd9df7eadbe2b213e173d22c5de))





# [0.7.0](https://github.com/blacha/st/compare/v0.6.0...v0.7.0) (2020-01-13)


### Bug Fixes

* layout scanner should use the cache ([558daac](https://github.com/blacha/st/commit/558daacb3a70e07ea8a25e5a718bf4b99a7cbcb4))
* remove unused import ([acfd1f9](https://github.com/blacha/st/commit/acfd1f924293e300d7fdcc1f760b82fa0e056846))


### Features

* expand types for qx widgets and docs ([665a33d](https://github.com/blacha/st/commit/665a33d642e7f6f53c7832289372deb325368d00))
* move custom patches to base module impl ([acf9191](https://github.com/blacha/st/commit/acf9191b7d592898299f1a2b22e44f0ead89872b))
* restrict patched functions to functions that exist on the prototype ([f992fa2](https://github.com/blacha/st/commit/f992fa2c45223efdde8ee1ac2309c5f529a6036a))
* switch to text for statu's so its easier to debug ([e37f402](https://github.com/blacha/st/commit/e37f4024e3fedee843c1e7375ff3306b7e36159c))
* switch to typed extractors ([d0bbf6d](https://github.com/blacha/st/commit/d0bbf6d0f4464a3e405faae60158f6b1724aa509))
* switching to a typed patcher ([ed74f8d](https://github.com/blacha/st/commit/ed74f8d06db1c65417bd9db5938dda0898bbe0c6))





# [0.6.0](https://github.com/blacha/st/compare/v0.5.0...v0.6.0) (2020-01-09)


### Bug Fixes

* change name to cncta/util ([060039a](https://github.com/blacha/st/commit/060039aad280dfa64f4d293319d4248b7bf40beb))
* layout scanner ([f77d76a](https://github.com/blacha/st/commit/f77d76a02b95a87d85cdd2051b71efb62b76991b))
* packer should include bundled version number ([9ba2ea9](https://github.com/blacha/st/commit/9ba2ea917c7deb5750174ea3aca72e6b616b90dd))
* webgl version does not support alpha ([83faa99](https://github.com/blacha/st/commit/83faa99ecb02eeceb814e413b28df5c76a5294c9))
* :bug: Additional Change log message

### Features

* add sector updated event ([f08a94b](https://github.com/blacha/st/commit/f08a94b4dadc116419892a252616160bf8e355e2))
* adding cities events ([07874eb](https://github.com/blacha/st/commit/07874eb386027186d63381256a60f82fdccbe4f5))
* adding clientlib time ([99b31ef](https://github.com/blacha/st/commit/99b31efce5cd6478aef4eddca1861587adfd71e6))
* break up into smaller packages ([2574c34](https://github.com/blacha/st/commit/2574c34eb9205a95a63395d8948d8529e4a94fa0))
* load own player research data ([c6c127e](https://github.com/blacha/st/commit/c6c127e16daca16e10ee04148b74390da5ec08fc))
* support chat events ([bfff91b](https://github.com/blacha/st/commit/bfff91b04bda365f65a1ff57015a483baae7da18))
* support player research ([4ea62f8](https://github.com/blacha/st/commit/4ea62f80184158c102a6637c4a26b867a475bc90))
* support typing events ([83e696e](https://github.com/blacha/st/commit/83e696e7d201dfc1cd885bb93153930638ca5c59))
* use city and region events to determine when to update the tracker ([487a35c](https://github.com/blacha/st/commit/487a35c09b63fbc6f71e125a617c9aff774c7277))





# [0.5.0](https://github.com/blacha/st/compare/v0.4.0...v0.5.0) (2020-01-03)


### Bug Fixes

* allow bases to produce crystal ([ba1a5a3](https://github.com/blacha/st/commit/ba1a5a30d4f285575872c4ce2711ef74c001549e))
* broken routes ([20d88d5](https://github.com/blacha/st/commit/20d88d520e1b5f8fb736d98569dae05837e49f02))
* build/lint issues ([25c92c4](https://github.com/blacha/st/commit/25c92c484e31c4cdfacbe7309db8ce285f0f6abc))
* duration functions should be static ([5c6bb4a](https://github.com/blacha/st/commit/5c6bb4a639b8701982f43b5acf8f895189d93777))
* incorrect patch data for offense/defense units ([4c65bf4](https://github.com/blacha/st/commit/4c65bf4f4b1ba0ec4c9bb9506eb6eeb6e112cf9b))
* remove unused var ([1782925](https://github.com/blacha/st/commit/1782925778de76f64c4163b6746d742f38b83f0d))
* remove unused vars ([9037a45](https://github.com/blacha/st/commit/9037a45d096ed7a17b0a6b92a67b7c537bb80744))
* reset the timestamp to submitted time ([ff6eeec](https://github.com/blacha/st/commit/ff6eeec91f75c70e5b71f2e73f30a05707d9b675))


### Features

* add types for region cities ([24521cb](https://github.com/blacha/st/commit/24521cb5e48da3aa500e150b889005dc69427cc8))
* alliance member data fetching/events ([066f627](https://github.com/blacha/st/commit/066f62736ea540e452c8ce3724bacce7f034b16a))
* allow patcher to replace functions ([8b8db1c](https://github.com/blacha/st/commit/8b8db1c8a96d7abbeb5614d4c1b4929dcde3a4da))
* expand on vis typings ([612ff48](https://github.com/blacha/st/commit/612ff48ede3797b6cf8fa988e63cbff21719a5b6))
* explain what kill info does ([3419a2b](https://github.com/blacha/st/commit/3419a2bd8982929874ed66b0fd5417dfa5d37b83))
* explain what the camp tracker does ([69ac016](https://github.com/blacha/st/commit/69ac01646f9a5fa3803b715a320c593a06345740))
* improve coloring of bases ([a08eee3](https://github.com/blacha/st/commit/a08eee317756f2a70c5fcd51f376bedf6a4d7652))
* new online tracker for alliance members ([99e6692](https://github.com/blacha/st/commit/99e6692c8ef7caabca11492fa9bc1e29f1877fb4))
* readd kill info module. ([c7744b7](https://github.com/blacha/st/commit/c7744b781353756d0951fd509c49b34e86f0f06e))





# [0.4.0](https://github.com/blacha/st/compare/v0.3.0...v0.4.0) (2020-01-02)


### Bug Fixes

* baselayout scanner ([a15c9e4](https://github.com/blacha/st/commit/a15c9e4259d7a5095cbcfa6180fbd285beef5dd2))
* disable sort by research ([f3650df](https://github.com/blacha/st/commit/f3650df830799c758b88004cf6b600d6a6bfd59e))


### Features

* patch npc camps to show camp/outpost level ([5db6443](https://github.com/blacha/st/commit/5db6443315ebd81307675b644e31aa3ee023306d))
* use the layer near the canvas for overlays ([f94ffa9](https://github.com/blacha/st/commit/f94ffa9713d8892bb4b73ab70d0492d63f2e0390))





# [0.3.0](https://github.com/blacha/st/compare/v0.2.0...v0.3.0) (2020-01-02)


### Bug Fixes

* add unit tests for research ([eac8e36](https://github.com/blacha/st/commit/eac8e369857d205f37ab549779b3e50085ba3ee1))
* dont show alliance if they are not part of one ([40d6fd2](https://github.com/blacha/st/commit/40d6fd28d529365707eddaa38974bd0a79879888))
* star size should be small in chrome ([a2c4e0e](https://github.com/blacha/st/commit/a2c4e0ec1fcb01f0d5b52b550d8801254d780006))


### Features

* deobsfucator ([5b8f2f0](https://github.com/blacha/st/commit/5b8f2f0a017b5a3640dfd2867bc3e41dd7718f44))
* don't allow base ids to be unpacked ([4e54b1a](https://github.com/blacha/st/commit/4e54b1a0a8b8411985a67aab71f3d80e51117f2a))
* extract research information from bases ([3ffc216](https://github.com/blacha/st/commit/3ffc216f304f2856d55284aaa7b0461635fd80d9))
* initial work on research display ([046b864](https://github.com/blacha/st/commit/046b86432748fd8a4df1dc5c074ef8e9f5a1f8e7))
* layouts should not be defaulting to 0 ([609b6e6](https://github.com/blacha/st/commit/609b6e6dab31f4d53d01eb4bf4d3d989e139e822))
* overwrite updatedAt timestamp ([187c931](https://github.com/blacha/st/commit/187c931b07e5c73dded5cd67dde9e12b50f5a05f))
* show upgraded on alliance page ([277a5cd](https://github.com/blacha/st/commit/277a5cd3d958a02af0ec8ed2f9238147926f4ac6))
* show upgraded star for upgraded units ([2e9eee8](https://github.com/blacha/st/commit/2e9eee8fe214a236c4032860e5be0a5dcd255ed0))





# [0.2.0](https://github.com/blacha/st/compare/v0.1.2...v0.2.0) (2020-01-01)


### Bug Fixes

* eslint issues ([2231f8e](https://github.com/blacha/st/commit/2231f8e9806efaf38e7edd1bd31067138c74015f))
* flush base cache to get the base id faster ([d5365d1](https://github.com/blacha/st/commit/d5365d1d41c8a37eb53719bcb726664ed6718995))
* force icons to be 32 pixels ([6d4700a](https://github.com/blacha/st/commit/6d4700abedef392aa6f96616e69528eb0d978230))
* get nearby objects should actually return objects ([7a5b545](https://github.com/blacha/st/commit/7a5b545dc30c0d58b7d7cbc2edfa7bc75642c928))
* make clientlib public ([f625452](https://github.com/blacha/st/commit/f62545287f28faf50b0b5ac6649cc9cce3ef8737))
* package index.html ([0216905](https://github.com/blacha/st/commit/0216905105aaa963e8dfab9ca6443bb77528130c))
* remove console.log ([bb34e34](https://github.com/blacha/st/commit/bb34e34a7400aace3473b9bdda64d81b487a6fff))
* remove yarn-error log ([21a6df4](https://github.com/blacha/st/commit/21a6df4fff4a64674592afcb04180ddd1b2a2ac5))
* scanner should now actually scan ([9a2b385](https://github.com/blacha/st/commit/9a2b38537735e7bbcf8c9fe647b1ffeb43f63a28))
* update camp index ([3ba6c7e](https://github.com/blacha/st/commit/3ba6c7e558d8fd4bc6cf3bf6f087f32fec99de18))


### Features

* color older camps yellowish ([84fa819](https://github.com/blacha/st/commit/84fa819684090e4170f5a1d509df2b5a48b574b5))
* limit to show camps near main offense ([6ed906b](https://github.com/blacha/st/commit/6ed906ba735e4d9831362e14516267c1a77cef81))
* make icons slightly larger ([f26139c](https://github.com/blacha/st/commit/f26139c3d4420a920e02fed47c38115504b4171f))
* show newest spawned camps ([b985c89](https://github.com/blacha/st/commit/b985c896a3f5e1feb6f6c5354c0ccc124e48f0af))
* use icons ([59d5d63](https://github.com/blacha/st/commit/59d5d634ed3afab8e5469080453413e5255881fc))
* use player details to show latest copy of base ([a56c252](https://github.com/blacha/st/commit/a56c252386530f0b35a8dec24e34e8fa1fa913df))
* use standard fonts ([b80b85a](https://github.com/blacha/st/commit/b80b85a106109f6431216de297dbc6fd3d5a6ce2))





## [0.1.2](https://github.com/blacha/st/compare/v0.1.1...v0.1.2) (2020-01-01)


### Bug Fixes

* use the package's package.json ([8e579a9](https://github.com/blacha/st/commit/8e579a996325f6f7b5b7d1fdb8b42394a2719095))





## [0.1.1](https://github.com/blacha/st/compare/v0.1.0...v0.1.1) (2020-01-01)


### Bug Fixes

* add firebase cli ([f2bdf04](https://github.com/blacha/st/commit/f2bdf043650227439f71369b872ba6d90c25aa75))
* duplicate test name ([58be048](https://github.com/blacha/st/commit/58be0482e1e6e6df76c025df0d11a59a5461d6ce))
* eslint unused vars ([df26481](https://github.com/blacha/st/commit/df26481f4c0cdd2db289bc430377aa58edef52c5))
* lerna.json ([c1160f4](https://github.com/blacha/st/commit/c1160f41e69c98caeb4beb2701101dee848e407f))
* share the favicon between everything that uses it ([6159b49](https://github.com/blacha/st/commit/6159b49c798063666595a32f15c2e40216c5efe8))
* st- should be private ([f23fb9d](https://github.com/blacha/st/commit/f23fb9d63ff9afb55d5483960632d35d9e490924))
* typo in output filename ([d4b8818](https://github.com/blacha/st/commit/d4b88183fa072173504390c57c42f18f0a55be4c))


### Features

* delete layouts after 3 days ([3c60c58](https://github.com/blacha/st/commit/3c60c581454c9fd4167af792f4d73e845e0de31f))
* favicon ([ce8f0ea](https://github.com/blacha/st/commit/ce8f0ea10026c8ef26b1ab3542e0a1d6037ea6c1))
* initial deobsfucator ([26423eb](https://github.com/blacha/st/commit/26423eb6ad36a5016c21c89582028b7b7faea2c9))
* script to version bump everything ([ee83ff1](https://github.com/blacha/st/commit/ee83ff1265fe3cee4abd5e3d543ca6719236e6de))
* shorten base number column ([25c9e23](https://github.com/blacha/st/commit/25c9e238450d304faa330399aea574a1fac2c313))
* show a breadcrumb to bases ([1ea6243](https://github.com/blacha/st/commit/1ea624338ac611c16959e40b90c03e4cd623f3bd))
* show last updated time ([5f69acb](https://github.com/blacha/st/commit/5f69acb334df2dec651fac0106b4043f420c0aa3))
* show player info ([489a43a](https://github.com/blacha/st/commit/489a43adcb44faa56631671b8dfb40e60e634541))
