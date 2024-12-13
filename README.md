

# Bot de Atendimento do Café da Júlio

Este é um bot de atendimento automatizado para um café, criado utilizando a biblioteca `whatsapp-web.js`. O bot permite que os clientes interajam com um cardápio de produtos (cafés, comidas fit e salgados) e façam pedidos através do WhatsApp.

## Requisitos

- Node.js (recomendado versão 14.x ou superior)
- npm (gerenciador de pacotes do Node.js)
- Conta do WhatsApp para conectar ao bot
- Chave de API do WhatsApp Web

## Instalação

1. **Clone o repositório:**

   Abra o terminal e execute o comando para clonar o repositório:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <Pasta_do_repositorio>
   ```

2. **Instale as dependências:**

   Dentro da pasta do projeto, instale as dependências necessárias utilizando o npm:

   ```bash
   npm install
   ```

3. **Inicie o bot:**

   Para rodar o bot, execute o seguinte comando:

   ```bash
   node index.js
   ```

   O bot irá gerar um QR code. Escaneie o QR code utilizando o aplicativo WhatsApp no seu celular para autenticar a conta do WhatsApp Web.

## Como Funciona

O bot interage com os usuários através de mensagens no WhatsApp, oferecendo um cardápio de produtos. O processo é o seguinte:

1. **Saudações:** Quando o usuário envia uma mensagem de saudação (exemplo: "oi", "olá", "bom dia"), o bot responde com o menu principal, que oferece três opções:
   - 1: Cafés
   - 2: Comidas Fit e Saudáveis
   - 3: Salgados

2. **Menu de Produtos:**
   - O bot envia as opções de produtos do cardápio.
   - O cliente escolhe o número do produto ou digita "sair" para encerrar o atendimento.
   - O pedido é registrado e o bot pergunta se o cliente deseja adicionar mais produtos ao pedido.

3. **Comanda Final:**
   - Quando o cliente digita "sair", o bot envia a comanda final com os itens pedidos e o total.

## Funcionalidades

- **Menu de produtos dinâmico:** O bot oferece três categorias de produtos (cafés, comidas fit e salgados) com preços atualizados.
- **Pedidos:** O cliente pode escolher itens do cardápio e fazer pedidos. O total do pedido é calculado automaticamente.
- **Comanda:** Quando o cliente decide encerrar, o bot envia a comanda com o resumo do pedido e o valor total.
- **Respostas inteligentes:** O bot responde de forma interativa, oferecendo opções e lidando com entradas inválidas.

## Estrutura do Código

O código está estruturado da seguinte maneira:

### `index.js` (Principal)

Este arquivo contém a configuração do cliente do WhatsApp, a definição do cardápio e o gerenciamento das interações do bot:

1. **Inicialização do Cliente:**
   - Usa a biblioteca `whatsapp-web.js` para criar e gerenciar a conexão com o WhatsApp Web.
   - Gera um QR code para autenticação.

2. **Cardápio:**
   - O cardápio é dividido em três categorias: **Cafés**, **Comidas Fit e Saudáveis** e **Salgados**.
   - As opções de cada categoria são exibidas ao cliente quando ele escolhe uma opção.

3. **Controle de Conversa:**
   - O estado da conversa é gerido com a variável `conversationState`, controlando em que parte do menu o cliente está.
   - O cliente interage através de mensagens enviadas para o WhatsApp, e o bot responde conforme o estado da conversa.

4. **Processamento de Pedidos:**
   - Quando o cliente escolhe um item, o pedido é adicionado à lista de pedidos e o total é atualizado.
   - Ao digitar "sair", o bot exibe o resumo do pedido (comanda) com o total.

### Bibliotecas Utilizadas

- **whatsapp-web.js**: Biblioteca principal para integrar o WhatsApp Web com Node.js.
- **qrcode-terminal**: Usada para gerar e exibir o QR code no terminal para autenticação.

## Como Funciona o Fluxo do Bot

1. **Início da Conversa:**
   - O bot aguarda uma saudação do usuário para iniciar a conversa.
   - Após a saudação, ele envia o menu principal com as opções de cardápio.

2. **Escolha do Cardápio:**
   - O cliente escolhe uma das categorias do cardápio (Cafés, Comidas Fit, ou Salgados).
   - O bot exibe a lista de produtos da categoria selecionada.

3. **Pedido de Produto:**
   - O cliente escolhe um item da lista de produtos (digitando o número correspondente).
   - O bot confirma o pedido e pergunta se o cliente deseja continuar pedindo ou encerrar.

4. **Encerramento da Conversa:**
   - Ao digitar "sair", o bot exibe a comanda final, resumindo todos os itens pedidos e o valor total.
   - A conversa é finalizada com uma mensagem de agradecimento.

## Exemplo de Interação

### Usuário: "Oi"

**Bot:**
```
Olá, seja bem-vindo ao Café da Júlio! ☕
Escolha uma das opções abaixo para ver o nosso cardápio:

1 - Cafés
2 - Comidas Fit e Saudáveis
3 - Salgados
Digite "sair" para encerrar o atendimento.
```

### Usuário: "1" (Escolher Cafés)

**Bot:**
```
☕ Opções de Cafés:
1. Expresso - R$5,00
2. Cappuccino - R$8,50
3. Latte - R$7,50
4. Mocha - R$9,00
5. Macchiato - R$6,00

Digite o número do café que deseja pedir ou "sair" para encerrar.
```

### Usuário: "2" (Escolher Cappuccino)

**Bot:**
```
Pedido confirmado: Cappuccino. 
Deseja pedir mais alguma coisa? (Digite "sair" para encerrar ou escolha uma nova opção.)
```

### Usuário: "sair" (Encerrar)

**Bot:**
```
📋 Comanda Final:
Cappuccino - R$8,50

Total: R$8,50

Obrigado por visitar o Café da Júlio! Até a próxima! 👋
```

## Contribuindo

Se você gostaria de melhorar ou adicionar novas funcionalidades ao bot, siga os seguintes passos:

1. Faça um fork deste repositório.
2. Crie uma branch para a nova funcionalidade (`git checkout -b nova-funcionalidade`).
3. Faça as modificações necessárias.
4. Envie um pull request com as suas mudanças.



