import { Typography } from '@mui/material';
import logo from '../assets/aws.drawio.svg';

export default function Info() {
  return (
    <div>
      <Typography align="center" variant="h4">
        Inventory System Architecture
      </Typography>
      <Typography
        align="center"
        variant="h5"
        gutterBottom
        style={{ marginBottom: '1rem' }}
      >
        What services are used in this project?
      </Typography>

      <Typography align="center" variant="h5" gutterBottom>
        API Gateway
      </Typography>
      <Typography
        align="center"
        variant="body1"
        gutterBottom
        style={{ fontWeight: 'bold', marginBottom: '2rem' }}
      >
        The first component of our system is an API Gateway that acts as the
        front-end to our backend services. It provides a RESTful interface that
        allows clients to interact with our inventory system. The API Gateway is
        responsible for routing requests to the appropriate Lambda function and
        handling authentication and authorization using AWS IAM.
      </Typography>
      <Typography align="center" variant="h5" gutterBottom>
        DynamoDB
      </Typography>
      <Typography
        align="center"
        variant="body1"
        gutterBottom
        style={{ fontWeight: 'bold', marginBottom: '2rem' }}
      >
        We use DynamoDB to store and manage our inventory data. DynamoDB is a
        highly scalable and performant NoSQL database that provides low latency
        access to data. Our inventory data is organized into tables and items,
        which can be easily queried and updated using the DynamoDB API. We also
        use DynamoDB streams to capture changes to our inventory data and
        trigger downstream processes.
      </Typography>
      <Typography align="center" variant="h5" gutterBottom>
        Lambda
      </Typography>
      <Typography
        align="center"
        variant="body1"
        gutterBottom
        style={{ fontWeight: 'bold', marginBottom: '2rem' }}
      >
        Our backend services are implemented using AWS Lambda functions. Lambda
        is a serverless compute service that allows us to run code without
        having to provision or manage servers. We use Lambda functions to
        implement business logic such as updating inventory, processing orders,
        and handling fraud incidents. Lambda functions can be easily integrated
        with other AWS services, such as DynamoDB, SES, and EventBridge, using
        AWS SDKs.
      </Typography>
      <Typography align="center" variant="h5" gutterBottom>
        Simple Email Service (SES)
      </Typography>
      <Typography
        align="center"
        variant="body1"
        gutterBottom
        style={{ fontWeight: 'bold', marginBottom: '2rem' }}
      >
        We use SES to send emails to clients. SES is a highly scalable and
        cost-effective email service that provides a simple API for sending
        transactional and marketing emails. We use SES to send order
        confirmations, shipment notifications, and other customer communication.
        SES also provides email tracking and analytics, which allows us to
        measure the effectiveness of our email campaigns.
      </Typography>
      <Typography align="center" variant="h5" gutterBottom>
        EventBridge
      </Typography>
      <Typography
        align="center"
        variant="body1"
        gutterBottom
        style={{ fontWeight: 'bold', marginBottom: '2rem' }}
      >
        Finally, we use EventBridge to manage fraud incidents. EventBridge is a
        serverless event bus that allows us to capture and process events from
        various sources. We use EventBridge to capture events from our API
        Gateway, Lambda functions, and other AWS services, and route them to the
        appropriate downstream processes. For example, when a potential fraud
        incident is detected, an event is sent to EventBridge, which triggers a
        Lambda function to investigate and resolve the incident. EventBridge
        provides a reliable and scalable way to manage events in our system, and
        allows us to respond quickly to incidents.
      </Typography>
      <Typography align="center" variant="h4">
        Inventory System Architecture Diagram
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={logo} alt="svg" />
      </div>
    </div>
  );
}
