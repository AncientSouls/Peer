"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const manager_1 = require("ancient-mixins/lib/manager");
const node_1 = require("ancient-mixins/lib/node");
exports.defaultApi = (ready) => {
    return {
        _bundles: [],
        getBundles(channelId, cursorId) {
            const bundles = this._bundles;
            this._bundles = [];
            return bundles;
        },
        gotQuery(channelId, query) {
            this._bundles.push({
                type: 'set',
                path: '',
                value: query.query,
                cursorId: query.cursorId,
            });
            ready(channelId);
        },
        cursorDestroyed(channelId, cursorId) { },
        channelDestroyed(channelId) { },
    };
};
function mixin(superClass) {
    return class Peer extends superClass {
        constructor(...args) {
            super(...args);
            this.relations = {};
            this.prepared = {};
            this.channelsManager = new manager_1.Manager();
            this.cursorsManager = new manager_1.Manager();
            this.wrap();
        }
        getApiCallbacks(apiQuery) {
            if (!this.__api) {
                this.__api = exports.defaultApi((channelId) => {
                    this.ready(channelId);
                });
            }
            return this.__api;
        }
        wrap() {
            this.cursorsManager.list.on('exec', ({ cursor }) => {
                this.sendQuery(cursor);
            });
            this.cursorsManager.on('removed', ({ node: cursor }) => {
                this.sendDestroyed(cursor);
            });
            this.channelsManager.on('added', ({ node: channel }) => {
                channel.getter = () => this.getPkg(channel.id);
            });
            this.channelsManager.list.on('got', ({ channel, data }) => {
                this.gotPkg(channel.id, data);
            });
            this.channelsManager.on('removed', ({ node: channel }) => {
                this.channelDestroyed(channel.id);
            });
        }
        getPkg(channelId) {
            return __awaiter(this, void 0, void 0, function* () {
                const prepared = this.prepared[channelId];
                if (prepared) {
                    delete this.prepared[channelId];
                    prepared.bundles = [];
                    let cursorId;
                    for (cursorId in this.relations[channelId]) {
                        const api = yield this.getApiCallbacks(this.relations[channelId][cursorId]);
                        const bundles = yield api.getBundles(channelId, cursorId);
                        prepared.bundles.push(...bundles);
                    }
                    return prepared;
                }
            });
        }
        sendQuery({ id: cursorId, queryId, query: { channelId, apiQuery, query } }) {
            const channel = this.channelsManager.list.nodes[channelId];
            if (channel) {
                this.prepared[channelId] = this.prepared[channelId] || { queries: [], destroyed: [] };
                this.prepared[channelId].queries.push({ cursorId, queryId, apiQuery, query });
                channel.ready();
            }
        }
        ready(channelId) {
            const channel = this.channelsManager.list.nodes[channelId];
            if (channel) {
                this.prepared[channelId] = this.prepared[channelId] || { queries: [], destroyed: [] };
                channel.ready();
            }
        }
        sendDestroyed({ id: cursorId, query: { channelId } }) {
            const channel = this.channelsManager.list.nodes[channelId];
            if (channel) {
                this.prepared[channelId] = this.prepared[channelId] || { queries: [], destroyed: [] };
                this.prepared[channelId].destroyed.push(cursorId);
                channel.ready();
            }
        }
        gotPkg(channelId, pkg) {
            if (pkg) {
                if (pkg.queries) {
                    this.handleQueries(channelId, pkg);
                }
                if (pkg.bundles) {
                    this.handleBundles(channelId, pkg);
                }
                if (pkg.destroyed) {
                    this.handleDestroyed(channelId, pkg);
                }
            }
        }
        cursorDestroyed(channelId, cursorId) {
            return __awaiter(this, void 0, void 0, function* () {
                const oldApiQuery = _.get(this.relations, [channelId, cursorId]);
                _.set(this.relations, [channelId, cursorId], undefined);
                const api = yield this.getApiCallbacks(oldApiQuery);
                if (api.cursorDestroyed)
                    api.cursorDestroyed(channelId, cursorId);
            });
        }
        channelDestroyed(channelId) {
            _.each(this.relations[channelId], (apiQuery, cursorId) => __awaiter(this, void 0, void 0, function* () {
                const api = yield this.getApiCallbacks(apiQuery);
                if (api.cursorDestroyed)
                    api.cursorDestroyed(channelId, cursorId);
                if (api.channelDestroyed)
                    api.channelDestroyed(channelId);
            }));
            _.set(this.relations, [channelId], undefined);
        }
        handleQueries(channelId, pkg) {
            pkg.queries.forEach((query) => {
                this.handleQuery(channelId, query);
            });
        }
        handleQuery(channelId, query) {
            return __awaiter(this, void 0, void 0, function* () {
                const oldApiQuery = _.get(this.relations, [channelId, query.cursorId]);
                _.set(this.relations, [channelId, query.cursorId], query.apiQuery);
                if (oldApiQuery && query.apiQuery !== oldApiQuery) {
                    const api = yield this.getApiCallbacks(oldApiQuery);
                    if (api.cursorDestroyed)
                        api.cursorDestroyed(channelId, query.cursorId);
                }
                const api = yield this.getApiCallbacks(query.apiQuery);
                if (api.gotQuery)
                    api.gotQuery(channelId, query);
            });
        }
        handleBundles(channelId, pkg) {
            pkg.bundles.forEach((bundle) => {
                this.cursorsManager.list.nodes[bundle.cursorId].apply(bundle);
            });
        }
        handleDestroyed(channelId, pkg) {
            pkg.destroyed.forEach((cursorId) => {
                this.cursorDestroyed(channelId, cursorId);
            });
        }
    };
}
exports.mixin = mixin;
exports.MixedPeer = mixin(node_1.Node);
class Peer extends exports.MixedPeer {
}
exports.Peer = Peer;
//# sourceMappingURL=peer.js.map