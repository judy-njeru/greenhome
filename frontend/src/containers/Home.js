import React, { Component } from 'react';
import '../css/Home.css';
import Login from '../components/partials/Login';
import homeBanner from '../assets/images/home-banner.jpeg';
import $ from 'jquery';


class Home extends Component {

  componentWillMount() {
    document.body.id= "homepage";

    function handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    const baseUrl = process.env.BASEURL || 'http://localhost:3003';
    const pathPrefix = '/api';
    fetch(baseUrl + pathPrefix + "/profile", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        'Accept':'application/json'
      }),
      credentials: 'include', // Don't forget to specify this if you need cookies
    })
    .then(handleErrors)
    .then(response =>
      response.json()
    )
    .then(response => {
      if (response.userQuestionsAnswered == '1')
        this.props.history.push('checklist');
      else
        this.props.history.push('questions');
    })
    .catch(err => {
      console.log("The error is ", err)
    });
  }

  componentDidMount(){
    $(document).ready(function(){
      /*! Fades in page on load */
      $('#homepage').css('display', 'none');
      $('#homepage').fadeIn(1200);
    });
    
    $('body').removeClass('BG_3');
    $('body').removeClass('BG_2');
    $('body').removeClass('BG_1');
  }

  componentDidUpdate(){

  }
 
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
             <div className="luminance-mask">
               <img className="target luminance-target" src={homeBanner} alt="banner mask"></img>
             </div>
             <div className="row banner-headline">
               <div className="col-xl-10 col-lg-10 col-md-11 headline_text">
                 <h1>Vilt þú gera heimilið þitt umhverfisvænt?</h1>
               </div>
             </div>
             <div className="row support-text">
               <div className="col-xl-5 col-lg-5 col-md-6">
                 <h3>
                  Svaraðu nokkrum spurningum og við útbúum persónulegan tékklista fyrir þig
                 </h3>
               </div>
             </div>
             <div className="row start-button">
               <div className="col-7 col-md-6">
                 <div>
                   <a className="next_button btn-lg" href="#login_popup">Byrjaðu núna</a>
                 </div>

                 <Login destination="/questions" history={this.props.history}/>
               </div>
             </div>
           </div>
        </div>
      </div>
    );
  }
}



export default Home;
