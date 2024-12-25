import postHook from "@/fetchHooks/postHook";
import { UserReportType } from "@/types";

async function getUserReports() {
  let response = await postHook("/get-user-report");
  if (response.success) {
    return (response.success as UserReportType[])?.length >= 1 ? response.success as UserReportType[] : [] ;
  }
 return []
}

export default getUserReports;
