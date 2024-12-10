const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client();
let conversationState = '';

// Opções do cardápio
const menu = {
  cafes: [
    { nome: 'Expresso', preco: 'R$5,00' },
    { nome: 'Cappuccino', preco: 'R$8,50' },
    { nome: 'Latte', preco: 'R$7,50' },
    { nome: 'Mocha', preco: 'R$9,00' },
    { nome: 'Macchiato', preco: 'R$6,00' }
  ],
  comidasFit: [
    { nome: 'Salada de Frutas', preco: 'R$6,50' },
    { nome: 'Iogurte com Granola', preco: 'R$7,00' },
    { nome: 'Sanduíche Integral de Frango', preco: 'R$8,00' },
    { nome: 'Tigela de Açaí', preco: 'R$10,00' },
    { nome: 'Wrap de Frango', preco: '12,00' }, // Adicionado novo item
    { nome: 'Smoothie Verde', preco: 'R$9,50' } // Adicionado novo item
  ],
  salgados: [
    { nome: 'Coxinha', preco: 'R$4,50' },
    { nome: 'Empada de Frango', preco: 'R$5,00' },
    { nome: 'Pastel de Carne', preco: 'R$3,50' },
    { nome: 'Pão de Queijo', preco: 'R$2,50' },
    { nome: 'Quiche de Legumes', preco: 'R$6,00' },
    { nome: 'Bolinha de Queijo', preco: 'R$5,50' } // Adicionado novo item
  ]
};

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Cliente está pronto!');
});

// Conjunto de saudações permitidas
const saudacoes = ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'Boa noite', 'Boa tarde', 'Oi', 'Olá', 'Ola', 'Bom dia'];

// Função que reinicia uma conversa
const resetConversation = async (message, text) => {
  await client.sendMessage(message.from, text);
  conversationState = '';
};

// Variáveis para controle de pedidos
let pedidos = [];
let total = 0;

client.on('message', async (message) => {
  if (message.fromMe) return;

  console.log(`Mensagem recebida de ${message.from}: ${message.body}`);
  const lowerCaseMessage = message.body.toLowerCase();

  // Inicia uma conversa ao considerar saudações
  if (conversationState === '' && saudacoes.some(saudacao => lowerCaseMessage.includes(saudacao))) {
    try {
      await client.sendMessage(
        message.from,
        'Olá, seja bem-vindo ao Café da Júlio! ☕\nEscolha uma das opções abaixo para ver o nosso cardápio:\n\n1 - Cafés\n2 - Comidas Fit e Saudáveis\n3 - Salgados\nDigite "sair" para encerrar o atendimento.'
      );
      conversationState = 'menuPrincipal';
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
    return;
  }

  // Controle de navegação do menu principal e submenus
  switch (conversationState) {
    case 'menuPrincipal':
      if (lowerCaseMessage === '1') {
        const cafesList = menu.cafes.map((item, index) => `${index + 1}. ${item.nome} - ${item.preco}`).join('\n');
        await client.sendMessage(message.from, `☕ Opções de Cafés:\n${cafesList}\n\nDigite o número do café que deseja pedir ou "sair" para encerrar.`);
        conversationState = 'cafes';
      } else if (lowerCaseMessage === '2') {
        const fitList = menu.comidasFit.map((item, index) => `${index + 1}. ${item.nome} - ${item.preco}`).join('\n');
        await client.sendMessage(message.from, `🥗 Opções de Comidas Fit e Saudáveis:\n${fitList}\n\nDigite o número do item que deseja pedir ou "sair" para encerrar.`);
        conversationState = 'comidasFit';
      } else if (lowerCaseMessage === '3') {
        const salgadosList = menu.salgados.map((item, index) => `${index + 1}. ${item.nome} - ${item.preco}`).join('\n');
        await client.sendMessage(message.from, `🥐 Opções de Salgados:\n${salgadosList}\n\nDigite o número do salgado que deseja pedir ou "sair" para encerrar.`);
        conversationState = 'salgados';
      } else if (lowerCaseMessage === 'sair') {
        await resetConversation(message, 'Obrigado por visitar o Café da Júlio! Até a próxima! 👋');
      } else {
        await client.sendMessage(message.from, 'Opção inválida! Escolha uma das opções do menu ou digite "sair" para sair.');
      }
      break;

    case 'cafes':
      if (lowerCaseMessage === 'sair') {
        await resetConversation(message, 'Obrigado por visitar o Café da Júlio! Até a próxima! 👋');
      } else if (!isNaN(lowerCaseMessage) && parseInt(lowerCaseMessage) > 0 && parseInt(lowerCaseMessage) <= menu.cafes.length) {
        const itemPedido = menu.cafes[parseInt(lowerCaseMessage) - 1];
        pedidos.push(itemPedido);
        total += parseFloat(itemPedido.preco.replace('R$', '').replace(',', '.'));
        await client.sendMessage(message.from, `Pedido confirmado: ${itemPedido.nome}. \nDeseja pedir mais alguma coisa? (Digite "sair" para encerrar ou escolha uma nova opção.)`);
      } else {
        await client.sendMessage(message.from, 'Opção inválida! Por favor, escolha um número válido ou digite "sair" para sair.');
      }
      break;

    case 'comidasFit':
      if (lowerCaseMessage === 'sair') {
        await resetConversation(message, 'Obrigado por visitar o Café da Júlio! Até a próxima! 👋');
      } else if (!isNaN(lowerCaseMessage) && parseInt(lowerCaseMessage) > 0 && parseInt(lowerCaseMessage) <= menu.comidasFit.length) {
        const itemPedido = menu.comidasFit[parseInt(lowerCaseMessage) - 1];
        pedidos.push(itemPedido);
        total += parseFloat(itemPedido.preco.replace('R$', '').replace(',', '.'));
        await client.sendMessage(message.from, `Pedido confirmado: ${itemPedido.nome}. \nDeseja pedir mais alguma coisa? (Digite "sair" para encerrar ou escolha uma nova opção.)`);
      } else {
        await client.sendMessage(message.from, 'Opção inválida! Por favor, escolha um número válido ou digite "sair" para sair.');
      }
      break;

    case 'salgados':
      if (lowerCaseMessage === 'sair') {
        await resetConversation(message, 'Obrigado por visitar o Café da Júlio! Até a próxima! 👋');
      } else if (!isNaN(lowerCaseMessage) && parseInt(lowerCaseMessage) > 0 && parseInt(lowerCaseMessage) <= menu.salgados.length) {
        const itemPedido = menu.salgados[parseInt(lowerCaseMessage) - 1];
        pedidos.push(itemPedido);
        total += parseFloat(itemPedido.preco.replace('R$', '').replace(',', '.'));
        await client.sendMessage(message.from, `Pedido confirmado: ${itemPedido.nome}. \nDeseja pedir mais alguma coisa? (Digite "sair" para encerrar ou escolha uma nova opção.)`);
      } else {
        await client.sendMessage(message.from, 'Opção inválida! Por favor, escolha um número válido ou digite "sair" para sair.');
      }
      break;

    default:
      await resetConversation(message, 'Algo deu errado! Vamos recomeçar. Digite uma saudação para iniciar o atendimento.');
      break;
  }

  // Se o usuário decidir sair, exibe a comanda final
  if (lowerCaseMessage === 'sair') {
    const detalhesPedido = pedidos.map(item => `${item.nome} - ${item.preco}`).join('\n');
    const totalFormatted = `R$${total.toFixed(2).replace('.', ',')}`;
    const comanda = `📋 Comanda Final:\n${detalhesPedido}\n\nTotal: ${totalFormatted}\n\nObrigado por visitar o Café da Júlio! Até a próxima! 👋`;
    await client.sendMessage(message.from, comanda);
    pedidos = []; // Limpa os pedidos
    total = 0; // Zera o total
  }
});

client.initialize();
