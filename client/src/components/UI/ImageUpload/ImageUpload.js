import React from 'react'
const axios = require("axios");

class ImageUpload extends React.Component {
  state ={
    file: null
  };
  onFormSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    formData.append('myImage',this.state.file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    
    axios.post("/upload",formData,config).then((response) => {
      alert("The file is successfully uploaded");
    }).catch((error) => { console.log(error)})};
  
    onChange(e) {
        this.setState({file:e.target.files[0]});
    }

    render() {
        return (
            <div className="inputElementImage">
                <h4>Last opp bilde av gjenstanden </h4>
                <input type="file" name="myImage" onChange= {this.props.changed} />
            </div>
        )
    }
}

export default ImageUpload;