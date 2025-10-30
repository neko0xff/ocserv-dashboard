const CustomerRoutes = {
    path: '/customers',
    component: () => import('@/layouts/blank/BlankLayout.vue'),
    meta: {
        requiresAuth: false
    },
    children: [
        {
            name: 'Customer Summary',
            path: '/summary',
            component: () => import('@/views/customer/Summary.vue')
        }
    ]
};

export default CustomerRoutes;
