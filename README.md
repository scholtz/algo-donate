# algo-donate

Created as demo for bounty: https://gitcoin.co/issue/algorandfoundation/grow-algorand/85/100026193

## Live

This project is live on MainNet: https://algo-donate.vercel.app/

## Feedback for Pipeline-ui component

I have used following components: Card, Heading, Text, Table, Loader, Button, QR, Input, Textarea, Box, Select

I had issues with form elements: Some of them are default formatted for exact width, while for example select is formatted for full widht.

Loader works good.

Table component is not usable for the production environment. In competitive UI framework it works the way that you put there the table config and data, and sorting, pagination and filtering is handled by the component.

There is lack of documentation, eg how to set the live data to table.

QR is simple qr code and does not create the algorand format qr code.

I wanted to use also the Pipeline component, but it lacks any usable methods. The point of my application is that the donation request is submitted to the network with specific note, and everybody see the donation and can respond by donating. There is no way how to read the public transactions on the blockchain. Also there is lack of support of every other wallet then the MyAlgoWallet.. I have solved this issue by generating standard QR code which is accepted by Official wallet, AWallet as well as MyAlgoWallet.

In Pipeline there is no way how to define custom algod or indexer servers. The choice between mainnet and testnet is fatal because most developers work on sandbox, than they test in testnet and then they publish it to mainnet.

## How to run
```
git clone https://github.com/scholtz/algo-donate.git
cd algo-donate
npm install
npm run start
```

