import React, { useState } from "react";
import {
  Card,
  Heading,
  Text,
  Input,
  Textarea,
  QR,
  Box,
  Select,
} from "pipeline-ui";
import { Link, Link as PipeLink } from "react-router-dom";

export default function Home() {
  const [state, setState] = useState({
    amount: 0,
    wait: 100000,
    reason: "",
    code: "",
    qr: "",
    title: "",
    asset: "ALGO",
    url: "",
    account: "",
    showPayment: false,
  });
  const AsaList = [
    { value: "ALGO", label: "Algorand" },
    { value: "312769", label: "Tether - USDt" },
  ];
  const onAmountChange = (e) => {
    setState((prevState) => {
      const newState = { ...prevState };

      newState.amount = e.target.value;
      newState.code = makeNote(newState);
      newState.qr = makeQR(newState);
      newState.showPayment = !!newState.code;
      return newState;
    });
  };
  const onURLChange = (e) => {
    setState((prevState) => {
      const newState = { ...prevState };
      newState.url = e.target.value;
      newState.code = makeNote(newState);
      newState.qr = makeQR(newState);
      newState.showPayment = !!newState.code;
      return newState;
    });
  };
  const onTitleChange = (e) => {
    setState((prevState) => {
      const newState = { ...prevState };
      newState.title = e.target.value;
      newState.code = makeNote(newState);
      newState.qr = makeQR(newState);
      newState.showPayment = !!newState.code;
      return newState;
    });
  };
  const onAccountChange = (e) => {
    setState((prevState) => {
      const newState = { ...prevState };
      newState.account = e.target.value;
      newState.code = makeNote(newState);
      newState.qr = makeQR(newState);
      newState.showPayment = !!newState.code;
      return newState;
    });
  };
  const onWaitChange = (e) => {
    setState((prevState) => {
      const newState = { ...prevState };
      newState.wait = e.target.value;
      newState.code = makeNote(newState);
      newState.qr = makeQR(newState);
      newState.showPayment = !!newState.code;
      return newState;
    });
  };
  const onReasonChange = (e) => {
    setState((prevState) => {
      const newState = { ...prevState };
      newState.reason = e.target.value;
      newState.code = makeNote(newState);
      newState.qr = makeQR(newState);
      newState.showPayment = !!newState.code;
      return newState;
    });
  };
  const onAssetChange = (e) => {
    setState((prevState) => {
      const newState = { ...prevState };
      if (!e.value) return newState;
      newState.asset = e.value;
      newState.code = makeNote(newState);
      newState.qr = makeQR(newState);
      newState.showPayment = !!newState.code;
      return newState;
    });
  };
  const makeNote = (state) => {
    if (state.amount <= 0) {
      return "";
    }
    if (!state.title) return "";
    if (!state.reason) return "";
    const url = state.url.startsWith("https://")
      ? state.url
      : "https://" + state.url;
    if (url == "https://") return "";
    return (
      "donation/v1:j" +
      JSON.stringify({
        title: state.title,
        reason: state.reason,
        amount: state.amount,
        asset: state.asset,
        url,
        duration: state.wait,
      })
    );
  };
  const makeQR = (state) => {
    if (state.amount <= 0) {
      return "";
    }
    if (!state.reason) return "";
    return (
      "algorand://" +
      state.account +
      "?amount=800&xnote=" +
      state.code.replace(/&/g, "%26")
    );
  };
  return (
    <div>
      <Card>
        <Heading>Fund your project</Heading>
      </Card>
      <Card>
        <PipeLink>
          <Link to={"/donate"}>Donate to best project - Ask for donation</Link>
        </PipeLink>
        <Text>Hello, you can request funding.</Text>
        <Text>
          Add your request to the blockchain. By filling the form below, you can
          scan QR code in your wallet application, and your request will be
          published to whole world.
        </Text>
        <Box>
          <h2>Title of the project - shows in the table</h2>
          <Input
            required={true}
            placeholder="Short project title"
            maxlength="50"
            value={state.title}
            onChange={onTitleChange}
            rows="10"
            style={{ width: "100%" }}
          />
        </Box>
        <Box>
          <h2>Why do you need funds?</h2>
          <Textarea
            required={true}
            placeholder="Please describe your projects?"
            maxlength="500"
            value={state.reason}
            onChange={onReasonChange}
            rows="10"
            style={{ width: "100%", height: "100px" }}
          />
        </Box>
        <Box>
          <h2>Project URL address - start with https://</h2>
          <Input
            required={true}
            placeholder="Please describe your projects?"
            maxlength="100"
            value={state.url}
            onChange={onURLChange}
            style={{ width: "100%" }}
          />
        </Box>
        <Box>
          <h2>
            Where do you want to receive funds? Use this account to make the
            request to the blockchain.
          </h2>
          <Input
            required={true}
            placeholder="Your account where to receive funds"
            maxlength="58"
            value={state.account}
            onChange={onAccountChange}
            style={{ width: "100%" }}
          />
        </Box>
        <Box>
          <h2>How many blocks are you willing to wait? </h2>
          <p>20000 blocks is approximately one day. Maximum is 600000</p>
          <Input
            type="number"
            required={true}
            placeholder="Blocks count from when the tx is in the blockchain"
            min="0"
            max="600000"
            step="1"
            value={state.wait}
            onChange={onWaitChange}
          />
        </Box>
        <Box>
          <h2>What do you want to receive?</h2>
          <Select
            options={AsaList}
            onChange={onAssetChange}
            defaultValue={{ label: "Algorand", value: state.asset }}
            style={{ "max-width": "100px" }}
          />
        </Box>
        <Box>
          <h2>How much do you need?</h2>
          <Input
            type="number"
            required={true}
            placeholder="How much do you need?"
            min="0"
            max="999999"
            step="1"
            value={state.amount}
            onChange={onAmountChange}
            style={{ width: "100%" }}
          />
        </Box>
        {state.showPayment && (
          <Box>
            <h2>Pay using qr code</h2>
            <p>
              Or use this note with any wallet and do the self transaction with
              pay amount of 0.000800 Algos (0,8 microalgo)
            </p>
            <div>
              Note field:&nbsp;
              <code>{state.code}</code>
            </div>
            <div>QR content: {state.qr}</div>
            <div>
              <QR value={state.qr} size={200} />
            </div>
          </Box>
        )}
      </Card>
    </div>
  );
}
