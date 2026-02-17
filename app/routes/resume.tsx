import ATS from "@/components/ATS";
import Details from "@/components/Details";
import Summary from "@/components/Summary";
import { usePuterStore } from "@/lib/puter";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { useParams } from "react-router";

export const meta = () => [
  { title: "Resumind | Review" },
  { name: "description", content: "Detailed overview of your resume" },
];

export default function Resume() {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();

  const [resumeData, setResumeData] = useState({
    imageUrl: "",
    resumeUrl: "",
    feedback: null as Feedback | null,
  });

  const navigate = useNavigate();

  const { imageUrl, resumeUrl, feedback } = resumeData;

  // const isFeedbackReady =
  //   feedback &&
  //   typeof feedback.overallScore === "number" &&
  //   feedback.ATS?.score !== undefined &&
  //   Array.isArray(feedback.ATS?.tips) &&
  //   Array.isArray(feedback.toneAndStyle?.tips) &&
  //   Array.isArray(feedback.content?.tips) &&
  //   Array.isArray(feedback.structure?.tips) &&
  //   Array.isArray(feedback.skills?.tips);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated)
      navigate("/auth?next=/resume/${id}");
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);

      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);

      setResumeData((prev) => ({ ...prev, resumeUrl }));

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;

      const imageUrl = URL.createObjectURL(imageBlob);
      setResumeData((prev) => ({ ...prev, imageUrl }));

      console.log({ feedback: data.feedback });
      setResumeData((prev) => ({ ...prev, feedback: data.feedback ?? null }));
    };

    loadResume();
  }, [id]);

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  console.log({ feedback, resumeUrl, imageUrl });
  return (
    <main className="pt-0!">
      <nav className="resume-nav">
        <Link to={"/"} className="back-button">
          <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
          <span className="text-gray-800 text-sm font-semibold">
            Back to Homepage
          </span>
        </Link>
      </nav>

      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-screen sticky top-0 items-center justify-center">
          {imageUrl && resumeUrl && (
            <div className=" animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-w-xl:h-fit w-fit">
              <a href={resumeUrl} target="_blank">
                <img
                  src={imageUrl}
                  alt="resume"
                  title="resume"
                  className="w-full h-full object-contain rounded-2xl"
                />
              </a>
            </div>
          )}
        </section>

        <section className="feedback-section">
          <h2 className="text-4xl text-black! font-bold">Resume Review</h2>

          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
              <Summary feedback={feedback} />
              <ATS
                score={feedback.ATS.score || 0}
                suggestions={feedback.ATS.tips}
              />
              <Details feedback={feedback} />
            </div>
          ) : (
            <img src="/images/resume-scan-2.gif" className="w-full" />
          )}
        </section>
      </div>
    </main>
  );
}
