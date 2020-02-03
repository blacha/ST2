import { StModuleBase } from './module.base';
import { QxStatic, WebFrontEndStatic, ChatWidgetChannel } from '@cncta/clientlib';

declare const qx: QxStatic;
declare const webfrontend: WebFrontEndStatic;

export class StCli extends StModuleBase {
    StSlashCommand = '/st';
    name = 'Cli';

    commands: Record<string, (args: string[]) => string | void> = {};

    get inputEl() {
        return qx.core.Init.getApplication()
            .getChat()
            .getChatWidget()
            .getEditable()
            .getContentElement()
            .getDomElement() as HTMLInputElement;
    }

    async onSart() {
        this.inputEl.addEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (e: KeyboardEvent) => {
        if (e.key != 'Enter') {
            return;
        }

        const el = this.inputEl;
        if (!el.value.startsWith(this.StSlashCommand)) {
            return;
        }

        // Parse CLI args
        const parts = el.value.split(' ');
        const cmd = parts[1].toLowerCase();
        if (this.commands[cmd] == null) {
            this.sendMessage('red', 'Invalid command, Options: ' + Object.keys(this.commands).join(', '));
        }
        const res = this.commands[cmd](parts.slice(1));
        if (res) {
            this.sendMessage('red', 'Error: ' + res);
        }

        this.inputEl.value = '';
        return false;
    };

    register(cmd: string, cb: (args: string[]) => string | void) {
        this.commands[cmd] = cb;
    }

    sendMessage(color: string, msg: string) {
        const s = `<font color="${color}"><i>${msg}</i></font>`;
        qx.core.Init.getApplication()
            .getChat()
            .getChatWidget()
            .showMessage(s, webfrontend.gui.chat.ChatWidget.sender.system, ChatWidgetChannel.all);
    }

    async onStop() {
        this.inputEl.removeEventListener('keydown', this.handleKeyDown);
    }
}
