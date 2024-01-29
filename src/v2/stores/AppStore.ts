import { action, makeObservable, observable } from 'mobx';
import { Category, Geography } from '../common/types';

class AppStore {

    @observable isExpanded : boolean = false;

    @observable states : Geography[] = [];
    @observable category : Category | null = null;

    constructor(){
        makeObservable(this);
    }

    @action setStates = (states : Geography[]) : void => {
        this.states = states;
    }

    @action setIsExpanded = (isExpanded : boolean) => {
        this.isExpanded = isExpanded;
    }

    @action setCategory = (category : Category) => {
        this.category = category;
    }

}

const appStore = new AppStore();
export default appStore;