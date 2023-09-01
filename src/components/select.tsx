const Select = ({value, options, title, onChange} : {value: any, options: any, title: string, onChange: any}) => {
  return <div className="flex-1">
      <label className="block mb-2 text-xs md:text-sm font-bold text-white">{title}</label>
      <select
        disabled={options.length <= 1}
        value={value}
        className="bg-white border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        onChange={onChange}
      >
      {options.map((key: string, index: number) => {
        return <option value={index}>{key}</option>
      })}
      </select>
    </div>
}

export default Select
