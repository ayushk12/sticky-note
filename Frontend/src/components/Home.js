import React, { Component } from "react";
import { Card, Grid, Button, Image } from "semantic-ui-react";
import ColorPicker from "./ColorPicker";
import Moment from "react-moment";

import noteService from "../services/noteService";
import { STATIC_URL } from "../config";

const colorTheme = [
  { color: "#f54290" },
  { color: "orange" },
  { color: "violet" },
  { color: "#34eb80" },
  { color: "#34d3eb" },
];

const len = colorTheme.length;

class Home extends Component {
  state = {
    notes: [],
  };

  editNote = (note) => {
    this.props.history.push({
      pathname: "/editNote",
      state: { note },
    });
  };

  newNote = () => {
    this.props.history.push("/newNote");
  };

  deleteNote = async (event, note) => {
    event.stopPropagation();
    const notes = this.state.notes.filter((n) => n._id !== note._id);
    this.setState({ notes: [...notes] });

    const data = await noteService.deleteNote(note);
  };

  async componentDidMount() {
    const notes = await noteService.getNotes();
    console.log("data", notes.data);
    this.setState({
      notes: [...this.state.notes, ...notes.data],
    });
  }

  renderNotesCard = (notes) => {
    return notes.map((note, i) => {
      return (
        <Grid.Column key={note._id}>
          <Card
            style={{
              margin: "20px 0px",
              background: `${colorTheme[i % len].color}`,
            }}
            className="card__frame"
            onClick={() => this.editNote(note)}
          >
            {note.file && (
              <Image
                src={`${STATIC_URL}/${note.file}`}
                size="tiny"
                wrapped
                ui={false}
              />
            )}
            <Card.Content>
              <Button
                circular
                color="red"
                floated="right"
                icon="close"
                onClick={(e) => this.deleteNote(e, note)}
              />
              <Card.Header>{note.title}</Card.Header>
              <Card.Meta>
                Created At{` `}
                <Moment date={note.createdAt} format="DD-MMM-YYYY" />
              </Card.Meta>
              <Card.Description>{note.description}</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
      );
    });
  };

  render() {
    const { notes } = this.state;
    return (
      <Grid centered columns={2} style={{ position: "relative" }}>
        <Grid.Column width={1}>
          <Button
            circular
            size="massive"
            icon="add"
            inverted
            color="green"
            onClick={this.newNote}
            style={{ position: "fixed", top: "15vh", left: "4vw" }}
          />
        </Grid.Column>

        <Grid.Column width={13}>
          {notes && notes.length > 0 && (
            <Grid centered columns={4}>
              <Grid.Row>{this.renderNotesCard(notes)}</Grid.Row>
            </Grid>
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default Home;
