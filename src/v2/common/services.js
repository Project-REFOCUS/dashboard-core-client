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
