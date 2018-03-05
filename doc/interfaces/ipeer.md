[ancient-peer](../README.md) > [IPeer](../interfaces/ipeer.md)



# Interface: IPeer

## Type parameters
#### IEventsList :  [IPeerEventsList](ipeereventslist.md)
## Hierarchy


 `INode`.<`IEventsList`>

**↳ IPeer**

↳  [Peer](../classes/peer.md)










## Indexable

\[key: `string`\]:&nbsp;`any`

## Constructors
<a id="constructor"></a>


### ⊕ **new IPeer**(id?: *`string`*): `any`


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

###  channelsManager

**●  channelsManager**:  *`TChannelsManager`* 

*Defined in [peer.ts:102](https://github.com/AncientSouls/Peer/blob/f63ae3f/src/lib/peer.ts#L102)*





___

<a id="cursorsmanager"></a>

###  cursorsManager

**●  cursorsManager**:  *`TCursorsManager`* 

*Defined in [peer.ts:103](https://github.com/AncientSouls/Peer/blob/f63ae3f/src/lib/peer.ts#L103)*





___

<a id="destroy"></a>

###  destroy

**●  destroy**:  *`function`* 

*Inherited from INode.destroy*

*Defined in /home/ivansglazunov/dev/packages/ancient-peer/node_modules/ancient-cursor/node_modules/ancient-mixins/lib/node.d.ts:15*


#### Type declaration
►(): `void`





**Returns:** `void`






___

<a id="emitter"></a>

###  emitter

**●  emitter**:  *`EventEmitter`* 

*Inherited from IEvents.emitter*

*Defined in /home/ivansglazunov/dev/packages/ancient-peer/node_modules/ancient-cursor/node_modules/ancient-mixins/lib/events.d.ts:5*





___

<a id="generateid"></a>

###  generateId

**●  generateId**:  *`function`* 

*Inherited from INode.generateId*

*Defined in /home/ivansglazunov/dev/packages/ancient-peer/node_modules/ancient-cursor/node_modules/ancient-mixins/lib/node.d.ts:13*


#### Type declaration
►(): `string`





**Returns:** `string`






___

<a id="id"></a>

###  id

**●  id**:  *`string`* 

*Inherited from INode.id*

*Defined in /home/ivansglazunov/dev/packages/ancient-peer/node_modules/ancient-cursor/node_modules/ancient-mixins/lib/node.d.ts:11*





___

<a id="isdestroyed"></a>

###  isDestroyed

**●  isDestroyed**:  *`boolean`* 

*Inherited from INode.isDestroyed*

*Defined in /home/ivansglazunov/dev/packages/ancient-peer/node_modules/ancient-cursor/node_modules/ancient-mixins/lib/node.d.ts:14*





___

<a id="relations"></a>

###  relations

**●  relations**:  *[IPeerRelationsChannels](ipeerrelationschannels.md)* 

*Defined in [peer.ts:105](https://github.com/AncientSouls/Peer/blob/f63ae3f/src/lib/peer.ts#L105)*





___


## Methods
<a id="channeldestroyed"></a>

###  channelDestroyed

► **channelDestroyed**(channelId: *`string`*): `void`



*Defined in [peer.ts:117](https://github.com/AncientSouls/Peer/blob/f63ae3f/src/lib/peer.ts#L117)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |





**Returns:** `void`





___

<a id="connect"></a>

###  connect

► **connect**(peer: *[TPeer](../#tpeer)*): `string`



*Defined in [peer.ts:109](https://github.com/AncientSouls/Peer/blob/f63ae3f/src/lib/peer.ts#L109)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| peer | [TPeer](../#tpeer)   |  - |





**Returns:** `string`





___

<a id="cursordestroyed"></a>

###  cursorDestroyed

► **cursorDestroyed**(channelId: *`string`*, cursorId: *`string`*): `void`



*Defined in [peer.ts:116](https://github.com/AncientSouls/Peer/blob/f63ae3f/src/lib/peer.ts#L116)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |
| cursorId | `string`   |  - |





**Returns:** `void`





___

<a id="emit"></a>

###  emit

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

###  exec

► **exec**(channelId: *`string`*, apiQuery: *`any`*, query: *`any`*): [TPeerCursor](../#tpeercursor)



*Defined in [peer.ts:110](https://github.com/AncientSouls/Peer/blob/f63ae3f/src/lib/peer.ts#L110)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |
| apiQuery | `any`   |  - |
| query | `any`   |  - |





**Returns:** [TPeerCursor](../#tpeercursor)





___

<a id="getapicallbacks"></a>

###  getApiCallbacks

► **getApiCallbacks**(apiQuery: *`any`*, callback: *`function`*): `void`



*Defined in [peer.ts:107](https://github.com/AncientSouls/Peer/blob/f63ae3f/src/lib/peer.ts#L107)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| apiQuery | `any`   |  - |
| callback | `function`   |  - |





**Returns:** `void`





___

<a id="gotpkg"></a>

###  gotPkg

► **gotPkg**(channelId: *`string`*, pkg: *[IPeerPkg](ipeerpkg.md)*): `void`



*Defined in [peer.ts:115](https://github.com/AncientSouls/Peer/blob/f63ae3f/src/lib/peer.ts#L115)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |
| pkg | [IPeerPkg](ipeerpkg.md)   |  - |





**Returns:** `void`





___

<a id="handlebundles"></a>

###  handleBundles

► **handleBundles**(channelId: *`string`*, pkg: *[IPeerPkg](ipeerpkg.md)*): `void`



*Defined in [peer.ts:120](https://github.com/AncientSouls/Peer/blob/f63ae3f/src/lib/peer.ts#L120)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |
| pkg | [IPeerPkg](ipeerpkg.md)   |  - |





**Returns:** `void`





___

<a id="handledestroyed"></a>

###  handleDestroyed

► **handleDestroyed**(channelId: *`string`*, pkg: *[IPeerPkg](ipeerpkg.md)*): `void`



*Defined in [peer.ts:121](https://github.com/AncientSouls/Peer/blob/f63ae3f/src/lib/peer.ts#L121)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |
| pkg | [IPeerPkg](ipeerpkg.md)   |  - |





**Returns:** `void`





___

<a id="handlequeries"></a>

###  handleQueries

► **handleQueries**(channelId: *`string`*, pkg: *[IPeerPkg](ipeerpkg.md)*): `void`



*Defined in [peer.ts:118](https://github.com/AncientSouls/Peer/blob/f63ae3f/src/lib/peer.ts#L118)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |
| pkg | [IPeerPkg](ipeerpkg.md)   |  - |





**Returns:** `void`





___

<a id="handlequery"></a>

###  handleQuery

► **handleQuery**(channelId: *`string`*, query: *`any`*): `void`



*Defined in [peer.ts:119](https://github.com/AncientSouls/Peer/blob/f63ae3f/src/lib/peer.ts#L119)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |
| query | `any`   |  - |





**Returns:** `void`





___

<a id="off"></a>

###  off

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

###  on

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

###  once

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

###  sendBundles

► **sendBundles**(channelId: *`string`*, ...bundles: *`ICursorBundle`[]*): `void`



*Defined in [peer.ts:113](https://github.com/AncientSouls/Peer/blob/f63ae3f/src/lib/peer.ts#L113)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |
| bundles | `ICursorBundle`[]   |  - |





**Returns:** `void`





___

<a id="senddestroyed"></a>

###  sendDestroyed

► **sendDestroyed**(cursor: *[TPeerCursor](../#tpeercursor)*): `void`



*Defined in [peer.ts:114](https://github.com/AncientSouls/Peer/blob/f63ae3f/src/lib/peer.ts#L114)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cursor | [TPeerCursor](../#tpeercursor)   |  - |





**Returns:** `void`





___

<a id="sendquery"></a>

###  sendQuery

► **sendQuery**(cursor: *[TPeerCursor](../#tpeercursor)*): `void`



*Defined in [peer.ts:112](https://github.com/AncientSouls/Peer/blob/f63ae3f/src/lib/peer.ts#L112)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cursor | [TPeerCursor](../#tpeercursor)   |  - |





**Returns:** `void`





___

<a id="wrap"></a>

###  wrap

► **wrap**(): `void`



*Defined in [peer.ts:111](https://github.com/AncientSouls/Peer/blob/f63ae3f/src/lib/peer.ts#L111)*





**Returns:** `void`





___


