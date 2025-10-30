import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState, useEffect } from 'react';
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from 'react-simple-wysiwyg';
import { AIChatSession } from './../../../../service/AIModal';
import { toast } from 'sonner';

// Prompt expects AI to return HTML
const PROMPT = `position title: {positionTitle}, Based on the position title, give me 5-7 bullet points for my experience in a resume. (Do not include experience level or JSON format). Return result in valid HTML <ul><li>...</li></ul>.`;

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue || '');
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Sync with context changes
    if (resumeInfo?.experience[index]?.workSummery !== value) {
      setValue(resumeInfo.experience[index]?.workSummery || '');
    }
  }, [resumeInfo, index]);

  const GenerateSummeryFromAi = async () => {
    const title = resumeInfo?.experience[index]?.title;

    if (!title) {
      toast.error('Please add position title');
      return;
    }

    setLoading(true);
    const prompt = PROMPT.replace('{positionTitle}', title);

    try {
      const result = await AIChatSession.sendMessage(prompt);
      let responseText = await result.response.text();

      // If AI still returns JSON, handle it
      if (responseText.trim().startsWith('{') || responseText.includes('"bulletPoints"')) {
        try {
          const json = JSON.parse(responseText);
          const bulletPoints = json.bulletPoints;
          responseText = `<ul>${bulletPoints.map((point) => `<li>${point}</li>`).join('')}</ul>`;
        } catch (err) {
          console.warn('Failed to parse JSON AI response:', err);
        }
      }

      setValue(responseText);
      onRichTextEditorChange({ target: { value: responseText } });

      // Update context
      setResumeInfo((prev) => {
        const updatedExperience = [...prev.experience];
        updatedExperience[index].workSummery = responseText;
        return { ...prev, experience: updatedExperience };
      });
    } catch (error) {
      console.error('AI generation error:', error);
      toast.error('Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  const handleEditorChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);

    // Update context
    setResumeInfo((prev) => {
      const updatedExperience = [...prev.experience];
      updatedExperience[index].workSummery = newValue;
      return { ...prev, experience: updatedExperience };
    });

    onRichTextEditorChange(e);
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummeryFromAi}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin h-4 w-4" />
          ) : (
            <>
              <Brain className="h-4 w-4" />
              Generate from AI
            </>
          )}
        </Button>
      </div>

      <EditorProvider>
        <Editor value={value} onChange={handleEditorChange}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
