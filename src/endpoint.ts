const endpoints = {
    companies: '/companies',
    employees: '/employees',
    departments: '/departments',
    shifts: '/shifts',
    schedules: '/schedules',
    dtr: '/dtr',
    eod: '/eoms',
    leaveRequest: '/leaves',
    leaveTypes: '/leave-types',
    scheduleCalendar: (schedule: number) => `${endpoints.schedules}/${schedule}/calendar`,
    employeeLeaves: (id: number) => `${endpoints.employees}/${id}/leaves`,
}

export default endpoints;