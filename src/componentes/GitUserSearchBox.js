import '../css/GitUserSearchBox.css'
import React from 'react';
import * as _ from "lodash";

class GitUserSearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gitUsers: [],
        }
        this.gitUserName = React.createRef()
    }

    searchUser(gitUserName) {
        return fetch(`https://api.github.com/search/users?q=${gitUserName}&per_page=100`)
            .then(response => response.json())
            .then(response => {
                return response;
            })
    }

    async onTextChange(e) {
        e.preventDefault();
        let gitUsers = [];
        const gitUserName = this.gitUserName.current.value;
        if (gitUserName.length > 4) {
            const result = await this.searchUser(gitUserName);
            // Sorting is not necessary but we keep it for later uses
            gitUsers = _.sortBy(result.items, "login")
        }


        this.setState(() => ({
            gitUsers,
        }));
    }

    gitUserSelected = (value, url) => {
        this.setState(() => ({
            gitUsers: []
        }))
        this.openInNewTab(url)
    }

    openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    renderGitUsers = () => {
        const {gitUsers} = this.state;
        if (gitUsers.length === 0) {
            return null;
        }
        const listItems = gitUsers.map(gitUser =>
            <li key={gitUser.login} onClick={(e) => this.gitUserSelected(gitUser.login, gitUser.html_url)}>
                <img src={gitUser.avatar_url}  alt={gitUser.login}/>
                {gitUser.login}
            </li>
        );
        return (
            <ul>
                {listItems}
            </ul>
        )
    }

    render() {
        return (
            <div className="GitUserSearchBox">
                <input ref={this.gitUserName} onChange={e => this.onTextChange(e)}
                       placeholder="Search git username : Min 5 Character" type="text"/>
                {this.renderGitUsers()}
            </div>
        );
    }

}

export default GitUserSearchBox;