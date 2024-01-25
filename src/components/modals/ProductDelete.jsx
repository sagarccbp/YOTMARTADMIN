import React, {useState, useRef, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import {
  GET_PRODUCTS,
  CATEGORIES,
  UPDATE_CATEGORIES,
  UPLOADS,
} from "../../js/ApiEnds";
import {API_SERVER} from "../../rest/ApiService";
export default function CategoryDelete(props) {
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const imageRef = useRef();
  // console.log("Props are : ", props);
  useEffect(() => {
    setState({
      item_id: props.item._id,
      name: props.item.name,
      price: props.item.price,
      discount: props.item.discount,
      description: props.item.description,
      smallDescription: props.item.smallDescription,
      image: props.item.image,
    });
  }, [props]);
  const [state, setState] = React.useState({
    item_id: props.item._id,
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

  const editCategory = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Authorization"),
      },
      body: JSON.stringify(state),
    };
    fetch(
      API_SERVER +
        GET_PRODUCTS +
        "/" +
        UPDATE_CATEGORIES +
        "/" +
        props.item._id,
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

  const deleteCategory = categoryId => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Authorization"),
      },
    };
    fetch(API_SERVER + GET_PRODUCTS + "/" + props.item._id, requestOptions)
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
      <div onClick={handleShow} style={{cursor: "pointer"}}>
        <i
          className="fa fa-trash"
          style={{color: "#0b0e8e", marginRight: "10px"}}
        />
        Product
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="realfoodcolor">
            Are you sure, Want to delete Product?
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
              onClick={() => deleteCategory(props._id)}>
              Delete
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
