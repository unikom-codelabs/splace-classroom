/** Required y-m-dTh:m:s. example 2024-08-19T20:23:00 the result is from @internationalized/date library.
 * Returns the date and time in the format of "yyyy-mm-dd hh:mm:ss"
 */
export const parseDeadlineDateTime = (deadline: string): string => {
  const deadlineDate = deadline.split("T")[0];
  const deadlineTime = deadline.split("T")[1].split("Z")[0];
  return `${deadlineDate} ${deadlineTime}`;
};

/** Required y-m-dTh:m:s. example 2024-08-19T20:23:00 the result is from @internationalized/date library.
 * Returns the date in the format of "yyyy-mm-dd"
 */
export const parseDeadlineDate = (deadline: string): string => {
  return deadline.split("T")[0];
};

export const parseYearDate = (date: string) => {
  return date.split("-")[0];
};

export const parseMonthDate = (date: string) => {
  return date.split("-")[1];
};

export const parseDayDate = (date: string) => {
  return date.split("-")[2];
};
