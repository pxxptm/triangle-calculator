"use client";

import React, { useState } from "react";
import Input from "@/components/Input/Input";
import { isValidNumber } from "./validate"
import { isTriangle, getTriangleType } from "./calculate";
import { displayTriangle } from "./displayTriangle";
import "./page.css"
import { Suggestion } from "./validate";
import { AdaptTriangleModal } from './adaptTriangleModal';

//TODO: Implement Color and UI for follow document

function SideInput({
  sideNumber,
  value,
  onChange,
  error,
}: {
  sideNumber: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
}) {
  return (
    <div className="input-group">
      <label className="input-label">Side {sideNumber}</label>
      <div className="flex-1">
        <Input
          type="text"
          name={`side${sideNumber}`}
          value={value}
          onChange={onChange}
          className="input-box"
        />
        <div className="input-error">{error}</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [sides, setSides] = useState({
    side1: "",
    side2: "",
    side3: "",
  });
  const [result, setResult] = useState("");
  const [errors, setErrors] = useState({
    side1: "",
    side2: "",
    side3: "",
  });
  const [trianglePic, setTrianglePic] = useState(<div></div>);
  const [description, setDescription] = useState("");
  const [suggestion, setSuggestion] = useState<string | string[]>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const criterias = [
    "Do not leave any side empty.",
    "All sides must be greater than 0.",
    "All sides must be positive numbers.",
    "All sides' input must be integer or float.",
    "Do not type any non-number character, such as a-z, A-Z, and special characters."
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSides({
      ...sides,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const s1 = Number(sides.side1);
    const s2 = Number(sides.side2);
    const s3 = Number(sides.side3);
  
    const newErrors = {
      side1: sides.side1 ? (isValidNumber(s1) ? "" : "Input is invalid.") : "Please fill out this field.",
      side2: sides.side2 ? (isValidNumber(s2) ? "" : "Input is invalid.") : "Please fill out this field.",
      side3: sides.side3 ? (isValidNumber(s3) ? "" : "Input is invalid.") : "Please fill out this field.",
    };

    const element1 = document.getElementById("input-criteria-0");
    const element2 = document.getElementById("criteria-0");
    const element3 = document.getElementById("input-criteria-1");
    const element4 = document.getElementById("criteria-1");
    const element5 = document.getElementById("input-criteria-2");
    const element6 = document.getElementById("criteria-2");
    const element7 = document.getElementById("input-criteria-3");
    const element8 = document.getElementById("criteria-3");
    const element9 = document.getElementById("input-criteria-4");
    const element10 = document.getElementById("criteria-4");

    if (element1) { 
      element1.style.color = "rgb(70, 70, 70)";
    }
    if (element2) {
      element2.style.backgroundColor = "rgb(167, 167, 167)";
    }
    if (element3) {
      element3.style.color = "rgb(70, 70, 70)";
    }
    if (element4) {
      element4.style.backgroundColor = "rgb(167, 167, 167)";
    }
    if (element5) {
      element5.style.color = "rgb(70, 70, 70)";
    }
    if (element6) {
      element6.style.backgroundColor = "rgb(167, 167, 167)";
    }
    if (element7) {
      element7.style.color = "rgb(70, 70, 70)";
    }
    if (element8) {
      element8.style.backgroundColor = "rgb(167, 167, 167)";
    }
    if (element9) {
      element9.style.color = "rgb(70, 70, 70)";
    }
    if (element10) {
      element10.style.backgroundColor = "rgb(167, 167, 167)";
    }

  
    if ((!sides.side1 || !sides.side2 || !sides.side3) || (!isValidNumber(s1) || !isValidNumber(s2) || !isValidNumber(s3))) {
      setErrors(newErrors);
      
      if (!sides.side1 || !sides.side2 || !sides.side3) {
        if (element1) { 
          element1.style.color = "rgb(181, 0, 0)";
        }
        if (element2) {
            element2.style.color = "white";
            element2.style.backgroundColor = "rgb(181, 0, 0)";
        }
      }

      if ((sides.side1 && s1 <=0) || (sides.side2 && s2 <=0) || (sides.side3 && s3 <=0)) {
        if (element3) {
            element3.style.color = "rgb(181, 0, 0)";
        }
        if (element4) {
            element4.style.color = "white";
            element4.style.backgroundColor = "rgb(181, 0, 0)";
        }

        if (element5) {
            element5.style.color = "rgb(181, 0, 0)";
        }
        if (element6) {
            element6.style.color = "white";
            element6.style.backgroundColor = "rgb(181, 0, 0)";
        }
      }


      if ((sides.side1 && isNaN(s1)) || (sides.side2 && isNaN(s2)) || (sides.side3 && isNaN(s3))) {
        if (element7) {
            element7.style.color = "rgb(181, 0, 0)";
        } 
        if (element8) {
            element8.style.color = "white";
            element8.style.backgroundColor = "rgb(181, 0, 0)";
        } 

        if (element9) {
            element9.style.color = "rgb(181, 0, 0)";
        } 
        if (element10) {
            element10.style.color = "white";
            element10.style.backgroundColor = "rgb(181, 0, 0)";
        } 
      }
    

      if (errors.side1 === "" && errors.side2 === "" && errors.side3 === "") {
        const element = document.getElementById("no-input-text");
        if (element) {
            element.innerHTML = "Invalid Input";
            element.style.color = "rgb(181, 0, 0)";
        }
        
      }
      
      return;
    }

    const type = isTriangle(s1, s2, s3) ? getTriangleType(s1, s2, s3) : "Not Triangle";
    setResult(type);
  
    if (type === "Not Triangle") {
      const s = Suggestion(s1, s2, s3);
      setSuggestion(s.options ?? "");
      setDescription(s.issue);
      setTrianglePic(<div className="result-card-show" id="not-triangle">Not Triangle</div>);
    } else {
      const desp: Record<string, string> = {
        "Right Triangle": "A right triangle is a triangle in which one angle is a 90-degree angle.",
        "Equilateral Triangle": "An equilateral triangle is a triangle in which all three sides are equal.",
        "Isosceles Triangle": "An isosceles triangle is a triangle with two equal sides.",
        "Scalene Triangle": "A scalene triangle is a triangle that has three unequal sides.",
      };
  
      setDescription(desp[type] ?? "");
      setTrianglePic(displayTriangle(type, s1, s2, s3));
    }
  };

  const suggestTriangle = () => {
    setIsModalOpen(true);
  };

  return (
     <div className="container">
      <AdaptTriangleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentSides={{ side1: Number(sides.side1), side2: Number(sides.side2), side3: Number(sides.side3) }}
        currentType={result}
    />
      <div className="box">
        <div className="card">
          <div className="card-inner">
            <h1 className="heading">Enter the length of sides</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <SideInput
                sideNumber={1}
                value={sides.side1}
                onChange={handleChange}
                error={errors.side1}
              />
              <SideInput
                sideNumber={2}
                value={sides.side2}
                onChange={handleChange}
                error={errors.side2}
              />
              <SideInput
                sideNumber={3}
                value={sides.side3}
                onChange={handleChange}
                error={errors.side3}
              />

              <div className="result-zone">
                <div className="result-button-zone">
                  <button className="enter-button">
                    Enter
                  </button>
                </div>

                <div className="flex-1" id="result-container">
                  Result
                  <div className="result-box">{result}</div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="result-card">
          { result === "" ? 
          <div className="result-card-show" id="default">
            <div id="no-input-text">
              No Input
            </div>
            <div id="no-input-description">{`please type the lengths of your triangle's side`}</div>
            <div id="input-criteria">
              {criterias.map((text, index) => (
                <div key={index} id={`input-criteria-${index}`}>
                  <span className="criteria-number" id={`criteria-${index}`}>{index + 1}</span> {text}
                </div>
              ))}
            </div>
          </div>
          :
          result === "Not Triangle" ?
          <div className="result-card-show" id="not-triangle">
            <div id="not-triangle-text">Not Triangle</div>

            <div className="not-triangle-title-text">Issues :</div>
            <div className="not-triangle-body-text">{description}</div>

            <div className="not-triangle-title-text">Suggestions :</div>
            {Array.isArray(suggestion) && suggestion.map((item, index) => (
              <div key={index} className="not-triangle-body-text">
                - {item}
              </div>
            ))}
          </div>
          :
          <div className="result-card-show" id="triangle-card">
            <span id="triangle-suggestion-button-zone">
              <button onClick={suggestTriangle} className="triangle-suggestion-button">
                Suggestion
              </button>
            </span>
            
            <div id="triangle-pic">
              { trianglePic }
            </div>

            <div id="triangle-type-text">{result}</div>
            <div id="triangle-description-text">{description}</div>
          </div>
          }
        </div>
      </div>
    </div>
  );
}
