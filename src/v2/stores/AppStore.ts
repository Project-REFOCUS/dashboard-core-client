import { GraphTypeEnum } from './../common/enum';
import { action, makeObservable, observable, runInAction } from 'mobx';
import { Category, Geography, GraphResource } from '../common/types';
import { fetchCategoriesByStates, fetchGraphUrl, fetchStatesByCategory } from '../common/services';
import { GeographyEnum } from '../common/enum';

class AppStore {

    @observable isExpanded : boolean = false;

    @observable states : Geography[] = observable.array([]);
    @observable category : Category | null = null;
    @observable stateCategoryMap : Map<string, Category[]> = observable.map();
    @observable categoryStateMap : Map<string, Geography[]> = observable.map();

    graphDashboardMap : Map<GeographyEnum | string, GraphResource[]> = observable.map();

    constructor(){
        makeObservable(this);
    }

    @action 
    setIsExpanded(isExpanded : boolean) {
        this.isExpanded = isExpanded;
    }

    @action
    setStates(states : Geography[]) : void {
        this.states = states;
    }

    @action 
    setCategory(category : Category | null, states? : Geography[]) : void {
        if(this.category){
            this.disposeUrls();
        }

        if(states){
            this.states = states;
        }
        this.category = category;
    }

    @action
    disposeUrls() : void {
        this.graphDashboardMap.clear();
    }

    @action
    async findCategoriesByStates(states : Geography[]) : Promise<Category[]> {
        const categories = await fetchCategoriesByStates(states);

        if(categories.length === 0){
            console.error("Categories not found for states: "+ JSON.stringify(states));
        }

        return categories;
    }

    @action 
    async updateStatesByCategory(category : Category) : Promise<void> {
        if(this.categoryStateMap.has(category.id)){
            // console.log(`States are already mapped for category: ${category.name}`);
            return;
        }

        await fetchStatesByCategory(category.id).then((states : Geography[]) => {
            runInAction(() => {
                this.categoryStateMap.set(category.id, states.map(state => {
                    state.type = GeographyEnum.STATE;
                    return state;
                }));
            });
        })
    }

    async findStates(category: Category) : Promise<Geography[]> {
        
        await this.updateStatesByCategory(category);
        
        // console.log("Get operation in category state map returned: for key{"+ category.id + "} "+JSON.stringify(this.categoryStateMap.get(category.id)));
        if(!this.categoryStateMap.has(category.id)){
            console.error("Error category-state map doesnt have a key associated with category: "+ category.id + " " + category.name);
            return [];
        }else{
            // @ts-ignore
            return this.categoryStateMap.get(category.id);
        }
    }

    async getGraph(targets: Geography[], targetType?: GeographyEnum, graphType?: GraphTypeEnum) : Promise<{url : string, graphOptions : GraphTypeEnum[]}>{
        const firstIndex = 0;

        const graphTargetResources: GraphResource[] = await fetchGraphUrl(this.category?.id, targetType, targets);

        const graphResourceItem = graphType ? graphTargetResources.find((graphResource) => graphResource.type === graphType) : graphTargetResources[firstIndex];

        if(!graphResourceItem){
            throw new Error("Graph Resource Item returned improper resource: " + JSON.stringify(graphResourceItem));
        }

        const graphTargetUrl : string = graphResourceItem.url;
        return { url : graphTargetUrl, graphOptions: graphTargetResources.map((graphResource)=> graphResource.type)};
    }
}

export default new AppStore();