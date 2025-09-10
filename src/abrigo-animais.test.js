import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');
      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve adotar Loco apenas se pessoa tiver outro animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 
      'RATO,NOVELO', 
      'Rex,Loco' 
    );
    expect(resultado.lista[0]).toBe('Loco - pessoa 1');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');
  });

  test('Não permite pessoa ter mais de 3 animais', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,LASER,CAIXA,NOVELO', 
      'RATO,NOVELO,BOLA,LASER', 
      'Rex,Bebe,Fofo,Zero' 
    );
    const lista = resultado.lista;
    const pessoas = lista.map(x => x.split(' - ')[1]);
    const p1Count = pessoas.filter(p => p === 'pessoa 1').length;
    const p2Count = pessoas.filter(p => p === 'pessoa 2').length;
    expect(p1Count).toBeLessThanOrEqual(3);
    expect(p2Count).toBeLessThanOrEqual(3);
    expect(lista).toContain('Zero - abrigo'); 
  });

  test('Animal vai para abrigo se sequência de brinquedos não estiver correta', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,RATO', 
      'LASER,RATO,BOLA', 
      'Fofo'
    );
    expect(resultado.lista[0]).toBe('Fofo - abrigo');
  });
});
