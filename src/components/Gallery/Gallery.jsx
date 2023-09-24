import Notiflix from 'notiflix';
import { InfinitySpin } from 'react-loader-spinner';
// ============ Component ============
import React, { Component } from 'react';
// ============ API ============
import * as PixabayAPI from '../../services/pixabay-api';
// ============ ImageGallery ============
import ImageGallery from 'components/ImageGallery/ImageGallery';
// ============ GalleryInfo ============
import GalleryInfo from 'components/GalleryInfo/GalleryInfo';
// ============ ButtonLoadMore ============
import Button from 'components/Button/Button';

// Define status constants for the component
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    // Initialize component state with default values
    this.state = {
      searchQuery: this.props.searchQuery,
      currentPage: 1,
      totalPages: 0,
      images: [],
      status: Status.IDLE,
    };
  }
  // Lifecycle method that runs when props or state change
  componentDidUpdate(prevProps, prevState) {
    // Check if searchQuery or currentPage has changed
    if (prevProps.searchQuery !== this.props.searchQuery) {
      // Update searchQuery in component state
      this.setState(
        {
          searchQuery: this.props.searchQuery,
          currentPage: 1,
        },
        // Call the updateImages function to fetch new images
        () => {
          this.updateImages();
        }
      );
    } else if (prevState.currentPage !== this.state.currentPage) {
      // Call the loadMore function to fetch new images
      this.loadMore();
    }
  }

  // Function to perform API request and retrieve data
  fetchImages = async (searchQuery, currentPage) => {
    try {
      const data = await PixabayAPI.getImages(searchQuery, currentPage);
      return data;
    } catch (error) {
      throw error;
    }
  };

  // Function to fetch and update images from Pixabay API
  updateImages = async () => {
    // Set the status to PENDING before fetching data.
    this.setState({
      status: Status.PENDING,
    });
    // Fetch images from PixabayAPI based on search query and current page.
    try {
      const data = await this.fetchImages(
        this.state.searchQuery,
        this.state.currentPage
      );
      // If no images are found, show a warning notification.
      if (data.hits.length === 0) {
        Notiflix.Report.warning(
          'PixQuery Warning',
          'Sorry, but we could not find any photos for your search query. Please try changing your keywords or search for something else.',
          'Okay'
        );
        // Set the status to REJECTED when no images are found.
        return this.setState({
          status: Status.REJECTED,
        });
      }

      console.log(this.state.searchQuery);
      console.log(this.state.currentPage);
      console.log(data);

      // Set the found images and status to RESOLVED.
      this.setState({
        images: [...data.hits],
        status: Status.RESOLVED,
        totalPages: Math.ceil(data.totalHits / 12),
      });
    } catch (error) {
      Notiflix.Report.failure(
        'PixQuery Warning',
        `Error fetching images: ${error.message}`,
        'Okay'
      );
      this.setState({
        status: Status.REJECTED,
      });
    }
  };
  // LoadMore method fetches and appends more images to the current state.
  loadMore = async () => {
    this.setState({
      status: Status.PENDING,
    });
    const data = await this.fetchImages(
      this.state.searchQuery,
      this.state.currentPage
    );

    this.setState(prevState => ({
      images: [...prevState.images, ...data.hits],
      status: Status.RESOLVED,
    }));
  };
  // Increment the currentPage by 1 when a button is clicked.
  handleButtonClick = () => {
    // Increment currentPage (+1)
    const newPage = this.state.currentPage + 1;
    this.setState({
      currentPage: newPage,
    });
  };

  render() {
    const { status } = this.state;

    if (status === 'idle') {
      return <GalleryInfo></GalleryInfo>;
    }

    if (status === 'pending') {
      return (
        <>
          {this.state.images.length > 0 && (
            <ImageGallery images={this.state.images}></ImageGallery>
          )}
          <InfinitySpin
            color="#b58e3f"
            style={{
              margin: '0 auto',
            }}
          />
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageGallery images={this.state.images}></ImageGallery>
          {this.state.currentPage < this.state.totalPages && (
            <Button onClick={this.handleButtonClick}></Button>
          )}
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <div>
          Sorry, but we could not find any photos for your search query. Please
          try changing your keywords or search for something else.
        </div>
      );
    }
  }
}
