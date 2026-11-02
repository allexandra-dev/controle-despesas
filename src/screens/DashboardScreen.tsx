import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

type Despesa = {
  id: string;
  titulo: string;
  categoria: string;
  valor: number;
};

const cores = [
  "#e57373",
  "#64b5f6",
  "#81c784",
  "#ffb74d",
  "#ba68c8",
  "#4db6ac",
];

function corDaCategoria(categoria: string) {
  let soma = 0;
  for (const letra of categoria.toLowerCase()) soma += letra.charCodeAt(0);
  return cores[soma % cores.length];
}

function formatarReal(valor: number) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

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

  const excluir = (id: string) => {
    Alert.alert("Excluir despesa", "Tem certeza que deseja excluir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          const novaLista = despesas.filter((d) => d.id !== id);
          setDespesas(novaLista);
          await AsyncStorage.setItem("@despesas", JSON.stringify(novaLista));
        },
      },
    ]);
  };

  const total = despesas.reduce((soma, d) => soma + d.valor, 0);

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Total gasto</Text>
        <Text style={styles.totalValor}>{formatarReal(total)}</Text>
        <Text style={styles.totalQtd}>
          {despesas.length} {despesas.length === 1 ? "despesa" : "despesas"}
        </Text>
      </View>

      <Text style={styles.secao}>Histórico</Text>

      <FlatList
        style={styles.lista}
        data={despesas}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.vazioBox}>
            <Text style={styles.vazioEmoji}>💸</Text>
            <Text style={styles.vazio}>Nenhuma despesa ainda.</Text>
            <Text style={styles.vazio}>
              Toque no botão abaixo para começar!
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onLongPress={() => excluir(item.id)}
            style={[
              styles.card,
              { borderLeftColor: corDaCategoria(item.categoria) },
            ]}
          >
            <View style={styles.cardInfo}>
              <Text style={styles.titulo}>{item.titulo}</Text>
              <Text style={styles.categoria}>{item.categoria}</Text>
            </View>
            <Text style={styles.valor}>{formatarReal(item.valor)}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("NovaDespesa")}
      >
        <Text style={styles.botaoTexto}>+ Adicionar despesa</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f1f5f2" },
  totalBox: {
    backgroundColor: "#2e7d32",
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    elevation: 4,
  },
  totalLabel: { color: "#c8e6c9", fontSize: 16 },
  totalValor: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
    marginVertical: 4,
  },
  totalQtd: { color: "#c8e6c9", fontSize: 14 },
  secao: { fontSize: 20, fontWeight: "bold", color: "#333", marginBottom: 10 },
  lista: { flex: 1 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderLeftWidth: 6,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  cardInfo: { flex: 1 },
  titulo: { fontSize: 17, fontWeight: "bold", color: "#222" },
  categoria: { fontSize: 14, color: "#777" },
  valor: { fontSize: 17, fontWeight: "bold", color: "#c62828" },
  vazioBox: { alignItems: "center", marginTop: 40 },
  vazioEmoji: { fontSize: 48, marginBottom: 8 },
  vazio: { color: "#777", fontSize: 15 },
  botao: {
    backgroundColor: "#2e7d32",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
    elevation: 3,
  },
  botaoTexto: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
