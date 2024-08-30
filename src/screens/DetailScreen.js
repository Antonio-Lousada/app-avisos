import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DetailScreen = ({ route }) => {
  const { avisoId } = route.params;
  // Mocking the details of the notice
  const aviso = {
    id: avisoId,
    titulo: `Aviso ${avisoId}`,
    descricao: `Detalhes do aviso ${avisoId}. Aqui está o conteúdo completo do aviso...`,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{aviso.titulo}</Text>
      <Text style={styles.descricao}>{aviso.descricao}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  descricao: {
    fontSize: 16,
  },
});

export default DetailScreen;
