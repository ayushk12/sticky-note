import React, { Component, Fragment } from 'react';
import { Form, Button, Input, Grid } from 'semantic-ui-react';

import noteService from '../services/noteService';

class NewNote extends Component {
    state = {
        title: '',
        description: '',
        file: null
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleFile = e => {
        const file = e.target.files[0];
        this.setState({ file });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { title, description } = this.state;

        const data = {
            title,
            description
        };
        let res;
        if (this.state.file) {
            const formData = new FormData();
            formData.append('file', this.state.file);
            formData.append('data', JSON.stringify(data));
            res = await noteService.addNote(formData);
        } else {
            res = await noteService.addNote(data);
        }

        this.props.history.push('/');
    };

    render() {
        const { title, description, file } = this.state;
        return (
            <Grid container>
                <Grid.Column>
                    <Button
                        icon="arrow left"
                        size="huge"
                        onClick={() => this.props.history.goBack()}
                    />
                </Grid.Column>
                <Form size="big" style={{ width: '70%', margin: '0 auto' }}>
                    <Form.Input
                        label="Title"
                        name="title"
                        value={title}
                        onChange={this.handleChange}
                        placeholder="Enter title for your note"
                    />
                    <Form.TextArea
                        label="Description"
                        name="description"
                        value={description}
                        onChange={this.handleChange}
                        placeholder="Write some description about your note"
                        rows={10}
                    />
                    <Input
                        type="file"
                        name="file"
                        onChange={this.handleFile}
                        size="mini"
                    />
                    <Button
                        type="submit"
                        onClick={this.handleSubmit}
                        inverted
                        color="blue"
                        floated="right"
                    >
                        Add Note
                    </Button>
                </Form>
            </Grid>
        );
    }
}

export default NewNote;
