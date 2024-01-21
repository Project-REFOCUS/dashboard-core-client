import { action, computed, makeObservable, observable } from 'mobx';
import { Category, Geography, GeoCategory } from '../common/types';
import { mockCategories, mockGeoCategories } from '../common/mockData';
import { GeographyEnum } from '../common/enum';
import { GeoTreeNode } from '../common/classes';


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