[ancient-peer](../README.md) > ["peer"](../modules/_peer_.md)



# External module: "peer"

## Index

### Classes

* [Peer](../classes/_peer_.peer.md)


### Interfaces

* [IPeer](../interfaces/_peer_.ipeer.md)
* [IPeerApi](../interfaces/_peer_.ipeerapi.md)
* [IPeerApiCallbacks](../interfaces/_peer_.ipeerapicallbacks.md)
* [IPeerApiSendBundles](../interfaces/_peer_.ipeerapisendbundles.md)
* [IPeerCursor](../interfaces/_peer_.ipeercursor.md)
* [IPeerCursorQuery](../interfaces/_peer_.ipeercursorquery.md)
* [IPeerEventData](../interfaces/_peer_.ipeereventdata.md)
* [IPeerEventsList](../interfaces/_peer_.ipeereventslist.md)
* [IPeerPkg](../interfaces/_peer_.ipeerpkg.md)
* [IPeerQuery](../interfaces/_peer_.ipeerquery.md)
* [IPeerRelationsChannels](../interfaces/_peer_.ipeerrelationschannels.md)
* [IPeerRelationsCursors](../interfaces/_peer_.ipeerrelationscursors.md)


### Type aliases

* [TPeer](_peer_.md#tpeer)
* [TPeerApiQuery](_peer_.md#tpeerapiquery)
* [TPeerCursor](_peer_.md#tpeercursor)


### Variables

* [MixedPeer](_peer_.md#mixedpeer)


### Functions

* [defaultApi](_peer_.md#defaultapi)
* [mixin](_peer_.md#mixin)



---
## Type aliases
<a id="tpeer"></a>

###  TPeer

**Τ TPeer**:  *[IPeer](../interfaces/_peer_.ipeer.md)[IPeerEventsList](../interfaces/_peer_.ipeereventslist.md)* 

*Defined in [peer.ts:39](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L39)*





___

<a id="tpeerapiquery"></a>

###  TPeerApiQuery

**Τ TPeerApiQuery**:  *`any`* 

*Defined in [peer.ts:91](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L91)*





___

<a id="tpeercursor"></a>

###  TPeerCursor

**Τ TPeerCursor**:  *[IPeerCursor](../interfaces/_peer_.ipeercursor.md)`ICursorEventsList`* 

*Defined in [peer.ts:52](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L52)*





___


## Variables
<a id="mixedpeer"></a>

### «Const» MixedPeer

**●  MixedPeer**:  *`TClass`.<[IPeer](../interfaces/_peer_.ipeer.md)[IPeerEventsList](../interfaces/_peer_.ipeereventslist.md)>*  =  mixin(Node)

*Defined in [peer.ts:273](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L273)*





___


## Functions
<a id="defaultapi"></a>

### «Const» defaultApi

► **defaultApi**(sendBundles: *[IPeerApiSendBundles](../interfaces/_peer_.ipeerapisendbundles.md)*): `object`



*Defined in [peer.ts:124](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L124)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| sendBundles | [IPeerApiSendBundles](../interfaces/_peer_.ipeerapisendbundles.md)   |  - |





**Returns:** `object`





___

<a id="mixin"></a>

###  mixin

► **mixin**T(superClass: *`T`*): `any`



*Defined in [peer.ts:139](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L139)*



**Type parameters:**

#### T :  `TClass`.<`IInstance`>
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| superClass | `T`   |  - |





**Returns:** `any`





___


