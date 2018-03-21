import { TClass, IInstance } from 'ancient-mixins/lib/mixins';
import { ICursorEventsList } from 'ancient-cursor/lib/cursor';
import { IPkg } from 'ancient-channels/lib/channel';
import { ICursorBundle, TCursorsManager } from 'ancient-cursor/lib/cursors-manager';
import { TChannelsManager } from 'ancient-channels/lib/channels-manager';
import { INode, INodeEventsList } from 'ancient-mixins/lib/node';
declare type TPeer = IPeer<IPeerEventsList>;
interface IPeerCursorQuery {
    apiQuery: any;
    query: any;
    channelId: string;
}
interface IPeerCursor<IEventsList extends ICursorEventsList> extends INode<IEventsList> {
    query: TPeerApiQuery;
    exec(query: IPeerCursorQuery, data?: any): void;
}
declare type TPeerCursor = IPeerCursor<ICursorEventsList>;
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
declare type TPeerApiQuery = any;
interface IPeerRelationsCursors {
    [cursorId: string]: TPeerApiQuery;
}
interface IPeerRelationsChannels {
    [channelId: string]: IPeerRelationsCursors;
}
interface IPeer<IEventsList extends IPeerEventsList> extends INode<IEventsList> {
    channelsManager: TChannelsManager;
    cursorsManager: TCursorsManager;
    relations: IPeerRelationsChannels;
    getApiCallbacks(apiQuery: any, callback: (api: IPeerApiCallbacks) => void): void;
    connect(peer: TPeer): string;
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
declare const defaultApi: IPeerApi;
declare function mixin<T extends TClass<IInstance>>(superClass: T): any;
declare const MixedPeer: TClass<IPeer<IPeerEventsList>>;
declare class Peer extends MixedPeer {
}
export { mixin as default, mixin, MixedPeer, Peer, IPeer, IPeerEventData, IPeerEventsList, TPeer, IPeerQuery, IPeerPkg, IPeerApi, IPeerCursor, IPeerCursorQuery, TPeerCursor, IPeerApiSendBundles, IPeerApiCallbacks, IPeerRelationsChannels, IPeerRelationsCursors, TPeerApiQuery, defaultApi };
