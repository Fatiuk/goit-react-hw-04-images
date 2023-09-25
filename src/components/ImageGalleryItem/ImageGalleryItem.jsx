import React, { useState } from 'react';
import {
  GalleryItem,
  GalleryImage,
  GalleryInfo,
} from './ImageGalleryItem.styled';
import Modal from 'components/Modal/Modal';

const ImageGalleryItem = props => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

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
  } = props;

  return (
    <GalleryItem>
      <GalleryImage
        src={webformatURL}
        alt={tags}
        loading="lazy"
        onClick={toggleModal}
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
      {showModal && (
        <Modal
          onClose={toggleModal}
          largeImageURL={largeImageURL}
          tags={tags}
        ></Modal>
      )}
    </GalleryItem>
  );
};

export default ImageGalleryItem;
