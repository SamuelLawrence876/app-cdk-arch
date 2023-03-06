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
import { Transaction, Customer, MemberType } from './models/models';
import Info from './components/info';

const MyForm: React.FC = () => {
  const [formData, setFormData] = useState<Transaction>({
    name: '',
    email: '',
    phone: '',
    location: '',
    discount: '',
    status: Customer.RETAIL,
    fraud: false,
    review: 0,
    memberType: MemberType.MEMBER,
    products: [],
  });
  const [inputCount, setInputCount] = useState(0);
  const [alert, setAlert] = useState(false);

  const handleClick = () => {
    setInputCount(inputCount + 1);
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const inputs = [];
  for (let i = 0; i < inputCount; i++) {
    inputs.push(
      <div key={i}>
        <Typography
          sx={{
            marginTop: '1rem',
            marginBottom: '0.5rem',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            color: '#3f51b5',
          }}
        >
          Item {i + 1}
        </Typography>
        <FormControl variant="outlined">
          <InputLabel id={`dropdown-label-${i}`}>Shoe</InputLabel>
          <Select
            value={formData.products[i]?.name}
            onChange={handleChange}
            labelId={`dropdown-label-${i}`}
            label="Option 1"
            style={{ minWidth: '150px' }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: '200px',
                  width: '250px',
                },
              },
            }}
          >
            <MenuItem value={1}>Chukka</MenuItem>
            <MenuItem value={2}>Air Forces</MenuItem>
            <MenuItem value={3}>Air Max</MenuItem>
            <MenuItem value={4}>Air Jordan</MenuItem>
            <MenuItem value={5}>Duckbill</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{ marginRight: '1rem' }}>
          <TextField
            required
            fullWidth
            label="size"
            name="price"
            type="number"
            value={formData.products[i]?.price}
            onChange={handleChange}
          />
        </FormControl>
      </div>,
    );
  }

  const handleSubmit = async (event: any) => {
    const url = process.env.REACT_APP_API_GATEWAY_URL;

    event.preventDefault();

    await fetch(url + 'events', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    setAlert(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',

      status: Customer.RETAIL,
      fraud: false,
      review: 0,
      memberType: MemberType.MEMBER,
      products: [],
      discount: '',
    });
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
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Discount Code"
            name="discount"
            type="text"
            value={formData.discount}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select
              labelId="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value={Customer.RETAIL}>Retail</MenuItem>
              <MenuItem value={Customer.WHOLESALE}>Wholesale</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select
              labelId="memberType"
              name="memberType"
              value={formData.memberType}
              onChange={handleChange}
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
              width: '96%',
              height: '75%',
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
              onChange={handleChange}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={12}>
          <Button
            variant="contained"
            onClick={handleClick}
            fullWidth
            sx={{ marginBottom: '1rem' }}
          >
            Add additional product
          </Button>
          {inputs}
          {/* calculate total from product */}
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
      <Info />
    </form>
  );
};

export default MyForm;
