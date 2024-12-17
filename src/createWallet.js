// Importando as dependências
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

// Definir Rede
// bitcoin - rede principal (mainnet)
// bitcoin - rede de testes (testnet)
const network = bitcoin.networks.testnet;

// Derivação de endereços e carteiras HD
const path = "m/49'/1'/0'/0";

// Gerar uma nova frase mnemônica para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

// Criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network);

// Criando uma conta - par de chaves publica e privada
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

// Gerando endereço bitcoin
let btcAddress = bitcoin.payments.p2wpkh({
    pubkey: account.publicKey,
    network: network,
}).address;

console.log('Carteira Gerada');
console.log('Endereço: ', btcAddress);
console.log('Chave Privada: ', node.toWIF());
console.log('Seed: ', mnemonic);