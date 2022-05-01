const MockSelect = ({ options, value, onChange }: any) => {
  function handleChange(event: any) {
    const option = options.find(
      (option: any) => option.value === event.currentTarget.value
    );
    onChange(option);
  }
  return (
    <select data-testid="select" value={value} onChange={handleChange}>
      {options.map(({ label, value }: any) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default MockSelect;
