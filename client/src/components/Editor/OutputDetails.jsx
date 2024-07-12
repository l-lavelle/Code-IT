import React from "react";

const OutputDetails = ({ outputDetails }) => {
  // questionData in pass down?
  // let answer = atob(outputDetails.stdout)
  // answer = answer.trim()

  return (
    <div className="metrics-container mt-4 flex flex-col space-y-3">
      <p className="text-sm">
        Status:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
          {outputDetails?.status?.description}
        </span>
      </p>
      <p className="text-sm">
        Memory:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
          {outputDetails?.memory}
        </span>
      </p>
      <p className="text-sm">
        Time:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
          {outputDetails?.time}
        </span>
      </p>
      
      {/* {answer===questionData.answer?
      <p>Correct Answer</p>:
      <p>Incorrect Answer. Try Again</p>} */}
    </div>
  );
};

export default OutputDetails;