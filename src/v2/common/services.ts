import { GeographyEnum } from "./enum";
import { Category, Geography } from "./types";
import { mockCounties, mockFilterOptions, mockGeoCategories } from "./mockData";
import { API_BASE_URL } from '../config/appConfig';
import axios from 'axios';
import { nameSort } from "./utils";

export const fetchIndicatorCategories = async() : Promise<Category[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/dashboard-service/categories`);
        const formattedData = response.data.sort(nameSort);
        return formattedData;
    } catch (error) {
        console.error('Error fetching all categories:', error);
        throw error;
    }
};

export const fetchCategoriesByState  = async(state : Geography) : Promise<Category[]> => {
    
    try {
        const response = await axios.get(`${API_BASE_URL}/dashboard-service/categories?stateIds=${state.id}`);
        const formattedData = response.data.sort(nameSort);
        return formattedData;
    } catch (error) {
        console.error('Error fetching categories with given state id: ' + state.id, error);
        throw error;
    }
    
};

export const fetchStatesByCategory = async(categoryId: string) : Promise<Geography[]> => {

    try {
        const response = await axios.get(`${API_BASE_URL}/dashboard-service/geography?categoryId=${categoryId}`);
        const formattedData = response.data.sort(nameSort);
        return formattedData;
    } catch (error) {
        console.error('Error fetching categories with given category id: ' + categoryId, error);
        throw error;
    }
  
};

export const fetchAllStates = async() : Promise<Geography[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/dashboard-service/geography/states`);
        const formattedData = response.data.sort(nameSort);

        const geographies = formattedData.map((state : Geography) => {
            state.type = GeographyEnum.STATE;
            return state
        })

        return geographies;
    } catch (error) {
        console.error('Error fetching all states', error);
        throw error;
    }

};

export const getListOfCounties : (state : Geography) => Promise<Geography[]> = (state) => {
    return new Promise<Geography[]>((resolve) => {
        const counties : Geography[] = [
            { id: "2", name: "Westchester", type: GeographyEnum.COUNTY},
            { id: "4", name: "Brooklyn", type: GeographyEnum.COUNTY},
            { id: "6", name: "Manhattan", type: GeographyEnum.COUNTY},
            { id: "8", name: "Albany", type: GeographyEnum.COUNTY}
        ];
        resolve(counties);
    });
};

export const getSubGeographiesByGeographyAndType : (state: Geography, geography : Geography, type : GeographyEnum) => Promise<Geography[]> = 
    (state, geography, type) => {
    return new Promise((resolve) => {
        resolve(mockCounties);
    });
};

export const getGeographyDropdownOptions = (geoType : GeographyEnum) => {
    // find by id
    const foundItem = mockFilterOptions.find(item => item.type === geoType);
    return foundItem ? foundItem.subTypes : [];
}