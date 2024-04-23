import { useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { SketchPicker } from "react-color";
import { GetColorName } from "hex-color-to-color-name";

export default function NewProduct() {
  const [file, setFile] = useState("");
  const [inputs, setInputs] = useState({});
  const [cat, setCat] = useState([]);
  const [siz, setSiz] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleCategory = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleSize = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSiz(selectedOptions);
  };

  const handleChangeComplete = (color) => {
    const colorName = GetColorName(color.hex);
    setSelectedColors((prev) => [...prev, { name: colorName, hex: color.hex }]);
  };

  const handleColorRemove = (color) => {
    setSelectedColors((prev) => prev.filter((c) => c !== color));
  };

  const colorNames = selectedColors.map((colorObj) => colorObj.name);

  const handleClick = (e) => {
    e.preventDefault();

    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;

          default:
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {
            ...inputs,
            img: downloadURL,
            categories: cat,
            size: siz,
            color: colorNames,
          };
          addProduct(product, dispatch);
        });
      }
    );
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="Apple Airpods"
            onChange={handleChange}
            id="title"
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="description"
            onChange={handleChange}
            id="desc"
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            type="number"
            placeholder="100"
            onChange={handleChange}
            id="price"
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input
            type="text"
            placeholder="Jeans, Women"
            onChange={handleCategory}
          />
        </div>
        <div className="addProductItem">
          <label htmlFor="sizes">Sizes</label>
          <select id="size" multiple onChange={handleSize}>
            <option value="XS">Extra Small (XS)</option>
            <option value="S">Small (S)</option>
            <option value="M">Medium (M)</option>
            <option value="L">Large (L)</option>
            <option value="XL">Extra Large (XL)</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {selectedColors.map((colorObj, index) => (
              <div
                key={index}
                style={{ display: "flex", alignItems: "center" }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    marginRight: "5px",
                    backgroundColor: colorObj.hex,
                  }}
                ></div>
                <span>{colorObj.name}</span>
                <button
                  type="button"
                  onClick={() => handleColorRemove(colorObj)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowColorPicker((prev) => !prev)}
          >
            {showColorPicker ? "Close Color Picker" : "Open Color Picker"}
          </button>
          {showColorPicker && (
            <SketchPicker
              color={selectedColors}
              onChangeComplete={handleChangeComplete}
            />
          )}
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select id="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button className="addProductButton" onClick={handleClick}>
          Create
        </button>
      </form>
    </div>
  );
}
