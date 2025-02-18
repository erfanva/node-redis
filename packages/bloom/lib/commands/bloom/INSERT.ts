import { pushVerdictArguments } from '@redis/client/dist/lib/commands/generic-transformers';

export const FIRST_KEY_INDEX = 1;

interface InsertOptions {
    CAPACITY?: number;
    ERROR?: number;
    EXPANSION?: number;
    NOCREATE?: true;
    NONSCALING?: true;
}

export function transformArguments(
    key: string,
    items: string | Array<string>,
    options?: InsertOptions
): Array<string> {
    const args = ['BF.INSERT', key];

    if (options?.CAPACITY) {
        args.push('CAPACITY', options.CAPACITY.toString());
    }

    if (options?.ERROR) {
        args.push('ERROR', options.ERROR.toString());
    }

    if (options?.EXPANSION) {
        args.push('EXPANSION', options.EXPANSION.toString());
    }

    if (options?.NOCREATE) {
        args.push('NOCREATE');
    }

    if (options?.NONSCALING) {
        args.push('NONSCALING');
    }

    args.push('ITEMS');
    pushVerdictArguments(args, items);

    return args;
}

export { transformBooleanArrayReply as transformReply } from '@redis/client/dist/lib/commands/generic-transformers';
