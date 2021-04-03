import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TourMainImage from "./TourMainImage";
import sus from "../../../imagenes/sushi.png";

const lll =
  "https://images.unsplash.com/photo-1497398276231-94ff5dc90217?w=900";
const ostyle = {
  backgroundImage: `url(${sus})`,
  backgroundSize: "cover",
  backgroundColor: "blue",
};

const activeStyle = {
  backgroundImage: `url('${sus}')`,
  backgroundColor: "blue",
};

const TourListCard = ({ tours, fotos }) => (
  <div className="card-group">
    {tours.map((tour) => {
      return (
        <>
          <div className="w-full sm:w-1/2 md:w-1/3 flex flex-col p-3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col">
              <div className="bg-cover h-100  ">
                <img
                  className=""
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    backgroundImage: `url('${sus}')`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                  src={sus}
                ></img>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <h3 className="mb-4 text-2xl">My heading</h3>
                <div className="mb-4 text-grey-darker text-sm flex-1">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.{" "}
                  </p>
                </div>
                <a
                  href="#"
                  className="border-t border-grey-light pt-2 text-xs text-grey hover:text-red uppercase no-underline tracking-wide"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>

          <div className="card" key={tour.id} id={tour.id}>
            <TourMainImage fotos={fotos} tourID={tour.id} />
            <div className="card-body"></div>
            <h5 className="card-title">
              {" "}
              <Link to={"/tour/" + tour.id}>{tour.nombre}</Link>
            </h5>
            <p className="card-text">{tour.duracion}</p>
            <p className="card-text">{tour.precio}</p>
          </div>
        </>
      );
    })}
  </div>
);

TourListCard.propTypes = {
  tours: PropTypes.array.isRequired,
  fotos: PropTypes.array.isRequired,
};

export default TourListCard;
