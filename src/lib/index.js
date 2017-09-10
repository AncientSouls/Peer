/**
 * @module ancient-peer
 */

import PSON from 'pson';
import {
  Cursor,
  BundleQueuesManager,
  CursorsManager,
} from 'ancient-cursor';
import lodash from 'lodash';

// apiManager.adapterSend
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
 */
class Peer {
  
  /**
   * @constructs Peer
   * @param {ApiManager} apiManager
   * @param {cursorsManager} cursorsManager
   * @param {BundleQueuesManager} bundleQueuesManager
   * @param {clientsManager} clientsManager
   */
  constructor(apiManager, cursorsManager, bundleQueuesManager, clientsManager) {
    this.apiManager = apiManager;
    this.cursorsManager = cursorsManager;
    this.bundleQueuesManager = bundleQueuesManager;
    this.clientsManager = clientsManager;
    
    apiManager.adapterSend = (clientId, bundles) => this._sendBundles(clientId, bundles);

    clientsManager.adapterDisconnected = (clientId) => this._clientDisconnected(clientId);
    clientsManager.receivedData = (clientId, data) => this._receivedData(clientId, data);
  }
  
  /**
   * Send `query` to api by `apiQuery` on client by `clientId`. Wait first results and call callback with `cursor` as argument. If cursor not needed, you can send `options` with `{ needCursor: false }`. Returns cursor without data, waiting bundles from remote client.
   * @param clientId
   * @param apiQuery
   * @param query
   * @param {Peer~firstDataCallback} [callback]
   * @param {Object} [options]
   * @param {Boolean} [options.needCursor=true]
   * @returns {Cursor}
   */
  ask(clientId, apiQuery, query, callback, options) {
    var cursor;
    var _options = lodash.defaults(options, {
      needCursor: true,
    });
    var _query = { clientId, apiQuery, query };
    if (_options.needCursor) {
      cursor = this.cursorsManager.new({ clientId, apiQuery, query });
      _query.cursorId = cursor.id;
    }
    if (typeof(callback) == 'function' && cursor) {
      cursor.on(null, (old, current, stop, changes, isClone) => {
        stop();
        callback(cursor);
      });
    }
    this.clientsManager.sendData(clientId, PSON.encode({queries:[_query]}));
    return cursor;
  }
  
  /**
   * Send `query` to api by `apiQuery` on client by `clientId`. Wait first results and call callback with `cursor` as argument. If cursor not needed, you can send `options` with `{ needCursor: false }`. Returns cursor without data, waiting bundles from remote client.
   * @param apiQuery
   * @param query
   * @param {Peer~firstDataCallback} [callback]
   * @param {Object} [options]
   * @param {Boolean} [options.needCursor=true]
   * @returns {Cursor}
   */
  exec(apiQuery, query, callback, options) {
    /**
     * @todo How to send query from local app clientId, without manually created pseudo-transport?
     */
  }

  /**
   * Not for manual usage. You can override it for extend with custom logic. Used in receivedData, for send bundles to cursors.
   * @param {ApiManager} apiManager
   * @param {cursorsManager} cursorsManager
   * @param {BundleQueuesManager} bundleQueuesManager
   * @param {clientsManager} clientsManager
   */
  _executeBundle(bundle) {
    this.bundleQueuesManager.executeBundle(bundle);
  }
  
  /**
   * Not for manual usage. You can override it for extend with custom logic. Used in adapter `apiManager.adapterSend`, for provide and encode bundles from api to client.
   * @param clientId
   * @param {Bundle[]} bundles
   */
  _sendBundles(clientId, bundles) {
    this.clientsManager.sendData(clientId, PSON.encode({bundles}));
  }
  
  /**
   * Not for manual usage. You can override it for extend with custom logic. Used in adapter `clientsManager.adapterDisconnected`, for inform each api about client disconnected and it cursors destroyed.
   * @param clientId
   */
  _clientDisconnected(clientId) {
    apiManager.clientDisconnected(clientId);
  }

  /**
   * Not for manual usage. You can override it for extend with custom logic. Used in adapter `clientsManager.receivedData`, and provide encripted object data structure with `data.queries` and `data.bundles`, from other peer on remote client to `this.apiManager` and `this.cursorsManager` in this peer.
   * @param clientId
   * @param 
   */
  _receivedData(clientId, _data) {
    var data = PSON.decode(data);
    // Apply data.bundles.
    if (data.bundles) {
      for (var bundle of data.bundles) {
        this._executeBundle(bundle);
      }
    }
    // Provide queries to apis.
    if (data.queries) {
      for (var query of data.queries) {
        this.apiManager.receiveQuery(clientId, query.apiQuery, query.query, query.cursorId);
      }
    }
  }
}

/**
 * Called after cursor gets first bundle.
 * @callback Peer~firstDataCallbackCallback
 * @memberof module:ancient-peer
 * @param {Cursor} cursor
 */