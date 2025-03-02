/// <reference types="node" />
import { EventEmitter } from 'events';
import { StreamReader } from './StreamReader';
import http from 'http';
export interface ParserOptions {
    autoUpdate: boolean;
    emptyInterval: number;
    errorInterval: number;
    keepListen: boolean;
    metadataInterval: number;
    notifyOnChangeOnly: boolean;
    url: string;
    userAgent: string;
    additionalHeaders: {
        [key: string]: string;
    };
}
export interface ParserEvents {
    'empty': () => void;
    'end': () => void;
    'error': (error: Error) => void;
    'metadata': (metadata: Map<string, string>) => void;
    'stream': (stream: StreamReader) => void;
}
export declare interface Parser {
    emit: <T extends keyof ParserEvents>(event: T, ...args: Parameters<ParserEvents[T]>) => boolean;
    on: <T extends keyof ParserEvents>(event: T, listener: ParserEvents[T]) => this;
}
export declare class Parser extends EventEmitter {
    private previousMetadata;
    private readonly options;
    constructor(options: Partial<ParserOptions>);
    protected onRequestResponse(response: http.IncomingMessage): void;
    protected onRequestError(error: Error): void;
    protected onSocketEnd(): void;
    protected makeRequest(): void;
    protected destroyResponse(response: http.IncomingMessage): void;
    protected queueNextRequest(timeout: number): void;
    protected queueRequest(timeout?: number): void;
    protected isMetadataChanged(metadata: Map<string, string>): boolean;
}
//# sourceMappingURL=Parser.d.ts.map