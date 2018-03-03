"use strict";
exports.__esModule = true;
require("mocha");
var _ = require("lodash");
var chai_1 = require("chai");
var peer_1 = require("../lib/peer");
function default_1() {
    describe('Peer:', function () {
        it('connect() / peer.exec() / cursor.exec() / channel.destroy()', function () {
            var peer1 = new peer_1.Peer();
            var peer2 = new peer_1.Peer();
            var channelId = peer1.connect(peer2);
            var cursor = peer1.exec(channelId, null, 1);
            chai_1.assert.equal(cursor.data, 1);
            cursor.exec(_.extend({}, cursor.query, { query: 2 }));
            chai_1.assert.equal(cursor.data, 2);
            peer1.channelsManager.nodes[channelId].destroy();
            cursor.exec(_.extend({}, cursor.query, { query: 3 }));
            chai_1.assert.equal(cursor.data, 2);
        });
    });
}
exports["default"] = default_1;
//# sourceMappingURL=peer.js.map