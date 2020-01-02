import { GameDataResearchLevel, GameDataUnitId } from '@cncta/clientlib';
import { Faction, GameDataObject } from '@st/shared';
import Typography from 'antd/es/typography';
import { style } from 'typestyle';
import { UnitIcon, UnitUpgradeIcon } from '../base/units';
import React = require('react');

const { Title } = Typography;

export interface GameResearch {
    offense: GameDataUnitId[];
    defense: GameDataUnitId[];
}
export const NodResearch: GameResearch = {
    offense: [
        GameDataUnitId.NodMilitants,
        GameDataUnitId.NodReckoner,
        GameDataUnitId.NodVenom,
        GameDataUnitId.NodMilitantRocketSoldiers,
        GameDataUnitId.NodAttackBike,
        GameDataUnitId.NodBlackHand,
        GameDataUnitId.NodVertigo,
        GameDataUnitId.NodScorpionTank,
        GameDataUnitId.NodSpecter,
        GameDataUnitId.NodCobra,
        GameDataUnitId.NodCommando,
        GameDataUnitId.NodAvatar,
        GameDataUnitId.NodConfessor,
        GameDataUnitId.NodSalamander,
    ],
    defense: [
        GameDataUnitId.NodDefMGNest,
        GameDataUnitId.NodDefAttackBike,
        GameDataUnitId.NodDefBarbwire,
        GameDataUnitId.NodDefBlackHand,
        GameDataUnitId.NodDefFlak,
        GameDataUnitId.NodDefMilitantRocketSoldiers,
        GameDataUnitId.NodDefAntitankBarrier,
        GameDataUnitId.NodDefConfessor,
        GameDataUnitId.NodDefCannon,
        GameDataUnitId.NodDefReckoner,
        GameDataUnitId.NodDefArtTank,
        GameDataUnitId.NodDefArtAir,
        GameDataUnitId.NodDefArtInf,
    ],
};
export const GdiResearch: GameResearch = {
    offense: [
        GameDataUnitId.GdiRiflemen,
        GameDataUnitId.GdiAPCGuardian,
        GameDataUnitId.GdiPaladin,
        GameDataUnitId.GdiPitbull,
        GameDataUnitId.GdiMissileSquad,
        GameDataUnitId.GdiPredator,
        GameDataUnitId.GdiFirehawk,
        GameDataUnitId.GdiZoneTrooper,
        GameDataUnitId.GdiCommando,
        GameDataUnitId.GdiOrca,
        GameDataUnitId.GdiJuggernaut,
        GameDataUnitId.GdiSniperTeam,
        GameDataUnitId.GdiMammoth,
        GameDataUnitId.GdiKodiak,
    ],
    defense: [
        GameDataUnitId.GdiDefPredator,
        GameDataUnitId.GdiDefMissileSquad,
        GameDataUnitId.GdiAntitankBarrier,
        GameDataUnitId.GdiDefAPCGuardian,
        GameDataUnitId.GdiCannon,
        GameDataUnitId.GdiDefPitbull,
        GameDataUnitId.GdiBarbwire,
        GameDataUnitId.GdiDefSniperTeam,
        GameDataUnitId.GdiFlak,
        GameDataUnitId.GdiDefZoneTrooper,
        GameDataUnitId.GdiDefArtInf,
        GameDataUnitId.GdiDefArtTank,
        GameDataUnitId.GdiDefArtAir,
    ],
};

export interface ViewResearchProps {
    faction: Faction;
    upgrades: Partial<Record<GameDataUnitId, GameDataResearchLevel>>;
    style: 'icon' | 'square';
}

export class ViewResearch extends React.Component<ViewResearchProps> {
    cssContainer = style({ display: 'flex' });

    getResearch(): GameResearch {
        if (this.props.faction == Faction.Nod) {
            return NodResearch;
        }
        if (this.props.faction == Faction.Gdi) {
            return GdiResearch;
        }
        throw new Error('Invalid research');
    }
    render() {
        const research = this.getResearch();
        return (
            <React.Fragment>
                <div className={this.cssContainer}>
                    {research.offense.map(unitId => (
                        <ViewResearchUnit
                            key={unitId}
                            unitId={unitId}
                            level={this.props.upgrades[unitId] ?? GameDataResearchLevel.NotResearched}
                            style={this.props.style}
                        />
                    ))}
                </div>
                <div className={this.cssContainer}>
                    {research.defense.map(unitId => (
                        <ViewResearchUnit
                            key={unitId}
                            unitId={unitId}
                            level={this.props.upgrades[unitId] ?? GameDataResearchLevel.NotResearched}
                            style={this.props.style}
                        />
                    ))}
                </div>
            </React.Fragment>
        );
    }
}

export interface ViewResearchUnitProps {
    unitId: GameDataUnitId;
    level: GameDataResearchLevel;
    style: 'icon' | 'square';
}

export class ViewResearchUnit extends React.Component<ViewResearchUnitProps> {
    cssContainerSquare = style({ width: 8, height: 8, backgroundColor: 'rgba(9,109,217,0.87)', margin: 2 });
    cssContainerIcon = style({ width: '64px', height: 64, position: 'relative', padding: 8 });
    cssDisabled = style({ filter: 'greyscale(1)', opacity: 0.3 });
    cssSquareUpgraded = style({ backgroundColor: 'rgba(250,173,20,0.87)' });
    cssSquareDisabled = style({ backgroundColor: 'rgba(0,0,0,0.15)' });

    renderIcon() {
        const classNames = [this.cssContainerIcon];
        if (this.props.level == GameDataResearchLevel.NotResearched) {
            classNames.push(this.cssDisabled);
        }

        return (
            <div className={classNames.join(' ')} title={GameDataObject.getById(this.props.unitId).data.display}>
                <UnitIcon unitId={this.props.unitId} />
                <UnitUpgradeIcon isUpgraded={this.props.level == GameDataResearchLevel.Upgraded} />
            </div>
        );
    }

    render() {
        if (this.props.style == 'icon') {
            return this.renderIcon();
        }

        let title = GameDataObject.getById(this.props.unitId).data.display;
        const classNames = [this.cssContainerSquare];
        if (this.props.level == GameDataResearchLevel.NotResearched) {
            title += ' (Not Researched)';
            classNames.push(this.cssSquareDisabled);
        } else if (this.props.level == GameDataResearchLevel.Upgraded) {
            classNames.push(this.cssSquareUpgraded);
            title += ' (Upgraded)';
        }
        return <div className={classNames.join(' ')} title={title}></div>;
    }
}
