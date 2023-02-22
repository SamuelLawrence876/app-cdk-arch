import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Transaction, Customer, MemberType, Product } from "./models/models";

const sessionToken =
  "IQoJb3JpZ2luX2VjEEIaCWV1LXdlc3QtMSJHMEUCIQC/wkt4/DzswTLsPRSxpc8j43pBnTESrQAJBClyeMkYLgIgZ6Pg4WJSa+BoIGZz72BKkEgs8zzWxhVM7vwHN6UfbUIqpgMI2v//////////ARACGgwwMzgwMjE4NDIzMjMiDEr8dXlBL1k0KAc9dir6AnkvDItUxgkJET+cas49d1TkYAJkYerVxgaz9qa1YvOnAiZ0HeoKq1QKdNFbUWp2/Dd+vVQBRIkUiYnNnf6sdhJ83R0Fb2XUAzas44u5UwP8Ruv/n41ZkyZLYcAAWWP0pNFDTNXau7c7fh6RHO6fiQithosM22oaemvvyRTA6kckkmuNB9N+tbA/wXXmtHmpP/ZjJTlrO9HPZj4CaxxVhLkahCaBH2DmNKa7t84X1q+lMUvFxirLQjZd7LMzEoLtEvRsdDIPTQS00Z3CB606BAbrSC4Y2frIPkrRirUYKlXH4jBZDvz8hlUBUulGulW7sd7KLrAbJo8oDmtvLAz3/MJWftKse3yi/6+8Xi4wwWtPg1oKTbRcoz+cfChXf0p+yYjLyVo0Sh4L31AsFtTe0Q3dnMfLA9hDB18Q+Tj028+Ji5Jqe29Uw2teZbyoQjoD4RhKq+KiqwbPJxy5RxcsspYyliVNEWOVqdoysudqCT7ihVawQqfD8QBi9TCNmtmfBjqmAQ10CjM1bwD+dGmn7CjqCzpPPXYC15wCVu/sSbo958Kn9LpJyi7JqK1rM4C+t790vBUrlnyza8y1BbqJqT2LbO9p2DsMCBudYViRnpwJgvKexRwoO8nPYQRWJgpa2T/SHJL3nEflx9hnDRmyD1WTwkO/FxNhKfcR1JEMAEP96k3RlZMlY9Hj1jcbFKBsoe7KRZJh9Wu2gGUmWHlrKtwpoT7ApduHzck=";

const MyForm: React.FC = () => {
  const [formData, setFormData] = useState<Transaction>({
    name: "",
    email: "",
    phone: "",
    location: "",
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
        <FormControl variant="outlined" style={{ marginRight: "1rem" }}>
          <InputLabel id={`dropdown-label-${i}`}>Option 1</InputLabel>
          <Select
            value={formData.products[i]?.name}
            // onChange={handleChange}
            labelId={`dropdown-label-${i}`}
            label="Option 1"
            style={{ minWidth: "150px" }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: "200px",
                  width: "250px",
                },
              },
            }}
          >
            <MenuItem value={1}>Value 1</MenuItem>
            <MenuItem value={2}>Value 2</MenuItem>
            <MenuItem value={3}>Value 3</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{ marginRight: "1rem" }}>
          <InputLabel id={`dropdown-label-${i}`}>Option 2</InputLabel>
          <Select
            labelId={`dropdown-label-${i}`}
            value={formData.products[i]?.productType}
            label="Option 2"
            style={{ minWidth: "150px" }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: "200px",
                  width: "250px",
                },
              },
            }}
          >
            <MenuItem value={1}>Value 1</MenuItem>
            <MenuItem value={2}>Value 2</MenuItem>
            <MenuItem value={3}>Value 3</MenuItem>
          </Select>
          <Typography variant="body1" style={{ marginTop: "1rem" }}>
            Price {i + 1}
          </Typography>
        </FormControl>
      </div>
    );
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const url =
      "https://sk8inyuvn9.execute-api.eu-west-1.amazonaws.com/prod/events";

    event.preventDefault();

    const response = await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
        "X-Amz-Security-Token": sessionToken as string,
        "X-Amz-Date": new Date().toISOString(),
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Data submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
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
    </form>
  );
};

export default MyForm;
