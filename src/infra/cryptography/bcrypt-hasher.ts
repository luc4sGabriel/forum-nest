import { HashComparer } from "@/domain/forum/application/cryptorgraphy/hash-comparer";
import { HashGenerator } from "@/domain/forum/application/cryptorgraphy/hash-generator";
import { hash, compare } from "bcryptjs";

export class BcryptHasher implements HashGenerator, HashComparer {
    private HASH_SALT_LENGTH = 8;

    async hash(plain: string) {
        return hash(plain, this.HASH_SALT_LENGTH);
    }

    async compare(plain: string, hash: string){
        return compare(plain, hash);
    }

}