import { AllianceMemberOnlineState, ClientLibStatic } from '@cncta/clientlib';
import { StModuleBase } from '../module.base';
import { ClientLibPatch, Duration } from '@cncta/util';

declare const ClientLib: ClientLibStatic;

export class PlayerStatus extends StModuleBase {
    name = 'PlayerStatus';
    patch = new ClientLibPatch('ClientLib.Data.BaseColors');

    static PlayerColor: Record<AllianceMemberOnlineState, string> = {
        [AllianceMemberOnlineState.Online]: '#76ff03',
        [AllianceMemberOnlineState.Away]: '#ffd600',
        [AllianceMemberOnlineState.Offline]: '#5a5653',
        [AllianceMemberOnlineState.Hidden]: '#ffff00', // Does anyone every hide?
    };
    async onStart() {
        // Lookup the name of the 'get_BaseColors' function to patch
        const patchKey = ClientLibPatch.extractValueFromFunction(
            window,
            'ClientLib.Vis.Region.RegionCity',
            'Color=',
            /.*\.([A-Z]{6})\(this.*Color=.*/,
        );
        this.patch.replaceFunction(patchKey, PlayerStatus.getPlayerColor);
        this.patch.patch();

        const alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
        this.addEvent(alliance, 'Change', ClientLib.Data.AllianceChange, this.allianceChange);
        // Refresh member data every 30 seconds
        this.interval(() => alliance.RefreshMemberData(), Duration.seconds(30));
    }

    allianceChange() {
        ClientLib.Vis.VisMain.GetInstance()
            .get_Region()
            .SetColorDirty();
    }

    async onStop() {
        this.patch.remove();
    }

    static getPlayerColor(playerId: number, allianceId: number) {
        const md = ClientLib.Data.MainData.GetInstance();
        const alliance = md.get_Alliance();
        const myAllianceId = alliance.get_Id();
        // Color for my base
        if (md.get_Player().id == playerId) {
            return '#000000';
        }

        // Color for alliance bases
        if (myAllianceId > 0 && myAllianceId == allianceId) {
            const memberData = alliance.get_MemberData().d[playerId];
            if (memberData != null) {
                return PlayerStatus.PlayerColor[memberData.OnlineState];
            }
            return '#c8c800';
        }

        // Color for other alliances
        switch (md.get_Alliance().GetRelation(allianceId)) {
            case ClientLib.Data.EAllianceDiplomacyStatus.Friend:
                return '#76ff03';
            case ClientLib.Data.EAllianceDiplomacyStatus.NAP:
                return '#bbdefb';
            case ClientLib.Data.EAllianceDiplomacyStatus.Foe:
                return '#f44336';
        }

        return '#ffffff';
    }
}
