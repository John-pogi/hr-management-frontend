const endpoints = {
    companies: '/companies',
    employees: '/employees',
    shifts: '/shifts',
    schedules: '/schedules',
    dtr: '/dtr',
    eod: '/eoms',
    scheduleCalendar: (schedule: number) => `${endpoints.schedules}/${schedule}/calendar`,
}

export default endpoints;