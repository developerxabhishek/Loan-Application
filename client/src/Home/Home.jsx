import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  const navigate = useNavigate();
  const next = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % 3);
  };
  const previous = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + 3) % 3);
    setCurrentText((prevText) => (prevText - 1 + 3) % 3);
  };
  const nextText = () => {
    setCurrentText((prevText) => (prevText + 1) % 3);
  };

  const previousText = () => {
    setCurrentText((prevText) => (prevText - 1 + 3) % 3);
  };
  return (
    <div className="home-div">
      <div className="card">
        <div className="card-img">
          <img
            src="https://images.pexels.com/photos/572056/pexels-photo-572056.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Creative Design Agency"
            className={currentSlide === 0 ? "active" : ""}
          />
          <img
            src="https://images.pexels.com/photos/205420/pexels-photo-205420.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Product Design Agency"
            className={currentSlide === 1 ? "active" : ""}
          />
          <img
            src="https://images.pexels.com/photos/296127/pexels-photo-296127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Ui-Ux Design Agency"
            className={currentSlide === 2 ? "active" : ""}
          />
        </div>
        <div className="text-content">
          <div className={`text-data ${currentText === 0 ? "active" : ""}`}>
            <h1>Discover Your Financial Freedom</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
              itaque distinctio explicabo tempora nisi labore animi,
              voluptatibus at quaerat! Asperiores laboriosam harum id
              consequatur corporis blanditiis, aliquid suscipit qui laborum
              libero voluptatum aut explicabo exercitationem ipsa deleniti quis
              nam sint. Maiores magni reprehenderit dolor perferendis nemo ab.
              Tenetur, id repellat!
            </p>
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </div>
          <div className={`text-data ${currentText === 1 ? "active" : ""}`}>
            <h1>Explore Our Loan Products</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
              itaque distinctio explicabo tempora nisi labore animi,
              voluptatibus at quaerat! Asperiores laboriosam harum id
              consequatur corporis blanditiis, aliquid suscipit qui laborum
              libero voluptatum aut explicabo exercitationem ipsa deleniti quis
              nam sint. Maiores magni reprehenderit dolor perferendis nemo ab.
              Tenetur, id repellat!
            </p>
            <button
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </button>
          </div>
          <div className={`text-data ${currentText === 2 ? "active" : ""}`}>
            <h1>Customer Support</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
              itaque distinctio explicabo tempora nisi labore animi,
              voluptatibus at quaerat! Asperiores laboriosam harum id
              consequatur corporis blanditiis, aliquid suscipit qui laborum
              libero voluptatum aut explicabo exercitationem ipsa deleniti quis
              nam sint. Maiores magni reprehenderit dolor perferendis nemo ab.
              Tenetur, id repellat!
            </p>
            <a
              href="https://www.linkedin.com/in/abhishek-pandey-445a3128b/"
              target="/blank"
            >
              <button>Contact Us</button>
            </a>
          </div>
        </div>
        <div className="bottom">
          <button
            onClick={() => {
              previous();
              previousText();
            }}
          >
            <span>&#8592;</span>
          </button>
          <button
            onClick={() => {
              next();
              nextText();
            }}
          >
            {" "}
            <span>&#8594;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
