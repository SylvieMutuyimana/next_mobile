export const frontendhost = 'localhost:3000';
export const backendhost = 'localhost:3000';

const host_routes = {
    'bookings': 'bookings', 'drivers':'drivers', 'employees': 'employees',
    'expenses': 'expenses', 'fuel': 'fuel', 'reminders': 'reminders',
    'users':'users', 'vehicleGroups': 'vehicleGroups', 'vehicles': 'vehicles'
}

export const post_url = (endpoint)=> backendhost + '/api/' + host_routes[Object.keys(host_routes).find(key => key === endpoint)] 