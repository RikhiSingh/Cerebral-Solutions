"use client";
import { InlineWidget } from "react-calendly";

const SchedulePage: React.FC = () => {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  if (!calendlyUrl) {
    return <div>Error: Calendly URL is not set!</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[62%]">
        <InlineWidget url={calendlyUrl} />
      </div>
    </div>
  );
};

export default SchedulePage;
