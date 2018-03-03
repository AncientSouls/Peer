"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var _ = require("lodash");
var cursors_manager_1 = require("ancient-cursor/lib/cursors-manager");
var channels_manager_1 = require("ancient-channels/lib/channels-manager");
var node_1 = require("ancient-mixins/lib/node");
var create_local_transport_1 = require("ancient-channels/lib/create-local-transport");
var defaultApi = function (sendBundles) {
    return {
        gotQuery: function (channelId, query) {
            sendBundles(channelId, {
                type: 'set',
                path: '',
                value: query.query,
                cursorId: query.cursorId
            });
        },
        cursorDestroyed: function (channelId, cursorId) { },
        channelDestroyed: function (channelId) { }
    };
};
exports.defaultApi = defaultApi;
function mixin(superClass) {
    return /** @class */ (function (_super) {
        __extends(Peer, _super);
        function Peer() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this.relations = {};
            _this.channelsManager = new channels_manager_1.ChannelsManager();
            _this.cursorsManager = new cursors_manager_1.CursorsManager();
            _this.wrap();
            return _this;
        }
        Peer.prototype.getApiCallbacks = function (apiQuery, callback) {
            var _this = this;
            callback(defaultApi(function (channelId, bundles) {
                _this.sendBundles(channelId, bundles);
            }));
        };
        Peer.prototype.connect = function (peer) {
            var localChannel = this.channelsManager.create();
            var remoteChannel = peer.channelsManager.create();
            create_local_transport_1["default"](localChannel, remoteChannel);
            return localChannel.id;
        };
        Peer.prototype.exec = function (channelId, apiQuery, query) {
            var cursor = this.cursorsManager.create();
            cursor.exec({ channelId: channelId, apiQuery: apiQuery, query: query });
            return cursor;
        };
        Peer.prototype.wrap = function () {
            var _this = this;
            this.cursorsManager.on('exec', function (_a) {
                var cursor = _a.cursor;
                _this.sendQuery(cursor);
            });
            this.cursorsManager.on('destroyed', function (_a) {
                var cursor = _a.cursor;
                _this.sendDestroyed(cursor);
            });
            this.channelsManager.on('got', function (_a) {
                var channel = _a.channel, pkg = _a.pkg;
                _this.gotPkg(channel.id, pkg);
            });
            this.channelsManager.on('destroyed', function (_a) {
                var channel = _a.node;
                _this.channelDestroyed(channel.id);
            });
        };
        Peer.prototype.sendQuery = function (_a) {
            var cursorId = _a.id, queryId = _a.queryId, _b = _a.query, channelId = _b.channelId, apiQuery = _b.apiQuery, query = _b.query;
            var channel = this.channelsManager.nodes[channelId];
            if (channel) {
                channel.send({ queries: [
                        { cursorId: cursorId, queryId: queryId, apiQuery: apiQuery, query: query },
                    ] });
            }
        };
        Peer.prototype.sendBundles = function (channelId) {
            var bundles = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                bundles[_i - 1] = arguments[_i];
            }
            var channel = this.channelsManager.nodes[channelId];
            if (channel)
                channel.send({ bundles: bundles });
        };
        Peer.prototype.sendDestroyed = function (_a) {
            var cursorId = _a.id, channelId = _a.query.channelId;
            var channel = this.channelsManager.nodes[channelId];
            if (channel)
                channel.send({ destroyed: [cursorId] });
        };
        Peer.prototype.gotPkg = function (channelId, pkg) {
            if (pkg.data.queries) {
                this.handleQueries(channelId, pkg);
            }
            if (pkg.data.bundles) {
                this.handleBundles(channelId, pkg);
            }
            if (pkg.data.destroyed) {
                this.handleDestroyed(channelId, pkg);
            }
        };
        Peer.prototype.cursorDestroyed = function (channelId, cursorId) {
            var oldApiQuery = _.get(this.relations, [channelId, cursorId]);
            _.set(this.relations, [channelId, cursorId], undefined);
            this.getApiCallbacks(oldApiQuery, function (_a) {
                var cursorDestroyed = _a.cursorDestroyed;
                if (cursorDestroyed)
                    cursorDestroyed(cursorId);
            });
        };
        Peer.prototype.channelDestroyed = function (channelId) {
            var _this = this;
            _.each(this.relations[channelId], function (apiQuery, cursorId) {
                _this.getApiCallbacks(apiQuery, function (_a) {
                    var cursorDestroyed = _a.cursorDestroyed, channelDestroyed = _a.channelDestroyed;
                    if (cursorDestroyed)
                        cursorDestroyed(channelId, cursorId);
                    if (channelDestroyed)
                        channelDestroyed(channelId);
                });
            });
            _.set(this.relations, [channelId], undefined);
        };
        Peer.prototype.handleQueries = function (channelId, pkg) {
            var _this = this;
            pkg.data.queries.forEach(function (query) {
                _this.handleQuery(channelId, query);
            });
        };
        Peer.prototype.handleQuery = function (channelId, query) {
            var oldApiQuery = _.get(this.relations, [channelId, query.cursorId]);
            _.set(this.relations, [channelId, query.cursorId], query.apiQuery);
            if (oldApiQuery && query.apiQuery !== oldApiQuery) {
                this.getApiCallbacks(oldApiQuery, function (_a) {
                    var cursorDestroyed = _a.cursorDestroyed;
                    if (cursorDestroyed)
                        cursorDestroyed(query.cursorId);
                });
            }
            this.getApiCallbacks(query.apiQuery, function (_a) {
                var gotQuery = _a.gotQuery;
                if (gotQuery)
                    gotQuery(channelId, query);
            });
        };
        Peer.prototype.handleBundles = function (channelId, pkg) {
            var _this = this;
            pkg.data.bundles.forEach(function (bundle) {
                _this.cursorsManager.nodes[bundle.cursorId].apply(bundle);
            });
        };
        Peer.prototype.handleDestroyed = function (channelId, pkg) {
            var _this = this;
            pkg.data.destroyed.forEach(function (cursorId) {
                _this.cursorDestroyed(channelId, cursorId);
            });
        };
        return Peer;
    }(superClass));
}
exports["default"] = mixin;
exports.mixin = mixin;
var MixedPeer = mixin(node_1.Node);
exports.MixedPeer = MixedPeer;
var Peer = /** @class */ (function (_super) {
    __extends(Peer, _super);
    function Peer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Peer;
}(MixedPeer));
exports.Peer = Peer;
//# sourceMappingURL=peer.js.map