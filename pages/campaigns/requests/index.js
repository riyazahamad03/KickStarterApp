import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../component/layout";
class requestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }
  render() {
    return (
      <Layout>
        <h3>Request</h3>
        <Link route={`/campaign/${this.props.address}/request/new`}>
          <a>
            <Button primary> Add request</Button>
          </a>
        </Link>
      </Layout>
    );
  }
}

export default requestIndex;
