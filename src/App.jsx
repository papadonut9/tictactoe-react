import React, { useState } from "react";
import Icon from "./components/Icon";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Card,
  CardBody,
  Container,
  Button,
  Col,
  Row,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

const winCombos = [

  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]


// // Implementing memoization
// function generateWinCombos() {
//   const cache = new Map();

//   function calculateWinCombos(n) {
//     if (cache.has(n)) {
//       return cache.get(n);
//     }

//     const combos = [];
//     // generate win combos here
//     cache.set(n, combos);
//     return combos;
//   }

//   return calculateWinCombos;
// }

// const getWinCombos = generateWinCombos();
// const winCombos = getWinCombos(3);

const itemArray = new Array(9).fill("empty");

const App = () => {
  const [isCross, setIsCross] = useState(true);
  const [winMsg, setWinMsg] = useState("");
  const [circleScore, setCircleScore] = useState(0);
  const [crossScore, setCrossScore] = useState(0);

  const reloadGame = () => {
    setIsCross(false);
    setWinMsg("");
    itemArray.fill("empty", 0, 9);
  };

  const newGame = () => {
    reloadGame()
    setCircleScore(0)
    setCrossScore(0)
  }

  

  const checkIsWinner = () => {
    for (let i = 0; i < winCombos.length; i++) {
      const [a, b, c] = winCombos[i];
      if (
        itemArray[a] !== "empty" &&
        itemArray[a] === itemArray[b] &&
        itemArray[b] === itemArray[c]
      ) {
        if (itemArray[a] === "circle") {
          setWinMsg("Circle Wins!");
          setCircleScore(circleScore + 1);
        } else {
          setWinMsg("Cross Wins!");
          setCrossScore(crossScore + 1);
        }
        return;
      }
    }

    // Draw condition
    if (itemArray.every((item) => item !== "empty")) {
      setWinMsg("It's a Draw!!");
    }
  };

  const changeItem = (itemNumber) => {
    if (winMsg) return toast(winMsg, { type: "success", theme: "dark" });

    if (itemArray[itemNumber] === "empty") {
      itemArray[itemNumber] = isCross ? "cross" : "circle";
      setIsCross(!isCross);
      checkIsWinner();
    } else return toast("Already filled", { type: "error" });
  };

  return (
    <Container className="p-5">
      <ToastContainer position="bottom-right" />
      <Row>
        <Col md={6} className="offset-md-3">
          {winMsg ? (
            <div className="mb-2 mt-2">
              <h1 className="text-success text-uppercase text-center">
                {winMsg}
              </h1>
              <Button color="success" block onClick={reloadGame}>
                Reload
              </Button>
            </div>
          ) : (
            <div>
              <div className="text-center text-secondary">
                <h3>Score</h3>
                <div className="scoreboard">
                  <div className="score">
                    <p className="player">Circle</p>
                    <p className="score-value">{circleScore}</p>
                  </div>
                  <div className="score">
                    <p className="player">Cross</p>
                    <p className="score-value">{crossScore}</p>
                  </div>
                </div>
              </div>
              <h1 className="text-center text-warning">
                {isCross ? "Cross's" : "Circle's"} turn
              </h1>
            </div>
          )}
          <div className="grid">
            {itemArray.map((item, index) => (
              <Card
                onClick={() => changeItem(index)}
                color="dark"
                key={index}
              >
                <CardBody className="box text-secondary">
                  <Icon name={item} />
                </CardBody>
              </Card>
            ))}
          </div>
          <Button
            color="danger"
            block
            onClick={reloadGame}
            className="mb-2 mt-4"
          >
            Reset
          </Button>

          <Button
            color="success"
            block
            onClick={newGame}
            className="mb-2 mt-1"
          >
            New Game
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default App;