import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../component/layout";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../component/RequestRow";
class requestIndex extends Component {
  static async getInitialProps(props) {
    console.log("h");
    const { address } = props.query;
    console.log(address);
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();
    console.log(requestCount);
    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );
    console.log(requests);

    return { address, requests, requestCount, approversCount };
  }
  renderRow() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
      );
    });
  }
  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <h3>Request</h3>
        <Link route={`/campaign/${this.props.address}/request/new`}>
          <a>
            <Button primary floated="right" style={{marginBottom : 10}}> Add request</Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>DESCRIPTION</HeaderCell>
              <HeaderCell>AMOUNT</HeaderCell>
              <HeaderCell>RECIPIENT</HeaderCell>
              <HeaderCell>APPROVAL</HeaderCell>
              <HeaderCell>APPROVE</HeaderCell>
              <HeaderCell>FINALIZE</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRow()}</Body>
        </Table>
        <div>Found {this.props.requestCount} Requests</div>
      </Layout>
    );
  }
}

export default requestIndex;
