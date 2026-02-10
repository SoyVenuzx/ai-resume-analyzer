import { useState, type FormEvent, type SyntheticEvent } from "react";

const Upload = () => {
  const [isProcessing, SetIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {};

  return (
    <div className="page-heading py-16">
      <h1>Smart feedback for your dream job</h1>
      {isProcessing ? (
        <>
          <h2>{statusText}</h2>
          <img
            src="/images/resume-scan.gif"
            className="w-full"
            alt="resume scan icon"
          />
        </>
      ) : (
        <h2>Drop your resume an ATS score and improvement tips</h2>
      )}

      {!isProcessing && (
        <form
          id="upload"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mt-8"
        >
          <div className="form-div">
            <label htmlFor="company-name">Company Name</label>
            <input
              type="text"
              name="company-name"
              placeholder="Company Name"
              id="company-name"
            />
          </div>

          <div className="form-div">
            <label htmlFor="job-title">Job Title</label>
            <input
              type="text"
              name="job-title"
              placeholder="Job Title"
              id="job-title"
            />
          </div>

          <div className="form-div">
            <label htmlFor="job-description">Job Description</label>
            <textarea
              rows={5}
              name="job-description"
              placeholder="Job Description"
              id="job-description"
            />
          </div>

          <div className="form-div">
            <label htmlFor="uploader">Upload Resume</label>
            <div>Uploader</div>
          </div>

          <button className="primary-button" type="submit">
            Analyze Resume
          </button>
        </form>
      )}
    </div>
  );
};

export default Upload;
