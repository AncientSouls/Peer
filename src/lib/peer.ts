import * as _ from 'lodash';

import {
  TClass,
  IInstance,
} from 'ancient-mixins/lib/mixins';

import {
  Manager,
  IManager,
  IManagerEventsList,
} from 'ancient-mixins/lib/manager';

import {
  IBundle,
} from 'ancient-cursor/lib/bundle';

import {
  TCursor,
  ICursorEventsList,
} from 'ancient-cursor/lib/cursor';

import {
  TChannel,
} from 'ancient-channels/lib/channel';

import {
  Node,
  INode,
  INodeEventsList,
} from 'ancient-mixins/lib/node';

export interface IPeerBundle extends IBundle {
  cursorId: string;
}

export type TPeer =  IPeer<IPeerEventsList>;

export interface IPeerCursorQuery {
  apiQuery: any;
  query: any;
  channelId: string;
}

export interface IPeerCursor<IEventsList extends ICursorEventsList> extends INode<IEventsList> {
  query: TPeerApiQuery;
  exec(query: IPeerCursorQuery, data?: any): void;
}

export type TPeerCursor = IPeerCursor<ICursorEventsList>;

export interface IPeerQuery {
  cursorId: string;
  queryId: string;
  apiQuery: any;
  query: any;
}

export interface IPkg {
  queries?: IPeerQuery[];
  bundles?: IPeerBundle[];
  destroyed?: string[];
  [key: string]: any;
}

export interface IPeerEventData {
}

export interface IPeerEventsList extends INodeEventsList {
}

export interface IPeerApi {
  (ready: IPeerApiSend): IPeerApiCallbacks;
}

export interface IPeerApiSend {
  (channelId: string): void;
}

export interface IPeerApiCallbacks {
  getBundles(channelId: string, cursorId: string): Promise<IPeerBundle[]>|IPeerBundle[];
  gotQuery(channelId: string, query: IPeerQuery): void;
  cursorDestroyed(channelId: string, cursorId: string): void;
  channelDestroyed(channelId: string): void;
}

export type TPeerApiQuery = any;

export interface IPeerRelationsCursors {
  [cursorId: string]: TPeerApiQuery;
}
export interface IPeerRelationsChannels {
  [channelId: string]: IPeerRelationsCursors;
}
export interface IPeerPrepared {
  [channelId: string]: IPkg;
}

export type TChannelsManager = IManager<TChannel, IManagerEventsList>;
export type TCursorManager = IManager<TCursor, IManagerEventsList>;

export interface IPeer<IEventsList extends IPeerEventsList>
extends INode<IEventsList> {
  channelsManager: TChannelsManager;
  cursorsManager: TCursorManager;
  
  relations: IPeerRelationsChannels;
  prepared: IPeerPrepared;
  
  getApiCallbacks(apiQuery): Promise<IPeerApiCallbacks>;
  
  wrap(): void;
  sendQuery(cursor: TPeerCursor): void;
  ready(channelId: string): void;
  sendDestroyed(cursor: TPeerCursor): void;
  gotPkg(channelId: string, pkg: IPkg): void;
  cursorDestroyed(channelId: string, cursorId: string): void;
  channelDestroyed(channelId: string): void;
  handleQueries(channelId: string, pkg: IPkg): void;
  handleQuery(channelId: string, query: any): void;
  handleBundles(channelId: string, pkg: IPkg): void;
  handleDestroyed(channelId: string, pkg: IPkg): void;
}

export const defaultApi: IPeerApi = (ready) => {
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
    cursorDestroyed(channelId, cursorId) {},
    channelDestroyed(channelId) {},
  };
};

export function mixin<T extends TClass<IInstance>>(
  superClass: T,
): any {
  return class Peer extends superClass {
    constructor(...args) {
      super(...args);
      this.wrap();
    }
    
    relations = {};
    prepared = {};
    channelsManager: any = new Manager();
    cursorsManager: any = new Manager();
    
    getApiCallbacks(apiQuery) {
      if (!this.__api) {
        this.__api = defaultApi((channelId) => {
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
    
    async getPkg(channelId) {
      const prepared = this.prepared[channelId];
      if (prepared) {
        delete this.prepared[channelId];
        prepared.bundles = [];
        let cursorId;
        for (cursorId in this.relations[channelId]) {
          const api = await this.getApiCallbacks(this.relations[channelId][cursorId]);
          const bundles = await api.getBundles(channelId, cursorId);
          prepared.bundles.push(...bundles);
        }
        return prepared;
      }
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
    
    async cursorDestroyed(channelId, cursorId) {
      const oldApiQuery = _.get(this.relations, [channelId, cursorId]);
      _.set(this.relations, [channelId, cursorId], undefined);
      const api = await this.getApiCallbacks(oldApiQuery);
      if (api.cursorDestroyed) api.cursorDestroyed(channelId, cursorId);
    }
    
    channelDestroyed(channelId) {
      _.each(this.relations[channelId], async (apiQuery, cursorId) => {
        const api = await this.getApiCallbacks(apiQuery);
        if (api.cursorDestroyed) api.cursorDestroyed(channelId, cursorId);
        if (api.channelDestroyed) api.channelDestroyed(channelId);
      });
      _.set(this.relations, [channelId], undefined);
    }
    
    handleQueries(channelId, pkg) {
      pkg.queries.forEach((query) => {
        this.handleQuery(channelId, query);
      });
    }
    
    async handleQuery(channelId, query) {
      const oldApiQuery = _.get(this.relations, [channelId, query.cursorId]);
      _.set(this.relations, [channelId, query.cursorId], query.apiQuery);

      if (oldApiQuery && query.apiQuery !== oldApiQuery) {
        const api = await this.getApiCallbacks(oldApiQuery);
        if (api.cursorDestroyed) api.cursorDestroyed(channelId, query.cursorId);
      }

      const api = await this.getApiCallbacks(query.apiQuery);
      if (api.gotQuery) api.gotQuery(channelId, query);
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

export const MixedPeer: TClass<IPeer<IPeerEventsList>> = mixin(Node);
export class Peer extends MixedPeer {}
