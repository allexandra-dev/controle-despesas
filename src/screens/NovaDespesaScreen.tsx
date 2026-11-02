import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
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
      Alert.alert("Atenção", "Digite um valor válido, sem ponto de milhar.");
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
      <View style={styles.formBox}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Mercado"
          value={titulo}
          onChangeText={setTitulo}
        />

        <Text style={styles.label}>Valor (R$)</Text>
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
      </View>

      <TouchableOpacity style={styles.botao} onPress={salvar}>
        <Text style={styles.botaoTexto}>Salvar despesa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f1f5f2" },
  formBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#f7f9f7",
    borderWidth: 1,
    borderColor: "#c8e6c9",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  botao: {
    backgroundColor: "#2e7d32",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    elevation: 3,
  },
  botaoTexto: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
