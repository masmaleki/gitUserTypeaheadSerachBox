import React from 'react';

class MyApp extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: ''
        };
        this.gitUserName = React.createRef()
    }

    getUser(gitUserName) {
        return fetch(`https://api.github.com/users/${gitUserName}`)
            .then(response => response.json())
            .then(response => {
                return response;
            })
    }
    async handleSubmit(e) {
        e.preventDefault();
        let user = await this.getUser(this.gitUserName.current.value);
        this.setState({
            username: user.login,
            id: user.id,
            url: user.url,
            avatar_url: user.avatar_url,
        });
    }

    render() {
        let user;
        if(this.state.username) {
            user =
                <div>
                    <div>{this.state.username}
                        <br/>
                        {this.state.id}
                        <br/>
                    </div>
                    <img src={this.state.avatar_url}/>
                </div>
        }

        return (
            <div className="GitHubSearch">
                <header className="Search-header">
                    <h1>Github User Search </h1>
                </header>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input ref={this.gitUserName} type='text' placeholder='Git username' />
                </form>
                <div className="Search-intro">
                    {user}
                </div>
            </div>
        );
    }
}
export default MyApp;