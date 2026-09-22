// Importa a biblioteca Express e também os tipos para o TypeScript
// O Express será utilizado para criar o servidor web
import express from "express";
import type { Express, Request, Response } from "express";

import fs from "fs"
// Importa a classe Player do arquivo Player.ts
import { Player } from "./Models/Player.js";

// Cria uma aplicação Express
// A função express() devolve um objeto que representa o servidor da aplicação
const app: Express = express();

// Middleware para permitir que o servidor entenda requisições com corpo em JSON
app.use(express.json());

// Define a porta onde o servidor ficará disponível
// Neste caso, o servidor poderá ser acessado pela porta 8081
const PORT: number = 8081;

// Instanciação de um jogador utilizando a classe Player
// Criamos (instanciamos) um novo jogador chamado "Hero" com 100 de saúde e nível 5
// A partir da classe Player que foi importada do arquivo Player.ts
let player1: Player = new Player("Hero", 100, 5);

// Define o nome do diretório onde os arquivos serão armazenados
const DATA_FILE = "./data/player.json"

/* 
Função para garantir que o diretório de dados exista antes de salvar os arquivos.
Se o 
*/
function ensureDataDirectory() {
    const dataFolder = "./data";
    if (!fs.existsSync(dataFolder)) {
        fs.mkdirSync(dataFolder);
    }
}

// Chamar a função para garatir que o diretório de dados exista
// antes de qualquer operação de leitura ou escrita de arquivos
ensureDataDirectory();

// Função para salvar os dados do jogador em um arquivo JSON
function savePlayerData(player: Player) {
    // Converte o objeto player em uma string JSON
    const playerData = JSON.stringify(player, null, 2);
    // Salva a string JSON em um arquivo chamado player.json dentro do diretório data
    fs.writeFileSync(DATA_FILE, playerData, "utf-8");
}

// Função para carregar os dados do jogador a partir de um arquivo JSON
function loadPlayerData(): Player {
    // Verifica se o arquivo player.json existe
    if (fs.existsSync(DATA_FILE)) {
        // Lê o conteúdo do arquivo
        const playerData = fs.readFileSync(DATA_FILE, "utf-8");
        const playerdata = JSON.parse(playerData);

        /* ATENÇÃO: JSON.parse() retorna a um objeto "puro"
        // (sem os métofos da classe Player). 
        // Para que possamos utilizar os métodos da classe Player,
        // precisamos criar uma nova instância da classe player com os dados carregados do arquivo.
        */
        return new Player(playerdata.name, playerdata.health, playerdata.level);
    }
    // Cria um novo players se não existir com nome "Jogador1", 100 de saúde e nível 1
    const newPlayer = new Player("Jogador1", 100, 1);
    savePlayerData(newPlayer);
    return newPlayer;
}