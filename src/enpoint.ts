const endpoints = {
    companies: '/companies',
    employees: '/employees',
    shifts: '/shifts',
    schedules: '/schedules',
    scheduleCalendar: (schedule: number) => `${endpoints.schedules}/${schedule}/calendar`,
}

export default endpoints;