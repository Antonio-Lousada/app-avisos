import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdminScreen = ({ navigation }) => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [avisos, setAvisos] = useState([]);

  useEffect(() => {
    const loadAvisos = async () => {
      const avisosData = await AsyncStorage.getItem("avisos");
      setAvisos(JSON.parse(avisosData) || []);
    };

    loadAvisos();
  }, []);

  const adicionarAviso = async () => {
    if (titulo && descricao) {
      const newAviso = { id: Date.now(), titulo, descricao };
      const updatedAvisos = [...avisos, newAviso];
      setAvisos(updatedAvisos);
      await AsyncStorage.setItem("avisos", JSON.stringify(updatedAvisos));
      setTitulo("");
      setDescricao("");
    } else {
      Alert.alert("Erro", "Preencha todos os campos");
    }
  };

  const excluirAviso = async (id) => {
    const updatedAvisos = avisos.filter((aviso) => aviso.id !== id);
    setAvisos(updatedAvisos);
    await AsyncStorage.setItem("avisos", JSON.stringify(updatedAvisos));
  };

  const logout = () => {
    navigation.goBack(); // Voltar para a tela anterior
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título do Aviso"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição do Aviso"
        value={descricao}
        onChangeText={setDescricao}
      />
      <Button title="Adicionar Aviso" onPress={adicionarAviso} />
      <FlatList
        data={avisos}
        renderItem={({ item }) => (
          <View style={styles.avisoContainer}>
            <Text style={styles.avisoTitulo}>{item.titulo}</Text>
            <TouchableOpacity onPress={() => excluirAviso(item.id)}>
              <Text style={styles.excluirButton}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Sair do Modo Admin" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  avisoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avisoTitulo: {
    fontSize: 16,
  },
  excluirButton: {
    color: "red",
  },
});

export default AdminScreen;
