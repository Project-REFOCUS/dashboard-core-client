export  const getIndicatorCategories = () =>
    window.fetch('/dashboard-service/dundas/categories')
        .then(response => response.json());