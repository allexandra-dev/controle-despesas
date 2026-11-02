#  Controle de Despesas

Aplicativo mobile para registrar e acompanhar despesas pessoais, desenvolvido em **React Native com Expo e TypeScript**.

Projeto prático da disciplina **Aplicação Mobile com React Native**, do curso de Análise e Desenvolvimento de Sistemas da Faculdade Senac Ceará.

---

##  Funcionalidades

- **Dashboard** com o valor total gasto e a quantidade de despesas
- **Histórico** de despesas em lista (título, categoria e valor)
- **Cadastro** de nova despesa com título, valor e categoria
- **Validação** de campos vazios e de valor inválido
- **Exclusão** de despesa: é só segurar o dedo no card
- **Persistência local:** os dados continuam salvos depois que o app é fechado
- Cada categoria recebe uma **cor própria** na lateral do card

---

##  Tecnologias

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/) (Native Stack)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

---

##  Conceitos aplicados

| Conceito | Onde foi usado |
|---|---|
| `useState` | Guarda a lista de despesas e os campos do formulário |
| `useEffect` | Carrega as despesas do AsyncStorage ao abrir a Dashboard |
| `FlatList` | Mostra o histórico de despesas |
| `TextInput` | Campos do formulário de nova despesa |
| `StyleSheet` | Estilização das telas |
| React Navigation | Navegação entre Dashboard e Nova Despesa |
| AsyncStorage | Salva, carrega e exclui as despesas no celular |

---

##  Trechos do código

### Carregando as despesas ao abrir a tela (`useEffect` + AsyncStorage)

```tsx
useEffect(() => {
  const carregar = async () => {
    const dados = await AsyncStorage.getItem("@despesas");
    setDespesas(dados ? JSON.parse(dados) : []);
  };
  carregar();
  const unsubscribe = navigation.addListener("focus", carregar);
  return unsubscribe;
}, [navigation]);
```

Quando a Dashboard abre, o app busca as despesas salvas no celular. O `focus` faz a lista ser recarregada sempre que o usuário volta pra essa tela, então uma despesa nova aparece na hora.

### Calculando o valor total

```tsx
const total = despesas.reduce((soma, d) => soma + d.valor, 0);
```

O `reduce` percorre todas as despesas e vai somando os valores, começando do zero.

### Validando e salvando uma nova despesa

```tsx
if (!titulo.trim() || !valor.trim() || !categoria.trim()) {
  Alert.alert("Atenção", "Preencha todos os campos.");
  return;
}

const dados = await AsyncStorage.getItem("@despesas");
const lista = dados ? JSON.parse(dados) : [];
await AsyncStorage.setItem(
  "@despesas",
  JSON.stringify([...lista, novaDespesa])
);

navigation.goBack();
```

Primeiro o app confere se nenhum campo está vazio. Depois pega a lista já salva, acrescenta a despesa nova no final e salva tudo de novo. Por último, volta pra Dashboard.

### Excluindo uma despesa

```tsx
const novaLista = despesas.filter((d) => d.id !== id);
setDespesas(novaLista);
await AsyncStorage.setItem("@despesas", JSON.stringify(novaLista));
```

O `filter` cria uma lista nova **sem** a despesa escolhida. Essa lista atualiza a tela e é salva no celular.

---

## 📂 Estrutura do projeto

```
controle-despesas/
├── App.tsx                        # Navegação entre as telas
└── src/
    └── screens/
        ├── DashboardScreen.tsx    # Total, histórico e botão de adicionar
        └── NovaDespesaScreen.tsx  # Formulário de cadastro
```

---

## ▶️ Como executar

**Pré-requisitos:** Node.js (versão LTS) e o app **Expo Go** instalado no celular.

1. Clone o repositório:
   ```bash
   git clone <link-do-repositorio>
   ```
2. Entre na pasta do projeto:
   ```bash
   cd controle-despesas
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o projeto:
   ```bash
   npx expo start
   ```
5. Escaneie o QR code com o Expo Go.

---

## Como usar

1. Na tela inicial, toque em **+ Adicionar despesa**
2. Preencha o título, o valor (ex: `150,50`, sem ponto de milhar) e a categoria
3. Toque em **Salvar despesa**: o app volta para a Dashboard com a lista e o total atualizados
4. Para excluir, **segure o dedo** sobre a despesa e confirme

---

## Autora

Desenvolvido por **Alexandra de Lima**.
