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
const chai_1 = require("chai");
const create_local_transport_1 = require("ancient-channels/lib/create-local-transport");
const peer_1 = require("../lib/peer");
const cursor_1 = require("ancient-cursor/lib/cursor");
const channel_1 = require("ancient-channels/lib/channel");
const delay = t => new Promise(res => setTimeout(res, t));
function default_1() {
    describe('Peer:', () => {
        it('connect() / peer.exec() / cursor.exec() / channel.destroy()', () => __awaiter(this, void 0, void 0, function* () {
            const p1 = new peer_1.Peer();
            const p2 = new peer_1.Peer();
            const c1 = new channel_1.Channel();
            p1.channelsManager.add(c1);
            const c2 = new channel_1.Channel();
            p2.channelsManager.add(c2);
            create_local_transport_1.default(c1, c2);
            const channelId = c1.id;
            const cursor = new cursor_1.Cursor();
            p1.cursorsManager.add(cursor);
            cursor.exec({ channelId, apiQuery: null, query: 1 });
            yield delay(1);
            chai_1.assert.equal(cursor.data, 1);
            cursor.exec(_.extend({}, cursor.query, { query: 2 }));
            yield delay(1);
            chai_1.assert.equal(cursor.data, 2);
            p1.channelsManager.list.nodes[channelId].destroy();
            cursor.exec(_.extend({}, cursor.query, { query: 3 }));
            yield delay(1);
            chai_1.assert.equal(cursor.data, 2);
        }));
    });
}
exports.default = default_1;
//# sourceMappingURL=peer.js.map