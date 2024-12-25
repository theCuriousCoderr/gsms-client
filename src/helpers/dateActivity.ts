import { UserReportType } from "@/types";
import moment from "moment";

function dateActivity(reports: UserReportType[], date: string) {
  let dateReport = reports.filter((report) =>
    moment(report.timeStamp).isSame(moment(date), "day")
  );
  return dateReport;
}

export default dateActivity;
