type FilteredSuggestionsProps = {
  filtered: SuggestionProps[];
  addTag: (name: string) => void;
};

export function FilteredSuggestions({
  filtered,
  addTag
}: FilteredSuggestionsProps) {
  return (
    <>
      <ul className='autocomplete'>
        {filtered.map((suggestion, index) => {
          return (
            <li key={suggestion.name} onClick={() => addTag(suggestion.name)}>
              {suggestion.name}
            </li>
          );
        })}
      </ul>
    </>
  );
}
