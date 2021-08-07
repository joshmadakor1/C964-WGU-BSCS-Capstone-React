import React, { Component } from 'react';
import logo from "../images/logo.png";
import loadingImage from "../images/loading.gif";
const axios = require('axios');
// TODO: Change image sizing to em?
// TODO: Make work on mobile lol
// TODO: Consider removing <li> from cards
class ImageData extends Component {
   state = {
       data: {
           categories: [],
           adult: {},
           description: {
               tags:[],
               captions:[],
               objects: []
            },
           imageurl: "",
           imagedata: "",
           mirrorimageurl: loadingImage,
           analytics: {
               "count": 0,
               "adult": 0,
               "sus": 0,
               "gore": 0,
               "nsfw": 0
           },
           aimlverdict: ""
       },
       imageBlur: "0px"
    }

   
    

    constructor(props) {
        super();
        this.getNextImage = this.getNextImage.bind(this);
        this.resetState = this.resetState.bind(this);
        this.cardStyle = {
            width: "18rem",
            fontSize: "90%"
           }
    }

    resetState() {
        let state = {
            data: {
                categories: [],
                adult: {},
                description: {
                    tags:[],
                    captions:[],
                    objects: []
                    },
                imageurl: "",
                imagedata: "",
                mirrorimageurl: loadingImage,
                analytics: {
                    "count": 0,
                    "adult": 0,
                    "sus": 0,
                    "gore": 0,
                    "nsfw": 0
                },
                aimlverdict: ""
            },
            imageBlur: "0px"
        }
        console.log("Resetting state.")
        this.setState({state})
    }

    async componentDidMount() {
        await this.getNextImage()
    }
    
    async getNextImage () {
        document.body.style.backgroundColor = "#ffe"
        //this.setState({this.state.data.imageurl: "ass"})
        this.state.data.mirrorimageurl = loadingImage;
        this.state.imageBlur = "0px";
        this.state.categories = [];
        this.state.adult = {};
        this.state.description = {tags:[], captions:[], objects: []}
        this.setState(this.state)
        //this.resetState();
        const {data} = await axios({
            method: 'get',
            url: 'https://c964-josh.azurewebsites.net/4chanraw' //http://127.0.0.1:3030/4chanraw
          })
        console.log(data)
        this.setState({data: data, imageBlur:"30px"});
        
    }

    toggleBlur = () => {
        if (this.state.imageBlur === "0px")
            this.setState({imageBlur: "30px"})
        else
            this.setState({imageBlur: "0px"})
    }

    render() { 
        
        return ( <React.Fragment>
            
            
            <div >
                <center><br/>
                    <img alt="Click for next" className="btn btn-link photo" src={logo} style={{height:"120px"}} onClick={this.getNextImage}/>
                    <br/>{/*`${this.state.data.mirrorimageurl},${(this.state.data.adult.adultScore)},${(this.state.data.adult.racyScore)},${(this.state.data.adult.goreScore)},`*/}
                </center>
            </div>
           <h1 className="display-2" style={{textAlign: "center"}}>Random Image Analyzer</h1>
           <div className="" style={{ position: "absolute", textAlign: "right", width: "100%", paddingRight:"5%", paddingTop:"5%"}}>
               <span className="btn btn-clear" style={{fontSize: "150px"}} onClick={this.getNextImage}>
                   &#62;
                </span><br/>
            </div>

           <center>Click image to un-blur. <br/>
                <font style={{color:"red", fontWeight:"bold"}}>WARNING!</font> Image may still be <font style={{color:"red", fontWeight:"bold"}}>NSFW</font> despite a "safe" analysis.<br/><br/>
                <br/>

                </center>
            
            
            <div className="row" style={{width: "90%", height: "90%", paddingLeft: "15%"}}>
                
            <div className="col-12 col-sm-6 col-md-8">

                <center>
                    <img alt="Random visual grabbed from 4chan.org/b/" src={(this.state.data.hasOwnProperty("mirrorimageurl")) && (this.state.data.mirrorimageurl.length > 0) && (this.state.data.mirrorimageurl )} onClick={this.toggleBlur} style={{maxWidth: "90%", height: "auto", filter: `blur(${this.state.imageBlur})`}} />
                </center>
            </div>
                
                <div className="col-6 col-md-4">

                    {/* Analytics */}
                    <div className="card" style={{width: "18rem", fontSize: "90%", backgroundColor: "#f0e0d6"}}>
                        <div className="card-body">
                        <h5 className="card-title">Lifetime Analytics</h5>
                            <ul style={{marginBottom: 0}}>
                            <li style={{listStyle: "none"}}>Total Images Analyzed: {(this.state.data.hasOwnProperty("analytics") && (this.state.data.analytics.count > 0)) && this.state.data.analytics.count}</li>
                            <li style={{listStyle: "none"}}>Total Clean: {(this.state.data.hasOwnProperty("analytics") && (this.state.data.analytics.count > 0)) && this.state.data.analytics.count - this.state.data.analytics.nsfw}</li>
                            <li style={{listStyle: "none"}}>Total NSFW: {((this.state.data.hasOwnProperty("analytics") && (this.state.data.analytics.count > 0)) && this.state.data.analytics.nsfw)}</li>
                            <li style={{listStyle: "none"}}>NSFW Percentage: {(this.state.data.hasOwnProperty("analytics") && (this.state.data.analytics.count > 0)) && ((this.state.data.analytics.nsfw / this.state.data.analytics.count)*100).toFixed(2)}%</li>
                            </ul>
                        </div>
                    </div>

                    {/* AI ML PREDICTION */}
                    <div className="card" style={{width: "18rem", fontSize: "90%", borderColor: "#f66d7a"}}>
                        <div className="card-body">
                        <h5 className="card-title">ML Model Prediction:</h5>
                        <ul style={{marginBottom: 0}}>
                    {(this.state.data.hasOwnProperty('aimlverdict')) && (
                        <li style={{listStyle: "none"}}>
                            {this.state.data.aimlverdict === true ? <font style={{fontWeight: "bold", fontSize: "110%", textShadow:"0 0 3px #FFFF00"}} className="text-danger">NOT SAFE FOR WORK</font> : <font style={{fontWeight: "bold", fontSize: "110%", textShadow:"0 0 3px #FFFF00"}} className="text-success">Probably Safe</font>}    
                        </li>
                    )}</ul>
                        </div>
                    </div>

                    {/* Adult Content */}
                    <div className="card" style={{width: "18rem", fontSize: "90%"}}>
                        <div className="card-body">
                        <h5 className="card-title">Cognitive Services Stats:</h5>
                        <ul style={{marginBottom: 0}}>
                    {(this.state.data.hasOwnProperty('adult') && this.state.data.adult.hasOwnProperty('adultScore')) && (
                        <React.Fragment>
                            {this.state.data.adult.adultScore > 0.5 ? <li style={{listStyle: "none"}} key={this.state.data.adult.adultScore}> <font style={{fontWeight: "bold", fontSize: "110%", textShadow:"0 0 3px #FFFF00"}} className="text-danger">Adult Content - {parseFloat(this.state.data.adult.adultScore * 100).toFixed(2)}%</font></li> : <li style={{listStyle: "none"}} key={this.state.data.adult.adultScore}>Adult Content - {parseFloat(this.state.data.adult.adultScore * 100).toFixed(2)}%</li>}
                            {this.state.data.adult.racyScore > 0.5 ? <li style={{listStyle: "none"}} key={this.state.data.adult.racyScore}> <font style={{fontWeight: "bold", fontSize: "110%", textShadow:"0 0 3px #FFFF00"}} className="text-danger">Racy Content - {parseFloat(this.state.data.adult.racyScore * 100).toFixed(2)}%</font></li> : <li style={{listStyle: "none"}} key={this.state.data.adult.racyScore}>Racy Content - {parseFloat(this.state.data.adult.racyScore * 100).toFixed(2)}%</li>}
                            {this.state.data.adult.goreScore > 0.5 ? <li style={{listStyle: "none"}} key={this.state.data.adult.goreScore}> <font style={{fontWeight: "bold", fontSize: "110%", textShadow:"0 0 3px #FFFF00"}} className="text-danger">Grotesque Content - {parseFloat(this.state.data.adult.goreScore * 100).toFixed(2)}%</font></li> : <li style={{listStyle: "none"}} key={this.state.data.adult.goreScore}>Grotesque Content - {parseFloat(this.state.data.adult.goreScore * 100).toFixed(2)}%</li>}
                        </React.Fragment>
                    )}</ul>
                        </div>
                    </div>

                    {/* General Info */}
                    <div className="card" style={this.cardStyle}>
                        <div className="card-body">
                        <h5 className="card-title">General Info</h5>
                        <ul style={{marginBottom: 0}}>
                        {this.state.data.hasOwnProperty('categories') && (
                            this.state.data.categories.map(c => (
                                <li key={c.name}>
                                    {c.name.replace("_"," ")} - {parseFloat(c.score * 100).toFixed(2)}%
                                </li>
                            )
                        ))}</ul>
                        </div>
                    </div>
                
                    {/* Other Info */}
                    <div className="card" style={this.cardStyle}>
                        <div className="card-body">
                        <h5 className="card-title">Other Info</h5>
                        <ul style={{marginBottom: 0}}>
                    {(this.state.data.hasOwnProperty('description') && this.state.data.description.hasOwnProperty('captions')) && (
                        this.state.data.description.captions.map( caption => (
                        <li key={caption.text}>{caption.text}</li>
                    )))}
                    </ul>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="card" style={this.cardStyle}>
                        <div className="card-body">
                        <h5 className="card-title">Tags</h5>
                        <ul style={{marginBottom: 0}}>
                        <li style={{listStyle: "none"}}>
                            {(this.state.data.hasOwnProperty('description') && this.state.data.description.hasOwnProperty('tags')) && (
                            this.state.data.description.tags.map( tag => (
                                <span key={tag}>#{tag} </span>
                            )))}
                            {/*this.state.data.description.tags.length === 0 &&<span>None</span>*/}                
                        </li>
                    </ul>
                        </div>
                    </div>

                    
                </div>

                
            <br/><br/>

            </div>
            </React.Fragment> );       
    }  
}

export default ImageData;