type SuggestionProps = {
  name: string;
  craft: string;
};

type Tags = Pick<SuggestionProps, 'name'>;
