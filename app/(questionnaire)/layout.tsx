import { Navbar } from "../(home)/_components/Navbar";

const QuestionnairePageLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default QuestionnairePageLayout;
