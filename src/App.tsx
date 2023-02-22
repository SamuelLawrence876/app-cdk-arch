import React, { useState } from "react";

// or
import { Button, Grid, TextField } from "@mui/material";
// import { makeStyles } from "@mui/styles";

interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
}

// const useStyles = makeStyles((theme: { spacing: (arg0: number) => any }) => ({
//   form: {
//     marginTop: theme.spacing(2),
//     marginBottom: theme.spacing(2),
//   },
//   button: {
//     marginTop: theme.spacing(2),
//   },
// }));

const MyForm: React.FC = () => {
  // const classes = useStyles();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch(
      "https://your-api-gateway-endpoint.com/your/endpoint",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "AWS4-HMAC-SHA256 Credential=YOUR_CREDENTIALS,SignedHeaders=host;x-amz-date,Signature=YOUR_SIGNATURE",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      alert("Data submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
      });
    } else {
      alert("There was a problem submitting your data.");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
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
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            // className={classes.button}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default MyForm;
