import { useState } from "react";
import questions from "./questions";

function Quiz() {
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (qid, option) => {
    setSelected({ ...selected, [qid]: option });
  };

  const handleSubmit = () => {
    let marks = 0;

    questions.forEach((q) => {
      if (selected[q.id] === q.answer) {
        marks++;
      }
    });

    setScore(marks);
    setSubmitted(true);
  };

  return (
    <div className="quiz">
      <h2>React Quiz App</h2>

      {questions.map((q) => (
        <div key={q.id} className="question-box">
          <h4>{q.id}. {q.question}</h4>

          {q.options.map((opt) => (
            <label key={opt} className="option">
              <input
                type="radio"
                name={`question-${q.id}`}
                value={opt}
                disabled={submitted}
                checked={selected[q.id] === opt}
                onChange={() => handleSelect(q.id, opt)}
              />
              {opt}
            </label>
          ))}

          {submitted && (
            <p className="answer">
              ✅ Correct Answer: <b>{q.answer}</b>
            </p>
          )}
        </div>
      ))}

      {!submitted ? (
        <button onClick={handleSubmit}>Submit Quiz</button>
      ) : (
        <h3>Your Score: {score} / {questions.length}</h3>
      )}
    </div>
  );
}

export default Quiz;
