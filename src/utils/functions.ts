export function shuffleArray(array: unknown[]): void {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// eslint-disable-next-line prettier/prettier
export function setObjectToLocal(object: { [key: string]: string; }): void {
  const localValue = localStorage.getItem('antiqueOptions');
  if (localValue) {
    const localObj = JSON.parse(localValue);
    localStorage.setItem('antiqueOptions', JSON.stringify({ ...localObj, ...object }));
  } else {
    localStorage.setItem('antiqueOptions', JSON.stringify(object));
  }
}

export function getValueFromLocal(key: string): string {
  const localValue = localStorage.getItem('antiqueOptions');
  let input: string;
  if (localValue) {
    const localObj = JSON.parse(localValue);
    input = localObj[key];
  } else {
    input = '';
  }
  return input;
}

export function makeArray(number: number): number[] {
  const array = [];
  for (let i = 1; i <= number; i++) {
    array.push(i);
  }
  return array;
}
