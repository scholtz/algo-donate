import React from "react";
import { Card, Heading, Text, Table } from "pipeline-ui";
import { Link, Link as PipeLink } from "react-router-dom";
import { Pipeline } from "pipeline-ui";

const myAlgoWallet = Pipeline.init();
Pipeline.main = true;
var mynet = Pipeline.main ? "MainNet" : "TestNet";

export default function Home() {
  const fetchBalance = () => {
    Pipeline.balance(
      "P65LXHA5MEDMOJ2ZAITLZWYSU6W25BF2FCXJ5KQRDUB2NT2T7DPAAFYT3U"
    ).then((data) => {
      console.log("data", data);
      //this.setState({ balance: data });
    });
  };
  return (
    <div>
      <Card>
        <Heading>
          Welcome to the algorand donation website!&nbsp;
          <PipeLink>
            <Link to={"/fund"}>Fund your project</Link>
          </PipeLink>
        </Heading>
        <Text>
          Powered by{" "}
          <a
            rel="noreferrer"
            target="_blank"
            href="https://www.pipeline-ui.com/"
          >
            PipelineUI
          </a>
        </Text>
      </Card>
      <Card>
        {mynet}
        <h2>Donate</h2>
        <p>These projects have requested donations:</p>

        <Table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Value</th>
              <th>Recipient</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>K4D...FGE</td>
              <td>0.10 Algo</td>
              <td>ER6...JSD</td>
              <td>July 31 2021 12:47:17 AM +UTC</td>
            </tr>
            <tr>
              <td>S3G...230</td>
              <td>0.11 Algo</td>
              <td>4GJ...1E1</td>
              <td>July 31 2021 12:52:17 AM +UTC</td>
            </tr>
            <tr>
              <td>8H6...C40</td>
              <td>0.12 Algo</td>
              <td>6H6...93J</td>
              <td>July 31 2021 12:55:17 AM +UTC</td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
