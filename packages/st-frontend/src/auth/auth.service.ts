import { FireAuthGoogle, FireAuth } from '../firebase';
import { observable, action } from 'mobx';
import { User } from 'firebase';
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
        this.isReady = true;
        this.user.set(u);
    }

    get isLoggedIn() {
        return this.user.get() != null;
    }

    get isLoading() {
        return this._login != null;
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
