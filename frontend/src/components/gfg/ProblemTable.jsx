import React, { useState } from "react";

const ProblemTable = ({ solvedStats }) => {
  if (!solvedStats) return <div className="text-gray-400">Loading table...</div>;

  const allProblems = [
    ...(solvedStats.easy?.questions.map(q => ({ ...q, difficulty: "Easy" })) || []),
    ...(solvedStats.medium?.questions.map(q => ({ ...q, difficulty: "Medium" })) || []),
    ...(solvedStats.hard?.questions.map(q => ({ ...q, difficulty: "Hard" })) || []),
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  const problemsPerPage = 20;

  const filteredProblems = difficultyFilter === "All"
    ? allProblems
    : allProblems.filter(p => p.difficulty === difficultyFilter);

  const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);

  const currentProblems = filteredProblems.slice(
    (currentPage - 1) * problemsPerPage,
    currentPage * problemsPerPage
  );

  return (
    <div className="mt-6 bg-gray-900 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-4 text-center">Solved Problems</h2>

      <div className="flex justify-between mb-4">
        <div>
          <label className="mr-2 font-medium text-white">Filter by Difficulty:</label>
          <select
            value={difficultyFilter}
            onChange={(e) => {
              setDifficultyFilter(e.target.value);
              setCurrentPage(1); // Reset to first page when filter changes
            }}
            className="border border-white px-2 py-1 rounded bg-gray-900 text-white"
          >
            <option value="All">All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="text-sm text-white">
          Page {currentPage} of {totalPages}
        </div>
      </div>

      <table className="w-full table-auto text-white">
        <thead>
          <tr className="bg-gray-900">
            <th className="p-2 text-left">Question</th>
            <th className="p-2 text-left">Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {currentProblems.map((problem, index) => (
            <tr key={index} className="border-t border-white">
              <td className="p-2">
                <a
                  href={problem.questionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline"
                >
                  {problem.question}
                </a>
              </td>
              <td className="p-2">{problem.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-[#1a1a1a] text-white border border-white rounded disabled:opacity-50"
        >
          Previous
        </button>

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-[#1a1a1a] text-white border border-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProblemTable;
