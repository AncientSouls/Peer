/**
 * @class Peer
 * @memberof module:ancient-peer
 */
export default class Peer {
    /**
     * @constructs Peer
     * @param {Object} apiManager - Manager of many api for sync data with cursors
     * @param {Object} cursorsManager - Small registrar of cursors
     * @param {Object} bundleQueuesManager - Queue of bundles execution
     * @param {Object} channelManager - Single channel manager
     */
    constructor(apiManager, cursorsManager, bundleQueuesManager, channelManager) {
        this.apiManager = apiManager;
        this.cursorsManager = cursorsManager;
        this.bundleQueuesManager = bundleQueuesManager;
        this.channelManager = channelManager;
    }

    /**
     * @protected
     * @param {Object} channel - Communication channel
     * @param {Object} api - Usage API
     * @param {Object} query - Query executed
     * @returns {Object} Cursor
     * @description Creates a cursor and processes the collected request packet.
     */
    exec(channel, api, query) {}

    /**
     * @protected
     * @param {Object} channel - Communication channel
     * @param {Object} query - Query to send
     * @description Sending a query.
     */
    sendQuery(channel, query) {}

    /**
     * @protected
     * @param {Object} channel - Communication channel
     * @param {Object} bundle - Bundle to send
     * @description Sending a bundle.
     */
    sendBundle(channel, bundle) {}

    /**
     * @protected
     * @param {Object} channel - Communication channel
     * @param {String} request - Incoming packet
     * @description Processing incoming packets.
     */
    handlerPacket(channel, request) {}

    /**
     * @protected
     * @param {Object} channel - Communication channel
     * @param {Object} query - Received query
     * @description Processes the received query.
     */
    handlerQuery(channel, query) {}

    /**
     * @protected
     * @param {Object} bundle - Received bundle
     * @description Processes the received bundle.
     */
    handlerBundle(bundle) {}
}