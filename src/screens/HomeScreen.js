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
  const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar se o usuário está logado como admin

  useEffect(() => {
    const loadAvisos = async () => {
      const avisosData = await AsyncStorage.getItem("avisos");
      setAvisos(JSON.parse(avisosData) || []);
    };

    loadAvisos();

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
    // Navegar para a tela de detalhes passando o título e a descrição do aviso
    const aviso = avisos.find((aviso) => aviso.id === id);
    navigation.navigate("Detail", { aviso });
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
              navigation.navigate("Admin");
            } else {
              Alert.alert("Erro", "Senha incorreta");
            }
          },
        },
      ],
      "secure-text" // Campo de senha
    );
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
