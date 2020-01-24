import React, { Component } from 'react';
import InputText from '../input-text/input-text.component';
import Button from '../button/button.component';
import axios from 'axios';
import './container.styles.scss';

class Container extends Component {
    state = {
        input: '',
        id: 0,
        todos: [],
        edit: false
    }

    getTodo = () => {
        axios.get('http://localhost:5000/')
            .then(res => {
                this.setState({ todos: res.data.data });
            });
    }

    handleChange = (e) => {
        this.setState({ input: e.target.value });
    }

    handleAdd = () => {
        const title = this.state.input;

        axios.post('http://localhost:5000/add',{
            data: title
        })
            .then(res => alert(res.data.message));

        this.setState({ input: '' });
        this.getTodo();
    }

    removeTodo = (key) => {
        axios.delete(`http://localhost:5000/delete/${key}`)
        .then(res => {
            alert(res.data.message)
        });
        this.getTodo();
    }

    editTodo = (idx) => {
        this.setState({
            edit: true,
            id: idx
        });
    }

    updateTodo = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:5000/edit/${this.state.id}`,{
            data: this.state.input
        })
        .then(res => {
            alert(res.data.message)
        });

        this.setState({
            edit: false,
            input: ''
        });

        this.getTodo();
    }

    renderEditForm = () => {
        if (this.state.edit) {
            return <form onSubmit={this.updateTodo}>
                <InputText type="text" name="updatedItem" className="input-text" handleChange={this.handleChange} />
                <Button value="Update" />
            </form>
        }
    }

    componentDidMount() {
        this.getTodo();
    }

    render() {
        const { todos, disabledStatus, input } = this.state;
        return (
            <div className="input-container">
                <h3>Add Item to TODO</h3>
                <div>
                    <InputText value={input} className="input-text" handleChange={this.handleChange} />
                    <Button name="Add" value="Add" handleAdd={this.handleAdd} />
                </div>
                <div className="list-todo">
                    {this.renderEditForm()}
                    {
                        todos.map((todo, idx) => {
                            return <div key={idx} className="list-items">
                                <InputText value={todo.title} className="background-black" handleChange={this.handleAdd} disabled={disabledStatus} />
                                <Button value="Edit" handleAdd={() => this.editTodo(todo._id)} />
                                <Button value="Delete" handleAdd={() => this.removeTodo(todo._id)} />
                            </div>
                        })
                    }
                </div>
            </div>
        );
    }
};

export default Container;
