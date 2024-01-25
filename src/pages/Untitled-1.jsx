import React, { Component } from "react";
import "./css/CreateCategory.css";

class CreateCategoryDemo extends Component {
  state = {
    selectedFile: null,
    imagePreviewUrl: null,
  };

  fileChangedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });

    let reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(event.target.files[0]);
  };

  submit = () => {
    var fd = new FormData();

    fd.append("file", this.state.selectedFile);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        alert("Uploaded!");
      }
    };
    request.open(
      "POST",
      "https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload",
      true
    );
    request.send(fd);
  };

  render() {
    let $imagePreview = (
      <div className="previewText image-container">
        Please select an Image for Preview
      </div>
    );
    if (this.state.imagePreviewUrl) {
      $imagePreview = (
        <div className="image-container">
          <img src={this.state.imagePreviewUrl} alt="icon" width="200" />{" "}
        </div>
      );
    }

    return (
      <div className="App">
        <input type="file" name="avatar" onChange={this.fileChangedHandler} />
        <button type="button" onClick={this.submit}>
          {" "}
          Upload{" "}
        </button>
        {$imagePreview}
      </div>
    );
  }
}

export default CreateCategoryDemo;
  <label
                      for="imagechange"
                      className="file-upload image-upload-wrap text-default  text-center fs-4"
                    >
                      <div className="drag-text" for="imagechange">
                        <h6 for="imagechange">
                          Drag and drop a file or select add Image
                        </h6>
                      </div>
                      {selectedImage && (
                        <img
                          className="preview"
                          src={preview}
                          for="imagechange"
                        />
                      )}
                    </label>
                    <input
                      ref={imageRef}
                      // className="file-upload-input"
                      type="file"
                      id="imagechange"
                      name="imagechange"
                      onChange={onSelectImage}
                      style={{ display: "none" }}
                    />