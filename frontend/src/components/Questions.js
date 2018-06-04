import React, { Component } from 'react';
import '../css/Question.css';
import '../css/Home.css';
import Login from './partials/Login';
import Question from './partials/Question';
import Choice from './partials/Choice';
import $ from 'jquery';
import * as actions from '../actions/actions';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

class Questions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      login:false
    };
    this.getNextQuestion = this.getNextQuestion.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.postChecklist = this.postChecklist.bind(this);
  }

  componentDidMount(){
    this.props.actions.getQuestions();
    this.props.actions.getChoices();
    this.props.actions.getChecklist();

    $(document).ready(function(){
      /*! Fades in page on load */
      $('#quiz_page').css('display', 'none');
      $('#quiz_page').fadeIn(1200);
    });
  }

  componentWillMount(){
    document.body.id= "quiz_page";
    $(document).ready(function(){
      //toggle view of up and down button
      $('.view_more').click(function(){
        $('.view_up').css("opacity", "1");
        $(this).addClass("not_active");
        $('.view_up').removeClass("not_active");
        $('.label_wrap').css("transform","translate(0,-480px)");
      });

      $('.view_up').click(function(){
        $(this).css("opacity", "0.4");
        $(this).addClass("not_active");
        $('.view_more').removeClass("not_active");
        $('.label_wrap').css("transform","translate(0)");
      });
    });
  }

  getNextQuestion() {
    if (this.state.currentQuestion === this.props.questions.length-1  && !this.state.login) {
      // if user is logged then submit
      if(firebase.auth().currentUser) {
        this.handleSubmit();
      } else {
        this.setState({login:true});
      }
      return;
    }
    const currQuest = { currentQuestion: this.state.currentQuestion + 1 };
    let curentQuestion = currQuest.currentQuestion;
    if(curentQuestion === 1) {
      $('#quiz_page').addClass('BG_1');
      $('.luminance-target').addClass('mask_position');
    }
    else if(curentQuestion === 2) {
      $('#quiz_page').removeClass('BG_1');
      $('#quiz_page').addClass('BG_2');
    }
    else if(curentQuestion === 3) {
      $('#quiz_page').removeClass('BG_2');
      $('#quiz_page').addClass('BG_3');
    }

    if(currQuest.currentQuestion === this.props.questions.length) {
      this.handleSubmit();
    }
    else {
      this.setState(currQuest);
    }
  }

  handleSubmit() {
    // if(firebase.auth().currentUser) {
      // console.log(firebase.auth().currentUser)
    //  this.setState({login:true});
    // }

    const choicesValue = this.props.choices;
    const unSelectedChoices = choicesValue.filter((choice)=> {
      return !choice.value;
    });

    this.props.actions.postChoices(unSelectedChoices, err => {
      if (!err) {
        this.props.history.push('/loader')
      }
    });
    // this.postChecklist(unSelectedChoices);
  }

  /*postChecklist(unSelectedChoices) {
    const data = {};
    data.unSelectedChoices = unSelectedChoices;
    data.userID = this.props.profileData.user ? this.props.profileData.user.uid : null;
    // const url = "https://graent-heimili-backend.herokuapp.com/api/userchoices";
    const BaseURL = process.env.BASEURL || "http://localhost:3003";    
    const urlPath = "/api/userchoices";
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append('Accept','application/json');
    fetch(BaseURL + urlPath, {
      headers: headers,
      method: "POST",
      body: JSON.stringify(data),
    })
    .then(response =>
      response.json()
    )
    .then(response => {
      // this.props.history.push('/loader')
    })
    .then(response => {
      console.log(response)
      if (this.props.profileData.user) {
        this.props.history.push('/loader')
    } else {
        return false;
    }
      // this.props.profileData.user ? this.props.history.push('/checklist') : false;
    })
    .catch( err => {
      console.log("The error is ", err);
      // receiveChecklist([]);
    });
  }*/

  onClick(e) {
  let  clickedItems= [];
    // e.target.value;
    let clickedItem = e.target.value;
    // console.log(e.target.value);
    clickedItems.push(clickedItem);
  }

  render() {
    const { questions } = this.props;
    let { choices } = this.props;
    choices = choices.filter(choice => choice.questionID === this.state.currentQuestion+1);
    const isAChoiceSelected = choices.some(choice => choice.value);

   const bannerImages = [
      {
        type: "Image_one",
        image: require("../assets/images/bottles.jpg")
      },
      {
        type: "Image_two",
        image: require("../assets/images/cleaning.jpg")
      },
      {
        type: "Image_three",
        image: require("../assets/images/hygiene.jpg")
      },
      {
        type: "Image_four",
        image: require("../assets/images/environment.jpg")
      },
    ];

    return (
      <div>
        {this.state.login && <div className="row start-button">
          <Login destination="/loader" history={this.props.history} action={this.handleSubmit}/>
        </div>}
        <div className="container">
          <div className="row">
          <div className="luminance-mask">
               <img className="target luminance-target" src={bannerImages[this.state.currentQuestion].image} alt="banner mask"></img>
             </div>
          </div>
        </div>
        <div className="container choice_content" style={{position:"inherit" }}>
          <div className="row equal" >
            <Question
              currentQuestion={this.state.currentQuestion}
              totalQuestions={questions.length}
              question={questions[this.state.currentQuestion]}
            />


            <div className="col-lg-6 col-lg-offset-1 col-sm-12 col-md-6 choice_selection">
              <div className="wrapper" style={{width: '100%'}}>
                <div className="content_wrapper">
                  {
                    choices.map((choice, i) =>
                      <Choice key={i} choice={choice} onToggle={this.props.actions.toggleChoice}/>
                    )
                  }
                </div>
              </div>
            </div>
            <div className="col-lg-1 col-md-1 up-down-arrows">
              <div style={{right:"0%", position:"absolute", top:"38%"}}>
                <button className="view_up"><i className="up"></i></button>
                <button className="view_more"><i className="down"></i></button>
              </div>
            </div>
          </div>
        </div>
        <div className="mb_quiz_tip">
            <Question
              question={questions[this.state.currentQuestion]}
            />
          </div>
          { isAChoiceSelected &&
            <a className="play-button-outer" style={{ display: "block" }} id="next_question" onClick={this.getNextQuestion}>
              <div className="play-button">
                <p className="button_text">ÁFRAM</p>
              </div>
            </a>
          }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    questions: state.questions.questions,
    choices: state.choices.choices,
    checklist: state.checklist.checklist,
    profileData: state.user.profileData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
