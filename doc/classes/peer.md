[ancient-peer](../README.md) > [Peer](../classes/peer.md)



# Class: Peer

## Type parameters
#### IEventsList :  [IPeerEventsList](../interfaces/ipeereventslist.md)
## Hierarchy


↳  [IPeer](../interfaces/ipeer.md)

**↳ Peer**







## Indexable

\[key: `string`\]:&nbsp;`any`
## Index

### Constructors

* [constructor](peer.md#constructor)


### Properties

* [channelsManager](peer.md#channelsmanager)
* [cursorsManager](peer.md#cursorsmanager)
* [destroy](peer.md#destroy)
* [emitter](peer.md#emitter)
* [generateId](peer.md#generateid)
* [id](peer.md#id)
* [isDestroyed](peer.md#isdestroyed)
* [relations](peer.md#relations)


### Methods

* [channelDestroyed](peer.md#channeldestroyed)
* [connect](peer.md#connect)
* [cursorDestroyed](peer.md#cursordestroyed)
* [emit](peer.md#emit)
* [exec](peer.md#exec)
* [getApiCallbacks](peer.md#getapicallbacks)
* [gotPkg](peer.md#gotpkg)
* [handleBundles](peer.md#handlebundles)
* [handleDestroyed](peer.md#handledestroyed)
* [handleQueries](peer.md#handlequeries)
* [handleQuery](peer.md#handlequery)
* [off](peer.md#off)
* [on](peer.md#on)
* [once](peer.md#once)
* [sendBundles](peer.md#sendbundles)
* [sendDestroyed](peer.md#senddestroyed)
* [sendQuery](peer.md#sendquery)
* [wrap](peer.md#wrap)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new Peer**(id?: *`string`*): `any`


*Inherited from INode.__new*

*Defined in /home/ivansglazunov/dev/packages/ancient-peer/node_modules/ancient-cursor/node_modules/ancient-mixins/lib/node.d.ts:11*



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

*Inherited from [IPeer](../interfaces/ipeer.md).[channelsManager](../interfaces/ipeer.md#channelsmanager)*

*Defined in [peer.ts:102](https://github.com/AncientSouls/Peer/blob/702c3e9/src/lib/peer.ts#L102)*





___

<a id="cursorsmanager"></a>

### «Static» cursorsManager

**●  cursorsManager**:  *`TCursorsManager`* 

*Inherited from [IPeer](../interfaces/ipeer.md).[cursorsManager](../interfaces/ipeer.md#cursorsmanager)*

*Defined in [peer.ts:103](https://github.com/AncientSouls/Peer/blob/702c3e9/src/lib/peer.ts#L103)*





___

<a id="destroy"></a>

### «Static» destroy

**●  destroy**:  *`function`* 

*Inherited from INode.destroy*

*Defined in /home/ivansglazunov/dev/packages/ancient-peer/node_modules/ancient-cursor/node_modules/ancient-mixins/lib/node.d.ts:15*


#### Type declaration
►(): `void`





**Returns:** `void`






___

<a id="emitter"></a>

### «Static» emitter

**●  emitter**:  *`EventEmitter`* 

*Inherited from IEvents.emitter*

*Defined in /home/ivansglazunov/dev/packages/ancient-peer/node_modules/ancient-cursor/node_modules/ancient-mixins/lib/events.d.ts:5*





___

<a id="generateid"></a>

### «Static» generateId

**●  generateId**:  *`function`* 

*Inherited from INode.generateId*

*Defined in /home/ivansglazunov/dev/packages/ancient-peer/node_modules/ancient-cursor/node_modules/ancient-mixins/lib/node.d.ts:13*


#### Type declaration
►(): `string`





**Returns:** `string`






___

<a id="id"></a>

### «Static» id

**●  id**:  *`string`* 

*Inherited from INode.id*

*Defined in /home/ivansglazunov/dev/packages/ancient-peer/node_modules/ancient-cursor/node_modules/ancient-mixins/lib/node.d.ts:11*





___

<a id="isdestroyed"></a>

### «Static» isDestroyed

**●  isDestroyed**:  *`boolean`* 

*Inherited from INode.isDestroyed*

*Defined in /home/ivansglazunov/dev/packages/ancient-peer/node_modules/ancient-cursor/node_modules/ancient-mixins/lib/node.d.ts:14*





___

<a id="relations"></a>

### «Static» relations

**●  relations**:  *[IPeerRelationsChannels](../interfaces/ipeerrelationschannels.md)* 

*Inherited from [IPeer](../interfaces/ipeer.md).[relations](../interfaces/ipeer.md#relations)*

*Defined in [peer.ts:105](https://github.com/AncientSouls/Peer/blob/702c3e9/src/lib/peer.ts#L105)*





___


## Methods
<a id="channeldestroyed"></a>

### «Static» channelDestroyed

► **channelDestroyed**(channelId: *`string`*): `void`



*Inherited from [IPeer](../interfaces/ipeer.md).[channelDestroyed](../interfaces/ipeer.md#channeldestroyed)*

*Defined in [peer.ts:117](https://github.com/AncientSouls/Peer/blob/702c3e9/src/lib/peer.ts#L117)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |





**Returns:** `void`





___

<a id="connect"></a>

### «Static» connect

► **connect**(peer: *[TPeer](../#tpeer)*): `string`



*Inherited from [IPeer](../interfaces/ipeer.md).[connect](../interfaces/ipeer.md#connect)*

*Defined in [peer.ts:109](https://github.com/AncientSouls/Peer/blob/702c3e9/src/lib/peer.ts#L109)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| peer | [TPeer](../#tpeer)   |  - |





**Returns:** `string`





___

<a id="cursordestroyed"></a>

### «Static» cursorDestroyed

► **cursorDestroyed**(channelId: *`string`*, cursorId: *`string`*): `void`



*Inherited from [IPeer](../interfaces/ipeer.md).[cursorDestroyed](../interfaces/ipeer.md#cursordestroyed)*

*Defined in [peer.ts:116](https://github.com/AncientSouls/Peer/blob/702c3e9/src/lib/peer.ts#L116)*



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

*Defined in /home/ivansglazunov/dev/packages/ancient-peer/node_modules/ancient-cursor/node_modules/ancient-mixins/lib/events.d.ts:6*



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

► **exec**(channelId: *`string`*, apiQuery: *`any`*, query: *`any`*): [TPeerCursor](../#tpeercursor)



*Inherited from [IPeer](../interfaces/ipeer.md).[exec](../interfaces/ipeer.md#exec)*

*Defined in [peer.ts:110](https://github.com/AncientSouls/Peer/blob/702c3e9/src/lib/peer.ts#L110)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |
| apiQuery | `any`   |  - |
| query | `any`   |  - |





**Returns:** [TPeerCursor](../#tpeercursor)





___

<a id="getapicallbacks"></a>

### «Static» getApiCallbacks

► **getApiCallbacks**(apiQuery: *`any`*, callback: *`function`*): `void`



*Inherited from [IPeer](../interfaces/ipeer.md).[getApiCallbacks](../interfaces/ipeer.md#getapicallbacks)*

*Defined in [peer.ts:107](https://github.com/AncientSouls/Peer/blob/702c3e9/src/lib/peer.ts#L107)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| apiQuery | `any`   |  - |
| callback | `function`   |  - |





**Returns:** `void`





___

<a id="gotpkg"></a>

### «Static» gotPkg

► **gotPkg**(channelId: *`string`*, pkg: *[IPeerPkg](../interfaces/ipeerpkg.md)*): `void`



*Inherited from [IPeer](../interfaces/ipeer.md).[gotPkg](../interfaces/ipeer.md#gotpkg)*

*Defined in [peer.ts:115](https://github.com/AncientSouls/Peer/blob/702c3e9/src/lib/peer.ts#L115)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |
| pkg | [IPeerPkg](../interfaces/ipeerpkg.md)   |  - |





**Returns:** `void`





___

<a id="handlebundles"></a>

### «Static» handleBundles

► **handleBundles**(channelId: *`string`*, pkg: *[IPeerPkg](../interfaces/ipeerpkg.md)*): `void`



*Inherited from [IPeer](../interfaces/ipeer.md).[handleBundles](../interfaces/ipeer.md#handlebundles)*

*Defined in [peer.ts:120](https://github.com/AncientSouls/Peer/blob/702c3e9/src/lib/peer.ts#L120)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |
| pkg | [IPeerPkg](../interfaces/ipeerpkg.md)   |  - |





**Returns:** `void`





___

<a id="handledestroyed"></a>

### «Static» handleDestroyed

► **handleDestroyed**(channelId: *`string`*, pkg: *[IPeerPkg](../interfaces/ipeerpkg.md)*): `void`



*Inherited from [IPeer](../interfaces/ipeer.md).[handleDestroyed](../interfaces/ipeer.md#handledestroyed)*

*Defined in [peer.ts:121](https://github.com/AncientSouls/Peer/blob/702c3e9/src/lib/peer.ts#L121)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |
| pkg | [IPeerPkg](../interfaces/ipeerpkg.md)   |  - |





**Returns:** `void`





___

<a id="handlequeries"></a>

### «Static» handleQueries

► **handleQueries**(channelId: *`string`*, pkg: *[IPeerPkg](../interfaces/ipeerpkg.md)*): `void`



*Inherited from [IPeer](../interfaces/ipeer.md).[handleQueries](../interfaces/ipeer.md#handlequeries)*

*Defined in [peer.ts:118](https://github.com/AncientSouls/Peer/blob/702c3e9/src/lib/peer.ts#L118)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |
| pkg | [IPeerPkg](../interfaces/ipeerpkg.md)   |  - |





**Returns:** `void`





___

<a id="handlequery"></a>

### «Static» handleQuery

► **handleQuery**(channelId: *`string`*, query: *`any`*): `void`



*Inherited from [IPeer](../interfaces/ipeer.md).[handleQuery](../interfaces/ipeer.md#handlequery)*

*Defined in [peer.ts:119](https://github.com/AncientSouls/Peer/blob/702c3e9/src/lib/peer.ts#L119)*



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

*Defined in /home/ivansglazunov/dev/packages/ancient-peer/node_modules/ancient-cursor/node_modules/ancient-mixins/lib/events.d.ts:9*



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

*Defined in /home/ivansglazunov/dev/packages/ancient-peer/node_modules/ancient-cursor/node_modules/ancient-mixins/lib/events.d.ts:7*



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

*Defined in /home/ivansglazunov/dev/packages/ancient-peer/node_modules/ancient-cursor/node_modules/ancient-mixins/lib/events.d.ts:8*



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



*Inherited from [IPeer](../interfaces/ipeer.md).[sendBundles](../interfaces/ipeer.md#sendbundles)*

*Defined in [peer.ts:113](https://github.com/AncientSouls/Peer/blob/702c3e9/src/lib/peer.ts#L113)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |
| bundles | `ICursorBundle`[]   |  - |





**Returns:** `void`





___

<a id="senddestroyed"></a>

### «Static» sendDestroyed

► **sendDestroyed**(cursor: *[TPeerCursor](../#tpeercursor)*): `void`



*Inherited from [IPeer](../interfaces/ipeer.md).[sendDestroyed](../interfaces/ipeer.md#senddestroyed)*

*Defined in [peer.ts:114](https://github.com/AncientSouls/Peer/blob/702c3e9/src/lib/peer.ts#L114)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cursor | [TPeerCursor](../#tpeercursor)   |  - |





**Returns:** `void`





___

<a id="sendquery"></a>

### «Static» sendQuery

► **sendQuery**(cursor: *[TPeerCursor](../#tpeercursor)*): `void`



*Inherited from [IPeer](../interfaces/ipeer.md).[sendQuery](../interfaces/ipeer.md#sendquery)*

*Defined in [peer.ts:112](https://github.com/AncientSouls/Peer/blob/702c3e9/src/lib/peer.ts#L112)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cursor | [TPeerCursor](../#tpeercursor)   |  - |





**Returns:** `void`





___

<a id="wrap"></a>

### «Static» wrap

► **wrap**(): `void`



*Inherited from [IPeer](../interfaces/ipeer.md).[wrap](../interfaces/ipeer.md#wrap)*

*Defined in [peer.ts:111](https://github.com/AncientSouls/Peer/blob/702c3e9/src/lib/peer.ts#L111)*





**Returns:** `void`





___


