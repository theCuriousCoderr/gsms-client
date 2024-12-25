import dateActivity from "@/helpers/dateActivity";
import { UserReportType } from "@/types";
import moment from "moment";

function isAlphabet(char: string) {
  const regex = /^[a-zA-Z]$/;
  return regex.test(char);
}

function isNumeric(char: string) {
  const regex = /^[0-9]$/;
  return regex.test(char);
}

function getKeyTypeBreakdown(reports: UserReportType[], date = "All") {
  let alphabetCount = 0;
  let numericCount = 0;
  let cutCount = 0;
  let deleteCount = 0;
  let spaceCount = 0;

  let dateReports = reports;
  if (date !== "All") {
    let today = moment().format("YYYY-M-D")
    dateReports = dateActivity(reports, date)
  }

  for (let report of dateReports) {
    if (isAlphabet(report.key)) {
      alphabetCount += 1;
    }
    if (isNumeric(report.key)) {
      numericCount += 1;
    }
    if (report.key === "Cut") {
      cutCount += 1;
    }
    if (report.key === "Delete") {
      deleteCount += 1;
    }
    if (report.key === " ") {
      spaceCount += 1;
    }
  }

  return {
    alphabetCount: alphabetCount,
    numericCount: numericCount,
    cutCount: cutCount,
    deleteCount: deleteCount,
    spaceCount: spaceCount,
  };
}

export default getKeyTypeBreakdown;
