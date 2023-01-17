import { TimesheetDetails } from "./timesheet-details";

export class Timesheet {
    timesheetID: number
    month: number;
    year: number;
    timesheetStatus: string;
    userId: string;
    timesheetDetails: TimesheetDetails
}
