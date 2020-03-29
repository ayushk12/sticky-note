import React, { Component, Fragment } from 'react';
import { Form, Button, Input, Grid, Image } from 'semantic-ui-react';

import noteService from '../services/noteService';
import { STATIC_URL } from '../config';

class EditNote extends Component {
    state = {
        title: '',
        description: '',
        file: null,
        fileChanged: false
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleFile = e => {
        const file = e.target.files[0];
        this.setState({ file, fileChanged: true });
    };

    handleSubmit = async e => {
        e.preventDefault();

        const { title, description } = this.state;
        const { _id, user } = this.props.location.state.note;

        const data = {
            title,
            description,
            user,
            id: _id
        };

        if (this.state.fileChanged && this.state.file) {
            const formData = new FormData();
            formData.append('file', this.state.file);
            formData.append('data', JSON.stringify(data));
            await noteService.editNote(formData);
        } else {
            await noteService.editNote(data);
        }

        this.props.history.push('/');
    };

    populateState = ({ title, description, file = null }) => {
        this.setState({
            title,
            description,
            file
        });
    };

    componentDidMount() {
        const { note } = this.props.location.state;
        console.log('note', note);
        note && this.populateState(note);
    }

    render() {
        console.log('state', this.state);
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
                    {this.state.file && (
                        <Fragment>
                            <label>Image</label>
                            <Image size="large" src={`${STATIC_URL}/${file}`} />
                        </Fragment>
                    )}
                    <Form.TextArea
                        label="Description"
                        name="description"
                        value={description}
                        onChange={this.handleChange}
                        placeholder="Write some description about your note"
                        rows={6}
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
                        Edit Note
                    </Button>
                </Form>
            </Grid>
        );
    }
}

export default EditNote;
