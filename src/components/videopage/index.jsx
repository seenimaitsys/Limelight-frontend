import { useState } from "react";
import { Pagination } from "react-bootstrap";

const VideoList = ({ videos }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 10;
  const totalPages = Math.ceil(videos.length / videosPerPage);

  // Logic for displaying videos
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  // Logic for changing page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers array
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 8;
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage;
      if (currentPage <= halfPagesToShow) {
        startPage = 1;
      } else if (currentPage + halfPagesToShow >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
      } else {
        startPage = currentPage - halfPagesToShow;
      }

      for (let i = startPage; i < startPage + maxPagesToShow; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  return (
    <div>
      {/* Display videos */}
      <div className="row">
        {currentVideos.map((video, index) => (
          <div key={index} className="col-md-4">
            {/* Render your video component here */}
            {/* Example: <VideoComponent video={video} /> */}
            <p>{video.title}</p>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <Pagination>
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {getPageNumbers().map((pageNumber, index) => (
          <Pagination.Item
            key={index}
            active={pageNumber === currentPage}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} />
      </Pagination>
    </div>
  );
};

export default VideoList;
