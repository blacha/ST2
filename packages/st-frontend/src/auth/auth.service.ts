import { FireAuthGoogle, FireAuth } from '../firebase';
import { observable, action } from 'mobx';
import { User } from 'firebase';
import { UId } from '@st/model';
import { StLog } from '@st/shared';

export class AuthService {
    auth = FireAuth;
    provider = FireAuthGoogle;

    user = observable.box<User | null>(undefined);

    @observable
    isReady = false;

    constructor() {
        this.auth.onAuthStateChanged(
            user => this.setUser(user),
            err => console.log(err),
        );
    }

    @action
    setUser(u: User | null) {
        StLog.info({ user: u?.uid }, 'UserUpdate');
        this.isReady = true;
        this.user.set(u);
    }

    async getToken() {
        return this.auth.currentUser?.getIdToken();
    }

    get isLoggedIn() {
        return this.user.get() != null;
    }

    get isLoading() {
        return this._login != null;
    }

    get uid(): UId | null {
        const user = this.user.get();
        if (user == null) {
            return null;
        }
        return user.uid as UId;
    }

    _login: Promise<boolean> | null;
    login() {
        if (this._login == null) {
            this._login = this.auth.signInWithPopup(this.provider).then(c => {
                this._login = null;
                return c != null;
            });
        }

        return this._login;
    }

    logout() {
        this.auth.signOut().then(() => this.setUser(null));
    }
}

export const Auth = new AuthService();
