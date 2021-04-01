import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadTours } from "../../redux/actions/tourActions";
import PropTypes from "prop-types";
import TourForm from "./TourForm";
import * as models from "../../../models/tourModel";

function ManageTourPage({ tours, loadTours, ...props }) {
  const [tour, setTour] = useState({ ...props.tour });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (tours.length === 0) {
      loadTours().catch((error) => {
        alert("Loading tours failed" + error);
      });
    } else {
      setTour({ ...props.tour });
    }
  }, [props.tour]);

  function handleChange(event) {
    //[name]: name === "authorId" ? parseInt(value, 10) : value,
    const { name, value } = event.target;
    setTour((prevTour) => ({
      ...prevTour,
      [name]: value,
    }));
  }

  // function handleSave(event) {
  //   event.preventDefault();
  //   saveCourse(course).then(() => {
  //     history.push("/courses");
  //   });
  // }

  return <TourForm tour={tour} errors={errors} onChange={handleChange} />;
}

ManageTourPage.propTypes = {
  tour: PropTypes.object.isRequired,
  tours: PropTypes.array.isRequired,
  loadTours: PropTypes.func.isRequired,
  //saveCourse: PropTypes.func.isRequired,
  // history: PropTypes.object.isRequired,
};

// export function getCourseBySlug(courses, slug) {
//   return courses.find((course) => course.slug === slug) || null;
// }

function mapStateToProps(state, ownProps) {
  // const slug = ownProps.match.params.slug;
  // const course =
  //   slug && state.courses.length > 0
  //     ? getCourseBySlug(state.courses, slug)
  //     : newCourse;
  return {
    tour: models.newTour,
    tours: state.tours,
  };
}

const mapDispatchToProps = {
  loadTours,
  //saveCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTourPage);
