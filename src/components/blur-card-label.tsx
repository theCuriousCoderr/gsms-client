import { BlurCardLabelType } from "@/types";

export default function BlurCardLabel({
  svg,
  label,
  introText,
  subText,
}: BlurCardLabelType) {
  return (
    <div className="flex items-center gap-2">
      <div className="size-10 p-2 flex items-center justify-center rounded-full border border-black/20">
        {svg}
      </div>
      <div>
        <p className="text-xl font-light">{label}</p>
        <p className="text-sm font-light">
          {introText}
          <span className="">{subText}</span>
        </p>
      </div>
    </div>
  );
}
