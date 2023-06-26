// função para calcular o score
export const calculateScore = (time, difficulty) => {
  const valuePerHit = 10;
  const magicNumber = 3;

  if (difficulty === 'hard') {
    return valuePerHit + (time * magicNumber);
  } if (difficulty === 'medium') {
    return valuePerHit + (time * 2);
  }
  return valuePerHit + time;
};
