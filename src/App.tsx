import React, { useState } from 'react';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
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
    total: 0,
    status: Customer.RETAIL,
    fraud: false,
    review: 0,
    memberType: MemberType.MEMBER,
    products: [],
    discount: 0,
  });
  const [inputCount, setInputCount] = useState(0);

  const handleClick = () => {
    setInputCount(inputCount + 1);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const inputs = [];
  for (let i = 0; i < inputCount; i++) {
    inputs.push(
      <div key={i}>
        <FormControl variant="outlined" style={{ marginRight: '1rem' }}>
          <InputLabel id={`dropdown-label-${i}`}>Option 1</InputLabel>
          <Select
            value={formData.products[i]?.name}
            // onChange={handleChange}
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
            <MenuItem value={1}>Value 1</MenuItem>
            <MenuItem value={2}>Value 2</MenuItem>
            <MenuItem value={3}>Value 3</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{ marginRight: '1rem' }}>
          <InputLabel id={`dropdown-label-${i}`}>Option 2</InputLabel>
          <Select
            labelId={`dropdown-label-${i}`}
            value={formData.products[i]?.productType}
            label="Option 2"
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
            <MenuItem value={1}>Value 1</MenuItem>
            <MenuItem value={2}>Value 2</MenuItem>
            <MenuItem value={3}>Value 3</MenuItem>
          </Select>
          <Typography variant="body1" style={{ marginTop: '1rem' }}>
            Price {i + 1}
          </Typography>
        </FormControl>
      </div>,
    );
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const url = process.env.REACT_APP_API_GATEWAY_URL;

    event.preventDefault();

    const response = await fetch(url + 'events', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 200) {
      alert('Data submitted successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        total: 0,
        status: Customer.RETAIL,
        fraud: false,
        review: 0,
        memberType: MemberType.MEMBER,
        products: [],
        discount: 0,
      });
    } else {
      console.log(response);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
            required
            fullWidth
            label="Total"
            name="total"
            type="number"
            value={formData.total}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="status">Status</InputLabel>
            <Select
              labelId="status"
              name="status"
              value={formData.status}
              // onChange={handleChange}
            >
              <MenuItem value={Customer.RETAIL}>Retail</MenuItem>
              <MenuItem value={Customer.WHOLESALE}>Wholesale</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="memberType">Member Type</InputLabel>
            <Select
              labelId="memberType"
              name="memberType"
              value={formData.memberType}
              // onChange={handleChange}
            >
              <MenuItem value={MemberType.MEMBER}>Member</MenuItem>
              <MenuItem value={MemberType.NON_MEMBER}>Non-Member</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="review">Review</InputLabel>
            <Select
              labelId="review"
              name="review"
              value={formData.review}
              // onChange={handleChange}
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="discount">Discount</InputLabel>
            <Select
              labelId="discount"
              name="discount"
              value={formData.discount}
              // onChange={handleChange}
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={25}>25</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button variant="contained" onClick={handleClick} fullWidth>
            Toggle Input
          </Button>
          {inputs}
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
