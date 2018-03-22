import * as _ from 'lodash';

import {
  TClass,
  IInstance,
} from 'ancient-mixins/lib/mixins';

import {
  TCursor,
  ICursorEventsList,
} from 'ancient-cursor/lib/cursor';

import {
  IPkg,
  TChannel,
} from 'ancient-channels/lib/channel';

import {
  ICursorBundle,
  TCursorsManager,
  CursorsManager,
} from 'ancient-cursor/lib/cursors-manager';

import {
  TChannelsManager,
  ChannelsManager,
} from 'ancient-channels/lib/channels-manager';

import {
  Node,
  INode,
  INodeEventsList,
} from 'ancient-mixins/lib/node';

type TPeer =  IPeer<IPeerEventsList>;

interface IPeerCursorQuery {
  apiQuery: any;
  query: any;
  channelId: string;
}

interface IPeerCursor<IEventsList extends ICursorEventsList> extends INode<IEventsList> {
  query: TPeerApiQuery;
  exec(query: IPeerCursorQuery, data?: any): void;
}

type TPeerCursor = IPeerCursor<ICursorEventsList>;

interface IPeerQuery {
  cursorId: string;
  queryId: string;
  apiQuery: any;
  query: any;
}

interface IPeerPkg extends IPkg {
  data: {
    queries: IPeerQuery[];
    bundles: ICursorBundle[];
    destroyed: string[];
    
    [key: string]: any;
  };
}

interface IPeerEventData {
}

interface IPeerEventsList extends INodeEventsList {
}

interface IPeerApi {
  (sendBundles: IPeerApiSendBundles): IPeerApiCallbacks;
}

interface IPeerApiSendBundles {
  (channelId: string, ...bundles: ICursorBundle[]): void;
}

interface IPeerApiCallbacks {
  gotQuery(channelId: string, query: IPeerQuery): void;
  cursorDestroyed(channelId: string, cursorId: string): void;
  channelDestroyed(channelId: string): void;
}

type TPeerApiQuery = any;

interface IPeerRelationsCursors {
  [cursorId: string]: TPeerApiQuery;
}
interface IPeerRelationsChannels {
  [channelId: string]: IPeerRelationsCursors;
}

interface IPeer<IEventsList extends IPeerEventsList>
extends INode<IEventsList> {
  channelsManager: TChannelsManager;
  cursorsManager: TCursorsManager;
  
  relations: IPeerRelationsChannels;
  
  getApiCallbacks(apiQuery, callback: (api: IPeerApiCallbacks) => void): void;
  
  wrap(): void;
  sendQuery(cursor: TPeerCursor): void;
  sendBundles(channelId: string, ...bundles: ICursorBundle[]): void;
  sendDestroyed(cursor: TPeerCursor): void;
  gotPkg(channelId: string, pkg: IPeerPkg): void;
  cursorDestroyed(channelId: string, cursorId: string): void;
  channelDestroyed(channelId: string): void;
  handleQueries(channelId: string, pkg: IPeerPkg): void;
  handleQuery(channelId: string, query: any): void;
  handleBundles(channelId: string, pkg: IPeerPkg): void;
  handleDestroyed(channelId: string, pkg: IPeerPkg): void;
}

const defaultApi: IPeerApi = (sendBundles) => {
  return {
    gotQuery(channelId, query) {
      sendBundles(channelId, {
        type: 'set',
        path: '',
        value: query.query,
        cursorId: query.cursorId,
      });
    },
    cursorDestroyed(channelId, cursorId) {},
    channelDestroyed(channelId) {},
  };
};

function mixin<T extends TClass<IInstance>>(
  superClass: T,
): any {
  return class Peer extends superClass {
    constructor(...args) {
      super(...args);
      this.wrap();
    }
    
    relations = {};
    channelsManager = new ChannelsManager();
    cursorsManager = new CursorsManager();
    
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
        ]});
      }
    }
    
    sendBundles(channelId, ...bundles) {
      const channel = this.channelsManager.nodes[channelId];
      if (channel) channel.send({ bundles });
    }
    
    sendDestroyed({ id: cursorId, query: { channelId } }) {
      const channel = this.channelsManager.nodes[channelId];
      if (channel) channel.send({ destroyed: [cursorId] });
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
        if (cursorDestroyed) cursorDestroyed(cursorId);
      });
    }
    
    channelDestroyed(channelId) {
      _.each(this.relations[channelId], (apiQuery, cursorId) => {
        this.getApiCallbacks(apiQuery, ({
          cursorDestroyed,
          channelDestroyed,
        }) => {
          if (cursorDestroyed) cursorDestroyed(channelId, cursorId);
          if (channelDestroyed) channelDestroyed(channelId);
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
          if (cursorDestroyed) cursorDestroyed(query.cursorId);
        });
      }
      
      this.getApiCallbacks(query.apiQuery, ({ gotQuery }) => {
        if (gotQuery) gotQuery(channelId, query);
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

const MixedPeer: TClass<IPeer<IPeerEventsList>> = mixin(Node);
class Peer extends MixedPeer {}

export {
  mixin as default,
  mixin,
  MixedPeer,
  Peer,
  IPeer,
  IPeerEventData,
  IPeerEventsList,
  TPeer,
  IPeerQuery,
  IPeerPkg,
  IPeerApi,
  IPeerCursor,
  IPeerCursorQuery,
  TPeerCursor,
  IPeerApiSendBundles,
  IPeerApiCallbacks,
  IPeerRelationsChannels,
  IPeerRelationsCursors,
  TPeerApiQuery,
  defaultApi,
};
