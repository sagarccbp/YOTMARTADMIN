import React, {useState, useRef, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import {
  ADD_PRODUCTS,
  BANNERS,
  CATEGORIES,
  UPDATE_CATEGORIES,
  UPLOADS,
} from "../../js/ApiEnds";
import {API_SERVER, API_KEY} from "./../../rest/ApiService.js";
export default function StaticElementsDelete(props) {
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const imageRef = useRef();
  // console.log("Props are : ", props);
  useEffect(() => {
    setState({
      item_id: props.item.bannerItemId,
      name: props.item.name,
      price: props.item.price,
      discount: props.item.discount,
      description: props.item.description,
      smallDescription: props.item.smallDescription,
      image: props.item.image,
    });
  }, [props]);
  const [state, setState] = React.useState({
    item_id: props.item.bannerItemId,
    name: props.item.name,
    price: props.item.price,
    discount: props.item.discount,
    description: props.item.description,
    smallDescription: props.item.smallDescription,
    image: props.item.image,
  });
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (!selectedImage) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  function onSelectImage(e) {
    // console.log("Selected image here");
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(undefined);
      return;
    }
    setSelectedImage(e.target.files[0]);
  }

  const deleteCategory = categoryId => {
    // console.log("props id", props.item._id);
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Authorization"),
        API_KEY: API_KEY,
      },
    };
    fetch(
      `${API_SERVER}homeScreenItems/staticElements/` + props.item._id,
      requestOptions
    )
      .then(response => response.json())
      .then(data => {
        window.scrollTo({top: 0, behavior: "smooth"});
        setShow(false);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  function changeHandler(evt) {
    const value = evt.target.value;
    // console.log(value);
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  return (
    <>
      <div onClick={handleShow} style={{marginLeft: "10px"}}>
        <i className="fa fa-trash" style={{color: "#0b0e8e"}} />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="realfoodcolor">
            Are you sure, Want to delete this static element?
          </Modal.Title>
          {/* <button
            onClick={handleClose}
            type="button"
            className="btn btn-link"
            style={{ textDecoration: "none" }}
          >
            <i class="fa fa-window-close fa-2x" style={{ color: "blue" }}></i>
          </button> */}
        </Modal.Header>

        <Modal.Body>
          <div className="col-md-12 text-center">
            <button
              onClick={handleClose}
              type="button"
              className="btn btn-success">
              Close
            </button>

            <button
              style={{margin: "20px"}}
              type="button"
              className="btn btn-danger"
              onClick={() => deleteCategory(props.item._id)}>
              Delete
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
