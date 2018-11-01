import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


function xmlToJson(xml){
  // Create the return object
  let obj = {};

  if (xml.nodeType === 1) { // element
    // do attributes
    if (xml.attributes.length > 0) {
      obj['@attributes'] = {};
      for (let j = 0; j < xml.attributes.length; j += 1) {
        const attribute = xml.attributes.item(j);
        obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType === 3) { // text
    obj = xml.nodeValue;
  }

  // do children
  // If just one text node inside
  if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
    obj = xml.childNodes[0].nodeValue;
  } else if (xml.hasChildNodes()) {
    for (let i = 0; i < xml.childNodes.length; i += 1) {
      const item = xml.childNodes.item(i);
      const nodeName = item.nodeName;
      if (typeof (obj[nodeName]) === 'undefined') {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof (obj[nodeName].push) === 'undefined') {
          const old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj
}

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

class ImageDetails extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: null
    }
  }

  componentDidMount = () => {
    axios.get("https://weather-broker-cdn.api.bbci.co.uk/en/forecast/rss/3day/1276128")
    .then((res) => {
      var parser = new DOMParser();
      var xml = parser.parseFromString(res.data, "text/xml")
      this.setState({data: xmlToJson(xml)})
    })
  }

  
  render(){
    const { classes } = this.props
    console.log("data ", this.state.data ? this.state.data.rss : null )
    let rss = this.state.data ? this.state.data.rss ? this.state.data.rss.channel : null : null 
    if(rss){
      var item = rss ? rss.item : null
    }
    return(
      <div>
        <h3>{
          this.state.data ? this.state.data.rss ? this.state.data.rss.channel ?
          this.state.data.rss.channel.title : null : null : null       
        } </h3>
        <div className="row" style={{display:'table',clear:'both'}}>
        
        {
          item ? item.length ? item.map((data, index) => {
            let day = data.title.split(":")[0]
            let weather = data.title.split(",")[0] ? 
              data.title.split(",")[0].includes("Sunny") ? 
              './sunny.jpg' :  
              data.title.split(",")[0].includes("Mist") ? './mist.jpg' :
              data.title.split(",")[0].includes("Clear Sky") ? './clear_sky.jpg' :
              null : null
              let temp = data.title.split(",")
            if(temp[1].includes("Minimum Temperature")){
              var min_temp = temp[1].split(":")[1].split(")")[0]
              var max_temp = temp[1].split(":")[2]
            }
            return (   
              <div style={{float:'left',width:'30%',margin:'10px',height:'300px'}} key={index}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={weather}
                      title={day}
                    />  
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {day}
                      </Typography>
                      <Typography component="p">
                        Min Temp: {min_temp}) <br />
                        Max temp: {max_temp}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
      
              
            )
          }) : null : null
        }
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(ImageDetails)