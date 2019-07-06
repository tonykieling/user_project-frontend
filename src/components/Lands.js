import React, { Component } from 'react'
import {Button, Image, Card, Table, Accordion} from 'react-bootstrap'

export default class Lands extends Component {
  render() {
    return (
      <div className="moldura">

        <h1>Home Page</h1>
        <Card className="homePage">
            <Image src={require("../img/calarge.gif")} fluid />
            {/* <img src={require("../img/calarge.gif")} alt="flag" /> */}
            <div className="ipsumText">
              <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."</p>
              <p>"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful."</p>
            </div>
        </Card>
    </div>
    )
  }
}
