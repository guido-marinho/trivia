
// função para calcular o score
export const  calculateScore = (time, difficulty) => {
  let score;
  const valuePerHit = 10;

  if (difficulty === 'hard') {
    return valuePerHit + (time * 3);
    
  } else if (difficulty === 'medium') {
    return valuePerHit + (time * 2);
    
  } else {
    return valuePerHit + time;
    
  }
}
