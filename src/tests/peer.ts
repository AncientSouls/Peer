import * as _ from 'lodash';
import { assert } from 'chai';

import {
  default as createLocalTransport,
} from 'ancient-channels/lib/create-local-transport';

import {
  Peer,
} from '../lib/peer';

export default function () {
  describe('Peer:', () => {
    it('connect() / peer.exec() / cursor.exec() / channel.destroy()', () => {
      const peer1 = new Peer();
      const peer2 = new Peer();
      
      const localChannel = new peer1.channelsManager.Node();
      peer1.channelsManager.add(localChannel);

      const remoteChannel = new peer1.channelsManager.Node();
      peer2.channelsManager.add(remoteChannel);
      
      createLocalTransport(localChannel, remoteChannel);
      const channelId = localChannel.id;
      
      const cursor = new peer1.cursorsManager.Node();
      peer1.cursorsManager.add(cursor);
      cursor.exec({ channelId, apiQuery: null, query: 1 });
      assert.equal(cursor.data, 1);
      
      cursor.exec(_.extend({}, cursor.query, { query: 2 }));
      assert.equal(cursor.data, 2);
      
      peer1.channelsManager.list.nodes[channelId].destroy();
      cursor.exec(_.extend({}, cursor.query, { query: 3 }));
      assert.equal(cursor.data, 2);
    });
  });
}
