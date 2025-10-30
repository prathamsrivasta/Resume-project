import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTExtEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router";
import GlobalApi from "../../../../../service/GlobalApi";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const initialFormField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};

function Experience() {
  const [experinceList, setExperinceList] = useState([initialFormField]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  // Handle input field changes for all fields in the experience list
  const handleChange = (index, event) => {
    const newEntries = [...experinceList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperinceList(newEntries);
  };

  // Add new experience entry
  const AddNewExperience = () => {
    setExperinceList([...experinceList, { ...initialFormField }]);
  };

  // Remove the last experience entry
  const RemoveExperience = () => {
    if (experinceList.length > 1) {
      setExperinceList((prev) => prev.slice(0, -1));
    }
  };

  // Handle changes from the rich text editor
  const handleRichTextEditor = (e, name, index) => {
    const newEntries = [...experinceList];
    newEntries[index][name] = e.target.value;
    setExperinceList(newEntries);
  };

  // Update resumeInfo context whenever experienceList changes
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experinceList,
    });
  }, [experinceList, setResumeInfo, resumeInfo]);

  // Save experience details to the API
  const onSave = () => {
    setLoading(true);
    const payload = {
      data: {
        experience: experinceList,
      },
    };

    GlobalApi.UpdateResumeDetail(params?.resumeId, payload)
      .then((res) => {
        setLoading(false);
        toast.success("Details updated!");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error updating resume:", error);
        toast.error("Something went wrong while saving!");
      });
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Experience</h2>
      <p>Add your previous job experience</p>

      {experinceList.map((item, index) => (
        <div key={index}>
          <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
            <div>
              <label className="text-xs">Position Title</label>
              <Input
                name="title"
                value={item.title}
                onChange={(event) => handleChange(index, event)}
              />
            </div>

            <div>
              <label className="text-xs">Company Name</label>
              <Input
                name="companyName"
                value={item.companyName}
                onChange={(event) => handleChange(index, event)}
              />
            </div>

            <div>
              <label className="text-xs">City</label>
              <Input
                name="city"
                value={item.city}
                onChange={(event) => handleChange(index, event)}
              />
            </div>

            <div>
              <label className="text-xs">State</label>
              <Input
                name="state"
                value={item.state}
                onChange={(event) => handleChange(index, event)}
              />
            </div>

            <div>
              <label className="text-xs">Start Date</label>
              <Input
                type="date"
                name="startDate"
                value={item.startDate}
                onChange={(event) => handleChange(index, event)}
              />
            </div>

            <div>
              <label className="text-xs">End Date</label>
              <Input
                type="date"
                name="endDate"
                value={item.endDate}
                onChange={(event) => handleChange(index, event)}
              />
            </div>

            <div className="col-span-2">
              {/* RichTextEditor for work summary */}
              <RichTextEditor
                index={index}
                defaultValue={item.workSummery}
                onRichTextEditorChange={(event) =>
                  handleRichTextEditor(event, "workSummery", index)
                }
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewExperience}
            className="text-primary"
          >
            + Add More Experience
          </Button>
          <Button
            variant="outline"
            onClick={RemoveExperience}
            className="text-primary"
          >
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Experience;
