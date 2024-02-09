import { action, makeObservable, observable, runInAction } from 'mobx';
import { Category, Geography } from '../common/types';
import { fetchCategoriesByState, fetchStatesByCategory } from '../common/services';
import { GeographyEnum } from '../common/enum';

class AppStore {

    @observable isExpanded : boolean = false;

    @observable states : Geography[] = [];
    @observable category : Category | null = null;
    @observable stateCategoryMap : Map<string, Category[]> = observable.map();
    @observable categoryStateMap : Map<string, Geography[]> = observable.map();

    constructor(){
        makeObservable(this);
    }

    @action
    setStates(states : Geography[]) : void {
        this.states = states;
    }

    @action 
    setIsExpanded(isExpanded : boolean) {
        this.isExpanded = isExpanded;
    }

    @action 
    setCategory(category : Category | null) : void {
        this.category = category;
    }

    @action
    async updateCategoriesByStates(states : Geography[]) : Promise<void> {
        console.log("Here is the states array: "+ JSON.stringify(states));
        const subjectStates : Geography[] = states.filter((state) => {
            console.log(`Categories are already mapped for states: ${JSON.stringify(states)}`);
            return !this.stateCategoryMap.has(state.id);
        });

        if(subjectStates.length === 0){
            return;
        }
        
        await Promise.all(subjectStates.map(async(state) => {
            const categories = await fetchCategoriesByState(state);
            runInAction(() => {
                this.stateCategoryMap.set(state.id, categories);
                console.log("Added to state category map: key{"+ state.id + "} "+JSON.stringify(this.stateCategoryMap.get(state.id)));
            });

        }));
    }


    @action 
    async updateStatesByCategory(category : Category) : Promise<void> {
        console.log("Here is the category array: "+ JSON.stringify(category));
        if(this.categoryStateMap.has(category.id)){
            console.log(`States are already mapped for category: ${category.name}`);
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

            console.log("Get operation in state category map returned: for key{"+ state.id + "} "+JSON.stringify(this.stateCategoryMap.get(state.id)));
            if(!this.stateCategoryMap.has(state.id)){
                console.error("Error state-category map doesnt have a key associated with state: "+ state.id + " " + state.name);
                return [];
            }else{
                return this.stateCategoryMap.get(state.id);
            }

        });

        const subjectCategories = categoriesForEachState.flat();
        const idSet = new Set<string>();
        const uniqueCategorySet = subjectCategories.filter((category) => {
            if(idSet.has(category.id)){
                return false;
            }else{
                idSet.add(category.id);
                return true
            }
        });
        // console.log(`Category values should be unique: ${JSON.stringify(Array.from(uniqueCategorySet))}`);
        return Array.from(uniqueCategorySet);
    }

    async getMapStates(category: Category) : Promise<Geography[]> {
        
        await this.updateStatesByCategory(category);
        
        console.log("Get operation in category state map returned: for key{"+ category.id + "} "+JSON.stringify(this.categoryStateMap.get(category.id)));
        if(!this.categoryStateMap.has(category.id)){
            console.error("Error category-state map doesnt have a key associated with category: "+ category.id + " " + category.name);
            return [];
        }else{
            // @ts-ignore
            return this.categoryStateMap.get(category.id);
        }
    }
}

const appStore = new AppStore();
export default appStore;