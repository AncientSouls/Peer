"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const cursors_manager_1 = require("ancient-cursor/lib/cursors-manager");
const channels_manager_1 = require("ancient-channels/lib/channels-manager");
const node_1 = require("ancient-mixins/lib/node");
const defaultApi = (sendBundles) => {
    return {
        gotQuery(channelId, query) {
            sendBundles(channelId, {
                type: 'set',
                path: '',
                value: query.query,
                cursorId: query.cursorId,
            });
        },
        cursorDestroyed(channelId, cursorId) { },
        channelDestroyed(channelId) { },
    };
};
exports.defaultApi = defaultApi;
function mixin(superClass) {
    return class Peer extends superClass {
        constructor(...args) {
            super(...args);
            this.relations = {};
            this.channelsManager = new channels_manager_1.ChannelsManager();
            this.cursorsManager = new cursors_manager_1.CursorsManager();
            this.wrap();
        }
        getApiCallbacks(apiQuery, callback) {
            callback(defaultApi((channelId, bundles) => {
                this.sendBundles(channelId, bundles);
            }));
        }
        wrap() {
            this.cursorsManager.on('exec', ({ cursor }) => {
                this.sendQuery(cursor);
            });
            this.cursorsManager.on('destroyed', ({ cursor }) => {
                this.sendDestroyed(cursor);
            });
            this.channelsManager.on('got', ({ channel, pkg }) => {
                this.gotPkg(channel.id, pkg);
            });
            this.channelsManager.on('destroyed', ({ node: channel }) => {
                this.channelDestroyed(channel.id);
            });
        }
        sendQuery({ id: cursorId, queryId, query: { channelId, apiQuery, query } }) {
            const channel = this.channelsManager.nodes[channelId];
            if (channel) {
                channel.send({ queries: [
                        { cursorId, queryId, apiQuery, query },
                    ] });
            }
        }
        sendBundles(channelId, ...bundles) {
            const channel = this.channelsManager.nodes[channelId];
            if (channel)
                channel.send({ bundles });
        }
        sendDestroyed({ id: cursorId, query: { channelId } }) {
            const channel = this.channelsManager.nodes[channelId];
            if (channel)
                channel.send({ destroyed: [cursorId] });
        }
        gotPkg(channelId, pkg) {
            if (pkg.data.queries) {
                this.handleQueries(channelId, pkg);
            }
            if (pkg.data.bundles) {
                this.handleBundles(channelId, pkg);
            }
            if (pkg.data.destroyed) {
                this.handleDestroyed(channelId, pkg);
            }
        }
        cursorDestroyed(channelId, cursorId) {
            const oldApiQuery = _.get(this.relations, [channelId, cursorId]);
            _.set(this.relations, [channelId, cursorId], undefined);
            this.getApiCallbacks(oldApiQuery, ({ cursorDestroyed }) => {
                if (cursorDestroyed)
                    cursorDestroyed(cursorId);
            });
        }
        channelDestroyed(channelId) {
            _.each(this.relations[channelId], (apiQuery, cursorId) => {
                this.getApiCallbacks(apiQuery, ({ cursorDestroyed, channelDestroyed, }) => {
                    if (cursorDestroyed)
                        cursorDestroyed(channelId, cursorId);
                    if (channelDestroyed)
                        channelDestroyed(channelId);
                });
            });
            _.set(this.relations, [channelId], undefined);
        }
        handleQueries(channelId, pkg) {
            pkg.data.queries.forEach((query) => {
                this.handleQuery(channelId, query);
            });
        }
        handleQuery(channelId, query) {
            const oldApiQuery = _.get(this.relations, [channelId, query.cursorId]);
            _.set(this.relations, [channelId, query.cursorId], query.apiQuery);
            if (oldApiQuery && query.apiQuery !== oldApiQuery) {
                this.getApiCallbacks(oldApiQuery, ({ cursorDestroyed }) => {
                    if (cursorDestroyed)
                        cursorDestroyed(query.cursorId);
                });
            }
            this.getApiCallbacks(query.apiQuery, ({ gotQuery }) => {
                if (gotQuery)
                    gotQuery(channelId, query);
            });
        }
        handleBundles(channelId, pkg) {
            pkg.data.bundles.forEach((bundle) => {
                this.cursorsManager.nodes[bundle.cursorId].apply(bundle);
            });
        }
        handleDestroyed(channelId, pkg) {
            pkg.data.destroyed.forEach((cursorId) => {
                this.cursorDestroyed(channelId, cursorId);
            });
        }
    };
}
exports.default = mixin;
exports.mixin = mixin;
const MixedPeer = mixin(node_1.Node);
exports.MixedPeer = MixedPeer;
class Peer extends MixedPeer {
}
exports.Peer = Peer;
//# sourceMappingURL=peer.js.map