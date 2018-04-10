import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';

class Myform extends Component {
    render() {
        return(
            <div>
                <Form onSubmit={this.props.triggerSearch}>
                    <input type="text" name="search" id="comm" placeholder="enter repo name" />
                    <Button type="submit" id="btn">Search</Button>
                </Form>
            </div>
        )
    }
}

export default Myform;
