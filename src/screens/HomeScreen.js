import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [avisos, setAvisos] = useState([]);
  const [lidos, setLidos] = useState({});

  useEffect(() => {
    // Mocking a GET request to fetch notices
    axios
      .get("https://mocked-api.com/avisos")
      .then((response) => setAvisos(response.data))
      .catch((error) => console.error(error));

    // Load read notices from AsyncStorage
    const loadLidos = async () => {
      const lidosData = await AsyncStorage.getItem("lidos");
      setLidos(JSON.parse(lidosData) || {});
    };

    loadLidos();
  }, []);

  const handlePress = async (id) => {
    const newLidos = { ...lidos, [id]: true };
    setLidos(newLidos);
    await AsyncStorage.setItem("lidos", JSON.stringify(newLidos));
    navigation.navigate("Detail", { avisoId: id });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.id)} style={styles.item}>
      <Text style={lidos[item.id] ? styles.lido : styles.naoLido}>
        {item.titulo}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={avisos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  lido: {
    color: "#aaa",
  },
  naoLido: {
    color: "#000",
  },
});

export default HomeScreen;
