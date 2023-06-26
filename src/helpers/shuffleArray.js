// embaralha as respostas
export const shuffleArray = (array) => {
  // Loop em todos os elementos
  for (let index = array.length - 1; index > 0; index -= 1) {
    // Escolhendo elemento aleatório
    const shuffle = Math.floor(Math.random() * (index + 1));
    // Reposicionando elemento
    [array[index], array[shuffle]] = [array[shuffle], array[index]];
  }
  // Retornando array com aleatoriedade
  return array;
};
