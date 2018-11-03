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



const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

class FetchWeather extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: null
    }
  }

  componentDidMount = () => {
    console.log("component did mount")
    axios.get("http://localhost:5000/fetch_rss")
    .then((res) => {
      console.log("res ", res)
      this.setState({data: res.data})
    })
  }

  render(){
    const { classes } = this.props
    console.log("data ", this.state.data)

    return(
      <div>
        <h3>{
          this.state.data ? this.state.data.title : null 
        } </h3>
        <div className="row" style={{display:'table',clear:'both'}}>
        
        {
         this.state.data ? this.state.data.items ? this.state.data.items.length ? 
          this.state.data.items.map((data, index) => {
            let day = data.split(":")[0]
            let weather = data.split(":")[1].split(",")[0]
            console.log("data split ", data.split(":")[1])
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
                        Min Temp:  <br />
                        Max temp: 
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
      
              
            )
          }) : null : null : null
        } 
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(FetchWeather)