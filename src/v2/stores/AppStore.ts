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

    @action setCategory = (category : Category | null) : void => {
        this.category = category;
        console.log("Category value: "+ JSON.stringify(this.category));
    }

    // @action getIndicatorCategories : () => Promise<Category[]> = () => {
    //     return new Promise((resolve) => {
    //         this.categoryLegend = mockCategories;
    //         resolve(mockCategories);
    //     });
    // };

    // @action getListOfStatesWithCategory : () => Promise<GeoCategory[]> = () =>
    //     new Promise<GeoCategory[]> ((resolve) => {
    //         this.stateCategoryLegend = mockGeoCategories;
    //         resolve(mockGeoCategories);
    //     }
    // );

}

const appStore = new AppStore();
export default appStore;