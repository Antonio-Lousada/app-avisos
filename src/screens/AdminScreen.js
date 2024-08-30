import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdminScreen = ({ navigation }) => {
  const [avisos, setAvisos] = useState([]);
  const [newAviso, setNewAviso] = useState({ titulo: "", descricao: "" });

  useEffect(() => {
    const loadAvisos = async () => {
      const avisosData = await AsyncStorage.getItem("avisos");
      setAvisos(JSON.parse(avisosData) || []);
    };

    loadAvisos();
  }, []);

  const handleAddAviso = async () => {
    if (newAviso.titulo.trim() === "" || newAviso.descricao.trim() === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    const updatedAvisos = [...avisos, { ...newAviso, id: Date.now() }];
    setAvisos(updatedAvisos);
    await AsyncStorage.setItem("avisos", JSON.stringify(updatedAvisos));
    setNewAviso({ titulo: "", descricao: "" });
  };

  const handleDeleteAviso = async (id) => {
    const updatedAvisos = avisos.filter((aviso) => aviso.id !== id);
    setAvisos(updatedAvisos);
    await AsyncStorage.setItem("avisos", JSON.stringify(updatedAvisos));
  };

  const handleLogout = () => {
    navigation.navigate("Home");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Administração de Avisos</Text>

      {/* Campos de input e botão para adicionar aviso */}
      <TextInput
        style={styles.input}
        placeholder="Título do Aviso"
        value={newAviso.titulo}
        onChangeText={(text) => setNewAviso({ ...newAviso, titulo: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição do Aviso"
        value={newAviso.descricao}
        onChangeText={(text) => setNewAviso({ ...newAviso, descricao: text })}
      />
      <Button title="Adicionar Aviso" onPress={handleAddAviso} />

      {/* Lista de avisos e botão de exclusão */}
      <FlatList
        data={avisos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.avisoItem}>
            <Text style={styles.avisoTitle}>{item.titulo}</Text>
            <Button
              title="Excluir"
              onPress={() => handleDeleteAviso(item.id)}
            />
          </View>
        )}
      />

      <Button title="Sair do modo Admin" onPress={handleLogout} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  avisoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avisoTitle: {
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AdminScreen;
