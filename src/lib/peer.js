import { connectLocalTransport, createLocalTransport } from 'ancient-channels';

/**
 * @class Peer
 * @memberof module:ancient-peer
 */
export default class Peer {
    /**
     * @constructs Peer
     * @param {Object} apiManager - Manager of many api for sync data with cursors
     * @param {Object} bundleQueuesManager - Queue of bundles execution for multiple cursors
     * @param {Object} channelsManager - Multi-channel manager
     * @param {Object} cursorsManager - Manager of the set of cursors
     */
    constructor(apiManager, bundleQueuesManager, channelsManager, cursorsManager) {
        /**
         * @type {Object}
         * @description Manager of many api for sync data with cursors.
         */
        this.apiManager = apiManager || {};

        /**
         * @type {Object}
         * @description Queue of bundles execution for multiple cursors.
         */
        this.bundleQueuesManager = bundleQueuesManager || {};

        /**
         * @type {Object}
         * @description Multi-channel manager.
         */
        this.channelsManager = channelsManager || {};

        /**
         * @type {Object}
         * @description Manager of the set of cursors.
         */
        this.cursorsManager = cursorsManager || {};

        /**
         * @type {Function}
         * @description Used to send a package from the api manager.
         */
        this.apiManager.adapterSend = (channel, bundle) => {
            this._sendBundles(channel, bundle);
        };

        /**
         * @type {Function}
         * @description Used when disconnecting the communication channel.
         */
        this.channelsManager.onDisconnected = (channel) => {
            this.apiManager.channelDisconnected(channel);
        };

        /**
         * @type {Function}
         * @description Used when receiving incoming packets.
         */
        this.channelsManager.gotPackage = (channel, data) => {
            this.got(channel, data);
        };

        /**
         * @type {Function}
         * @description Used to synchronize the communication channel.
         */
        this._connectTransport = connectLocalTransport;

        /**
         * @type {Function}
         * @description Used to create a communication channel.
         */
        this._createTransport = createLocalTransport;
    }

    /**
     * @protected
     * @param {Function} sendPackage - Function of sending data
     * @return {Object} Channel
     * @description Create a communication channel.
     */
    createChannel(sendPackage) {
        return this.channelsManager.new(sendPackage);
    }

    /**
     * @protected
     * @param {Object} peer - External peer
     * @return {Object} Channel
     * @description Creating a communication channel between peers.
     */
    connect(peer) {
        var channel_local = this.createChannel();
        var channel_remote = peer.createChannel();
        this._createTransport(channel_local, channel_remote);
        this._connectTransport(channel_local, channel_remote);
        return channel_local;
    }

    /**
     * @protected
     * @param {Object} channel - Communication channel
     * @param {Object} api - Interface for instance API
     * @param {Object} query - Request to execute
     * @param {Boolean=} [create] - Creating a cursor
     * @returns {Object} Cursor
     * @description Creates a cursor and requests data on a remote peer.
     */
    exec(channel, api, query, create = true) {
        create = !!create;
        var cursorId = null;
        var cursor = null;

        if (create) {
            cursor = this.cursorsManager.new({ channel, api, query });
            cursorId = cursor.id;
        }

        this._sendQuery(channel, { api, query, cursorId });
        return cursor;
    }

    /**
     * @protected
     * @param {Object} channel - Communication channel
     * @param {String} request - Incoming data
     * @description Process the incoming data.
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
     * @param {Object} apiManager - Manager of many api for sync data with cursors
     * @param {Object} bundleQueuesManager - Queue of bundles execution for multiple cursors
     * @param {Object} channelsManager - Multi-channel manager
     * @param {Object} cursorsManager - Manager of the set of cursors
     * @returns {Object} Peer
     * @description Create a new peer from the constructor.
     */
    new(apiManager, bundleQueuesManager, channelsManager, cursorsManager) {
        apiManager = apiManager || this.apiManager;
        bundleQueuesManager = bundleQueuesManager || this.bundleQueuesManager;
        channelsManager = channelsManager || this.channelsManager;
        cursorsManager = cursorsManager || this.cursorsManager;
        return new Peer(apiManager, bundleQueuesManager, channelsManager, cursorsManager);
    }

    /**
     * @protected
     * @param {Object} bundles - Received bundles
     * @description Processes the received bundes.
     */
    _handlerBundle(bundles) {
        bundles.forEach(bundle => {
            this.bundleQueuesManager.executeBundle(bundle);
        });
    }

    /**
     * @protected
     * @param {Object} channel - Communication channel
     * @param {Object} queries - Received queries
     * @description Processes the received queries.
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
     * @description Used to send a bundle.
     */
    _sendBundles(channel, bundle) {
        channel.send({ bundles: [bundle] });
    }

    /**
     * @protected
     * @param {Object} channel - Communication channel
     * @param {Object} query - Query to send
     * @description Used to send a request.
     */
    _sendQuery(channel, query) {
        channel.send({ queries: [query] });
    }
}
