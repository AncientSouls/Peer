import * as _ from 'lodash';
import { assert } from 'chai';

import {
  default as createLocalTransport,
} from 'ancient-channels/lib/create-local-transport';

import {
  Peer,
} from '../lib/peer';

import {
  Cursor,
} from 'ancient-cursor/lib/cursor';

import {
  Channel,
} from 'ancient-channels/lib/channel';

const delay = t => new Promise(res => setTimeout(res, t));

export default function () {
  describe('Peer:', () => {
    it('connect() / peer.exec() / cursor.exec() / channel.destroy()', async () => {
      const p1 = new Peer();
      const p2 = new Peer();
      
      const c1 = new Channel();
      p1.channelsManager.add(c1);

      const c2 = new Channel();
      p2.channelsManager.add(c2);
      
      createLocalTransport(c1, c2);
      const channelId = c1.id;
      
      const cursor = new Cursor();
      p1.cursorsManager.add(cursor);
      cursor.exec({ channelId, apiQuery: null, query: 1 });
      await delay(1);
      assert.equal(cursor.data, 1);
      
      cursor.exec(_.extend({}, cursor.query, { query: 2 }));
      await delay(1);
      assert.equal(cursor.data, 2);
      
      p1.channelsManager.list.nodes[channelId].destroy();
      cursor.exec(_.extend({}, cursor.query, { query: 3 }));
      await delay(1);
      assert.equal(cursor.data, 2);
    });
  });
}
