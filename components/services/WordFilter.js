import Filter from 'bad-words';
const filter = new Filter();

export const wordFilter = (inputValue) => {
    if (inputValue.trim()) {
        return filter.clean(inputValue);
    }
}