import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdminScreen = ({ navigation }) => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleAddAviso = async () => {
    if (titulo && descricao) {
      const newAviso = { id: Date.now(), titulo, descricao };
      const existingAvisos =
        JSON.parse(await AsyncStorage.getItem("avisos")) || [];
      existingAvisos.push(newAviso);
      await AsyncStorage.setItem("avisos", JSON.stringify(existingAvisos));
      Alert.alert("Sucesso", "Aviso adicionado com sucesso!");
      navigation.navigate("Home");
    } else {
      Alert.alert("Erro", "Preencha todos os campos");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Título do Aviso"
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        placeholder="Descrição do Aviso"
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
      />
      <Button title="Adicionar Aviso" onPress={handleAddAviso} />
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
});

export default AdminScreen;
