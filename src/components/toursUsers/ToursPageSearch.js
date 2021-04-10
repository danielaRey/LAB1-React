import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ReactCountryDropdown } from "react-country-dropdown";
import "react-country-dropdown/dist/index.css";

function ToursPageSearch(props) {
  const activeStyle = {
    backgroundColor: "#4A6DA2",
    padding: "30px",
    margin: "auto",
  };

  const [input, setInput] = useState("Costa Rica");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [flagRedirect, setFlagRedirect] = useState(false);

  const updateInput = async (input) => {
    setInput(input);
  };

  function search(event) {
    setFlagRedirect(true);
  }

  const handleSelect = (country) => {
    setInput(country["name"]);
  };

  return (
    <>
      {flagRedirect ? (
        <>
          <Redirect to={`/tours/${input}/${startDate}/${endDate}`} />
        </>
      ) : (
        <>
          <h2>Tours Búsqueda</h2>
          <div style={activeStyle} className="row align-items-start">
            <ReactCountryDropdown onSelect={handleSelect} countryCode="CR" />

            <DatePicker
              className="col mr-2"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={new Date()}
              isClearable
              placeholderText="Ida"
            />
            <DatePicker
              className="col mr-2"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={new Date()}
              isClearable
              placeholderText="Vuelta"
            />
          </div>

          <div
            style={{ backgroundColor: "#4A6DA2", margin: "auto" }}
            className="row align-items-start pb-3"
          >
            <button
              style={{ margin: "auto" }}
              onClick={() => {
                search();
              }}
              className="btn btn-primary add-tour col-md-3 ms-md-auto"
            >
              Buscar Tour
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default ToursPageSearch;
