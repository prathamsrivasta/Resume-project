import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SummeryPreview from "./preview/SummeryPreview";
import ProfessionalExperience from "./preview/ProfessionalExperience";
import EducationalPreview from "./preview/EducationalPreview";
import SkillPreview from "./preview/SkillPreview";

function ResumePreview() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  return (
    <div
      className="shadow-lg h-full p-14 border-t-[20px]"
      style={{ borderColor: resumeInfo?.themeColor }}
    >
      {/* Personal details  */}

      <PersonalDetailPreview resumeInfo={resumeInfo} />

      {/* Summary */}

      <SummeryPreview resumeInfo={resumeInfo} />

      {/* Professional experience  */}
      <ProfessionalExperience resumeInfo={resumeInfo} />

      {/* Education  */}
      <EducationalPreview resumeInfo={resumeInfo} />

      {/* Skills  */}
      <SkillPreview resumeInfo={resumeInfo} />
    </div>
  );
}

export default ResumePreview;
