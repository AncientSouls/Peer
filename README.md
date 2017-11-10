# Ancient Peer

[![GitHub Release](https://img.shields.io/github/release/AncientSouls/Peer.svg)](https://github.com/AncientSouls/Peer/releases)
[![NPM](https://img.shields.io/npm/v/ancient-peer.svg)](https://www.npmjs.com/package/ancient-peer)
[![Build Status](https://travis-ci.org/AncientSouls/Peer.svg?branch=master)](https://travis-ci.org/AncientSouls/Peer)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8c937e5b27664767b7740f1042ed305b)](https://www.codacy.com/app/valentineus/iii-client)
[![Codacy Coverage Badge](https://api.codacy.com/project/badge/Coverage/8c937e5b27664767b7740f1042ed305b)](https://www.codacy.com/app/valentineus/iii-client/files)
[![Gitter Badge](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/AncientSouls/Peer)

Universal router queries and bundles.

## Installation

You can download the installation package:

* [NPM package manager](https://www.npmjs.com/package/ancient-peer);
* [GitHub Releases](https://github.com/AncientSouls/Peer/releases);
* [Compilation from the source code](#build);

## Build

To perform a self-assembly project or add your own turbo add-on, follow these simple steps:

* Clone the repository and prepare it for work:
```bash
git clone https://github.com/AncientSouls/Peer.git ancient-peer
cd ./ancient-peer
NODE_ENV=development npm install
```

* In this step, make the necessary changes to the code, if required.

* After making the changes, perform the code check with the parser:
```bash
npm run check
```

* Perform functional testing of the code:
```bash
npm run test
```

* After successfully passing the tests, compile the source code:
```bash
npm run build
```

* Done!
If required, create a package to install and distribute your version:
```bash
npm pack
```

## License

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/eslint/eslint)

[MIT](LICENSE.md).
Copyright (c)
[AncientSouls](https://ancientsouls.github.io/).