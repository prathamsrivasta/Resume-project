import Header from "@/components/custum/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/Resume/components/ResumePreview";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import GlobalApi from "./../../../../service/GlobalApi";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((resp) => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
    });
  };

  const HandleDownload = () => {
    window.print();
  };

  const HandleShare = async () => {
    const shareUrl = `${import.meta.env.VITE_BASE_URL}/my-resume/${resumeId}/view`; // Construct the share URL using the base URL and resume ID
    const shareTitle = `${resumeInfo?.firstName || ""} ${resumeInfo?.lastName || ""} Resume`;// Construct the share title using the first and last

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: "Hello Everyone, This is my resume. Please open the link to view it:",
          url: shareUrl,
        });
        console.log("Shared successfully!");
      } catch (err) {
        console.error("Sharing failed:", err);
      }
    } else {
      alert("Web Share API is not supported in this browser.");
    }
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            🎉 Congrats! Your AI-generated resume is ready!
          </h2>
          <p className="text-center text-gray-400">
            Download your resume or share the unique URL with friends and family.
          </p>
          <div className="flex justify-between px-10 md:px-44 my-10">
            <Button onClick={HandleDownload}>Download</Button>
            <Button onClick={HandleShare}>Share</Button>
          </div>
        </div>
      </div>

      <div className="my-10 mx-10 md:mx-20 lg:mx-36">
        <div id="print-area">
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
