import "./Goal.css";

const Goals = () => {
  return (
    <div id="goals">
      <div className="container">
        <div className="row text-center">
          <div className="col-md-4">
            <div className="goal-item">
              <i className="fa fa-rocket fa-4x"></i>
              <h3>Aim</h3>
              <hr />
              <p>
                to be inclusive, reaching both people with smartphones (through
                websites and apps) and those without smartphones
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="goal-item">
              <i className="fa fa-pencil fa-4x"></i>
              <h3>Mission</h3>
              <hr />
              <p>
                To eliminate financial barriers and promotes health equity by 
                improving public health insurance
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="goal-item">
              <i className="fa fa-eye fa-4x"></i>
              <h3>Vission</h3>
              <hr />
              <p>
                To become the model for quality health insurance services in
                Nigeria.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
