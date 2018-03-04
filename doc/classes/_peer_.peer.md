[ancient-peer](../README.md) > ["peer"](../modules/_peer_.md) > [Peer](../classes/_peer_.peer.md)



# Class: Peer

## Type parameters
#### IEventsList :  [IPeerEventsList](../interfaces/_peer_.ipeereventslist.md)
## Hierarchy


↳  [IPeer](../interfaces/_peer_.ipeer.md)

**↳ Peer**







## Indexable

\[key: `string`\]:&nbsp;`any`
## Index

### Constructors

* [constructor](_peer_.peer.md#constructor)


### Properties

* [channelsManager](_peer_.peer.md#channelsmanager)
* [cursorsManager](_peer_.peer.md#cursorsmanager)
* [destroy](_peer_.peer.md#destroy)
* [emitter](_peer_.peer.md#emitter)
* [generateId](_peer_.peer.md#generateid)
* [id](_peer_.peer.md#id)
* [isDestroyed](_peer_.peer.md#isdestroyed)
* [relations](_peer_.peer.md#relations)


### Methods

* [channelDestroyed](_peer_.peer.md#channeldestroyed)
* [connect](_peer_.peer.md#connect)
* [cursorDestroyed](_peer_.peer.md#cursordestroyed)
* [emit](_peer_.peer.md#emit)
* [exec](_peer_.peer.md#exec)
* [getApiCallbacks](_peer_.peer.md#getapicallbacks)
* [gotPkg](_peer_.peer.md#gotpkg)
* [handleBundles](_peer_.peer.md#handlebundles)
* [handleDestroyed](_peer_.peer.md#handledestroyed)
* [handleQueries](_peer_.peer.md#handlequeries)
* [handleQuery](_peer_.peer.md#handlequery)
* [off](_peer_.peer.md#off)
* [on](_peer_.peer.md#on)
* [once](_peer_.peer.md#once)
* [sendBundles](_peer_.peer.md#sendbundles)
* [sendDestroyed](_peer_.peer.md#senddestroyed)
* [sendQuery](_peer_.peer.md#sendquery)
* [wrap](_peer_.peer.md#wrap)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new Peer**(id?: *`string`*): `any`


*Inherited from INode.__new*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-peer/node_modules/ancient-mixins/lib/node.d.ts:11*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| id | `string`   |  - |





**Returns:** `any`

---


## Properties
<a id="channelsmanager"></a>

### «Static» channelsManager

**●  channelsManager**:  *`TChannelsManager`* 

*Inherited from [IPeer](../interfaces/_peer_.ipeer.md).[channelsManager](../interfaces/_peer_.ipeer.md#channelsmanager)*

*Defined in [peer.ts:102](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L102)*





___

<a id="cursorsmanager"></a>

### «Static» cursorsManager

**●  cursorsManager**:  *`TCursorsManager`* 

*Inherited from [IPeer](../interfaces/_peer_.ipeer.md).[cursorsManager](../interfaces/_peer_.ipeer.md#cursorsmanager)*

*Defined in [peer.ts:103](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L103)*





___

<a id="destroy"></a>

### «Static» destroy

**●  destroy**:  *`function`* 

*Inherited from INode.destroy*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-peer/node_modules/ancient-mixins/lib/node.d.ts:15*


#### Type declaration
►(): `void`





**Returns:** `void`






___

<a id="emitter"></a>

### «Static» emitter

**●  emitter**:  *`EventEmitter`* 

*Inherited from IEvents.emitter*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-peer/node_modules/ancient-mixins/lib/events.d.ts:5*





___

<a id="generateid"></a>

### «Static» generateId

**●  generateId**:  *`function`* 

*Inherited from INode.generateId*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-peer/node_modules/ancient-mixins/lib/node.d.ts:13*


#### Type declaration
►(): `string`





**Returns:** `string`






___

<a id="id"></a>

### «Static» id

**●  id**:  *`string`* 

*Inherited from INode.id*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-peer/node_modules/ancient-mixins/lib/node.d.ts:11*





___

<a id="isdestroyed"></a>

### «Static» isDestroyed

**●  isDestroyed**:  *`boolean`* 

*Inherited from INode.isDestroyed*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-peer/node_modules/ancient-mixins/lib/node.d.ts:14*





___

<a id="relations"></a>

### «Static» relations

**●  relations**:  *[IPeerRelationsChannels](../interfaces/_peer_.ipeerrelationschannels.md)* 

*Inherited from [IPeer](../interfaces/_peer_.ipeer.md).[relations](../interfaces/_peer_.ipeer.md#relations)*

*Defined in [peer.ts:105](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L105)*





___


## Methods
<a id="channeldestroyed"></a>

### «Static» channelDestroyed

► **channelDestroyed**(channelId: *`string`*): `void`



*Inherited from [IPeer](../interfaces/_peer_.ipeer.md).[channelDestroyed](../interfaces/_peer_.ipeer.md#channeldestroyed)*

*Defined in [peer.ts:117](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L117)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |





**Returns:** `void`





___

<a id="connect"></a>

### «Static» connect

► **connect**(peer: *[TPeer](../modules/_peer_.md#tpeer)*): `string`



*Inherited from [IPeer](../interfaces/_peer_.ipeer.md).[connect](../interfaces/_peer_.ipeer.md#connect)*

*Defined in [peer.ts:109](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L109)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| peer | [TPeer](../modules/_peer_.md#tpeer)   |  - |





**Returns:** `string`





___

<a id="cursordestroyed"></a>

### «Static» cursorDestroyed

► **cursorDestroyed**(channelId: *`string`*, cursorId: *`string`*): `void`



*Inherited from [IPeer](../interfaces/_peer_.ipeer.md).[cursorDestroyed](../interfaces/_peer_.ipeer.md#cursordestroyed)*

*Defined in [peer.ts:116](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L116)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |
| cursorId | `string`   |  - |





**Returns:** `void`





___

<a id="emit"></a>

### «Static» emit

► **emit**IE(eventName: *`string`*, data: *`IEventsList[IE]`*): `this`



*Inherited from IEvents.emit*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-peer/node_modules/ancient-mixins/lib/events.d.ts:6*



**Type parameters:**

#### IE :  `keyof IEventsList`
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| eventName | `string`   |  - |
| data | `IEventsList[IE]`   |  - |





**Returns:** `this`





___

<a id="exec"></a>

### «Static» exec

► **exec**(channelId: *`string`*, apiQuery: *`any`*, query: *`any`*): [TPeerCursor](../modules/_peer_.md#tpeercursor)



*Inherited from [IPeer](../interfaces/_peer_.ipeer.md).[exec](../interfaces/_peer_.ipeer.md#exec)*

*Defined in [peer.ts:110](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L110)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |
| apiQuery | `any`   |  - |
| query | `any`   |  - |





**Returns:** [TPeerCursor](../modules/_peer_.md#tpeercursor)





___

<a id="getapicallbacks"></a>

### «Static» getApiCallbacks

► **getApiCallbacks**(apiQuery: *`any`*, callback: *`function`*): `void`



*Inherited from [IPeer](../interfaces/_peer_.ipeer.md).[getApiCallbacks](../interfaces/_peer_.ipeer.md#getapicallbacks)*

*Defined in [peer.ts:107](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L107)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| apiQuery | `any`   |  - |
| callback | `function`   |  - |





**Returns:** `void`





___

<a id="gotpkg"></a>

### «Static» gotPkg

► **gotPkg**(channelId: *`string`*, pkg: *[IPeerPkg](../interfaces/_peer_.ipeerpkg.md)*): `void`



*Inherited from [IPeer](../interfaces/_peer_.ipeer.md).[gotPkg](../interfaces/_peer_.ipeer.md#gotpkg)*

*Defined in [peer.ts:115](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L115)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |
| pkg | [IPeerPkg](../interfaces/_peer_.ipeerpkg.md)   |  - |





**Returns:** `void`





___

<a id="handlebundles"></a>

### «Static» handleBundles

► **handleBundles**(channelId: *`string`*, pkg: *[IPeerPkg](../interfaces/_peer_.ipeerpkg.md)*): `void`



*Inherited from [IPeer](../interfaces/_peer_.ipeer.md).[handleBundles](../interfaces/_peer_.ipeer.md#handlebundles)*

*Defined in [peer.ts:120](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L120)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |
| pkg | [IPeerPkg](../interfaces/_peer_.ipeerpkg.md)   |  - |





**Returns:** `void`





___

<a id="handledestroyed"></a>

### «Static» handleDestroyed

► **handleDestroyed**(channelId: *`string`*, pkg: *[IPeerPkg](../interfaces/_peer_.ipeerpkg.md)*): `void`



*Inherited from [IPeer](../interfaces/_peer_.ipeer.md).[handleDestroyed](../interfaces/_peer_.ipeer.md#handledestroyed)*

*Defined in [peer.ts:121](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L121)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |
| pkg | [IPeerPkg](../interfaces/_peer_.ipeerpkg.md)   |  - |





**Returns:** `void`





___

<a id="handlequeries"></a>

### «Static» handleQueries

► **handleQueries**(channelId: *`string`*, pkg: *[IPeerPkg](../interfaces/_peer_.ipeerpkg.md)*): `void`



*Inherited from [IPeer](../interfaces/_peer_.ipeer.md).[handleQueries](../interfaces/_peer_.ipeer.md#handlequeries)*

*Defined in [peer.ts:118](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L118)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |
| pkg | [IPeerPkg](../interfaces/_peer_.ipeerpkg.md)   |  - |





**Returns:** `void`





___

<a id="handlequery"></a>

### «Static» handleQuery

► **handleQuery**(channelId: *`string`*, query: *`any`*): `void`



*Inherited from [IPeer](../interfaces/_peer_.ipeer.md).[handleQuery](../interfaces/_peer_.ipeer.md#handlequery)*

*Defined in [peer.ts:119](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L119)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |
| query | `any`   |  - |





**Returns:** `void`





___

<a id="off"></a>

### «Static» off

► **off**IE(eventName: *`string`*, listener: *`function`*): `this`



*Inherited from IEvents.off*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-peer/node_modules/ancient-mixins/lib/events.d.ts:9*



**Type parameters:**

#### IE :  `keyof IEventsList`
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| eventName | `string`   |  - |
| listener | `function`   |  - |





**Returns:** `this`





___

<a id="on"></a>

### «Static» on

► **on**IE(eventName: *`string`*, listener: *`function`*): `this`



*Inherited from IEvents.on*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-peer/node_modules/ancient-mixins/lib/events.d.ts:7*



**Type parameters:**

#### IE :  `keyof IEventsList`
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| eventName | `string`   |  - |
| listener | `function`   |  - |





**Returns:** `this`





___

<a id="once"></a>

### «Static» once

► **once**IE(eventName: *`string`*, listener: *`function`*): `this`



*Inherited from IEvents.once*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-peer/node_modules/ancient-mixins/lib/events.d.ts:8*



**Type parameters:**

#### IE :  `keyof IEventsList`
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| eventName | `string`   |  - |
| listener | `function`   |  - |





**Returns:** `this`





___

<a id="sendbundles"></a>

### «Static» sendBundles

► **sendBundles**(channelId: *`string`*, ...bundles: *`ICursorBundle`[]*): `void`



*Inherited from [IPeer](../interfaces/_peer_.ipeer.md).[sendBundles](../interfaces/_peer_.ipeer.md#sendbundles)*

*Defined in [peer.ts:113](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L113)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |
| bundles | `ICursorBundle`[]   |  - |





**Returns:** `void`





___

<a id="senddestroyed"></a>

### «Static» sendDestroyed

► **sendDestroyed**(cursor: *[TPeerCursor](../modules/_peer_.md#tpeercursor)*): `void`



*Inherited from [IPeer](../interfaces/_peer_.ipeer.md).[sendDestroyed](../interfaces/_peer_.ipeer.md#senddestroyed)*

*Defined in [peer.ts:114](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L114)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cursor | [TPeerCursor](../modules/_peer_.md#tpeercursor)   |  - |





**Returns:** `void`





___

<a id="sendquery"></a>

### «Static» sendQuery

► **sendQuery**(cursor: *[TPeerCursor](../modules/_peer_.md#tpeercursor)*): `void`



*Inherited from [IPeer](../interfaces/_peer_.ipeer.md).[sendQuery](../interfaces/_peer_.ipeer.md#sendquery)*

*Defined in [peer.ts:112](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L112)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cursor | [TPeerCursor](../modules/_peer_.md#tpeercursor)   |  - |





**Returns:** `void`





___

<a id="wrap"></a>

### «Static» wrap

► **wrap**(): `void`



*Inherited from [IPeer](../interfaces/_peer_.ipeer.md).[wrap](../interfaces/_peer_.ipeer.md#wrap)*

*Defined in [peer.ts:111](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L111)*





**Returns:** `void`





___


