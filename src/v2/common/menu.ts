import { GeographyEnum } from "./enum";
import { Geography } from "./types";

// {state} [county, metro area]
// {county} [city, census tract]
// {city}  [zipcode]
// {census tract} [block group]

export class FilterOptionsMap {

    private menuMap : Map<GeographyEnum, GeographyEnum[]>;

    constructor(){
        this.menuMap = new Map();

        this.menuMap.set(GeographyEnum.COUNTY, [GeographyEnum.CITY, GeographyEnum.CENSUS_TRACT]);
        this.menuMap.set(GeographyEnum.CITY, [GeographyEnum.ZIPCODE]);
        this.menuMap.set(GeographyEnum.CENSUS_TRACT, [GeographyEnum.BLOCK_GROUP]);
    }


}
