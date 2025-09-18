export default function Pagination({
  currentPage,
  totalNumberOfPages,
  setCurrentPage,
}) {
  return (
    <div className="flex gap-4 bg-blue-950 w-fit p-2 rounded-md">
      <button
        className="bg-amber-600 p-1 rounded-sm"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        Previous
      </button>
      <span>{`${currentPage} / ${totalNumberOfPages}`}</span>
      <button
        className="bg-amber-600 p-1 rounded-sm"
        disabled={currentPage === totalNumberOfPages}
        onClick={() => {
          setCurrentPage((prev) => prev + 1);
        }}
      >
        Next
      </button>
    </div>
  );
}
