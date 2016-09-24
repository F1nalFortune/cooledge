import React from 'react';
import $ from 'jquery';
import DropZone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'wh5ct9k2';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/mydevpoint/image/upload';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.onImageDrop = this.onImageDrop.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.state = {
      uploadedFileCloudinaryUrl: ''
    };
  }

  addUrl(url) {
      $.ajax({
        url: `/api/items/${this.props.id}`,
        type: 'PUT',
        dataType: 'JSON',
        data: { url }
      }).done( () => {
        this.props.updateItemUrl(this.props.id, url)
      })
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }


  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) 
        console.error(err);

      if (response.body.url !== '') {
        this.setState({ uploadedFileCloudinaryUrl: response.body.url });
        this.addUrl(response.body.url);
      }
    });
  };

  render() {
    return (
      <div>
        <DropZone
          onDrop={this.onImageDrop}
          style={{ border: 'none' }}
          accept='image/*'
          multiple={false}
        >
          <div>
            <br />
            <button type="button" className="btn btn-info">Add Image</button>
          </div>
        </DropZone>
      </div>
    )
  }
}

export default Upload;