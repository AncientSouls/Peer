[ancient-peer](../README.md) > [IPeerApiCallbacks](../interfaces/ipeerapicallbacks.md)



# Interface: IPeerApiCallbacks


## Methods
<a id="channeldestroyed"></a>

###  channelDestroyed

► **channelDestroyed**(channelId: *`string`*): `void`



*Defined in [lib/peer.ts:88](https://github.com/AncientSouls/Peer/blob/40ee1bf/src/lib/peer.ts#L88)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |





**Returns:** `void`





___

<a id="cursordestroyed"></a>

###  cursorDestroyed

► **cursorDestroyed**(channelId: *`string`*, cursorId: *`string`*): `void`



*Defined in [lib/peer.ts:87](https://github.com/AncientSouls/Peer/blob/40ee1bf/src/lib/peer.ts#L87)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |
| cursorId | `string`   |  - |





**Returns:** `void`





___

<a id="gotquery"></a>

###  gotQuery

► **gotQuery**(channelId: *`string`*, query: *[IPeerQuery](ipeerquery.md)*): `void`



*Defined in [lib/peer.ts:86](https://github.com/AncientSouls/Peer/blob/40ee1bf/src/lib/peer.ts#L86)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |
| query | [IPeerQuery](ipeerquery.md)   |  - |





**Returns:** `void`





___


