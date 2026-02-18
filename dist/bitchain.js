"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitChain = void 0;
const crypto_1 = __importDefault(require("crypto"));
class BitChain {
    constructor() {
        this.chain = [];
    }
    hash(data, prevHash) {
        const h = crypto_1.default.createHash("sha256");
        h.update(data);
        if (prevHash) {
            h.update(prevHash);
        }
        return h.digest("hex");
    }
    append(data) {
        const prev = this.chain.length > 0 ? this.chain[this.chain.length - 1] : null;
        const prevHash = prev ? prev.hash : null;
        const block = {
            index: this.chain.length,
            data,
            hash: this.hash(data, prevHash),
            prevHash,
        };
        this.chain.push(block);
        return block;
    }
    verify() {
        for (let i = 0; i < this.chain.length; i++) {
            const block = this.chain[i];
            const expectedHash = this.hash(block.data, block.prevHash);
            if (expectedHash !== block.hash) {
                console.error(`Block ${i} corrupted`);
                return false;
            }
            if (i > 0) {
                const prev = this.chain[i - 1];
                if (block.prevHash !== prev.hash) {
                    console.error(`Block ${i} chain broken`);
                    return false;
                }
            }
        }
        return true;
    }
    getBlocks() {
        return [...this.chain];
    }
}
exports.BitChain = BitChain;
// Demo run
if (require.main === module) {
    const chain = new BitChain();
    chain.append(Buffer.from("Hello"));
    chain.append(Buffer.from("World"));
    chain.append(Buffer.from("Edge"));
    console.log("Valid chain:", chain.verify());
    // Simulate corruption
    chain.getBlocks()[1].data = Buffer.from("Corrupted");
    console.log("After corruption:", chain.verify());
}
