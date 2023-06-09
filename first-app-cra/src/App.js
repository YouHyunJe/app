import logo from './logo.svg';
import './App.css';
import React from 'react';
import Title from './components/title';

const jsonLocalStorage = {
  setItem: (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
      return JSON.parse(localStorage.getItem(key));
  }
}

const Form = ({updateMainFood}) => {
  const [value, setValue] = React.useState("");
  const hangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);
  const [errorMessage, setErrorMessage] = React.useState("");

  function handleInputChange(data) {
      const userValue = data.target.value;
      console.log(hangul(userValue));

      if(hangul(userValue)) {
          setErrorMessage("한글은 입력할 수 없습니다.");
      }else {
          setErrorMessage("");
      }

      setValue(userValue.toUpperCase());
  }

  // 빈 값인 상태에서 추가 버튼을 클릭하면, 에러 메세지 출력
  function handleFormSubmit(e) {
      e.preventDefault();
      setErrorMessage("");

      if(value === "") {
          setErrorMessage("빈 값으로 추가할 수 없습니다.");
          return;
      }
      updateMainFood();
  }

  return (
      <form onSubmit={handleFormSubmit}>
          <input type="text" name="name" placeholder="상품명을 입력하세요" onChange={handleInputChange} value={value} />
          <button type="submit">추가</button>
          <div style={{color: "#f00"}}>{errorMessage}</div>
      </form>
  );
}

const MainCard = ({img, onHandleHeartClick}) => {
  return (
      <div className="main-card">
          <img src={img} alt="올리브오일" width="400" />
          <button onClick={onHandleHeartClick}>🤍</button>
      </div>
  );
}

function Favorites({favorites}) {
  return (
      <ul className="favorites">
          {favorites.map(food => (<FoodItem img={food} key={food} />))}
      </ul>
  );
}

function FoodItem(props) {
  return (
      <li>
          <img src={props.img} alt={props.title} style={{width: "150px", height: "100px", backgroundSize: "contain"}} />
      </li>
  );
}

// [리액트를 이용하여 추가] =====================================
// 추가할 위치 지정 : .food-li-insert
const foodLiInsert = document.querySelector('#food-li-insert');

const App = () => {
  const foodOne = "img/food-one.jpg";
  const foodTwo = "img/food-two.jpg";
  const foodThree = "img/food-three.jpg";
  const [mainFood, setMainFood] = React.useState(foodOne);
  const [favorites, setFavorites] = React.useState(jsonLocalStorage.getItem("favorites") || []);
  const [counter, setCounter] = React.useState(jsonLocalStorage.getItem("counter"));

  function updateMainFood() {
      setMainFood(foodThree);
      // counter 값 웹 브라우저에 저장
      const nextCount = counter + 1;
      setCounter(nextCount);
      jsonLocalStorage.setItem("counter", nextCount);
  }

  function handleHeartClick() {
      const nextFavorites = [...favorites, mainFood];
      setFavorites(nextFavorites);
      jsonLocalStorage.setItem("favorites", nextFavorites);
  }

  return (
      <div>
          <Title>빌드완료 : 페이지 {counter}</Title>
          <Form updateMainFood={updateMainFood} />
          <MainCard img={mainFood} onHandleHeartClick={handleHeartClick} />
          <Favorites favorites={favorites} />
      </div>
  )
}

export default App;
