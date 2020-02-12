import * as o from 'ospec';
import { CustomClaims, CustomUserClaims } from '../custom.claims';
import { WorldId } from '@cncta/clientlib';
import { UId } from '@st/model';

o.spec('CustomClaims', () => {
    const uid = 'uid' as UId;
    const worldIdA = 410 as WorldId;

    o('should add a claim', () => {
        const claims: CustomUserClaims = {};
        const toAdd = ['c6A6'];

        const hasChanges = CustomClaims.updateClaim(uid, worldIdA, claims, toAdd);
        o(hasChanges).equals(true);
        o(claims).deepEquals({ c6A6: true });
    });

    o('should remove existing claims', () => {
        const claims: CustomUserClaims = { c6a1: true };
        const hasChanges = CustomClaims.updateClaim(uid, worldIdA, claims, []);
        o(hasChanges).equals(true);
        o(claims).deepEquals({});
    });

    o('should only remove claims from current world', () => {
        const claims: CustomUserClaims = { c6a1: true, c7a1: true };
        const hasChanges = CustomClaims.updateClaim(uid, worldIdA, claims, []);
        o(hasChanges).equals(true);
        o(claims).deepEquals({ c7a1: true });
    });

    o('should remove multiple claims from current world', () => {
        const claims: CustomUserClaims = { c6a1: true, c7a1: true, c6a2: true, c6a5: true };
        const hasChanges = CustomClaims.updateClaim(uid, worldIdA, claims, []);
        o(hasChanges).equals(true);
        o(claims).deepEquals({ c7a1: true });
    });

    o('should add and remove a bunch of claims', () => {
        const claims: CustomUserClaims = { c6a1: true, c7a1: true, c6a2: true, c6a5: true };
        const toAdd = ['c6A6', 'c6A88', 'c60', 'c677'];
        const hasChanges = CustomClaims.updateClaim(uid, worldIdA, claims, toAdd);
        o(hasChanges).equals(true);
        o(claims).deepEquals({ c7a1: true, c6A6: true, c6A88: true, c60: true, c677: true });
    });

    o('should not have changes if nothing to do', () => {
        const claims: CustomUserClaims = { c6A6: true };
        const toAdd = ['c6A6'];
        const hasChanges = CustomClaims.updateClaim(uid, worldIdA, claims, toAdd);
        o(hasChanges).equals(false);
        o(claims).deepEquals({ c6A6: true });
    });
});
