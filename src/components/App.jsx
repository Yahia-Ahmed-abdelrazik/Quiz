import { useEffect, useReducer } from "react";
import Header from "./Header";
import MainComponant from "./MainComponant";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";

const initialState = {
  questions: [],

  // 'loding'  'error'  'ready'   'active'  'finished'
  status: "loding",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    default:
      throw new Error("Action is unkonwn");
  }
}

function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length;

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <MainComponant>
        {status === "loding" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Questions
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </MainComponant>
    </div>
  );
}

export default App;
