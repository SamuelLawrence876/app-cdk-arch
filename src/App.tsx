import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import {
  Transaction,
  Customer,
  MemberType,
  Product,
  Location,
} from './models/models';
import Info from './components/info';

const App: React.FC = () => {
  const [formData, setFormData] = useState<Transaction>({
    name: '',
    email: '',
    phone: '',
    products: [],
    discount: '',
    status: Customer.RETAIL,
    memberType: MemberType.MEMBER,
    review: 0,
    fraud: false,
    location: Location.UK,
  });

  const [alert, setAlert] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = process.env.REACT_APP_API_GATEWAY_URL;

    await fetch(url + 'events', {
      mode: 'no-cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setAlert(true);

    setFormData({
      name: '',
      email: '',
      phone: '',
      products: [],
      discount: '',
      status: Customer.RETAIL,
      memberType: MemberType.MEMBER,
      review: 0,
      fraud: false,
      location: Location.UK,
    });
  };

  const handleInputChange = (event: any, key: keyof Transaction) => {
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
      {alert && (
        <Alert
          severity="success"
          onClose={() => {
            setAlert(false);
          }}
        >
          Product submission successful!
        </Alert>
      )}

      <Typography align="center" variant="h4" color="primary" gutterBottom>
        AWS CDK React App
      </Typography>
      <Typography
        align="center"
        variant="body1"
        gutterBottom
        style={{ fontWeight: 'bold', marginBottom: '2rem' }}
      >
        The following is a is a high-level overview of the architecture of the
        react app. The basis of the app is that it is a serverless application
        that uses AWS Lambda to handle the backend logic and DynamoDB to store
        and manage the inventory data.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Name"
            value={formData.name}
            onChange={(event) => handleInputChange(event, 'name')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Email"
            value={formData.email}
            onChange={(event) => handleInputChange(event, 'email')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Phone"
            value={formData.phone}
            onChange={(event) => handleInputChange(event, 'phone')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth>
            <InputLabel id="location-label">Location</InputLabel>
            <Select
              labelId="location-label"
              id="location"
              name="location"
              value={formData.location}
              onChange={(event) => handleInputChange(event, 'location')}
            >
              <MenuItem value={Location.UK}>UK</MenuItem>
              <MenuItem value={Location.USA}>US</MenuItem>
              <MenuItem value={Location.North_Korea}>North Korea</MenuItem>
              <MenuItem value={Location.CANADA}>Canada</MenuItem>
              <MenuItem value={Location.JAMAICA}>Jamaica</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Discount Code"
            value={formData.discount}
            onChange={(event) => handleInputChange(event, 'discount')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select
              label="status"
              name="status"
              value={formData.status}
              onChange={(event: any) => handleInputChange(event, 'status')}
            >
              <MenuItem value={Customer.RETAIL}>Retail</MenuItem>
              <MenuItem value={Customer.WHOLESALE}>Wholesale</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select
              label="memberType"
              name="memberType"
              value={formData.memberType}
              onChange={(event: any) => handleInputChange(event, 'memberType')}
            >
              <MenuItem value={MemberType.MEMBER}>Member</MenuItem>
              <MenuItem value={MemberType.NON_MEMBER}>Non-Member</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '96.25%',
              height: '70%',
              borderRadius: 1,
              border: '1px solid rgba(0, 0, 0, 0.23)',
              padding: '8px 16px',
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
              '&:focus-within': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                borderColor: '#80bdff',
                boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.5)',
              },
            }}
          >
            <InputLabel id="memberType" sx={{ width: '80%' }}>
              Customer Review
            </InputLabel>

            <Rating
              name="review"
              value={formData.review}
              onChange={(event: any) => handleInputChange(event, 'review')}
            />
          </Box>
        </Grid>
        <Button
          variant="contained"
          fullWidth
          onClick={handleAddProduct}
          sx={{ marginTop: '1rem', marginBottom: '1rem' }}
        >
          Add Product
        </Button>
      </Grid>
      {formData.products.map((product, index) => (
        <div key={index}>
          <Grid container spacing={2} columns={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Product Name"
                value={product.name}
                onChange={(event) => handleProductChange(event, 'name', index)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Product Type"
                value={product.productType}
                onChange={(event) =>
                  handleProductChange(event, 'productType', index)
                }
              />
            </Grid>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleRemoveProduct(index)}
              sx={{ marginTop: '1rem', marginBottom: '1rem' }}
            >
              Remove
            </Button>
          </Grid>
        </div>
      ))}

      <Button
        variant="contained"
        type="submit"
        fullWidth
        color="success"
        sx={{ marginTop: '1rem' }}
      >
        Submit
      </Button>
      <Info />
    </form>
  );
};

export default App;
