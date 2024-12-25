export interface SVGType {
  fill?: string;
  stroke?: string;
}

export interface BlurCardLabelType {
  svg: React.ReactNode;
  label: string;
  introText: string;
  subText: string;
}

export interface UserReportType {
  key: string;
  timeStamp: string;
  user: string;
  _workSpace: string;
  _fileType: string;
}
