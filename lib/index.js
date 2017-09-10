'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();/**
 * @module ancient-peer
 */var _pson=require('pson');var _pson2=_interopRequireDefault(_pson);var _ancientCursor=require('ancient-cursor');var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}// apiManager.adapterSend
// peer.sendBundles
// clientsManager.sendData
// clientsManager.receivedData
// peer.executeBundle
// bundleQueuesManager.executeBundle
// cursor.set|cursor.splice
// clientsManager.adapterDisconnected
// peer.clientDicsconnected
// apiManager.clientDicsonnected
// ...apiManager.cursorDestroyed
/**
 * @class
 * @memberof module:ancient-peer
 */var Peer=function(){/**
   * @constructs Peer
   * @param {ApiManager} apiManager
   * @param {cursorsManager} cursorsManager
   * @param {BundleQueuesManager} bundleQueuesManager
   * @param {clientsManager} clientsManager
   */function Peer(apiManager,cursorsManager,bundleQueuesManager,clientsManager){var _this=this;_classCallCheck(this,Peer);this.apiManager=apiManager;this.cursorsManager=cursorsManager;this.bundleQueuesManager=bundleQueuesManager;this.clientsManager=clientsManager;apiManager.adapterSend=function(clientId,bundles){return _this._sendBundles(clientId,bundles)};clientsManager.adapterDisconnected=function(clientId){return _this._clientDisconnected(clientId)};clientsManager.receivedData=function(clientId,data){return _this._receivedData(clientId,data)}}/**
   * Send `query` to api by `apiQuery` on client by `clientId`. Wait first results and call callback with `cursor` as argument. If cursor not needed, you can send `options` with `{ needCursor: false }`. Returns cursor without data, waiting bundles from remote client.
   * @param clientId
   * @param apiQuery
   * @param query
   * @param {Peer~firstDataCallback} [callback]
   * @param {Object} [options]
   * @param {Boolean} [options.needCursor=true]
   * @returns {Cursor}
   */_createClass(Peer,[{key:'ask',value:function ask(clientId,apiQuery,query,callback,options){var cursor;var _options=_lodash2.default.defaults(options,{needCursor:true});var _query={clientId:clientId,apiQuery:apiQuery,query:query};if(_options.needCursor){cursor=this.cursorsManager.new({clientId:clientId,apiQuery:apiQuery,query:query});_query.cursorId=cursor.id}if(typeof callback=='function'&&cursor){cursor.on(null,function(old,current,stop,changes,isClone){stop();callback(cursor)})}this.clientsManager.sendData(clientId,_pson2.default.encode({queries:[_query]}));return cursor}/**
   * Send `query` to api by `apiQuery` on client by `clientId`. Wait first results and call callback with `cursor` as argument. If cursor not needed, you can send `options` with `{ needCursor: false }`. Returns cursor without data, waiting bundles from remote client.
   * @param apiQuery
   * @param query
   * @param {Peer~firstDataCallback} [callback]
   * @param {Object} [options]
   * @param {Boolean} [options.needCursor=true]
   * @returns {Cursor}
   */},{key:'exec',value:function exec(apiQuery,query,callback,options){}/**
     * @todo How to send query from local app clientId, without manually created pseudo-transport?
     *//**
   * Not for manual usage. You can override it for extend with custom logic. Used in receivedData, for send bundles to cursors.
   * @param {ApiManager} apiManager
   * @param {cursorsManager} cursorsManager
   * @param {BundleQueuesManager} bundleQueuesManager
   * @param {clientsManager} clientsManager
   */},{key:'_executeBundle',value:function _executeBundle(bundle){this.bundleQueuesManager.executeBundle(bundle)}/**
   * Not for manual usage. You can override it for extend with custom logic. Used in adapter `apiManager.adapterSend`, for provide and encode bundles from api to client.
   * @param clientId
   * @param {Bundle[]} bundles
   */},{key:'_sendBundles',value:function _sendBundles(clientId,bundles){this.clientsManager.sendData(clientId,_pson2.default.encode({bundles:bundles}))}/**
   * Not for manual usage. You can override it for extend with custom logic. Used in adapter `clientsManager.adapterDisconnected`, for inform each api about client disconnected and it cursors destroyed.
   * @param clientId
   */},{key:'_clientDisconnected',value:function _clientDisconnected(clientId){apiManager.clientDisconnected(clientId)}/**
   * Not for manual usage. You can override it for extend with custom logic. Used in adapter `clientsManager.receivedData`, and provide encripted object data structure with `data.queries` and `data.bundles`, from other peer on remote client to `this.apiManager` and `this.cursorsManager` in this peer.
   * @param clientId
   * @param 
   */},{key:'_receivedData',value:function _receivedData(clientId,_data){var data=_pson2.default.decode(data);// Apply data.bundles.
if(data.bundles){var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=data.bundles[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var bundle=_step.value;this._executeBundle(bundle)}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}}// Provide queries to apis.
if(data.queries){var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=data.queries[Symbol.iterator](),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var query=_step2.value;this.apiManager.receiveQuery(clientId,query.apiQuery,query.query,query.cursorId)}}catch(err){_didIteratorError2=true;_iteratorError2=err}finally{try{if(!_iteratorNormalCompletion2&&_iterator2.return){_iterator2.return()}}finally{if(_didIteratorError2){throw _iteratorError2}}}}}}]);return Peer}();/**
 * Called after cursor gets first bundle.
 * @callback Peer~firstDataCallbackCallback
 * @memberof module:ancient-peer
 * @param {Cursor} cursor
 */
//# sourceMappingURL=index.js.map