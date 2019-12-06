
import * as React from 'react';
import { Link } from 'react-router-dom';

const ExampleBaseString = `3|N|N|s-B|10b8r10p11p11p9r12y.15e.t10p18a11p11h....9r11p11p11p9r12s11h10d.ccc7r9r12s.......11h.11nc..t...14s.......11n.11h..........j..................kk.ll.kk....d..........k..jjjwjj.........hh.h.ll......9z12z14m13m9v11v11v12v.9q......10t........11tq.......15t|11968|8000|0|28|14|25|25|newEconomy`;

export class ViewLandingPage extends React.Component {

    render() {
        return (<div>
            Hello World
            <div>
                <Link to={`/base/${ExampleBaseString}`}>Link</Link>
            </div>
        </div>)
    }
}
