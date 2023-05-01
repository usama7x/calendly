import { range } from "./utils";

export const LOCATIONS = ["", "Location A", "Location B", "Location C"];
export const WORKING_HOURS = [...range(9, 12, 1), ...range(1, 3, 1)];
export const BOOKED_COLOR = 'lightgreen';
export const BACKGROUND_COLOR = 'background-color';
export const SLOT_ALREADY_BOOKED = 'Slot(s) already booked.';
export const INVALID_END_TIME = 'Invalid End Time.';
export const INVALID_START_AND_END_TIME = 'Invalid Start Time and End Time.';
