import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero container">
      <div className="hero-text">
        <h1>Pay As You Go</h1>
        <p>
          Invest in your health, whenever and wherever.
        </p>
        <button className="btn">
          <a href="/register" className="link-button">
            GET STARTED <i className="bx bx-log-in"></i>
          </a>
        </button>
      </div>
    </div>
  );
};

export default Hero;
