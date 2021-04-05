import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ToursPageSearch(props) {
  const [input, setInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [flagRedirect, setFlagRedirect] = useState(false);

  const updateInput = async (input) => {
    setInput(input);
  };

  function search(event) {
    setFlagRedirect(true);
  }

  console.log(startDate);

  return (
    <>
      {flagRedirect ? (
        <>
          <Redirect to={`/tours/${input}/${startDate}/${endDate}`} />
        </>
      ) : (
        <>
          <h2>Tours Búsqueda</h2>
          <input
            placeholder={"nombre"}
            onChange={(e) => updateInput(e.target.value)}
          />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={new Date()}
            isClearable
            placeholderText="Ida"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={new Date()}
            isClearable
            placeholderText="Vuelta"
          />
          <button
            style={{ marginBottom: 20 }}
            onClick={search}
            className="btn btn-primary add-tour"
          >
            Buscar Tour
          </button>
        </>
      )}
    </>
  );
}

export default ToursPageSearch;
