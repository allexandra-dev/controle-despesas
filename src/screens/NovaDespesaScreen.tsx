import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NovaDespesaScreen({ navigation }: any) {
  const [titulo, setTitulo] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");

  const salvar = async () => {
    if (!titulo.trim() || !valor.trim() || !categoria.trim()) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    const valorNumero = Number(valor.replace(",", "."));
    if (isNaN(valorNumero) || valorNumero <= 0) {
      Alert.alert("Atenção", "Digite um valor válido.");
      return;
    }

    const novaDespesa = {
      id: Date.now().toString(),
      titulo: titulo.trim(),
      categoria: categoria.trim(),
      valor: valorNumero,
    };

    const dados = await AsyncStorage.getItem("@despesas");
    const lista = dados ? JSON.parse(dados) : [];
    await AsyncStorage.setItem(
      "@despesas",
      JSON.stringify([...lista, novaDespesa]),
    );

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Mercado"
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>Valor</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 150,50"
        keyboardType="decimal-pad"
        value={valor}
        onChangeText={setValor}
      />

      <Text style={styles.label}>Categoria</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Alimentação"
        value={categoria}
        onChangeText={setCategoria}
      />

      <Button title="Salvar despesa" onPress={salvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f4f6f8" },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
});
