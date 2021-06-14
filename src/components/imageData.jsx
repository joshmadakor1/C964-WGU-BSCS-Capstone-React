import React, { Component } from 'react';
import logo from "../images/logo.png";
import loadingImage from "../images/loading.gif";
const axios = require('axios');
// TODO: Prevent image from getting too tall
// TODO: Verify state properties before use
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
           mirrorimageurl: loadingImage
       },
       imageBlur: "0px"
    }

    image_
    

    constructor(props) {
        super();
        this.getNextImage = this.getNextImage.bind(this);
        this.resetState = this.resetState.bind(this);
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
                mirrorimageurl: loadingImage
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
        this.setState(this.state)
        //this.resetState();
        const {data} = await axios({
            method: 'get',
            url: 'https://c964-josh.azurewebsites.net/4chanraw'
          })
          console.log(data)
          this.setState({data: data,imageBlur:"30px"});
          //console.log(data)
    }

    toggleBlur = () => {
        if (this.state.imageBlur === "0px")
            this.setState({imageBlur: "30px"})
        else
            this.setState({imageBlur: "0px"})
    }

    render() { 
        
        return ( <React.Fragment>
            
            
            <div style={{marginTop: "3%"}}>
                <center><br/>
                    <img alt="Click for next" className="btn btn-link photo" src={logo} style={{height:"150px"}} onClick={this.getNextImage}/>
                </center>
            </div>
           <h1 className="display-1" style={{textAlign: "center"}}>Random Image Analyzer</h1>
           <div className="" style={{ position: "absolute", textAlign: "right", width: "100%", paddingRight:"5%", paddingTop:"5%"}}>
               <span className="btn btn-clear" style={{fontSize: "150px"}} onClick={this.getNextImage}>
                   &#62;
                </span><br/>
            </div>

           <center>Click image to un-blur. <br/>
                <font style={{color:"red", fontWeight:"bold"}}>WARNING!</font> Image may still be <font style={{color:"red", fontWeight:"bold"}}>NSFW</font> despite a "safe" analysis.<br/><br/><br/>
                </center>
            
            <div className="row" style={{width: "90%", height: "90%", paddingLeft: "15%"}}>
                <div className="col-6 col-md-4">

            {/* General Info */}
            <b>General Info</b><br/>
                <ul>
                {this.state.data.hasOwnProperty('categories') && (
                    this.state.data.categories.map(c => (
                        <li key={c.name}>
                            {c.name.replace("_"," ")} - {parseFloat(c.score * 100).toFixed(2)}%
                        </li>
                    )
                ))}</ul>
            
            {/* Adult Content */}
            <b>Adult Content</b><br/><ul>
            {(this.state.data.hasOwnProperty('adult') && this.state.data.adult.hasOwnProperty('adultScore')) && (
                <React.Fragment>
                    {this.state.data.adult.adultScore > 0.5 ? <li key={this.state.data.adult.adultScore}> <font style={{fontWeight: "bold"}}className="text-danger">Adult Content - {parseFloat(this.state.data.adult.adultScore * 100).toFixed(2)}%</font></li> : <li key={this.state.data.adult.adultScore}>Adult Content - {parseFloat(this.state.data.adult.adultScore * 100).toFixed(2)}%</li>}
                    {this.state.data.adult.racyScore > 0.5 ? <li key={this.state.data.adult.racyScore}> <font style={{fontWeight: "bold"}}className="text-danger">Sus Content - {parseFloat(this.state.data.adult.racyScore * 100).toFixed(2)}%</font></li> : <li key={this.state.data.adult.racyScore}>Sus Content - {parseFloat(this.state.data.adult.racyScore * 100).toFixed(2)}%</li>}
                    {this.state.data.adult.goreScore > 0.5 ? <li key={this.state.data.adult.goreScore}> <font style={{fontWeight: "bold"}}className="text-danger">Gore - {parseFloat(this.state.data.adult.goreScore * 100).toFixed(2)}%</font></li> : <li key={this.state.data.adult.goreScore}>Gore - {parseFloat(this.state.data.adult.goreScore * 100).toFixed(2)}%</li>}
                </React.Fragment>
            )}</ul>
            
            {/* Other Info */}
            <b>Other Info</b><br/>
            <ul>
            {(this.state.data.hasOwnProperty('description') && this.state.data.description.hasOwnProperty('captions')) && (
                this.state.data.description.captions.map( caption => (
                <li key={caption.text}>{caption.text}</li>
            )))}
            </ul>

            {/* Tags */}
            <b>Tags</b>
            <ul>
                <li style={{listStyle: "none"}}>
                    {(this.state.data.hasOwnProperty('description') && this.state.data.description.hasOwnProperty('tags')) && (
                    this.state.data.description.tags.map( tag => (
                        <span key={tag}>#{tag} </span>
                    )))}
                    {/*this.state.data.description.tags.length === 0 &&<span>None</span>*/}                
                </li>
            </ul>

            </div>

            <div className="col-12 col-sm-6 col-md-8">

            <center>
                <img alt="Random visual grabbed from 4chan.org/b/" src={this.state.data.mirrorimageurl.length > 0 && this.state.data.mirrorimageurl } onClick={this.toggleBlur} style={{width: "70%", height: "auto", filter: `blur(${this.state.imageBlur})`}} />
                </center>
            </div>
            <br/><br/>

            </div>
            </React.Fragment> );       
    }  
}

export default ImageData;