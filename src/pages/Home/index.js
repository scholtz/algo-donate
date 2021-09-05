import React from "react";
import { Card, Heading, Text, Table } from "pipeline-ui";
import { Link, Link as PipeLink } from "react-router-dom";
import { Pipeline } from "pipeline-ui";
import algosdk from "algosdk";

const myAlgoWallet = Pipeline.init();
Pipeline.main = false;
var mynet = Pipeline.main ? "MainNet" : "TestNet";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);

    if (Pipeline.main) {
      this.state = {
        algod: "https://algoexplorerapi.io",
        algodToken:
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        indexer: "https://algoexplorerapi.io/idx2",
        indexerToken:
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        txs: [],
        params: { firstRound: 0 },
      };
    } else {
      this.state = {
        algod: "http://localhost:4001",
        algodToken:
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        indexer: "http://localhost:8980",
        indexerToken:
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        txs: [],
        params: { firstRound: 0 },
      };
    }
    const that = this;
  }

  async componentDidMount() {
    try {
      const params = await this.getTransactionParams();
      var from = Math.max(1, params.firstRound - 100000);
      const txs = await this.searchForTransactionsWithNoteAndAmount({
        note: "donation/v1",
        amount: 800,
        min: from,
      }); // it will wait here untill function a finishes
      const newState = { ...this.state };
      newState.txs = this.parseTransactions(txs);
      newState.params = params;
      await this.setState(newState);
      console.log("state", this.state);
    } catch (err) {}
  }
  fetchBalance = () => {
    Pipeline.balance(
      "P65LXHA5MEDMOJ2ZAITLZWYSU6W25BF2FCXJ5KQRDUB2NT2T7DPAAFYT3U"
    ).then((data) => {
      console.log("data", data);
      //this.setState({ balance: data });
    });
  };
  parseTransactions(txs) {
    const ret = [];
    if (!txs) return [];
    if (!txs.transactions) return [];
    for (const index in txs.transactions) {
      const tx = txs.transactions[index];
      const row = {};
      row.id = tx.id;
      row["round-time"] = tx["round-time"];
      const search = "donation/v1:j";
      let note = "";
      if (this.isBase64(tx.note)) {
        note = atob(tx.note, "base64");
      }
      console.log("note", note);
      if (!note.startsWith(search)) {
        continue;
      }
      note = note.replace(search, "");

      let noteJson = {};
      try {
        noteJson = JSON.parse(note);
        row.note = noteJson;
      } catch (e) {
        console.log("error parsing", tx);
        continue;
      }
      ret.push(row);
    }
    return ret;
  }
  isBase64(str) {
    if (!str) return false;
    if (str.trim() === "") {
      return false;
    }
    try {
      return btoa(atob(str)) == str;
    } catch (err) {
      return false;
    }
  }
  async getTransactionParams() {
    try {
      const url = new URL(this.state.algod);
      let algodclient = new algosdk.Algodv2(
        this.state.algodToken,
        this.state.algod,
        url.port
      );
      return await algodclient.getTransactionParams().do();
    } catch (error) {
      console.log("error", error);
    }
  }
  searchForTransactionsWithNoteAndAmount = async ({ note, amount, min }) => {
    try {
      const url = new URL(this.state.indexer);
      const indexerClient = new algosdk.Indexer(
        this.state.indexerToken,
        this.state.indexer,
        url.port
      );
      const enc = new TextEncoder();
      const noteenc = enc.encode(note);
      const searchForTransactions = await indexerClient
        .searchForTransactions()
        .currencyGreaterThan(amount - 1)
        .currencyLessThan(amount + 1)
        .minRound(Math.max(min, 0))
        .notePrefix(noteenc)
        .do();
      return searchForTransactions;
    } catch (error) {
      console.log("error", error, note);
    }
  };
  render() {
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
          {this.state.algod} {this.state.params.firstRound}
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
              {this.state.txs.map((row) => (
                <tr>
                  <td>{row["id"]}</td>
                  <td>0.10 Algo</td>
                  <td>ER6...JSD</td>
                  <td>{row["round-time"]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </div>
    );
  }
}
