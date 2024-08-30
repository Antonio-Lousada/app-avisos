import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdminScreen = ({ navigation, route }) => {
  const [avisos, setAvisos] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    const loadAvisos = async () => {
      const avisosData = await AsyncStorage.getItem("avisos");
      setAvisos(JSON.parse(avisosData) || []);
    };

    loadAvisos();
  }, []);

  const handleAddAviso = async () => {
    const newAviso = {
      id: Date.now(),
      titulo,
      descricao,
    };
    const updatedAvisos = [...avisos, newAviso];
    setAvisos(updatedAvisos);
    await AsyncStorage.setItem("avisos", JSON.stringify(updatedAvisos));
    setTitulo("");
    setDescricao("");
  };

  const handleDeleteAviso = async (id) => {
    const updatedAvisos = avisos.filter((aviso) => aviso.id !== id);
    setAvisos(updatedAvisos);
    await AsyncStorage.setItem("avisos", JSON.stringify(updatedAvisos));
  };

  const handleLogout = () => {
    route.params.onLogout(); // Chama a função passada para deslogar
    navigation.navigate("Home"); // Navega para a tela inicial
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
      />
      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
        multiline
      />
      <Button title="Adicionar Aviso" onPress={handleAddAviso} />
      <FlatList
        data={avisos}
        renderItem={({ item }) => (
          <View style={styles.avisoItem}>
            <Text>{item.titulo}</Text>
            <TouchableOpacity onPress={() => handleDeleteAviso(item.id)}>
              <Text style={styles.deleteButton}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Sair do modo Admin" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    padding: 5,
  },
  avisoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  deleteButton: {
    color: "red",
  },
});

export default AdminScreen;
