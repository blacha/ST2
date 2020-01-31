export type CityId = number & { _cityId: never };
export type WorldId = number & { _worldId: never };

export type AllianceId = number & { _allianceId: never };
export type AllianceName = string & { _allianceName: never };

export type PlayerId = number & { _playerId: never };

export type PlayerNameDisplay = string & { _playerNameDisplay: never };
/** Player names are not case sensitive */
export type PlayerNameId = string & { _playerNameId: never };

export type TimeStamp = number & { _timeStamp: never };

export type MailId = number & { _mailId: never };

export type CompositeId<T> = string & { _t: T };
