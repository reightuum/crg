import React, { useEffect, useRef, useState } from "react";
import useTimelineStore from "./store/timelineStore";

export default function App() {
  const {
    timeline,
    about,
    background,
    loading,
    error,
    fetchTimeline,
  } = useTimelineStore();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const aboutRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    fetchTimeline();
  }, [fetchTimeline]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = timeline.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(timeline.length / itemsPerPage);

  const paginate = (direction) => {
    setCurrentPage((prev) => {
      if (direction === "next") return Math.min(prev + 1, totalPages);
      if (direction === "prev") return Math.max(prev - 1, 1);
      return prev;
    });
  };

  const handleScrollToAbout = () => aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  const handleScrollToTimeline = () => timelineRef.current?.scrollIntoView({ behavior: "smooth" });

  if (loading) return <div className="p-4">Loading.....</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div
      className="min-h-screen p-6 text-gray-800 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(https://arthurfrost.qflo.co.za/${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
      }}
    >
      {/* Tabs */}
      <div className="flex justify-center mb-6 space-x-8">
        <button onClick={handleScrollToTimeline} className="text-xl font-semibold border-b-2 border-transparent hover:border-black focus:outline-none">Timeline</button>
        <button onClick={handleScrollToAbout} className="text-xl font-semibold border-b-2 border-transparent hover:border-black focus:outline-none">About</button>
      </div>

      {/* About Section */}
      <div ref={aboutRef} className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">About</h2>
        <div className="prose max-w-full mb-8" dangerouslySetInnerHTML={{ __html: about }} />
      </div>

      {/* Timeline Section */}
      <div ref={timelineRef}>
        <h1 className="text-2xl font-bold mb-4 text-center">Timeline</h1>
        <div className="relative overflow-x-auto p-4">
          <table className="w-full text-sm text-left border border-black">
            <thead className="text-xs uppercase bg-gray-100 border-b border-black">
              <tr>
                <th className="px-6 py-3 border-r border-black text-2xl text-red-400">Icon</th>
                <th className="px-6 py-3 border-r border-black">Title</th>
                <th className="px-6 py-3 border-r border-black">Date</th>
                <th className="px-6 py-3 border-r border-black">Category</th>
                <th className="px-6 py-3">Audio</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index} className="bg-white border-t border-black">
                  <td className="border-r border-black text-center">
                    {item.Icon && (
                      <img
                        src={`https://arthurfrost.qflo.co.za/${item.Image}`}
                        alt="icon"
                        className="max-w-[50px] mx-auto"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4">{item.Title}</td>
                  <td className="px-6 py-4">{item.CreateDate}</td>
                  <td className="px-6 py-4">{item.Category}</td>
                  <td className="px-6 py-4 text-center">
                    {item.Audio ? (
                      <audio controls className="mx-auto w-full max-w-[200px]">
                        <source src={`https://arthurfrost.qflo.co.za/${item.Audio}`} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    ) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-start mt-6 space-x-2">
          <button onClick={() => paginate("prev")} disabled={currentPage === 1} className="px-3 py-1 border border-black rounded bg-white text-black disabled:opacity-50">Previous</button>
          <button onClick={() => paginate("next")} disabled={currentPage === totalPages} className="px-3 py-1 border border-black rounded bg-white text-black disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
}
