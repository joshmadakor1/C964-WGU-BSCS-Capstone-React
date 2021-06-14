import React, { Component } from 'react';
import logo from "../images/logo.png";
const axios = require('axios');
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
           mirrorimageurl: ""
       },
       imageBlur: "30px"
    }

    image_
    


    async componentDidMount() {
        document.body.style.backgroundColor = "#ffe"
        const {data} = await axios({
            method: 'get',
            url: 'https://c964-josh.azurewebsites.net/4chanraw'
          })
          this.setState({data});
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
                    <img className="btn btn-link photo" src={logo} style={{height:"150px"}} onClick={() => { window.location.reload()}}/>
                </center>
            </div>
           <h1 className="display-1" style={{textAlign: "center"}}>Random Image Analyzer</h1>
           <center>Click image to un-blur. <br/>
                <font style={{color:"red", fontWeight:"bold"}}>WARNING!</font> Image may still be <font style={{color:"red", fontWeight:"bold"}}>NSFW</font> despite a "safe" analysis.<br/><br/><br/>
                </center>
            <div className="row" style={{width: "90%", height: "90%", paddingLeft: "15%"}}>
                <div className="col-6 col-md-4">
            <b>General Info</b><br/>
                <ul>
                {this.state.data.hasOwnProperty('categories') && this.state.data.categories.map(c => (
                <li key={c.name}>{c.name.replace("_"," ")} - {parseFloat(c.score * 100).toFixed(2)}%</li>
                
            ))}</ul>

        <b>Adult Content</b><br/>
            {this.state.data.hasOwnProperty('adult') && (
                <ul>
                    {this.state.data.adult.adultScore > 0.5 ? <li key={this.state.data.adult.adultScore}> <font style={{fontWeight: "bold"}}className="text-danger">Adult Content - {parseFloat(this.state.data.adult.adultScore * 100).toFixed(2)}%</font></li> : <li key={this.state.data.adult.adultScore}>Adult Content - {parseFloat(this.state.data.adult.adultScore * 100).toFixed(2)}%</li>}
                    {this.state.data.adult.racyScore > 0.5 ? <li key={this.state.data.adult.racyScore}> <font style={{fontWeight: "bold"}}className="text-danger">Sus Content - {parseFloat(this.state.data.adult.racyScore * 100).toFixed(2)}%</font></li> : <li key={this.state.data.adult.racyScore}>Sus Content - {parseFloat(this.state.data.adult.racyScore * 100).toFixed(2)}%</li>}
                    {this.state.data.adult.goreScore > 0.5 ? <li key={this.state.data.adult.goreScore}> <font style={{fontWeight: "bold"}}className="text-danger">Gore - {parseFloat(this.state.data.adult.goreScore * 100).toFixed(2)}%</font></li> : <li key={this.state.data.adult.goreScore}>Gore - {parseFloat(this.state.data.adult.goreScore * 100).toFixed(2)}%</li>}
                </ul>
            )}
            
            <b>Other Info</b><br/>
            <ul>
            {this.state.data.description.captions.map( caption => (
                <li key={caption.text}>{caption.text}</li>
            ))}
</ul>
            <b>Tags: </b>
            <ul>
                <li>
            {this.state.data.description.hasOwnProperty('tags') &&
            this.state.data.description.tags.map( tag => (
                <span key={tag}>#{tag} </span>
            ))}
            {this.state.data.description.tags.length === 0 &&<span>None</span>}                
            </li></ul>
                </div>
                <div className="col-12 col-sm-6 col-md-8">

                <center>
                    <img src={this.state.data.mirrorimageurl.length > 0 && this.state.data.mirrorimageurl } onClick={this.toggleBlur} style={{width: "70%", height: "auto", filter: `blur(${this.state.imageBlur})`}} /></center></div>
                <br/><br/>

            </div>



            </React.Fragment> );


            
    }

  
}



 
export default ImageData;