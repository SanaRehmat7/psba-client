import { useParams } from "react-router-dom";

const YearPage = () => {
  const { yearId } = useParams(); // e.g. FY2023, FY2022

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-green-800">Financial Year {yearId}</h1>
      <p className="text-gray-700">
        No specific data for {yearId}, but this is a placeholder page for now.
      </p>
    </div>
  );
};

export default YearPage;