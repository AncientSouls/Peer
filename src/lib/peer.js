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
            this.sendBundle(channel, bundle);
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
    exec(channel, api, query, needCursor = false) {
        needCursor = !!needCursor;
        var cursorId = null;
        var cursor = null;

        if (needCursor) {
            cursor = this.cursorsManager.new({ api, query });
            cursorId = cursor.id;

            cursor.on(null, (old, current, stop) => {
                stop();
            });
        }

        this.sendQuery(channel, [api, query, cursorId]);
        return cursor;
    }

    /**
     * @protected
     * @param {Object} channel - Communication channel
     * @param {String} request - Incoming packet
     * @description Processing incoming packets.
     */
    gotPackage(channel, request) {
        request = JSON.parse(request);

        if (request.queries) {
            this.handlerQuery(channel, request.queries);
        }

        if (request.bundles) {
            this.handlerBundle(request.bundles);
        }
    }

    /**
     * @protected
     * @param {Object} bundles - Received bundle
     * @description Processes the received bundle.
     */
    handlerBundle(bundles) {
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
    handlerQuery(channel, queries) {
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
    sendBundle(channel, bundle) {
        var bundles = JSON.stringify({ bundles: [bundle] });
        channel.send(bundles);
    }

    /**
     * @protected
     * @param {Object} channel - Communication channel
     * @param {Object} query - Query to send
     * @description Sending a query.
     */
    sendQuery(channel, query) {
        var queries = JSON.stringify({ queries: [query] });
        channel.send(queries);
    }
}