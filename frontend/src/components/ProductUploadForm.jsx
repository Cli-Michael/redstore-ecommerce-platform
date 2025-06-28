import React, { useState } from 'react';
import axiosInstance from "../api/axiosInstance";

const ProductUploadForm = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    rating: '',
    specifications: '',
    additionalImages: [],
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('rating', productData.rating);
      formData.append('specifications', productData.specifications);

      if (imageFile) {
        formData.append('image', imageFile); // Must match "image" in Multer config
      }

      Array.from(productData.additionalImages).forEach((image) => {
        formData.append('additionalImages', image); // Must match "additionalImages" in Multer config
      });

      const response = await axiosInstance.post('/api/products/products-upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Product uploaded successfully!');
      setProductData({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        rating: '',
        specifications: '',
        additionalImages: [],
      });
      setImageFile(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error uploading product. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            value={productData.rating}
            onChange={handleChange}
            max="5"
            min="0"
            required
          />
        </div>

        <div>
          <label>Specifications:</label>
          <textarea
            name="specifications"
            value={productData.specifications}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        <div>
          <label>Additional Images:</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              setProductData((prevData) => ({
                ...prevData,
                additionalImages: [...prevData.additionalImages, ...e.target.files],
              }));
            }}
          />
        </div>

        {error && <div style={{ color: 'red' }}>{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductUploadForm;
