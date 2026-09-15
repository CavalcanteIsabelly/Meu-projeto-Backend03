// A palavra "class" define que estamos criando um molde.
// A palavra "export" permite que esse arquivo seja usado por outros arquivos (como o app.ts).
export class Player {
    public name: string; // O nome do jogador (texto)
    public health: number; // A saúde do jogador (número)
    public level: number; // O nível do jogador (número)

    // Construtor: executado automaticamente ao instanciar a classe
    constructor(name: string, health: number = 100, level: number = 1) {
        // A palavra "this" faz referência à própria instância da classe
        this.name = name;
        this.health = health;
        this.level = level;
    }

    // Métodos (comportamentos da classe)
    public attack(): string {
        const damage = this.level * 10; // Usa this.level para acessar o nível do jogador
        return `${this.name} atacou e causou ${damage} de dano!`;
    }

    // Método que recebe o dano sofrido e atualiza a saúde
    public takeDamage(amount: number): string {
        this.health -= amount; // Reduz a saúde do jogador

        if (this.health <= 0) {
            this.health = 0; // Garante que a saúde não fique negativa
            return `${this.name} foi derrotado!`;
        }

        return `${this.name} recebeu ${amount} de dano e agora tem ${this.health} de saúde.`;
    }
}