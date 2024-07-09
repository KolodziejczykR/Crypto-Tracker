import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Image,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function App() {
  let [coins, setCoins] = React.useState([]);
  const [topTextBox, textBox] = React.useState("");
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  let data = [
    { label: "Alphabetical", value: 1 },
    { label: "Price: High to Low", value: 2 },
    { label: "Price: Low to High", value: 3 },
    { label: "Best Daily Change", value: 4 },
    { label: "Worst Daily Change", value: 5 },
  ];

  const fetchApiCall = () => {
    fetch(
      "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setCoins(response.data.coins);
        console.log(coins);
      })
      .catch((err) => console.error(err));
  };

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "dbfb6cd090msh830dac1589baaf2p1929ffjsn0314e6357ca7",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Crypto Coin Information </Text>
      <Text style={styles.subheader}>
        Use the button to learn about 50 different coins, use the search bar to
        find a specific coin, or use the filters to search in different ways
      </Text>
      <View style={{ height: 15 }}></View>
      <TextInput style={styles.input} onChangeText={textBox} />
      <View style={{ height: 10 }}></View>
      <TouchableHighlight onPress={fetchApiCall}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Search Crypto</Text>
        </View>
      </TouchableHighlight>
      <View style={styles.total}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Select item" : "..."}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            setIsFocus(false);
            if (item.value == 1) {
              //alphabetical
              coins.sort(function (a, b) {
                console.log(a);
                if (a.name > b.name) return 1;
                else return -1;
              });
              setCoins(coins);
            }
            if (item.value == 2) {
              //price high to low
              setCoins(
                coins.sort(function (a, b) {
                  return b.price - a.price;
                })
              );
            }
            if (item.value == 3) {
              //price low to high
              setCoins(
                coins.sort(function (a, b) {
                  return a.price - b.price;
                })
              );
            }
            if (item.value == 4) {
              //best change
              setCoins(
                coins.sort(function (a, b) {
                  return b.change - a.change;
                })
              );
            }
            if (item.value == 5) {
              //worst change
              setCoins(
                coins.sort(function (a, b) {
                  return a.change - b.change;
                })
              );
            }
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? "blue" : "black"}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
      <View>
        {coins.map((obj, index) => {
          return (
            <CoinInfo
              price={obj.price}
              change={obj.change}
              iconUrl={obj.iconUrl}
              name={obj.name}
              symbol={obj.symbol}
              color={obj.color}
              key={index}
              topTextBox={topTextBox}
            />
          );
        })}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "peru",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  title: {
    fontSize: 36,
    fontFamily: "Baskerville-SemiBold",
    color: "ivory",
    textAlign: "center",
    marginTop: 25,
    marginBottom: 5,
  },
  subheader: {
    fontSize: 20,
    width: 500,
    fontFamily: "Baskerville-SemiBold",
    color: "black",
    textAlign: "center",
  },
  button: {
    padding: 10,
    marginTop: 7,
    marginBottom: 5,
    backgroundColor: "saddlebrown",
  },
  buttonText: {
    color: "#fff",
  },
  price: {
    fontSize: 17,
    textAlign: "center",
    fontStyle: "italic",
    color: "white",
    fontWeight: "bold",
  },
  change: {
    fontSize: 17,
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "bold",
    color: "white",
  },
  changeP: {
    color: "green",
    fontSize: 17,
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  changeN: {
    color: "red",
    fontSize: 17,
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  coin: {
    color: "white",
    fontWeight: "bold",
    textAlign: "right",
    marginTop: 15,
  },
  symbol: {
    color: "white",
    fontWeight: "bold",
    fontSize: 10,
    textAlign: "right",
    marginTop: 4,
    marginBottom: 7,
  },
  logo: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 85,
    height: 85,
  },
  input: {
    height: 30,
    borderWidth: 1,
    padding: 8,
  },
  total: {
    backgroundColor: "peru",
    padding: 14,
  },
  dropdown: {
    height: 30,
    borderColor: "saddlebrown",
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "peru",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    width: 80,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

const CoinInfo = (props) => {
  let bColor = props.color;
  if (props.change >= 0) {
    newStyle = styles.changeP
  }
  else{
    newStyle = styles.changeN
  }
  if (props.topTextBox.toLowerCase() == props.name.toLowerCase()) {
    return (
      <View
        style={{
          marginHorizontal: 20,
          backgroundColor: bColor,
          padding: 15,
          borderRadius: 20,
          marginBottom: 15,
        }}
      >
        <Text style={styles.price}>
          Price per coin in USD: ${props.price}
        </Text>
          <Text style = {newStyle}>
            Percent Daily Change: {props.change}%
          </Text>
        <Text style={styles.coin}>{props.name}</Text>
        <Text style={styles.symbol}>{props.symbol}</Text>
        <Image
          source={{
            uri: props.iconUrl,
          }}
          style={styles.logo}
        />
      </View>
    );
  } 

  else{
    if (bColor == null) {
      bColor = "rosybrown";
    }
    return (
      <View
        style={{
          marginHorizontal: 20,
          backgroundColor: bColor,
          padding: 15,
          borderRadius: 20,
          marginBottom: 15,
        }}
      >
        <Text style={styles.price}>
          Price per coin in USD: ${props.price}
        </Text>
        <Text style={newStyle}>
          Percent Daily Change: {props.change}%
        </Text>
        <Text style={styles.coin}>{props.name}</Text>
        <Text style={styles.symbol}>{props.symbol}</Text>
        <Image
          source={{
            uri: props.iconUrl,
          }}
          style={styles.logo}
        />
      </View>
    );
  }
};
