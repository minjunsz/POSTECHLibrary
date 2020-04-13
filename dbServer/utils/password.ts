import argon2 from 'argon2';

export async function encrypt(plainText: string): Promise<string> {
    return await argon2.hash(plainText);
}

export async function compare(hash: string, plainText: string): Promise<boolean> {
    return await argon2.verify(hash, plainText);
}
