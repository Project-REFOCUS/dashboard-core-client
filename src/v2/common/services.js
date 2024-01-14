const categories = [
    { id: 2341, name: 'OSHA Complaints', dashBoardId: 'OSHA' },
    { id: 2342, name: 'Covid Death', dashBoardId: 'CDeath' },
    { id: 2343, name: 'Covid Test', dashBoardId: 'CTest' },
    { id: 2344, name: 'Covid Vaccination', dashBoardId: 'CVacc' }
];

export  const getIndicatorCategories = () => {
    // window.fetch('/dashboard-service/dundas/categories')
    //     .then(response => response.json());
    return new Promise((resolve) => {
        
        resolve(categories);
    });
};

export const getListOfStates = () => {
    return new Promise((resolve) => {
        const states = [
            { id: 2, name: 'New York', shortName: 'NY', categories: categories.filter((category) => category.id <= 2343) },
            { id: 4, name: 'Texas', shortName: 'TX', categories: categories.filter((category) => category.id <= 2342) },
            { id: 6, name: 'California', shortName: 'CA' , categories: categories},
            { id: 8, name: 'Florida', shortName: 'FL', categories: categories.filter((category) => category.id >= 2343)}
        ];
        resolve(states);
    });
};

export const getListOfCounties = (state) => {
    return new Promise((resolve) => {
        const states = [
            { id: 2, name: 'Westchester'},
            { id: 4, name: 'Brooklyn'},
            { id: 6, name: 'Manhattan'},
            { id: 8, name: 'Albany'}
        ];
        resolve(states);
    });
};

//location should be a list each narrowing down location.
//New York, Manhattan, Hell's Kitchen, 11213
//state, county, filter{city, county subdiv, census tract}
//state, county, county subdiv, filter{zipcode, census tract}
export const getCategoriesByLocationAndType = (location, filter) => {
    return new Promise((resolve) => {
        let items;
        const states = [
            { id: 2, name: 'Flushing'},
            { id: 4, name: 'Astoria'},
            { id: 6, name: 'Forest Hills'},
            { id: 8, name: 'Kew Gardens'}
        ];
        resolve(states);
    });
};

const filterOptions = [
    { name :"County", options:["City", "County Subdivision", "Census Tract"] },
    { name :"City", options:["Zipcode"] },
    { name :"County Subdivision", options:["Census Tract","Zipcode"] },
    { name :"Census Tract", options:["Zipcode"] }
]

export const getFilterDropdownOptions = (filter) => {
    // find by id
    const foundItem = filterOptions.find(item => item.name === filter);
    return foundItem ? foundItem.options : [];
}
