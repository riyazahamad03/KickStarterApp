import React, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../component/layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../component/ContributeForm";
import { Link } from "../../routes";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    // console.log(props.query.address);
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    // console.log(summary);
    return {
      address: props.query.address,
      minumumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minumumContribution,
      requestCount,
      approversCount,
    } = this.props;
    const balanceInWei = web3.utils.toWei(balance.toString(), "ether");
    const items = [
      {
        header: manager,
        meta: "Address of manager",
        description:
          "manager created this campaign and can create a request to withdraw money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minumumContribution,
        meta: "minimum Contribution(WEI)",
        description: "you must contribute atleast this much",
      },
      {
        header: requestCount,
        meta: "Number of request",
        description: "A request tries to withdraw money from the contract",
      },
      {
        header: approversCount,
        meta: "Number of approvers",
        description: " A number of people who have already donated",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description:
          "The balance represent how much ether left in this account",
      },
    ];
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary> View Request</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
