import { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

type Despesa = {
  id: string;
  titulo: string;
  categoria: string;
  valor: number;
};

export default function DashboardScreen({ navigation }: any) {
  const [despesas, setDespesas] = useState<Despesa[]>([]);

  useEffect(() => {
    const carregar = async () => {
      const dados = await AsyncStorage.getItem("@despesas");
      setDespesas(dados ? JSON.parse(dados) : []);
    };
    carregar();
    const unsubscribe = navigation.addListener("focus", carregar);
    return unsubscribe;
  }, [navigation]);

  const total = despesas.reduce((soma, d) => soma + d.valor, 0);

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Valor Total</Text>
        <Text style={styles.totalValor}>
          R$ {total.toFixed(2).replace(".", ",")}
        </Text>
      </View>

      <FlatList
        style={styles.lista}
        data={despesas}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhuma despesa cadastrada.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.titulo}>{item.titulo}</Text>
              <Text style={styles.categoria}>{item.categoria}</Text>
            </View>
            <Text style={styles.valor}>
              R$ {item.valor.toFixed(2).replace(".", ",")}
            </Text>
          </View>
        )}
      />

      <Button
        title="Adicionar despesa"
        onPress={() => navigation.navigate("NovaDespesa")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f4f6f8" },
  totalBox: {
    backgroundColor: "#2e7d32",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  totalLabel: { color: "#fff", fontSize: 16 },
  totalValor: { color: "#fff", fontSize: 32, fontWeight: "bold" },
  lista: { flex: 1 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titulo: { fontSize: 18, fontWeight: "bold" },
  categoria: { fontSize: 14, color: "#666" },
  valor: { fontSize: 18, fontWeight: "bold", color: "#c62828" },
  vazio: { textAlign: "center", color: "#666", marginTop: 20 },
});
