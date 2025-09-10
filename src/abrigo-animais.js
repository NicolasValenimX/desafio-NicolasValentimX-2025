class AbrigoAnimais {
  constructor() {
    // Define os animais do abrigo e seus brinquedos favoritos
    this.animais = {
      Rex: { tipo: "cão", brinquedos: ["RATO", "BOLA"] },
      Mimi: { tipo: "gato", brinquedos: ["BOLA", "LASER"] },
      Fofo: { tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
      Zero: { tipo: "gato", brinquedos: ["RATO", "BOLA"] },
      Bola: { tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] },
      Bebe: { tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
      Loco: { tipo: "jabuti", brinquedos: ["SKATE", "RATO"], especial: true },
    };

    // Lista de brinquedos válidos que as pessoas podem informar

    this.brinquedosPermitidos = ["RATO", "BOLA", "LASER", "CAIXA", "NOVELO", "SKATE"];
  }
  
   // Função principal que encontra as pessoas que podem adotar os animais
  encontraPessoas(brinquedos1, brinquedos2, ordemAnimais) {
    try {
      // Converte as strings de entrada em arrays
      const pessoa1 = brinquedos1.split(",");
      const pessoa2 = brinquedos2.split(",");
      const ordem = ordemAnimais.split(",");
      
      // Valida se os brinquedos e animais são válidos
      
      this.checarBrinquedos(pessoa1);
      this.checarBrinquedos(pessoa2);
      this.checarAnimais(ordem);

      const adotados = { pessoa1: [], pessoa2: [] };
      const resultado = [];

      // Para cada animal na ordem, decide quem pode adotar

      for (const nomeAnimal of ordem) {
        const animal = this.animais[nomeAnimal];
        resultado.push(`${nomeAnimal} - ${this.escolherDono(animal, pessoa1, pessoa2, adotados)}`);
      }

      // Retorna a lista em ordem alfabética

      return { lista: resultado.sort(), erro: null };
    } catch (erro) { // Retorna mensagem de erro se algo estiver inválido
      return { lista: null, erro: erro.message };
    }
  }

  checarBrinquedos(lista) {
    const vistos = new Set();
    for (const b of lista) {
      if (!this.brinquedosPermitidos.includes(b)) throw new Error("Brinquedo inválido");
      if (vistos.has(b)) throw new Error("Brinquedo inválido");
      vistos.add(b);
    }
  }

  checarAnimais(lista) {
    const vistos = new Set();
    for (const a of lista) {
      if (!this.animais[a]) throw new Error("Animal inválido");
      if (vistos.has(a)) throw new Error("Animal inválido");
      vistos.add(a);
    }
  }

  verificaSubsequencia(favoritos, brinquedosPessoa) {
    let pos = 0;
    for (const b of brinquedosPessoa) {
      if (b === favoritos[pos]) pos++;
      if (pos === favoritos.length) return true;
    }
    return false;
  }

  escolherDono(animal, pessoa1, pessoa2, adotados) {
    if (animal.especial) {
      // Loco só quer companhia, não se importa com a ordem
      if (adotados.pessoa1.length > 0 && adotados.pessoa1.length < 3) {
        adotados.pessoa1.push(animal);
        return "pessoa 1";
      }
      if (adotados.pessoa2.length > 0 && adotados.pessoa2.length < 3) {
        adotados.pessoa2.push(animal);
        return "pessoa 2";
      }
      return "abrigo";
    }

    const p1Valido = this.verificaSubsequencia(animal.brinquedos, pessoa1);
    const p2Valido = this.verificaSubsequencia(animal.brinquedos, pessoa2);

    if (p1Valido && p2Valido) return "abrigo";

    if (p1Valido && adotados.pessoa1.length < 3) {
      adotados.pessoa1.push(animal);
      return "pessoa 1";
    }

    if (p2Valido && adotados.pessoa2.length < 3) {
      adotados.pessoa2.push(animal);
      return "pessoa 2";
    }

    return "abrigo";
  }
}

export { AbrigoAnimais as AbrigoAnimais };
