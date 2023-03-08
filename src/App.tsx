import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

interface Product {
  id: string;
  name: string;
  price: number;
  productType: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  products: Product[];
  discount: string;
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    products: [],
    discount: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = process.env.REACT_APP_API_GATEWAY_URL;
    try {
      const response = await fetch(url + 'events', {
        mode: 'no-cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof FormData,
  ) => {
    setFormData({ ...formData, [key]: event.target.value });
  };

  const handleProductChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof Product,
    index: number,
  ) => {
    const products = [...formData.products];
    // @ts-ignore
    products[index][key] = event.target.value;
    setFormData({ ...formData, products });
  };

  const handleAddProduct = () => {
    const products = [...formData.products];
    products.push({ id: '', name: '', price: 0, productType: '' });
    setFormData({ ...formData, products });
  };

  const handleRemoveProduct = (index: number) => {
    const products = [...formData.products];
    products.splice(index, 1);
    setFormData({ ...formData, products });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={formData.name}
        onChange={(event) => handleInputChange(event, 'name')}
      />
      <br />
      <TextField
        label="Email"
        value={formData.email}
        onChange={(event) => handleInputChange(event, 'email')}
      />
      <br />
      <TextField
        label="Phone"
        value={formData.phone}
        onChange={(event) => handleInputChange(event, 'phone')}
      />
      <br />
      {formData.products.map((product, index) => (
        <div key={index}>
          <TextField
            label="Product ID"
            value={product.id}
            onChange={(event) => handleProductChange(event, 'id', index)}
          />
          <TextField
            label="Product Name"
            value={product.name}
            onChange={(event) => handleProductChange(event, 'name', index)}
          />
          <TextField
            label="Product Price"
            type="number"
            value={product.price}
            onChange={(event) => handleProductChange(event, 'price', index)}
          />
          <TextField
            label="Product Type"
            value={product.productType}
            onChange={(event) =>
              handleProductChange(event, 'productType', index)
            }
          />
          <Button
            variant="contained"
            onClick={() => handleRemoveProduct(index)}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button variant="contained" onClick={handleAddProduct}>
        Add Product
      </Button>
      <br />
      <TextField
        label="Discount Code"
        value={formData.discount}
        onChange={(event) => handleInputChange(event, 'discount')}
      />
      <br />
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default App;
