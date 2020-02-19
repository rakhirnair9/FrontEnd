import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
//import "font-awesome/css/font-awesome.min.css";
import axios from "axios";

class App extends React.Component {
  state = {
    question1: null,
    answer1: null,
    question2: null,
    answer2: [],
    question3: null,
    answer3: [],
    question4: null,
    answer4: null,
    btnclass: "specialcls"
  };
  GetItemsFromAPI = () => {
    if (this.state.question1 == null) {
      this.setState({
        btnclass: "specialclsdisable"
      });

      axios
        .get("http://localhost:44362/api/starwars/getlongestopeningcrawlmovie")
        .then(response => {
          this.setState({
            question1:
              "Which of all Star Wars movies has the longest opening crawl?",
            answer1: response.data
          });
        })
        .catch(function(error) {
          console.log(error);
        });

      axios
        .get("http://localhost:44362/api/starwars/GetMostCharacterInFilms")
        .then(response => {
          const items = response.data;
          const listItems = items.map(item => (
            <div className="item-name">{item.person_name}</div>
          ));
          this.setState({
            question2:
              "What character (person) appeared in most of the Star Wars films?",
            answer2: listItems
          });
        })
        .catch(function(error) {
          console.log(error);
        });

      axios
        .get("http://localhost:44362/api/starwars/GetMostSpeciesInFilms")
        .then(response => {
          const items = response.data;
          const listItems = items.map(item => (
            <div className="item-name">
              {item.species_name} ({item.character_count})
            </div>
          ));
          this.setState({
            question3:
              "What species appeared in the most  number of Star Wars films?",

            answer3: listItems
          });
        })
        .catch(function(error) {
          console.log(error);
        });

      this.setState({
        question4:
          "What planet in Star Wars universe provided largest number of vehicle pilots?"
      });
    } else {
      this.setState({
        question1: null,
        answer1: null,
        question2: null,
        answer2: [],
        question3: null,
        answer3: [],
        question4: null,
        answer4: null,
        btnclass: "specialcls"
      });
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"
            }
            height="420"
            width="420"
            alt="logo"
          />

          <button
            className={this.state.btnclass}
            onClick={this.GetItemsFromAPI}
          >
            <i className="fas fa-star"></i> Do. Or do not. There is no try{" "}
            <i className="fas fa-star"></i>
          </button>

          <div className="question1cls">{this.state.question1}</div>
          <div className="answercls">{this.state.answer1}</div>
          <div className="question1cls">{this.state.question2}</div>
          <div className="answercls">{this.state.answer2}</div>
          <div className="question1cls">{this.state.question3}</div>
          <div className="answercls">{this.state.answer3}</div>
          <div className="question1cls">{this.state.question4}</div>
          <div className="answercls">{this.state.answer4}</div>
        </header>
      </div>
    );
  }
}

export default App;
