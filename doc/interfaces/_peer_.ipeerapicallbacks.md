[ancient-peer](../README.md) > ["peer"](../modules/_peer_.md) > [IPeerApiCallbacks](../interfaces/_peer_.ipeerapicallbacks.md)



# Interface: IPeerApiCallbacks


## Methods
<a id="channeldestroyed"></a>

###  channelDestroyed

► **channelDestroyed**(channelId: *`string`*): `void`



*Defined in [peer.ts:88](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L88)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |





**Returns:** `void`





___

<a id="cursordestroyed"></a>

###  cursorDestroyed

► **cursorDestroyed**(channelId: *`string`*, cursorId: *`string`*): `void`



*Defined in [peer.ts:87](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L87)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |
| cursorId | `string`   |  - |





**Returns:** `void`





___

<a id="gotquery"></a>

###  gotQuery

► **gotQuery**(channelId: *`string`*, query: *[IPeerQuery](_peer_.ipeerquery.md)*): `void`



*Defined in [peer.ts:86](https://github.com/AncientSouls/Peer/blob/e61cf1a/src/lib/peer.ts#L86)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channelId | `string`   |  - |
| query | [IPeerQuery](_peer_.ipeerquery.md)   |  - |





**Returns:** `void`





___


