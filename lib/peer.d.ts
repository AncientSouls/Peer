import { TClass, IInstance } from 'ancient-mixins/lib/mixins';
import { IManager, IManagerEventsList } from 'ancient-mixins/lib/manager';
import { IBundle } from 'ancient-cursor/lib/bundle';
import { TCursor, ICursorEventsList } from 'ancient-cursor/lib/cursor';
import { TChannel } from 'ancient-channels/lib/channel';
import { INode, INodeEventsList } from 'ancient-mixins/lib/node';
export interface IPeerBundle extends IBundle {
    cursorId: string;
}
export declare type TPeer = IPeer<IPeerEventsList>;
export interface IPeerCursorQuery {
    apiQuery: any;
    query: any;
    channelId: string;
}
export interface IPeerCursor<IEventsList extends ICursorEventsList> extends INode<IEventsList> {
    query: TPeerApiQuery;
    exec(query: IPeerCursorQuery, data?: any): void;
}
export declare type TPeerCursor = IPeerCursor<ICursorEventsList>;
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
    getBundles(channelId: string, cursorId: string): Promise<IPeerBundle[]> | IPeerBundle[];
    gotQuery(channelId: string, query: IPeerQuery): void;
    cursorDestroyed(channelId: string, cursorId: string): void;
    channelDestroyed(channelId: string): void;
}
export declare type TPeerApiQuery = any;
export interface IPeerRelationsCursors {
    [cursorId: string]: TPeerApiQuery;
}
export interface IPeerRelationsChannels {
    [channelId: string]: IPeerRelationsCursors;
}
export interface IPeerPrepared {
    [channelId: string]: IPkg;
}
export declare type TChannelsManager = IManager<TChannel, IManagerEventsList>;
export declare type TCursorManager = IManager<TCursor, IManagerEventsList>;
export interface IPeer<IEventsList extends IPeerEventsList> extends INode<IEventsList> {
    channelsManager: TChannelsManager;
    cursorsManager: TCursorManager;
    relations: IPeerRelationsChannels;
    prepared: IPeerPrepared;
    getApiCallbacks(apiQuery: any): Promise<IPeerApiCallbacks>;
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
export declare const defaultApi: IPeerApi;
export declare function mixin<T extends TClass<IInstance>>(superClass: T): any;
export declare const MixedPeer: TClass<IPeer<IPeerEventsList>>;
export declare class Peer extends MixedPeer {
}
