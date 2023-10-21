import React, { useState, useEffect } from "react";

function BodyComponent() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Bloody X5 Pro Max",
      selected: false,
      priceInUAH: 1099,
      description: "",
      descriptionVisible: false,
    },
    {
      id: 2,
      name: "Poco F3",
      selected: false,
      priceInUAH: 7800,
      description: "",
      descriptionVisible: false,
    },
    {
      id: 3,
      name: "Redmi Buds 4 Pro",
      selected: false,
      priceInUAH: 2100,
      description: "",
      descriptionVisible: false,
    },
    {
      id: 4,
      name: "HP Omen 15",
      selected: false,
      priceInUAH: 30000,
      description: "",
      descriptionVisible: false,
    },
  ]);

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [exchangeRate] = useState(0.0274);
  const [totalUSD, setTotalUSD] = useState(0);
  const [productDescription, setProductDescription] = useState("");

  const selectedProductsCount = products.filter(
    (product) => product.selected
  ).length;

  useEffect(() => {
    calculateTotalUSD();
  }, [products, exchangeRate]);

  const handleCheckboxChange = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, selected: !product.selected }
          : product
      )
    );
  };

  const handleAddComment = () => {
    if (commentText.trim() !== "") {
      const selectedProducts = products.filter((product) => product.selected);
      selectedProducts.forEach((product) => {
        if (!product.comments) {
          product.comments = [];
        }
        product.comments.push(commentText);
      });

      setComments((prevComments) => [...prevComments, commentText]);
      setCommentText("");
      setProducts([...products]);

      if (!selectedProducts) {
        alert("Выберите товар для добавления комментария.");
        return;
      } else {
        alert(`Ваш відгук: "${commentText}" додано успішно!`);
      }
    }
  };

  const calculateTotalUSD = () => {
    const selectedProducts = products.filter((product) => product.selected);
    const totalUSD = selectedProducts.reduce(
      (accumulator, product) => accumulator + product.priceInUAH * exchangeRate,
      0
    );
    setTotalUSD(totalUSD.toFixed(2));
  };

  const handleProductDescriptionChange = (event) => {
    setProductDescription(event.target.value);
  };

  const handleShowProductDescription = (productId) => {
    const updatedProducts = [...products];
    const selectedProduct = updatedProducts.find(
      (product) => product.id === productId
    );
    if (selectedProduct) {
      selectedProduct.descriptionVisible = !selectedProduct.descriptionVisible;
    }
    setProducts(updatedProducts);
  };

  const handleAddDescription = () => {
    const selectedProduct = products.find((product) => product.selected);
    if (!selectedProduct) {
      alert("Виберiть товар для додавання опису!");
      return;
    }
    selectedProduct.description = productDescription;
    setProductDescription("");
  };

  return (
    <div className="ProductList">
      <div className="CountProducts">
        <div className="info">
          <text>{selectedProductsCount} товарів обрано</text>
          {totalUSD > 0 && (
            <text>Загальна сума в доларах: ${totalUSD} USD</text>
          )}
        </div>
      </div>
      {products.map((product) => (
        <li key={product.id}>
          <label className="ProductSale">
            <input
              type="checkbox"
              checked={product.selected}
              onChange={() => handleCheckboxChange(product.id)}
            />
            {product.name} - {product.priceInUAH} гривень
            <button
              className="buttonProduct"
              onClick={() => handleShowProductDescription(product.id)}
            >
              {product.descriptionVisible
                ? "Скрыть описание"
                : "Показать описание"}
            </button>
          </label>
          {product.descriptionVisible && product.description && (
            <div className="ProductDescription">{product.description}</div>
          )}
        </li>
      ))}
      <div className="commentarSend">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Ваш коментар..."
        />
        <button onClick={handleAddComment}>Додати коментар</button>
      </div>
      <div className="commentsReceive">
        <div className="descriptionSend">
          <textarea
            value={productDescription}
            onChange={handleProductDescriptionChange}
            placeholder="Детальний опис товару..."
          />
          <button onClick={handleAddDescription}>Додати опис</button>
        </div>
        <h3>Коментарі:</h3>
        {products.map(
          (product) =>
            product.comments &&
            product.comments.length > 0 && (
              <div key={product.id}>
                <h4>{product.name}:</h4>
                {product.comments.map((comment, index) => (
                  <div className="commentText" key={index}>
                    {comment}
                  </div>
                ))}
                ;
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default BodyComponent;
