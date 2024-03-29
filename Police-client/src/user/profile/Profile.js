import React, { Component } from 'react';

import { getUserProfile } from '../../util/APIUtils';
import { Avatar, Tabs } from 'antd';
import { getAvatarColor } from '../../util/Colors';
import { formatDate } from '../../util/Helpers';
import LoadingIndicator  from '../../common/LoadingIndicator';
import './Profile.css';
import NotFound from '../../common/NotFound';
import ServerError from '../../common/ServerError';

const TabPane = Tabs.TabPane;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 'rahul',
            username: 'rahul',
            name:'rahul',
            isLoading: false
        }

    }

    // loadUserProfile(username) {
    //     this.setState({
    //         isLoading: true
    //     });
    //
    //     getUserProfile(username)
    //     .then(response => {
    //         this.setState({
    //             user: response,
    //             isLoading: false
    //         });
    //     }).catch(error => {
    //         if(error.status === 404) {
    //             this.setState({
    //                 notFound: true,
    //                 isLoading: false
    //             });
    //         } else {
    //             this.setState({
    //                 serverError: true,
    //                 isLoading: false
    //             });
    //         }
    //     });
    // }

    // componentDidMount() {
    //     const username = this.props.match.params.username;
    //   //  this.loadUserProfile(username);
    // }
    //
    // componentDidUpdate(nextProps) {
    //     if(this.props.match.params.username !== nextProps.match.params.username) {
    //         this.loadUserProfile(nextProps.match.params.username);
    //     }
    // }

    render() {
        if(this.state.isLoading) {
            return <LoadingIndicator />;
        }

        if(this.state.notFound) {
            return <NotFound />;
        }

        if(this.state.serverError) {
            return <ServerError />;
        }

        const tabBarStyle = {
            textAlign: 'center'
        };

        return (
            <div className="profile">

                        <div className="user-profile">
                            <div className="user-details">
                                <div className="user-avatar">

                                </div>
                                <div className="user-summary">
                                    <div className="full-name">{this.state.user.name}</div>
                                    <div className="username">@{this.state.user.username}</div>
                                    <div className="user-joined">
                                        Joined {formatDate(this.state.user.joinedAt)}
                                    </div>
                                </div>
                            </div>

                        </div>


            </div>
        );
    }
}

export default Profile;
