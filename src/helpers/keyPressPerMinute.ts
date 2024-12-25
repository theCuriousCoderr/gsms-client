import { UserReportType } from "@/types";
import moment from "moment";

function keyPressPerMinute(reports: UserReportType[]) {
  const countByMinute: Record<string, number> = {};
  reports.forEach((report) => {
    const minute = moment(report.timeStamp).format("YYYY-MM-DD HH:mm");
    countByMinute[minute] = (countByMinute[minute] || 0) + 1;
  });
  const totalCount = reports.length;
  const uniqueMinutes = Object.keys(countByMinute).length;
  const averageCountPerMinute = totalCount / uniqueMinutes;

  return averageCountPerMinute;
}

export default keyPressPerMinute;
