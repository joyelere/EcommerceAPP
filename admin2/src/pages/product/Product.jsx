import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import useFetch from "../../hooks/useFetch";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { SketchPicker } from "react-color";
import { GetColorName } from "hex-color-to-color-name";
import { updateProduct } from "../../redux/apiCalls";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];

  const { data } = useFetch("/orders/income?pid=" + productId);
  const [pStats, setPStats] = useState([]);
  const [income, setIncome] = useState([]);
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState("");
  const [cat, setCat] = useState([]);
  const [siz, setSiz] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // const handleStock = (e) => {
  //   const value = e.target.value === "true"; // Convert "true" or "false" to boolean
  //   setInputs((prev) => ({ ...prev, [e.target.id]: value }));
  // };

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

  // const other = product.categories.length != 0 ? product.categories : cat;
  // console.log(other);

  const handleUpdate = (e) => {
    e.preventDefault();
    const cats = product.categories.length !== 0 ? product.categories : cat;
    const sizs = product.size.length !== 0 ? product.size : siz;
    const colors = product.color.length !== 0 ? product.color : colorNames;

    // Check if file state is empty
    if (!file) {
      const products = {
        ...inputs,
        categories: cats,
        size: sizs,
        color: colors,
      };
      // No image uploaded, proceed with updating user information without uploading an image
      updateProduct(product._id, products, dispatch);
      return;
    }

    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the   total number of bytes to be uploaded
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
          const products = {
            ...inputs,
            img: downloadURL,
            categories: cats,
            size: sizs,
            color: colors,
          };
          updateProduct(product._id, products, dispatch);
        });
      }
    );
  };

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    if (data) {
      const list = data.sort((a, b) => {
        return a._id - b._id;
      });
      const formattedStats = list.map((item) => ({
        name: MONTHS[item._id - 1],
        Sales: item.total,
      }));
      setPStats(formattedStats);
    }
    setIncome(data);
  }, [data, MONTHS]);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id: </span>
              <span className="productInfoValue"> {product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">
                $
                {income.length >= 2
                  ? income[0].total + income[1].total
                  : income[0]?.total}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">inStock:</span>
              <span className="productInfoValue">
                {" "}
                {product.inStock.toString()}{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              placeholder={product.title}
              id="title"
              onChange={handleChange}
            />
            <label>Product Desc</label>
            <input
              type="text"
              placeholder={product.desc}
              id="desc"
              onChange={handleChange}
            />
            <label>Product Price</label>
            <input
              type="text"
              placeholder={product.price}
              id="price"
              onChange={handleChange}
            />
            <label>Product Category</label>
            <input
              type="text"
              placeholder={product.categories}
              id="category"
              onChange={handleCategory}
            />
            <label htmlFor="sizes">Sizes</label>
            <select id="size" multiple onChange={handleSize}>
              <option value="XS">Extra Small (XS)</option>
              <option value="S">Small (S)</option>
              <option value="M">Medium (M)</option>
              <option value="L">Large (L)</option>
              <option value="XL">Extra Large (XL)</option>
            </select>
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
            <label>In Stock</label>
            <select name="inStock" id="inStock" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button className="productButton" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
