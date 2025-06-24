import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import API from "../../config/axiosConfig";

export const ParticipationForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    educationLevel: "",
    mmseScore: "",
    gameChoice: "",
    consent: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      alert("Please obtain consent before continuing.");
      return;
    }

  localStorage.setItem("participantInfo", JSON.stringify(formData));
  navigate(`/lobby/${formData.gameChoice}`);

  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 text-black space-y-6">
      <header>
        <div className="flex flex-col justify-center items-center p-5">
          <h1 className="text-center text-3xl font-bold">Research Participation Form</h1>
          <p className="mt-4 text-center text-gray-600">
            This page is strictly intended for research studies aimed at improving
            our cognitive testing games. Only authorized facilitators should use this page.
          </p>
        </div>
      </header>

      <div className="p-8 bg-white rounded-lg shadow-md">
        <section className="bg-green-50 border border-green-200 p-4 rounded-md mb-10">
          <h2 className="font-semibold text-green-800 mb-2">Instructions for facilitators</h2>
          <ol className="list-decimal list-inside text-sm text-gray-800 space-y-2">
            <li>Ensure you are logged in with your registered <strong>Facilitator account</strong>.</li>
            <li>
              Ensure the participant has taken the Mini Mental State Exam (MMSE).{" "}
              <a
                href="https://mmse.neurol.ru/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 underline"
              >
                Click here if the participant has not taken the test.
              </a>
            </li>
            <li>Fill out the form below accurately.</li>
            <li>Ensure the participant feels relaxed and comfortable.</li>
            <li>Ensure the participant gives consent before proceeding to the game.</li>
          </ol>
        </section>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Participant Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter full name"
              className="w-full p-2 border rounded mt-1"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Age</label>
            <input
              name="age"
              type="number"
              placeholder="e.g. 65"
              className="w-full p-2 border rounded mt-1"
              required
              min={18}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Education Level</label>
            <select
              name="educationLevel"
              className="w-full p-2 border rounded mt-1"
              required
              onChange={handleChange}
            >
              <option value="">-- Select Education Level --</option>
              <option value="no-formal">No Formal Education</option>
              <option value="basic">Basic / Primary School</option>
              <option value="secondary">Secondary / High School</option>
              <option value="tertiary">Tertiary / University</option>
              <option value="postgraduate">Postgraduate</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Mini Mental State Examination (MMSE) Score
            </label>
            <input
              name="mmseScore"
              type="number"
              placeholder="0 - 30"
              className="w-full p-2 border rounded mt-1"
              required
              min={0}
              max={30}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Select a Game</label>
            <select
              name="gameChoice"
              className="w-full p-2 border rounded mt-1"
              required
              onChange={handleChange}
            >
              <option value="">-- Choose Game --</option>
              <option value="stroop">Stroop</option>
              <option value="guess-what">Guess What?</option>
            </select>
          </div>

          <label className="flex items-start gap-2 text-sm mt-2">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="mt-1"
            />
            I voluntarily agree to participate in this academic research study.
            I understand my data will be used for research purposes only.
          </label>

          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold p-2 rounded hover:bg-green-800 disabled:opacity-50"
            disabled={!formData.consent}
          >
            Continue to Game
          </button>
        </form>
      </div>
    </div>
  );
};
