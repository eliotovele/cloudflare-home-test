type TagsProps = {
  tags: Tags[];
  onDelete: (index: number) => void;
};

export function Tags({ tags, onDelete }: TagsProps) {
  return (
    <>
      {tags.map((tag, index) => (
        <>
          <div className='tag'>
            <span>
              {tag}{' '}
              <span className='delete' onClick={() => onDelete(index)}>
                x
              </span>
            </span>
          </div>
        </>
      ))}
    </>
  );
}
