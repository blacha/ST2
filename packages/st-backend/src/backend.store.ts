import { Store, ModelBotConfig } from '@st/model';

export const BackEndStore = {
    BotConfig: new Store('BotConfig', ModelBotConfig),
};
