import React, { Component } from 'react';
import {
  GalleryItem,
  GalleryImage,
  GalleryInfo,
} from './ImageGalleryItem.styled';
import Modal from 'components/Modal/Modal';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const {
      image: {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      },
    } = this.props; //   Get image (props) from prev component (ImageGallery.jsx)
    return (
      <GalleryItem>
        <GalleryImage
          src={webformatURL}
          alt={tags}
          loading="lazy"
          onClick={this.toggleModal}
        />
        <GalleryInfo>
          <p>
            <b>&#128077;</b>
            {likes}
          </p>
          <p>
            <b>&#128064;</b>
            {views}
          </p>
          <p>
            <b>&#128172;</b>
            {comments}
          </p>
          <p>
            <b>&#128229;</b>
            {downloads}
          </p>
        </GalleryInfo>
        {this.state.showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImageURL={largeImageURL}
            tags={tags}
          ></Modal>
        )}
      </GalleryItem>
    );
  }
}
