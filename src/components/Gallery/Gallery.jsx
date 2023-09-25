import Notiflix from 'notiflix';
import { InfinitySpin } from 'react-loader-spinner';
import { useEffect, useState, useCallback } from 'react';
import * as PixabayAPI from '../../services/pixabay-api';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import GalleryInfo from 'components/GalleryInfo/GalleryInfo';
import Button from 'components/Button/Button';

// Define status constants for the component
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const Gallery = ({ searchQuery }) => {
  // Initialize component state with default values
  const [query, setQuery] = useState(searchQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);

  // Function to perform API request and retrieve data
  const fetchImages = async (query, currentPage) => {
    try {
      const data = await PixabayAPI.getImages(query, currentPage);
      return data;
    } catch (error) {
      throw error;
    }
  };

  // Define updateImages with useCallback
  const updateImages = useCallback(async () => {
    // Condition: If the search query is empty, do not make an API request
    if (query.trim() === '') {
      return;
    }
    setStatus(Status.PENDING);
    // Fetch images from PixabayAPI based on search query and current page.
    try {
      const data = await fetchImages(query, currentPage);
      // If no images are found, show a warning notification.
      if (data.hits.length === 0) {
        Notiflix.Report.warning(
          'PixQuery Warning',
          'Sorry, but we could not find any photos for your search query. Please try changing your keywords or search for something else.',
          'Okay'
        );
        // Set the status to REJECTED when no images are found.
        setStatus(Status.REJECTED);
      } else {
        setImages([...data.hits]);
        setTotalPages(Math.ceil(data.totalHits / 12));
        setStatus(Status.RESOLVED);
      }
    } catch (error) {
      Notiflix.Report.failure(
        'PixQuery Warning',
        `Error fetching images: ${error.message}`,
        'Okay'
      );
      setStatus(Status.REJECTED);
    }
  }, [query, currentPage]);

  // LoadMore method fetches and appends more images to the current state.
  const loadMore = useCallback(async () => {
    setStatus(Status.PENDING);
    const data = await fetchImages(query, currentPage);
    setImages(prevImages => [...prevImages, ...data.hits]);
    setStatus(Status.RESOLVED);
  }, [currentPage, query]);

  // Lifecycle method that runs when props or state change
  useEffect(() => {
    // Check if searchQuery has changed
    if (searchQuery !== query) {
      // Update query and reset currentPage to 1
      setQuery(searchQuery);
      setCurrentPage(1);
    }
  }, [searchQuery, query]);

  useEffect(() => {
    if (currentPage === 1) {
      updateImages();
    } else {
      loadMore();
    }
  }, [currentPage, loadMore, updateImages]);

  // Increment the currentPage by 1 when a button is clicked.
  const handleButtonClick = () => {
    // Increment currentPage (+1)
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
  };

  // Rendering based on status begins here (🖥️)
  if (status === Status.IDLE) {
    return <GalleryInfo />;
  }

  if (status === Status.PENDING) {
    return (
      <>
        {images.length > 0 && <ImageGallery images={images} />}
        <InfinitySpin
          color="#b58e3f"
          style={{
            margin: '0 auto',
          }}
        />
      </>
    );
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        <ImageGallery images={images} />
        {currentPage < totalPages && (
          <Button onClick={handleButtonClick}>Load More</Button>
        )}
      </>
    );
  }

  if (status === Status.REJECTED) {
    return (
      <div>
        Sorry, but we could not find any photos for your search query. Please
        try changing your keywords or search for something else.
      </div>
    );
  }
};

export default Gallery;
