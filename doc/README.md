
# Ancient Souls Peer

Friendly core of interaction of peers.

[![GitHub Release](https://img.shields.io/github/release/AncientSouls/Peer.svg)](https://github.com/AncientSouls/Peer/releases)
[![NPM](https://img.shields.io/npm/v/ancient-peer.svg)](https://www.npmjs.com/package/ancient-peer)
[![Build Status](https://travis-ci.org/AncientSouls/Peer.svg?branch=master)](https://travis-ci.org/AncientSouls/Peer)
[![Read the Docs](https://img.shields.io/readthedocs/pip.svg)](https://ancientsouls.github.io/)


## Index

### Classes

* [Peer](classes/peer.md)


### Interfaces

* [IPeer](interfaces/ipeer.md)
* [IPeerApi](interfaces/ipeerapi.md)
* [IPeerApiCallbacks](interfaces/ipeerapicallbacks.md)
* [IPeerApiSendBundles](interfaces/ipeerapisendbundles.md)
* [IPeerCursor](interfaces/ipeercursor.md)
* [IPeerCursorQuery](interfaces/ipeercursorquery.md)
* [IPeerEventData](interfaces/ipeereventdata.md)
* [IPeerEventsList](interfaces/ipeereventslist.md)
* [IPeerPkg](interfaces/ipeerpkg.md)
* [IPeerQuery](interfaces/ipeerquery.md)
* [IPeerRelationsChannels](interfaces/ipeerrelationschannels.md)
* [IPeerRelationsCursors](interfaces/ipeerrelationscursors.md)


### Type aliases

* [TPeer](#tpeer)
* [TPeerApiQuery](#tpeerapiquery)
* [TPeerCursor](#tpeercursor)


### Variables

* [MixedPeer](#mixedpeer)


### Functions

* [defaultApi](#defaultapi)
* [mixin](#mixin)



---
# Type aliases
<a id="tpeer"></a>

###  TPeer

**Τ TPeer**:  *[IPeer](interfaces/ipeer.md)[IPeerEventsList](interfaces/ipeereventslist.md)* 

*Defined in [peer.ts:39](https://github.com/AncientSouls/Peer/blob/f63ae3f/src/lib/peer.ts#L39)*





___

<a id="tpeerapiquery"></a>

###  TPeerApiQuery

**Τ TPeerApiQuery**:  *`any`* 

*Defined in [peer.ts:91](https://github.com/AncientSouls/Peer/blob/f63ae3f/src/lib/peer.ts#L91)*





___

<a id="tpeercursor"></a>

###  TPeerCursor

**Τ TPeerCursor**:  *[IPeerCursor](interfaces/ipeercursor.md)`ICursorEventsList`* 

*Defined in [peer.ts:52](https://github.com/AncientSouls/Peer/blob/f63ae3f/src/lib/peer.ts#L52)*





___


# Variables
<a id="mixedpeer"></a>

### «Const» MixedPeer

**●  MixedPeer**:  *`TClass`.<[IPeer](interfaces/ipeer.md)[IPeerEventsList](interfaces/ipeereventslist.md)>*  =  mixin(Node)

*Defined in [peer.ts:273](https://github.com/AncientSouls/Peer/blob/f63ae3f/src/lib/peer.ts#L273)*





___


# Functions
<a id="defaultapi"></a>

### «Const» defaultApi

► **defaultApi**(sendBundles: *[IPeerApiSendBundles](interfaces/ipeerapisendbundles.md)*): `object`



*Defined in [peer.ts:124](https://github.com/AncientSouls/Peer/blob/f63ae3f/src/lib/peer.ts#L124)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| sendBundles | [IPeerApiSendBundles](interfaces/ipeerapisendbundles.md)   |  - |





**Returns:** `object`





___

<a id="mixin"></a>

###  mixin

► **mixin**T(superClass: *`T`*): `any`



*Defined in [peer.ts:139](https://github.com/AncientSouls/Peer/blob/f63ae3f/src/lib/peer.ts#L139)*



**Type parameters:**

#### T :  `TClass`.<`IInstance`>
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| superClass | `T`   |  - |





**Returns:** `any`





___


