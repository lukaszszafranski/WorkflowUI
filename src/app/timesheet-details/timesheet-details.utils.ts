import { TimesheetDetails } from "../models/timesheet-details"

export function mapDataToRequest(request: any, timesheetId: string): TimesheetDetails[]{
    let timesheetDetailsArray: TimesheetDetails[] = []
    request.forEach(
      project => {
        project.day1 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 1, registeredHours: Number(project.day1), timesheetId: Number(timesheetId)} as TimesheetDetails) : null
        project.day2 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 2, registeredHours: Number(project.day2), timesheetId: Number(timesheetId)} as TimesheetDetails) : null
        project.day3 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 3, registeredHours: Number(project.day3), timesheetId: Number(timesheetId)} as TimesheetDetails) : null
        project.day4 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 4, registeredHours: Number(project.day4), timesheetId: Number(timesheetId)} as TimesheetDetails) : null
        project.day5 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 5, registeredHours: Number(project.day5), timesheetId: Number(timesheetId)} as TimesheetDetails) : null
        project.day6 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 6, registeredHours: Number(project.day6), timesheetId: Number(timesheetId)} as TimesheetDetails) : null
        project.day7 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 7, registeredHours: Number(project.day7), timesheetId: Number(timesheetId)} as TimesheetDetails) : null
        project.day8 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 8, registeredHours: Number(project.day8), timesheetId: Number(timesheetId)} as TimesheetDetails) : null
        project.day9 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 9, registeredHours: Number(project.day9), timesheetId: Number(timesheetId)} as TimesheetDetails) : null
        project.day10 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 10, registeredHours:  Number(project.day10), timesheetId:  Number(timesheetId)} as TimesheetDetails) : null
        project.day11 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 11, registeredHours:  Number(project.day11), timesheetId:  Number(timesheetId)} as TimesheetDetails) : null
        project.day12 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 12, registeredHours:  Number(project.day12), timesheetId:  Number(timesheetId)} as TimesheetDetails) : null
        project.day13 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 13, registeredHours:  Number(project.day13), timesheetId:  Number(timesheetId)} as TimesheetDetails) : null
        project.day14 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 14, registeredHours:  Number(project.day14), timesheetId:  Number(timesheetId)} as TimesheetDetails) : null
        project.day15 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 15, registeredHours:  Number(project.day15), timesheetId:  Number(timesheetId)} as TimesheetDetails) : null
        project.day16 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 16, registeredHours:  Number(project.day16), timesheetId:  Number(timesheetId)} as TimesheetDetails) : null
        project.day17 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 17, registeredHours:  Number(project.day17), timesheetId:  Number(timesheetId)} as TimesheetDetails) : null
        project.day18 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 18, registeredHours:  Number(project.day18), timesheetId:  Number(timesheetId)} as TimesheetDetails) : null
        project.day19 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 19, registeredHours:  Number(project.day19), timesheetId:  Number(timesheetId)} as TimesheetDetails) : null
        project.day20 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 20, registeredHours:  Number(project.day20), timesheetId:  Number(timesheetId)} as TimesheetDetails) : null
        project.day21 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 21, registeredHours:  Number(project.day21), timesheetId:  Number(timesheetId)} as TimesheetDetails) : null
        project.day22 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 22, registeredHours:  Number(project.day22), timesheetId:  Number(timesheetId)} as TimesheetDetails) : null
        project.day23 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 23, registeredHours:  Number(project.day23), timesheetId:  Number(timesheetId)} as TimesheetDetails) : null
        project.day24 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 24, registeredHours:  Number(project.day24), timesheetId:  Number(timesheetId)} as TimesheetDetails) : null
        project.day25 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 25, registeredHours:  Number(project.day25), timesheetId:  Number(timesheetId)} as TimesheetDetails) : null
        project.day26 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 26, registeredHours:  Number(project.day26), timesheetId:  Number(timesheetId)} as TimesheetDetails) : null
        project.day27 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 27, registeredHours:  Number(project.day27), timesheetId:  Number(timesheetId)} as TimesheetDetails) : null
        project.day28 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 28, registeredHours:  Number(project.day28), timesheetId:  Number(timesheetId)} as TimesheetDetails) : null
        project.day29 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 29, registeredHours:  Number(project.day29), timesheetId:  Number(timesheetId)} as TimesheetDetails) : null
        project.day30 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 30, registeredHours:  Number(project.day30), timesheetId:  Number(timesheetId)} as TimesheetDetails) : null
        project.day31 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 31, registeredHours:  Number(project.day31), timesheetId:  Number(timesheetId)} as TimesheetDetails) : null
      }
    )
    return timesheetDetailsArray
}