import React, { Component } from 'react';
import * as actions from '../../actions/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';

class ChecklistStep extends Component {

  constructor(props) {
    super(props);
    this.goToChecklist = this.goToChecklist.bind(this);
  }

    arrayBufferToBase64(ab){
        var dView = new Uint8Array(ab);   //Get a byte view
        var arr = Array.prototype.slice.call(dView); //Create a normal array
        var arr1 = arr.map(function(item){
          return String.fromCharCode(item);    //Convert
        });
        return window.btoa(arr1.join(''));   //Form a string
    }

    makeDataURL = (checklist_step) => {
        if ( !checklist_step ) {
            return;
        }
        return "data:image/png;base64, " + this.arrayBufferToBase64( checklist_step.checklistImage.data );
    }

    componentWillReceiveProps(props) {
        this.dataURL = this.makeDataURL(props.checklist_step);
    }

    goToChecklist(currentStep) {
        this.props.setCurrentStep(currentStep - 1);
        this.props.history.push('/checklist');

        if(currentStep === 1) {
            $('#checklist').removeClass('bg_1');
            $('#checklist').removeClass('bg_2');
            $('#checklist').removeClass('bg_3');
            $('#checklist').removeClass('bg_4'); 
        }
        else if(currentStep === 2) {
            $('#checklist').addClass('bg_1');
            $('#checklist').removeClass('bg_2');
            $('#checklist').removeClass('bg_3');
            $('#checklist').removeClass('bg_4'); 
        }
        else if(currentStep === 3) {
            $('#checklist').addClass('bg_2');
            $('#checklist').removeClass('bg_3');
            $('#checklist').removeClass('bg_4');
            $('#checklist').removeClass('bg_1'); 
        }
      
        else if(currentStep=== 4) {
            $('#checklist').addClass('bg_3');
            $('#checklist').removeClass('bg_1');
            $('#checklist').removeClass('bg_2');
            $('#checklist').removeClass('bg_4'); 
        }
        else if(currentStep=== 5) {
            $('#checklist').addClass('bg_4');
            $('#checklist').removeClass('bg_1');
            $('#checklist').removeClass('bg_2');
            $('#checklist').removeClass('bg_3'); 
        }
    }

    render() {
        const { totalSteps, checklist_step } = this.props;
        let { currentStep } = this.props;
        currentStep = currentStep + 1;

        return (
            <div className="col-4 col-sm-12 col-md-5">
                <p className="checklist_step">
                    Skref {currentStep} af {totalSteps}
                </p>
                <p className="checklist_step_text">
                  Þú getur hoppað á milli skrefa hér
                </p>
                <div className="checklist_progress">
                    <div className={"hl stepone " + (currentStep >= 1 ? 'complete ' : 'not_complete')} onClick={()=>this.goToChecklist(1)}></div>
                    <div className={"hl steptwo " + (currentStep >= 2 ? 'complete' : 'not_complete')} onClick={()=>this.goToChecklist(2)}></div>
                    <div className={"hl stepthree " + (currentStep >= 3 ? 'complete' : 'not_complete')} onClick={()=>this.goToChecklist(3)}></div>
                    <div className={"hl stepfour " + (currentStep >= 4 ? 'complete' : 'not_complete')} onClick={()=>this.goToChecklist(4)}></div>
                    <div className={"hl stepfive " + (currentStep >= 5 ? 'complete' : 'not_complete')} onClick={()=>this.goToChecklist(5)}></div>
                </div>
                <h1 className="checklist_name">
                    { checklist_step && checklist_step.checklistName }
                </h1>
                <p className="checklist_info">
                    { checklist_step && checklist_step.checklistInfo }
                </p>
                <div className="photoChecklist">
                    <div className="side">
                        <img src={this.dataURL} alt="home"/>
                    </div>
                    <div className="side back" id="backside">Hægt er að kaupa ýmiskonar stærðir af tunnum í <strong>IKEA </strong>og í <strong> Rúmfatalagernum</strong>.
                        IKEA er einnig með góðar lausnir fyrir flokkun í lítið rými eins og undir vaska eða í lítilli geymslu.
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      current_step: state.current_step.current_step
    }
  }

const mapDispatchToProps = dispatch => {
    return {
      actions: bindActionCreators(actions, dispatch),
      setCurrentStep: step =>  dispatch(actions.CurrentStep(step) )
    }
}


export default connect( mapStateToProps, mapDispatchToProps )(ChecklistStep);
  