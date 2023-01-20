import { TimesheetDetails } from "./timesheet-details";

export class ManagerTable {
    timesheetID: number;
    month: number;
    year: number;
    createdOn: Date;
    timesheetStatus: string;
    timesheetDetails: TimesheetDetails[];
    userId: number;
    firstName: string;
    lastName: string;
    role: string;
}
