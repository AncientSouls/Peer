[ancient-peer](../README.md) > [IPeerCursor](../interfaces/ipeercursor.md)



# Interface: IPeerCursor

## Type parameters
#### IEventsList :  `ICursorEventsList`
## Hierarchy


 `INode`.<`IEventsList`>

**↳ IPeerCursor**







## Indexable

\[key: `string`\]:&nbsp;`any`

## Constructors
<a id="constructor"></a>


### ⊕ **new IPeerCursor**(id?: *`string`*): `any`


*Inherited from INode.__new*

*Defined in /home/ivansglazunov/dev/packages/ancient-peer/node_modules/ancient-cursor/node_modules/ancient-mixins/lib/node.d.ts:11*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| id | `string`   |  - |





**Returns:** `any`

---


## Properties
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

<a id="query"></a>

###  query

**●  query**:  *[TPeerApiQuery](../#tpeerapiquery)* 

*Defined in [peer.ts:48](https://github.com/AncientSouls/Peer/blob/8680e7b/src/lib/peer.ts#L48)*





___


## Methods
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

► **exec**(query: *[IPeerCursorQuery](ipeercursorquery.md)*, data?: *`any`*): `void`



*Defined in [peer.ts:49](https://github.com/AncientSouls/Peer/blob/8680e7b/src/lib/peer.ts#L49)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| query | [IPeerCursorQuery](ipeercursorquery.md)   |  - |
| data | `any`   |  - |





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


