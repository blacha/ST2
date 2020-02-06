import { ChatWidgetChannel, QxStatic, WebFrontEndStatic } from '@cncta/clientlib';
import { St } from './st';
import { StCliConfigList, StCliConfigSet, StCliDisable, StCliEnable } from './st.config.cli';
import { StPlugin } from './st.plugin';

declare const qx: QxStatic;
declare const webfrontend: WebFrontEndStatic;

export interface StCliCommand {
    cmd: string;
    handle(st: St, args: string[]): void;
}

export class StCli extends StPlugin {
    StSlashCommand = '/st';
    name = 'Cli';
    priority = 50;

    commands: Record<string, StCliCommand> = {};

    get inputEl() {
        return qx.core.Init.getApplication()
            .getChat()
            .getChatWidget()
            .getEditable()
            .getContentElement()
            .getDomElement() as HTMLInputElement;
    }

    async onStart() {
        this.inputEl.addEventListener('keydown', this.handleKeyDown);
        this.cli(StCliEnable);
        this.cli(StCliDisable);
        this.cli(StCliConfigSet);
        this.cli(StCliConfigList);
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
        const parts = el.value.trim().split(' ');
        const cmd = (parts[1] ?? '').toLowerCase();
        if (this.commands[cmd] == null) {
            this.sendMessage('red', 'Invalid command, Options: ' + Object.keys(this.commands).join(', '));
        } else {
            this.sendMessage('white', '[ST] ' + parts.join(' '));
            this.commands[cmd].handle(this.st, parts.slice(2));
        }
        el.value = '';
        el.focus();
        setTimeout(() => el.focus(), 5);
        e.preventDefault();
        return false;
    };

    register(cmd: StCliCommand) {
        this.commands[cmd.cmd] = cmd;
    }

    unregister(cmd: StCliCommand) {
        delete this.commands[cmd.cmd];
    }

    sendMessage(color: string, msg: string) {
        const s = `<font color="${color}">${msg}</font>`;
        qx.core.Init.getApplication()
            .getChat()
            .getChatWidget()
            .showMessage(s, webfrontend.gui.chat.ChatWidget.sender.system, ChatWidgetChannel.allflags);
    }

    createCoOrd(x: number, y: number) {
        return `<a style="color:${webfrontend.gui.util.BBCode.clrLink}; cursor: pointer;" onClick="webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow(${x}, ${y});">${x}:${y}</a>`;
    }

    async onStop() {
        this.inputEl.removeEventListener('keydown', this.handleKeyDown);
    }
}
