import {BaseAttack} from './va/va';
import {Base} from '../lib/base';
import './city/city.data';
var data;

data = {"level":18.538367508695632,"name":"Outpost","x":500,"y":201,"faction":6,"owner":"The Forgotten","version":3,"player":"shockrNZ","world":325,"tiles":[null,null,null,{"id":206,"l":18},null,null,{"id":177,"l":19},null,{"id":196,"l":19},null,2,{"id":198,"l":19,"t":2},null,null,null,null,null,null,null,{"id":193,"l":18},{"id":193,"l":18},{"id":193,"l":18},2,null,null,{"id":199,"l":19,"t":1},null,null,2,2,{"id":197,"l":19},null,null,{"id":194,"l":19},null,null,null,null,null,null,null,{"id":199,"l":19,"t":1},null,1,null,{"id":195,"l":18},null,{"id":199,"l":18,"t":1},{"id":194,"l":19},{"id":194,"l":18},{"id":194,"l":19},{"id":194,"l":18},null,null,null,null,{"id":199,"l":19,"t":1},null,{"id":207,"l":19},{"id":199,"l":19,"t":1},null,2,null,null,{"id":207,"l":18},null,null,null,null,null,null,null,null,{"id":180,"l":18},null,null,{"id":188,"l":18},null,null,null,5,null,null,{"id":184,"l":19},null,7,{"id":188,"l":19},null,null,5,{"id":187,"l":18},null,6,null,null,null,{"id":186,"l":19},null,{"id":189,"l":18},4,4,{"id":210,"l":19},null,{"id":210,"l":19},7,null,{"id":185,"l":18},5,null,{"id":180,"l":19},null,{"id":191,"l":18},{"id":191,"l":18},{"id":191,"l":18},4,null,{"id":180,"l":19},null,{"id":186,"l":19},6,6,null,{"id":210,"l":19},{"id":180,"l":19},null,null,4,null,null,{"id":185,"l":19},null,null,null,5,5,4,null,null,null,6,6,6,null,{"id":189,"l":19}],"upgrades":[]}

var base  = Base.load(data);
var BA = new BaseAttack(base);
//BaseAttack.attack(base);

console.log(BA.attack());