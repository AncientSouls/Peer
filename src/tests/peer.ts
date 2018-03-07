import * as _ from 'lodash';
import { assert } from 'chai';

import {
  Peer,
} from '../lib/peer';

export default function () {
  describe('Peer:', () => {
    it('connect() / peer.exec() / cursor.exec() / channel.destroy()', () => {
      const peer1 = new Peer();
      const peer2 = new Peer();
      
      const channelId = peer1.connect(peer2);
      
      const cursor = peer1.exec(channelId, null, 1);
      assert.equal(cursor.data, 1);
      
      cursor.exec(_.extend({}, cursor.query, { query: 2 }));
      assert.equal(cursor.data, 2);
      
      peer1.channelsManager.nodes[channelId].destroy();
      cursor.exec(_.extend({}, cursor.query, { query: 3 }));
      assert.equal(cursor.data, 2);
    });
  });
}
