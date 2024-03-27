import { SyntheticEvent, useEffect, useRef, useState } from 'react';

type FN = () => void;

const AutoComplete = () => {
  const apiUrl = "https://restcountries.com/v3.1/all?fields=name,flags";
  const [eventVal, setEventVal] = useState('');
  const [countryList, setCountryList] = useState([]);
  const [suggestionList, setSuggestionList] = useState<any[]>([]);
  const ref = useRef<any>(null);

  const getCountryData = async () => {
    const countryRes = await fetch(apiUrl);
    const countryData = await countryRes.json();
    setCountryList(countryData);
  }

  useEffect(() => {
    getCountryData();
  }, []);

  const debounceSearch = (cb: FN, delay: number = 2000) => {
    return () => {
      if (ref.current) {
        clearTimeout(ref.current);
      }
      ref.current = setTimeout(cb, delay);
    }
  }

  const filterSuggestionList = () => {
    const currentData = countryList.slice(0);
    const filteredData: any[] = currentData.filter((countryData) => {
      return countryData.name.common.includes(eventVal);
    }).map((countryData) => {
      return countryData.name.common;
    });
    setSuggestionList(filteredData);
    console.log(filteredData);
  }

  useEffect(() => {
    const debounceSearchfn = debounceSearch(filterSuggestionList);
    if (eventVal) {
      debounceSearchfn();
    }
  }, [eventVal]);

  const onChangeHandler = (event: SyntheticEvent) => {
    setEventVal(event.target.value);
  }

  return (
    <div>
      <input onChange={onChangeHandler} value={eventVal} />
      <div>
        {
          suggestionList.map((suggestionData: any, index: number) => (
            <div key={index}>{suggestionData}</div>
          ))
        }
      </div>
    </div>
  );
};

export default AutoComplete;