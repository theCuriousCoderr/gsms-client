import dateActivity from "@/helpers/dateActivity";
import { UserReportType } from "@/types";
import moment from "moment";

function getEachWeekCount(
  reports: UserReportType[],
  startDate = moment().startOf("week")
) {
  let weekStart = startDate.clone();

  let sun = dateActivity(reports, weekStart.format("YYYY-M-D")).length;
  let mon = dateActivity(
    reports,
    weekStart.clone().add(1, "days").format("YYYY-M-D")
  ).length;
  let tue = dateActivity(
    reports,
    weekStart.clone().add(2, "days").format("YYYY-M-D")
  ).length;
  let wed = dateActivity(
    reports,
    weekStart.clone().add(3, "days").format("YYYY-M-D")
  ).length;
  let thur = dateActivity(
    reports,
    weekStart.clone().add(4, "days").format("YYYY-M-D")
  ).length;
  let fri = dateActivity(
    reports,
    weekStart.clone().add(5, "days").format("YYYY-M-D")
  ).length;
  let sat = dateActivity(
    reports,
    weekStart.clone().add(6, "days").format("YYYY-M-D")
  ).length;

  return [sun, mon, tue, wed, thur, fri, sat];
}

export default getEachWeekCount;
