class AbrigoAnimais {
  constructor() {
    this.animais = {
      Rex: { tipo: "cão", brinquedos: ["RATO", "BOLA"] },
      Mimi: { tipo: "gato", brinquedos: ["BOLA", "LASER"] },
      Fofo: { tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
      Zero: { tipo: "gato", brinquedos: ["RATO", "BOLA"] },
      Bola: { tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] },
      Bebe: { tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
      Loco: { tipo: "jabuti", brinquedos: ["SKATE", "RATO"], especial: true },
    };

    this.brinquedosValidos = ["RATO", "BOLA", "LASER", "CAIXA", "NOVELO", "SKATE"];
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    try {
      const p1 = brinquedosPessoa1.split(",");
      const p2 = brinquedosPessoa2.split(",");
      const ordem = ordemAnimais.split(",");

      this.validarBrinquedos(p1);
      this.validarBrinquedos(p2);
      this.validarAnimais(ordem);

      const adotados = { p1: [], p2: [] };
      const resultado = [];

      for (let nome of ordem) {
        const animal = this.animais[nome];
        const dono = this.decidirDono(animal, p1, p2, adotados);
        resultado.push(`${nome} - ${dono}`);
      }

      return { lista: resultado.sort(), erro: null };
    } catch (err) {
      return { erro: err.message, lista: null };
    }
  }

  validarBrinquedos(lista) {
    const set = new Set();
    for (let b of lista) {
      if (!this.brinquedosValidos.includes(b)) {
        throw new Error("Brinquedo inválido");
      }
      if (set.has(b)) {
        throw new Error("Brinquedo inválido");
      }
      set.add(b);
    }
  }

  validarAnimais(lista) {
    const set = new Set();
    for (let a of lista) {
      if (!this.animais[a]) {
        throw new Error("Animal inválido");
      }
      if (set.has(a)) {
        throw new Error("Animal inválido");
      }
      set.add(a);
    }
  }

  subsequencia(favoritos, brinquedosPessoa) {
    let idx = 0;
    for (let b of brinquedosPessoa) {
      if (b === favoritos[idx]) idx++;
      if (idx === favoritos.length) return true;
    }
    return false;
  }

  decidirDono(animal, p1, p2, adotados) {
    if (animal.especial) {
      
      if (adotados.p1.length > 0 && adotados.p1.length < 3) {
        adotados.p1.push(animal);
        return "pessoa 1";
      }
      if (adotados.p2.length > 0 && adotados.p2.length < 3) {
        adotados.p2.push(animal);
        return "pessoa 2";
      }
      return "abrigo";
    }

    const cond1 = this.subsequencia(animal.brinquedos, p1);
    const cond2 = this.subsequencia(animal.brinquedos, p2);

    if (cond1 && cond2) return "abrigo";

    if (cond1 && adotados.p1.length < 3) {
      adotados.p1.push(animal);
      return "pessoa 1";
    }

    if (cond2 && adotados.p2.length < 3) {
      adotados.p2.push(animal);
      return "pessoa 2";
    }

    return "abrigo";
  }
}

export { AbrigoAnimais as AbrigoAnimais };
