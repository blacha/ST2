import { Errors } from 'io-ts';

export interface V2ValidationReport {
    path: string;
    value?: unknown;
    reason: 'invalid';
}

function report(errors: Errors): V2ValidationReport[] {
    const output: V2ValidationReport[] = [];
    for (const e of errors) {
        output.push({
            reason: 'invalid',
            value: e.value,
            path: e.context
                .slice(1)
                .map(c => c.key)
                .join('.'),
        });
    }
    return output;
}

export const V2Report = {
    report,
};
