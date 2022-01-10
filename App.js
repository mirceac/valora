import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

const provider = new WalletConnectProvider({
  rpc: {
    44787: "https://alfajores-forno.celo-testnet.org",
    42220: "https://forno.celo.org",
  },
});

class Valora extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provider: null,
      kit: null,
      cUsdBalance: null,
      goldBalance: null,
    }
  }

  connect = async() => {
    await provider.enable()
    const web3 = new Web3(provider);
    let kit = newKitFromWeb3(web3)
    kit.defaultAccount = provider.accounts[0]
    provider.on("accountsChanged", (accounts) => {
      console.log(accounts);
    });
    provider.on("connect", () => {
      console.log("connect");
    });
    const stableToken = await kit.contracts.getStableToken();
    const goldToken = await kit.contracts.getGoldToken();

    //const exchange = await kit.contracts.getExchange();

    const cUsdBalanceObj = await stableToken.balanceOf(kit.defaultAccount);
    const goldBalanceObj = await goldToken.balanceOf(kit.defaultAccount);
    const cUsdBalance = cUsdBalanceObj/10**18;
    const goldBalance = goldBalanceObj/10**18;
    this.setState({provider, kit, cUsdBalance, goldBalance});
  }

  back = () => {
      this.setState({kit: null});
  }

  disconnect = async() => {
    await provider.disconnect();
    this.setState({provider:null, kit: null});
  }
  render() {
    return (
    <View style={styles.container}>
      {!this.state.kit ?
        <Button onPress={this.connect} title="Connect">
        </Button> :
        <React.Fragment>
          <Text>
            Valora address: {this.state.kit.defaultAccount}
          </Text>
          <Text>
            CELO Balance: {this.state.goldBalance}
          </Text>
          <Text>
            cUSD Balance: {this.state.cUsdBalance}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button onPress={this.back} title="Back">
            </Button><Text>&nbsp;</Text>
            <Button onPress={this.disconnect} title="Disconnect">
            </Button>
          </View>
        </React.Fragment>
      }
    </View>
    );
  }
}

export default Valora;
