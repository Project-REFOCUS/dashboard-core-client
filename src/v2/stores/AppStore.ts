import { GraphTypeEnum } from './../common/enum';
import { action, makeObservable, observable, runInAction } from 'mobx';
import { Category, Geography, GraphResource } from '../common/types';
import { fetchCategoriesByState, fetchGraphUrl, fetchStatesByCategory } from '../common/services';
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
    async updateCategoriesByStates(states : Geography[]) : Promise<void> {
        const subjectStates : Geography[] = states.filter((state) => {
            return !this.stateCategoryMap.has(state.name);
        });
        
        if(subjectStates.length === 0){
            // console.log(`Categories are already mapped for states: ${JSON.stringify(states)}`);
            return;
        }
        
        await Promise.all(subjectStates.map( async(state) => {
            const categories = await fetchCategoriesByState(state);
            runInAction(() => {
                this.stateCategoryMap.set(state.name, categories);
                console.log("Added to state category map: key{" + state.name + "} " + JSON.stringify(this.stateCategoryMap.get(state.name)));
            });
        }));
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

    async getMapCategories(states: Geography[]) : Promise<Category[]> {

        await this.updateCategoriesByStates(states);
            
        // @ts-ignore
        const categoriesForEachState : Category[][] = states.map((state) => {
            // console.log("Get operation in state category map returned: for key{"+ state.name + "} "+ JSON.stringify(this.stateCategoryMap.get(state.name)));
            if(!this.stateCategoryMap.has(state.name)){
                console.error("Error state-category map doesnt have a key associated with state: "+ state.name);
                return [];
            }else {
                console.log("State-category value: ", this.stateCategoryMap.get(state.name));
                return this.stateCategoryMap.get(state.name);
            }
        });

        console.log("Value of sorted flat: " + JSON.stringify(categoriesForEachState));

        const subjectCategories = categoriesForEachState.flat();
        const quantityMap = new Map<string, number>();
        const goalQuantity = states.length;

        // subjectCategories.forEach(category => {
        //     const subject = JSON.stringify(category);
        //     const quantity = quantityMap.get(subject) || 0;
        //     quantityMap.set(subject, quantity + 1);
        //     return category;
        // });

        console.log("Value of sorted flat: " + JSON.stringify(subjectCategories) + "and the quantityMap: "+ JSON.stringify(quantityMap));

        const uniqueCategoryArray = subjectCategories.filter((category) => {
            const subject = JSON.stringify(category);
            const quantity = (quantityMap.get(subject) || 0) + 1;
            quantityMap.set(subject, quantity);

            if(quantity === goalQuantity){
                return true;
            }else if(quantity > goalQuantity){  //not likely
                console.error("Error finding the similar categories. More categories than expected");
            }

            return false;
        });

        if(uniqueCategoryArray.length === 0){
            console.error("Error finding the similar categories. Something went wrong");
        }

        return uniqueCategoryArray;
    }

    async getMapStates(category: Category) : Promise<Geography[]> {
        
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