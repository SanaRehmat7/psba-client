import { motion } from "framer-motion";

const FileCardDate = ({ id, name, url, index, startDate, endDate }) => {
  // Format dates in a neat way, e.g. "Jan 2022"
  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateStr);
    return isNaN(date) ? "-" : date.toLocaleDateString(undefined, options);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-green-200 p-5 rounded-xl shadow-md hover:shadow-lg hover:bg-green-100 transition-all"
    > 
      <div className="flex items-center space-x-4">
        <div className="bg-yellow-400 text-green-900 font-bold rounded-full w-9 h-9 flex items-center justify-center text-sm shadow">
          {id}
        </div>
        <div>
          <p className="text-green-800 font-medium text-sm sm:text-base">
            {name}
          </p>
          <p className="text-green-700 text-xs sm:text-sm mt-1">
            {formatDate(startDate)} &mdash; {formatDate(endDate)}
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-4 sm:mt-0">
        <a
          href={url}
          rel="noopener noreferrer"
          target="_blank"
          download
          className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl px-4 py-2 rounded-lg bg-green-700 text-white font-semibold shadow-md hover:bg-yellow-400 hover:text-black hover:border-yellow-400 border-2 border-green-700 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
            />
          </svg>
          Download 
        </a>
      </div>
    </motion.div>
  );
};

export default FileCardDate;