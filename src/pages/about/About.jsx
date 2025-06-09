import React from "react";
import "./About.css";
import payg from "../images/Namepayg.png";
const About = () => {
  return (
    <section id="about" role="about">
      {/* MAIN */}
      <div className="container main">
        {/* TEXT SECTION */}
        <div className="row" id="about-text">
          <div className="col-md-6 vertical-text">
            <h4>Who We Are?</h4>
            <h2>
              A <b>Story</b>
              <br /> About Us
            </h2>
          </div>

          <div className="col-md-6">
            <p>
              <b className="bold">PayG</b> Health Insurance is a health insurance startup that is
              focused on making health insurance more accessible and flexible
              for Nigerians.
            </p>
            <br />
            <p>
              Using a Pay-As-You-Go model, Individuals can contribute small
              amounts whenever they can through airtime recharge, rather than
              paying large sums at once.
            </p>
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div id="about-img" className="row">
          <div className="col-md-12">
            <img
              src={payg}
              alt="PayG Health Insurance Logo"
              className="img-responsive"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
