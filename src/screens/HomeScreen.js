import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [avisos, setAvisos] = useState([]);
  const [lidos, setLidos] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  // Carrega avisos e lidos quando o componente monta
  useEffect(() => {
    const loadAvisos = async () => {
      const avisosData = await AsyncStorage.getItem("avisos");
      setAvisos(JSON.parse(avisosData) || []);
    };

    const loadLidos = async () => {
      const lidosData = await AsyncStorage.getItem("lidos");
      setLidos(JSON.parse(lidosData) || {});
    };

    loadAvisos();
    loadLidos();
  }, []);

  // Atualiza a lista de avisos em tempo real
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const avisosData = await AsyncStorage.getItem("avisos");
      setAvisos(JSON.parse(avisosData) || []);
    });
    return unsubscribe;
  }, [navigation]);

  const handlePress = async (id) => {
    const newLidos = { ...lidos, [id]: true };
    setLidos(newLidos);
    await AsyncStorage.setItem("lidos", JSON.stringify(newLidos));
    navigation.navigate("Detail", { avisoId: id });
  };

  const handleAdminLogin = () => {
    Alert.prompt(
      "Admin Login",
      "Digite a senha de administrador",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: (password) => {
            if (password === "admin1234") {
              setIsAdmin(true);
              navigation.navigate("Admin", { onLogout: handleLogout });
            } else {
              Alert.alert("Erro", "Senha incorreta");
            }
          },
        },
      ],
      "secure-text"
    );
  };

  const handleLogout = () => {
    setIsAdmin(false);
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
      {isAdmin && (
        <Button
          title="Adicionar Aviso"
          onPress={() => navigation.navigate("Admin")}
        />
      )}
      <FlatList
        data={avisos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button
        title="adm"
        onPress={handleAdminLogin}
        style={styles.adminButton}
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
  adminButton: {
    position: "absolute",
    top: 10,
    left: 10,
  },
});

export default HomeScreen;
