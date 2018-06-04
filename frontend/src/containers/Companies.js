import React, { Component } from 'react';
import CompaniesPortrait from './CompaniesPortrait';
import sorpa from '../assets/images/sorpa_logo.jpg';
import umhverfisstofnun from '../assets/images/umhverfisstofnun.jpg';
import endurvinnslan from '../assets/images/endurvinnslan.jpg';
import vefskolinn from '../assets/images/vefskolinn.jpg';
import homeBanner from '../assets/images/home-banner.jpeg';
import '../css/AboutUs.css';

export default class Companies extends Component {
  render() {
    return (
        <div id="aboutpage">
            <div className="container">
                <div className="row">
                    <div className="luminance-mask">
                        <img className="target luminance-target" src={homeBanner} alt="banner mask"></img>
                    </div>
                    <div className="col-md-12">
                        <div className="umOkkur">Samstarfsaðilar</div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <CompaniesPortrait image={sorpa} name={"Sorpa"} fullName={"Sorpa"} text={"Hlutverk SORPU er að annast meðhöndlun úrgangs fyrir öll sveitarfélögin sem aðild eiga að SORPU, svo sem að starfrækja urðunarstað og móttökustöð, byggja og reka endurvinnslu stöðvar, þróa nýjar aðferðir til að vinna verðmæti úr úrgangsefnum, eyðingu hættulegra úrgangsefna, framleiða og selja eldsneyti og orku úr úrgangi, fylgjast með tækniþróun á sviði úrgangseyðingar og endurvinnslu, gerð svæðisáætlunar sbr. lagakröfu hverju sinni og kynna gildi umhverfissjónarmiða í meðhöndlun úrgangs."}/>                    
                    <CompaniesPortrait image={umhverfisstofnun} name={"Umhverfisstofnun"} fullName={"Umhverfisstofnun"} text={"Hlutverk Umhverfisstofnunar er að stuðla að velferð almennings með því að beita sér fyrir heilnæmu umhverfi, öruggum neysluvörum og verndun og sjálfbærri nýtingu náttúruauðlinda."}/>
                    <CompaniesPortrait image={endurvinnslan} name={"Endurvinnslan"} fullName={"Endurvinnslan"} text={"Endurvinnslan hf. var stofnuð árið 1989, ástæða stofnunar félagsins var náttúru- og umhverfisvernd. Framlag Endurvinnslunnar til umhverfisverndar er verulegt því vegna skilagjaldsins eru einnota drykkjarumbúðir ekki lengur rusl sem liggur á víðavangi heldur endurvinnanleg verðmæti sem margir hafa fjárhagslegan hag af."}/>
                    <CompaniesPortrait image={vefskolinn} name={"Vefskólinn"} fullName={"Vefskólinn"} text={"Tækniskólinn býður uppá tveggja ára nám í vefþróun með áherslu á viðmótsforritun. Námi í vefþróun er ætlað að svara aukinni þörf atvinnulífsins á vef- og viðmótsforriturum. Menntun á sviði vefþróunar krefst sífellt meiri sérhæfingar og með þessu námi gefst kostur á sérsniðinni námsleið í viðmóti, notendaupplifun og forritun veflausna."}/>
                </div>  	
            </div>
        </div>
    );
  }
}
