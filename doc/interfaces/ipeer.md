[ancient-peer](../README.md) > [IPeer](../interfaces/ipeer.md)



# Interface: IPeer

## Type parameters
#### IEventsList :  [IPeerEventsList](ipeereventslist.md)
## Hierarchy


 `any`

**↳ IPeer**








## Properties
<a id="channelsmanager"></a>

###  channelsManager

**●  channelsManager**:  *`TChannelsManager`* 

*Defined in [lib/peer.ts:102](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L102)*





___

<a id="cursorsmanager"></a>

###  cursorsManager

**●  cursorsManager**:  *`TCursorsManager`* 

*Defined in [lib/peer.ts:103](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L103)*





___

<a id="relations"></a>

###  relations

**●  relations**:  *[IPeerRelationsChannels](ipeerrelationschannels.md)* 

*Defined in [lib/peer.ts:105](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L105)*





___


## Methods
<a id="channeldestroyed"></a>

###  channelDestroyed

► **channelDestroyed**(channelId: *`string`*): `void`



*Defined in [lib/peer.ts:117](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L117)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |





**Returns:** `void`





___

<a id="connect"></a>

###  connect

► **connect**(peer: *[TPeer](../#tpeer)*): `string`



*Defined in [lib/peer.ts:109](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L109)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| peer | [TPeer](../#tpeer)   |  - |





**Returns:** `string`





___

<a id="cursordestroyed"></a>

###  cursorDestroyed

► **cursorDestroyed**(channelId: *`string`*, cursorId: *`string`*): `void`



*Defined in [lib/peer.ts:116](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L116)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |
| cursorId | `string`   |  - |





**Returns:** `void`





___

<a id="exec"></a>

###  exec

► **exec**(channelId: *`string`*, apiQuery: *`any`*, query: *`any`*): [TPeerCursor](../#tpeercursor)



*Defined in [lib/peer.ts:110](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L110)*



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



*Defined in [lib/peer.ts:107](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L107)*



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



*Defined in [lib/peer.ts:115](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L115)*



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



*Defined in [lib/peer.ts:120](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L120)*



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



*Defined in [lib/peer.ts:121](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L121)*



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



*Defined in [lib/peer.ts:118](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L118)*



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



*Defined in [lib/peer.ts:119](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L119)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |
| query | `any`   |  - |





**Returns:** `void`





___

<a id="sendbundles"></a>

###  sendBundles

► **sendBundles**(channelId: *`string`*, ...bundles: *`ICursorBundle`[]*): `void`



*Defined in [lib/peer.ts:113](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L113)*



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



*Defined in [lib/peer.ts:114](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L114)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cursor | [TPeerCursor](../#tpeercursor)   |  - |





**Returns:** `void`





___

<a id="sendquery"></a>

###  sendQuery

► **sendQuery**(cursor: *[TPeerCursor](../#tpeercursor)*): `void`



*Defined in [lib/peer.ts:112](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L112)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cursor | [TPeerCursor](../#tpeercursor)   |  - |





**Returns:** `void`





___

<a id="wrap"></a>

###  wrap

► **wrap**(): `void`



*Defined in [lib/peer.ts:111](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L111)*





**Returns:** `void`





___


