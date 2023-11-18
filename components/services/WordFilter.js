import Filter from 'bad-words';
const filter = new Filter();

const containsAnyCharacters = (inputString) => {
    // Regular expression to match any character
    const regex = /[a-zA-Z\d]/;
  
    // Check if the input string contains any character
    return regex.test(inputString);
  }

export const wordFilter = (inputValue) => {
    if (inputValue.trim()) {
        console.log(containsAnyCharacters(inputValue));
        if (containsAnyCharacters(inputValue)) {
            const filtered = filter.clean(inputValue);
            return filtered;
        } else {
            return inputValue;
        }
    }
}