import Gallery from 'react-grid-gallery';
import React, { Component } from 'react';

class GalleryContainer extends Component {
  constructor({ images }) {
    super();
    this.state = {
      images: images.map(obj => Object.assign(obj, {
        thumbnail: obj.src,
        thumbnailWidth: 320,
        thumbnailHeight: 320,
        isSelected: false,
      })),
    };
  }

  render() {
    const {
      images,
    } = this.state;

    return (
      <Gallery images={images} />
    );
  }
}

export default GalleryContainer;
