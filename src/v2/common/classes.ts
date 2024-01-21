import { GeographyEnum } from "./enum";
import { Geography } from "./types";

export class GeoTreeNode {
    parent : GeoTreeNode | null;
    geography : Geography;
    filters : GeographyEnum[];
    children : GeoTreeNode[];

    constructor(geography : Geography, parent : GeoTreeNode | null = null){
        this.geography = geography;
        this.parent = parent;
        this.children = [];
        this.filters = [];
    }

    addChild(geoTreeNode : GeoTreeNode) {
        geoTreeNode.parent = this;
        this.children.push(geoTreeNode);
    }

    setChildren(geographies : Geography[]) {
        if(this.isEmpty()){
            this.children = geographies.map((geography)=> new GeoTreeNode(geography, this));
        }else{
            this.children = this.children.filter((child) => 
                geographies.find((geography) => this.isGeoEqual(child.geography, geography)) !== undefined
            );
            
            geographies.forEach((geography) => {
                let found = this.children.find((child)=> this.isGeoEqual(child.geography, geography));

                if(found){
                    this.addChild(new GeoTreeNode(geography));
                }
            })
        }
        return this;
    }

    setFilters(filters: GeographyEnum[]){
        this.filters = filters;
        return this;
    }

    getAncestryTitles() {
        let array : String[] = [];
        let current : GeoTreeNode = this;

        do{
            array.push(current.geography.name);
        }while(current.parent !== null);

        return array.reverse();
    }

    isEmpty() {
        return (this.children.length === 0);
    }

    isEqual(x : GeoTreeNode, y : GeoTreeNode){
        return (x.geography.name == y.geography.name) && (x.geography.type == y.geography.type);
    }

    isGeoEqual(x : Geography, y : Geography){
        return (x.name == y.name) && (x.type == y.type);
    }

    //copy
}

export class GeoTree {

    head : GeoTreeNode;

    constructor( head : GeoTreeNode) {
        this.head = head;
    }
}