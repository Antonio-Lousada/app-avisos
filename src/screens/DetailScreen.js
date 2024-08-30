import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailScreen = ({ route }) => {
  const { avisoId } = route.params;
  const [aviso, setAviso] = useState(null);

  useEffect(() => {
    const loadAviso = async () => {
      const avisosData = await AsyncStorage.getItem("avisos");
      const avisos = JSON.parse(avisosData) || [];
      const avisoDetails = avisos.find((a) => a.id === avisoId);
      setAviso(avisoDetails);
    };

    loadAviso();
  }, [avisoId]);

  return (
    <View style={styles.container}>
      {aviso ? (
        <>
          <Text style={styles.titulo}>{aviso.titulo}</Text>
          <Text style={styles.descricao}>{aviso.descricao}</Text>
        </>
      ) : (
        <Text>Aviso não encontrado</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
  },
  descricao: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default DetailScreen;
