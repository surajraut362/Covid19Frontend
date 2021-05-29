import React from 'react'
import vaccine from '../images/bg.jpg';
import {Card , Button} from 'react-bootstrap';


export default function Mycards2() {
    return (
        <div>
            <Card style={{ width: '18rem' , backgroundColor:'grey' }}>
                <Card.Img variant="top" src={vaccine} />
                <Card.Body>
                    
                    <Card.Text style={{color: 'white'}}>
                        Check out vaccination slots and dates.
    </Card.Text>
    <Button variant="warning" size="sm"> <a style={{textDecoration:'none'}}
                            href="https://www.cowin.gov.in/home"
                            className="telegram"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                             <b style={{color:'black'}}>Explore</b>
                        </a></Button>
                </Card.Body>
            </Card>
        </div>
    )
}

