import exp from "constants";
import moment from "moment";

export const showFormattedDate = (date: string | number | Date): string => {
  const optionsDate: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = new Date(date);
  const formattedDateString = formattedDate.toLocaleDateString(
    "en-US",
    optionsDate
  );
  const formattedTimeString = formattedDate.toLocaleTimeString(
    "en-US",
    optionsTime
  );

  return `${formattedDateString}, ${formattedTimeString}`;
};

export const showFormattedDateOnly = (date: string | number | Date): string => {
  const optionsDate: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = new Date(date);
  const formattedDateString = formattedDate.toLocaleDateString(
    "en-US",
    optionsDate
  );

  return `${formattedDateString}`;
};

export const TimeAgo = (time: any) => {
  const timeAgo = moment(time).fromNow();
  return timeAgo;
};
