// função para calcular numero de acertos

export const calculateAssertions = (assertions) => {
  const magicNumber = 3;
  if (assertions >= magicNumber) {
    return 'Well Done!';
  }
  return 'Could be better...';
};
