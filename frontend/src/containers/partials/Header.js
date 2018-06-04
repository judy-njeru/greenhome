import React, { Component } from 'react';
import '../../css/Headers.css';
import { NavLink } from 'react-router-dom';
import logoGreen from '../../assets/images/Logo_graent.png';
import logoWhite from '../../assets/images/LOGO_2.png';
import firebase from 'firebase';
import $ from 'jquery';



class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: '',
      open: '',
      scrolled: false
    };
    this.onStatusClick = this.onStatusClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  onStatusClick() {
    this.props.toggleMenu();
  }

  handleScroll() {
    if (window.pageYOffset === 0) {
      this.setState({ ...this.state, scrolled: false });
    } else {
      this.setState({ ...this.state, scrolled: true });
    }
  }

  handleLogout() {
    const context = this;
    const BaseURL = process.env.BASEURL || "http://localhost:3003";
    /* firebase.auth().signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });*/
    fetch(BaseURL + "/api/logout", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        'Accept':'application/json'
      }),
      credentials: 'include', // Don't forget to specify this if you need cookies
    }).then(response => {
      context.props.history.push('/');
    })
    .catch(err => {
      console.log("The error is ", err)
    });
  }

  componentDidUpdate(){
    $(".underline--style a").on("click", function(){
      $(".overlay").removeClass('open');
      $(".overlay").addClass('closed');
      $(".button_container").removeClass('active');
    });
  }

  componentDidMount() { 
    $(".button_container").on("click", function () {
      $(this).toggleClass('active');
      $('.overlay').toggleClass('open');
      $(".overlay").removeClass('closed');
    });
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const scrolled = this.state.scrolled ? 'shrink' : '';
    const logo = this.state.scrolled ? logoGreen : logoWhite;
    return (
      <div>
        <header className={scrolled}>
          <div className="container">
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-left">
                <div className="logo ">
                  <NavLink to="/">
                    <img src={logo} alt="logo"></img>
                  </NavLink>
                </div>
              </div>

              <ul className="nav navbar-right">
                <div className="burger_menu">
                  <div className={`button_container `} id="toggle" onClick={this.onStatusClick}>
                    <span className="top"></span>
                    <span className="middle"></span>
                    <span className="bottom"></span>
                  </div>

                  <div className={`overlay `} id="overlay">
                    <nav className="overlay-menu">
                      <ul>
                        <li>
                          <div className = "underline--style">
                            <NavLink to="/about-game">Ferlið</NavLink>
                          </div>
                        </li>
                        <li>
                          <div className = "underline--style"><NavLink to="/education">Upplýsingar og fróðleikur</NavLink>
                          </div>
                        </li>
                        <li>
                          <div className = "underline--style">
                            <NavLink to="/companies">Samstarfsaðilar</NavLink>
                          </div>
                        </li>
                        <li>
                          <div className = "underline--style">
                            <NavLink to="/about-us">Um okkur</NavLink>
                          </div>
                        </li>
                        <li id="login">
                          <div className = "underline--style">
                            <NavLink to="/#login_popup">Innskráning</NavLink>
                          </div>
                        </li>
                        <li id="logout">
                          <div className = "underline--style">
                            <a onClick={this.handleLogout}>Útskráning</a>
                          </div>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </ul>
            </div>
          </nav>
          </div>
        </header>
      </div>
    );
  }
}


export default Header;
