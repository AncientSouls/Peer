/**
 * @class Peer
 * @memberof module:ancient-peer
 */
export default class Peer {
    /**
     * @constructs Peer
     * @param {Object} apiManager - Manager of many api for sync data with cursors
     * @param {Object} bundleQueuesManager - Queue of bundles execution
     * @param {Object} channelsManager - Single channel manager
     * @param {Object} cursorsManager - Small registrar of cursors
     */
    constructor(apiManager, bundleQueuesManager, channelsManager, cursorsManager) {
        this.apiManager = apiManager || {};
        this.bundleQueuesManager = bundleQueuesManager || {};
        this.channelsManager = channelsManager || {};
        this.cursorsManager = cursorsManager || {};

        /**
         * @type {Function}
         * @description Receive packages to send.
         */
        this.apiManager.adapterSend = (channel, bundle) => {
            this._sendBundles(channel, bundle);
        };

        /**
         * @type {Function}
         * @description Adapter for disconnection.
         */
        this.channelsManager.onDisconnected = (channel) => {
            this.channelDisconnected(channel);
        };

        /**
         * @type {Function}
         * @description Adapter for receiving data.
         */
        this.channelsManager.gotPackage = (channel, data) => {
            this.gotPackage(channel, data);
        };
    }

    /**
     * @protected
     * @param {Object} channel - Communication channel
     * @description Handling the detached channel.
     */
    channelDisconnected(channel) {
        this.apiManager.channelDisconnected(channel);
    }

    /**
     * @protected
     * @param {Object} channel - Communication channel
     * @param {Object} api - Usage API
     * @param {Object} query - Query executed
     * @param {Boolean=} [needCursor] - Create a cursor
     * @returns {Object} Cursor
     * @description Creates a cursor and processes the collected request packet.
     */
    exec(channel, api, query, needCursor = true) {
        needCursor = !!needCursor;
        var cursorId = null;
        var cursor = null;

        if (needCursor) {
            cursor = this.cursorsManager.new({ channel, api, query });
            cursorId = cursor.id;
        }

        this._sendQuery(channel, { api, query, cursorId });
        return cursor;
    }

    /**
     * @protected
     * @param {Object} channel - Communication channel
     * @param {String} request - Incoming packet
     * @description Processing incoming packets.
     */
    got(channel, request) {
        if (request.queries) {
            this._handlerQuery(channel, request.queries);
        }

        if (request.bundles) {
            this._handlerBundle(request.bundles);
        }
    }

    /**
     * @protected
     * @param {Object} bundles - Received bundle
     * @description Processes the received bundle.
     */
    _handlerBundle(bundles) {
        bundles.forEach(bundle => {
            this.bundleQueuesManager.executeBundle(bundle);
        });
    }

    /**
     * @protected
     * @param {Object} channel - Communication channel
     * @param {Object} queries - Received query
     * @description Processes the received query.
     */
    _handlerQuery(channel, queries) {
        queries.forEach(query => {
            this.apiManager.receiveQuery(channel, query.api, query.query, query.cursorId);
        });
    }

    /**
     * @protected
     * @param {Object} channel - Communication channel
     * @param {Object} bundle - Bundle to send
     * @description Sending a bundle.
     */
    _sendBundles(channel, bundle) {
        channel.send({ bundles: [bundle] });
    }

    /**
     * @protected
     * @param {Object} channel - Communication channel
     * @param {Object} query - Query to send
     * @description Sending a query.
     */
    _sendQuery(channel, query) {
        channel.send({ queries: [query] });
    }
}