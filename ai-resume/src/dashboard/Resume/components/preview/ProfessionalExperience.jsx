import React from "react";

function ProfessionalExperience({ resumeInfo }) {
  // Check if resumeInfo and resumeInfo.experience are available and not empty
  if (!resumeInfo?.experience || resumeInfo?.experience.length === 0) {
    return <div>No experience available</div>; // Display a message if there is no experience data
  }

  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor || "#000", // Default color if themeColor is not provided
        }}
      >
        Professional Experience
      </h2>

      <hr
        style={{
          borderColor: resumeInfo?.themeColor || "#000", // Default color if themeColor is not provided
        }}
      />

      {resumeInfo?.experience?.map((experience, index) => (
        <div key={index} className="my-5">
          {/* Display the job title */}
          <h3
            className="text-sm font-bold"
            style={{
              color: resumeInfo?.themeColor || "#000", // Default color if themeColor is not provided
            }}
          >
            {experience?.title || "No title provided"} {/* Fallback if title is missing */}
          </h3>

          {/* Display the company name, city, and state */}
          <h4 className="text-xs flex justify-between">
            <span>
              {experience?.companyName
                ? `${experience.companyName}, ${experience.city}, ${experience.state}`
                : "No company information"}
            </span>
            <span>
              {experience?.startDate} To{" "}
              {experience?.currentlyWorking ? "Present" : experience?.endDate || "N/A"}
            </span>
          </h4>

          {/* Work Summary - Prevent rendering empty or invalid HTML */}
          {experience?.workSummery ? (
            <div
              className="text-xs my-2"
              dangerouslySetInnerHTML={{ __html: experience.workSummery || '' }}
              />
          ) : (
            <div className="text-xs my-2">No work summary provided</div> // Fallback text if work summary is missing
          )}
        </div>
      ))}
    </div>
  );
}

export default ProfessionalExperience;
