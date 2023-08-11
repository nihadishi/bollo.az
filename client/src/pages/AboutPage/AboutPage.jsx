import React from "react";
import "./style.scss";
import infoImg from "./img/info-img.png";
import box from "./img/box.svg";
import delivery from "./img/delivery.svg";
import farm from "./img/farm.svg";
import arrowSVG from "./img/arrow-up.svg";
import bg_M from "./img/bg2.png";
import { useNavigate } from "react-router-dom";


const OpenAnswer = (id) => {
  if (document.getElementById(id).style.display === "none") {
    document.getElementById(id).style.display = "block";
  } else {
    document.getElementById(id).style.display = "none";
  }
};

const AboutPage = () => {
  const navigate = useNavigate();
  const Advantages = [
    {
      svg: delivery,
      alt: "delivery",
      name: "Farm products",
      description:
        "We work with many farms to provide you with natural products grown with love and care with no GMO or pesticides.",
    },
    {
      svg: farm,
      alt: "farm",
      name: "High quality",
      description:
        "We stand for providing the most fresh organic products which will serve your health and be a source of vitamins.",
    },
    {
      svg: box,
      alt: "box",

      name: "Free delivery",
      description:
        "We want our client to receive their fresh products as soon as possible, so we process and ship the order at once.",
    },
  ];
  const AllQuestionsAndAnswers = [
    {
      answerID: 1,
      arrow: arrowSVG,
      question: "How many days is the ordered product delivered?",
      answers:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sodales lorem quis libero bibendum, non dictum felis ullamcorper. Sed vel suscipit urna, sed semper magna. Morbi vitae ante neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec egestas dolor tortor, ac dignissim sem pharetra at. Curabitur gravida ac nulla nec pulvinar. Mauris porttitor tristique faucibus. Duis lobortis magna ac ligula posuere efficitur. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed condimentum nisl quis ante condimentum, non bibendum erat ornare. Maecenas erat metus, sodales at scelerisque id, rhoncus sed arcu. Duis id vestibulum nisl. Proin arcu ligula, feugiat sed laoreet at, maximus quis neque. Mauris sed ultricies tortor, quis facilisis elit. Nunc mattis egestas scelerisque.",
    },
    {
      answerID: 2,
      arrow: arrowSVG,
      question: "Is cracking paid?",
      answers:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sodales lorem quis libero bibendum, non dictum felis ullamcorper. Sed vel suscipit urna, sed semper magna. Morbi vitae ante neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec egestas dolor tortor, ac dignissim sem pharetra at. Curabitur gravida ac nulla nec pulvinar. Mauris porttitor tristique faucibus. Duis lobortis magna ac ligula posuere efficitur. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed condimentum nisl quis ante condimentum, non bibendum erat ornare. Maecenas erat metus, sodales at scelerisque id, rhoncus sed arcu. Duis id vestibulum nisl. Proin arcu ligula, feugiat sed laoreet at, maximus quis neque. Mauris sed ultricies tortor, quis facilisis elit. Nunc mattis egestas scelerisque.",
    },
    {
      answerID: 3,
      arrow: arrowSVG,
      question: "Do you have a store?",
      answers:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sodales lorem quis libero bibendum, non dictum felis ullamcorper. Sed vel suscipit urna, sed semper magna. Morbi vitae ante neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec egestas dolor tortor, ac dignissim sem pharetra at. Curabitur gravida ac nulla nec pulvinar. Mauris porttitor tristique faucibus. Duis lobortis magna ac ligula posuere efficitur. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed condimentum nisl quis ante condimentum, non bibendum erat ornare. Maecenas erat metus, sodales at scelerisque id, rhoncus sed arcu. Duis id vestibulum nisl. Proin arcu ligula, feugiat sed laoreet at, maximus quis neque. Mauris sed ultricies tortor, quis facilisis elit. Nunc mattis egestas scelerisque.",
    },
    {
      answerID: 4,
      arrow: arrowSVG,
      question: "Where do you get the products?",
      answers:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sodales lorem quis libero bibendum, non dictum felis ullamcorper. Sed vel suscipit urna, sed semper magna. Morbi vitae ante neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec egestas dolor tortor, ac dignissim sem pharetra at. Curabitur gravida ac nulla nec pulvinar. Mauris porttitor tristique faucibus. Duis lobortis magna ac ligula posuere efficitur. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed condimentum nisl quis ante condimentum, non bibendum erat ornare. Maecenas erat metus, sodales at scelerisque id, rhoncus sed arcu. Duis id vestibulum nisl. Proin arcu ligula, feugiat sed laoreet at, maximus quis neque. Mauris sed ultricies tortor, quis facilisis elit. Nunc mattis egestas scelerisque.",
    },
    {
      answerID: 5,
      arrow: arrowSVG,
      question: "How is the payment made?",
      answers:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sodales lorem quis libero bibendum, non dictum felis ullamcorper. Sed vel suscipit urna, sed semper magna. Morbi vitae ante neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec egestas dolor tortor, ac dignissim sem pharetra at. Curabitur gravida ac nulla nec pulvinar. Mauris porttitor tristique faucibus. Duis lobortis magna ac ligula posuere efficitur. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed condimentum nisl quis ante condimentum, non bibendum erat ornare. Maecenas erat metus, sodales at scelerisque id, rhoncus sed arcu. Duis id vestibulum nisl. Proin arcu ligula, feugiat sed laoreet at, maximus quis neque. Mauris sed ultricies tortor, quis facilisis elit. Nunc mattis egestas scelerisque.",
    },
  ];
  return (
    <>
      <div className="Int">
        <div className="Int-M">
          <img src={bg_M} alt="" />
        </div>
        <div className="Intro">
          <div className="Intro-About">
            <div className="Intro-About-Text">
              Make health life with Fresh grocery
            </div>
            <div className="Intro-About-Order">
              <button
                className="Intro-About-Order-button"
                onClick={() => {
                  navigate("/products");
                }}
              >
                Order now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="Ab">
        <div className="About">
          <div className="About-Advantages">
            {Advantages.map((item, index) => {
              return (
                <div key={index} className="About-Advantages-Item">
                  <div className="About-Advantages-Item-img">
                    <img src={item.svg} alt={item.alt} />
                  </div>
                  <h1 className="About-Advantages-Item-name">{item.name}</h1>
                  <h5 className="About-Advantages-Item-description">
                    {item.description}
                  </h5>
                </div>
              );
            })}
          </div>

          <div className="About-Info">
            <div className="About-Info-Text">
              <div className="About-Info-Text-name">About us</div>
              <div className="About-Info-Text-description">
                Our mission is to provide a convenient online platform to
                provide access to high quality organic products while supporting
                local farmers. Our vision is to be a premium online organic
                store that leads to a more sustainable future, is known for our
                commitment to quality and allows our customers to make informed
                choices about their health.
              </div>
            </div>
            <div className="About-Info-img">
              <img src={infoImg} alt="Bollo" />
            </div>
          </div>
        </div>
      </div>
      <div className="Que">
        <div className="Questions">
          <div className="Questions-name">Frequently asked questions</div>
          {AllQuestionsAndAnswers.map((item) => {
            return (
              <div
                className="Questions-QA"
                key={item.answerID}
                onClick={() => OpenAnswer(item.answerID)}
              >
                <div className="Questions-QA-Q">
                  {item.question}{" "}
                  <img
                    src={item.arrow}
                    alt="&#8964;"
                    className="Questions-QA-Q-svg"
                  />
                </div>
                <div className="Questions-QA-A" id={item.answerID}>
                  {item.answers}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AboutPage;
