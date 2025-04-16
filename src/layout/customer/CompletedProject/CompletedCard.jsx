import React, { useState, useEffect } from "react";
import { CalendarDays, MapPin, FileText, MessageCircle, IndianRupee } from "lucide-react";
import useProjectStatus from "../../../store/builders/useProjectStatus";
// import useAuthStore from "../../../store/useAuthStore";

const CompletedCard = () => {
  const [openDocuments, setOpenDocuments] = useState({});
  const [showRejection, setShowRejection] = useState(false);
  const { projects, fetchProjects, isLoading, error } = useProjectStatus();
  // const { user, userType } = useAuthStore();

  const toggleDocuments = (projectId) => {
    setOpenDocuments(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  useEffect(() => {
    console.log("Fetching completed projects...");
    fetchProjects("completed");
  }, [fetchProjects]);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;

    
  }

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading projects...</p>;
  }

  if (projects.length === 0) {
    return <p className="text-center text-gray-500">No completed projects found.</p>;
  }

  return (
    <div className="flex flex-col gap-8 p-6">
      {projects.map((project, projectIndex) => (
        <div
          key={projectIndex}
          className={`flex flex-col lg:flex-row gap-6 mx-auto transition-all duration-300 w-full ${
            openDocuments[project.id] ? "lg:max-w-6xl" : "lg:max-w-4xl"
          }`}
        >
          {/* Left Section - Project Details */}
          <div className="bg-white rounded-3xl p-6 relative lg:w-2/5 shadow-lg overflow-hidden">
            {/* Curved Edge Decoration */}
            <div className="absolute right-6 top-1/2 -translate-y-10 h-20 w-16 bg-[rgb(224_224_224)] -mr-6 rounded-l-full transition-all duration-300" />

            {/* Circular Navigation Button */}
            <button
              className="absolute right-5 top-1/2 -translate-y-1/2 -mr-4 h-12 w-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
              onClick={() => toggleDocuments(project.id)}
            >
              <span className="text-lg font-bold text-gray-600">
                {openDocuments[project.id] ? "<<" : ">>"}
              </span>
            </button>

            {/* Centered Title with Line */}
            {/* Centered Title with Icons in Right Corner */}
            <div className="relative flex items-center justify-center mb-4 pb-2 border-b border-black">
              <h2 className="text-2xl font-bold text-center flex-1">
                {projects[0]?.builder_company || "Unknown Builder"}
              </h2>
              <div className="absolute right-0 flex gap-2">
                {/* Chat Icon */}
                {/* <button className="h-8 w-8 flex items-center justify-center rounded-full border border-gray-400 shadow-md">
                  <MessageCircle className="w-4 h-4 text-gray-700" />
                </button> */}
                
                {/* Payment Icon */}
                {/* <button className="h-8 w-8 flex items-center justify-center rounded-full border border-gray-400 shadow-md">
                  <IndianRupee className="w-4 h-4 text-gray-700" />
                </button> */}
              </div>
            </div>

            {/* Project Status */}
            <div className="flex items-center gap-4 mb-4">
              <FileText className="w-6 h-6 text-gray-600" />
              <div>
                <div className="font-semibold">Project Status</div>
                <div className="text-gray-600">{projects[0]?.status || "N/A"}</div>
              </div>
            </div>

            {/* Project Starting Date */}
            <div className="flex items-center gap-4 mb-4">
              <CalendarDays className="w-6 h-6 text-gray-600" />
              <div>
                <div className="font-semibold">Project Starting Date</div>
                <div className="text-gray-600">
                  {projects[0]?.starting_date 
                    ? new Date(projects[0].starting_date).toLocaleDateString()
                    : "N/A"}
                </div>
              </div>
            </div>

            {/* Project Location */}
            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-gray-600" />
              <div>
                <div className="font-semibold">Project Location</div>
                <div className="text-gray-600">{projects[0]?.project_location || "N/A"}</div>
              </div>
            </div>
          </div>

          {/* Right Section - Documents */}
          <div
            className={`bg-white p-6 rounded-2xl shadow-lg lg:w-3/5 transition-all duration-300 ${
              openDocuments[project.id] ? "opacity-100 visible" : "opacity-0 invisible lg:hidden"
            }`}
          >
            <h3 className="text-lg font-bold border-b pb-2">DOCUMENTS</h3>
            <div className="mt-2 w-full">
              {["Specification Report", "Warranty Documents", "Completion Certificate", "Site Image"].map(
                (doc, index) => (
                  <div
                    key={index}
                    className={`flex justify-between py-3 px-4 ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <span className="w-1/12 font-medium">
                      {["I", "II", "III", "IV"][index]}
                    </span>
                    <span className="w-1/2">{doc}</span>
                    <a href=" " className="text-blue-500">
                      View
                    </a>
                    <a href=" " className="text-blue-500">
                      Download
                    </a>
                  </div>
                )
              )}
            </div>
            <div className="mt-4 flex justify-center gap-4">
              <button className="px-6 py-2 bg-green-500 text-white rounded">
                ACCEPT
              </button>
              <button
                className="px-6 py-2 bg-red-500 text-white rounded"
                onClick={() => setShowRejection(!showRejection)}
              >
                REJECT
              </button>
            </div>
            {showRejection && (
              <div className="mt-4">
                <h3 className="text-lg font-bold border-b pb-2">
                  REASON FOR REJECTION
                </h3>
                <textarea
                  className="w-full mt-2 p-3 border rounded bg-gray-100"
                  placeholder="Tell Me Something About Rejection.."
                  rows="4"
                ></textarea>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompletedCard;
