import { useEffect, useState } from 'react';
import { FilteredSuggestions } from './FilteredSuggestions';
import './styles.css';
import { Tags } from './Tags';

type SuggestionProps = {
  name: string;
  craft: string;
};

export const AutocompleteTags = () => {
  const [suggestions, setSuggestions] = useState<SuggestionProps[]>([]);
  const [active, setActive] = useState(0);
  const [filtered, setFiltered] = useState<SuggestionProps[]>([]);
  const [tags, setTags] = useState<Tags[]>([]);
  const [input, setInput] = useState('');

  const onChange = (event: any) => {
    const input = event.currentTarget.value;
    const newFilteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.name.toLowerCase().indexOf(input.toLowerCase()) > -1
    );
    setFiltered(newFilteredSuggestions);
    setInput(event.currentTarget.value);
  };

  const addTag = (name: string) => {
    // @ts-ignore
    setTags([...tags, name]);
  };

  const deleteTag = (index: number) => {
    const deletedTags = tags.filter((tag, j) => j !== index);

    setTags(deletedTags);
  };

  const onKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      setActive(0);
    } else if (event.keyCode === 38) {
      return active === 0 ? null : setActive(active - 1);
    } else if (event.keyCode === 40) {
      return active - 1 === filtered.length ? null : setActive(active + 1);
    }
  };

  useEffect(() => {
    async function getSuggestions() {
      await fetch('http://api.open-notify.org/astros.json')
        .then(response => response.json())
        .then(data => {
          setSuggestions(data.people);
        });
    }
    getSuggestions();
  }, []);

  return (
    <>
      <div className='container'>
        <Tags onDelete={deleteTag} tags={tags} />
        <input
          type='text'
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={input}
        />
        <br />
      </div>

      {input && filtered.length && (
        <FilteredSuggestions filtered={filtered} addTag={addTag} />
      )}
    </>
  );
};
