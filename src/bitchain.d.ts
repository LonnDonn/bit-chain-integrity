interface BitBlock {
    index: number;
    data: Buffer;
    hash: string;
    prevHash: string | null;
}
export declare class BitChain {
    private chain;
    constructor();
    private hash;
    append(data: Buffer): BitBlock;
    verify(): boolean;
    getBlocks(): BitBlock[];
}
export {};
//# sourceMappingURL=bitchain.d.ts.map