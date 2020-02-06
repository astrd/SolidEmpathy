import React from "react";
 import { rdfService } from "@services";
import { FriendListItem } from "@components";
import { useLDflexValue, useLDflexList } from '@solid/react';
import {Provider} from '@services';
const $rdf = require("rdflib");

//import { CenterContainer } from '@util-components';
//import { ProviderLogin, withWebId } from '@inrupt/solid-react-components';

async function getFriends() {
  let friends = await rdfService.getContacts();
   return friends;
}
function viewProfile(profile) {
  window.open(profile);
}

function friends() {
  /*let friends   = solid.data[useWebId()].friends
  const doc   = solid.data['https://jeffz.solid.community/public/ldflex.ttl']
  console.log(Name(friends))*/
  const friends = useLDflexList("user.friends");
  let size = friends.size;

  // the raw default JSON-LD context

  return friends;
}

function deletefriend(profile) {
  if (
    window.confirm(
      "Do you really want to delete " + profile + " from your friends?"
    ))
  {
    console.log(this.state.friends);
    let index = 0;
    for(var i = 0; i<this.state.friends.length; i++)
      if(this.state.friends[i].value === profile)
        index = i;
      rdfService.removeFriend(profile);
    let newFriends =  this.state.friends;
    newFriends = newFriends.splice(index,1);
    this.setState({
      friends: newFriends
    });
  }
}

function webid() {
  const user = useLDflexValue("user") || "unknown";
  return user;
}
function friendlist() {
  const name = useLDflexValue("user.name") || "unknown";

  const friends = useLDflexList("user.friends");
}
function proimage() {
  const img = useLDflexValue("user.image");
  return img + "";
}

export default class FriendListComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      friends: [],
      user: "",
      friendid: "",
      platformValue: Provider.getIdentityProviders()[0].card
  };
  this.myChangeHandler = this.myChangeHandler.bind(this);
  this.mySubmitHandler = this.mySubmitHandler.bind(this);
  this.handleChangeSelector = this.handleChangeSelector.bind(this);
  this.handleSubmitProvider = this.handleSubmitProvider.bind(this);

  }
  async handleChangeSelector(event)
    {
      this.setState({platformValue: event.target.value});

    }
    async handleSubmitProvider(event)
    {
      alert('The platform chosen is: ' + this.state.platformValue);
      event.preventDefault();
    }
  
  async mySubmitHandler(event) {
    event.target.reset();
    event.preventDefault();

    let provider = await this.state.platformValue;
    let name = await "https://" + this.state.friendid + ".";
    let username = name.toString().concat(provider.toString());
    if(/\s/.test(username)) {
      alert("Name should not contain spaces");
    }
    else {

      console.log(username + "   !!!!!!!!!!!!!!!!!!")
      const friendsname = await rdfService.getAUserName(username);
      if (window.confirm("Adding Friend Named " + friendsname)) {
        await rdfService.addFriend(username);
        await this.forceUpdate();
      }
    }
   }
  async myChangeHandler (event){
    this.setState({friendid: event.target.value});
  }
  async getFriends() {
    let friends = await rdfService.getContacts();
    return friends;
  }

  async deletefriend(profile) {
    if (
      window.confirm(
        "Do you really want to delete " + profile + " from your friends?"
      )
    ) {
      let index = 0;
      for (var i = 0; i < this.state.friends.length; i++) {
        if (this.state.friends[i].value === profile) {
          index = i;
          break;
        }
      }
      await rdfService.removeFriend(profile);

      let newFriends = this.state.friends;
      newFriends.splice(index, 1);
      await this.setState({
        friends: newFriends
      });
      await this.forceUpdate();

    }
  }

  async componentDidMount() {
    const frs = await this.getFriends();
    const us = await rdfService.getWebId();
    this.setState({ friends: frs, user: us });
  }

  render() {
    const selectorPlatform = (
      <form onSubmit={this.handleSubmitProvider}>
        <label>
          Pick your friend platform:
      <select   value={this.state.platformValue} onChange={this.handleChangeSelector}>
        {Provider.getIdentityProviders().map((e, key) => {
          return <option key={key} value={e.card}>{e.label}</option>;
        })}
      </select>

          

        </label>
        <input type="submit" value="Submit" />
      </form>
    );
    const addingFriend = ( 
      <div>
        <form onSubmit={this.mySubmitHandler}>
          <p>Enter your friends webid:</p>
          <input type="text" onChange={this.myChangeHandler} />
          <input type="submit" />
        </form>
      </div>
    );
    const friendsList = (
      <div>
        {this.state.friends.map(friend => {
          return (
            <div>
              <a href={friend.url}>
                <p>{friend.fn}</p>
                <img src={friend.image} />
              </a>
              <button onClick={async () => await this.deletefriend(friend.url)}>
                Delete Friend
              </button>
            </div>
          );
        })}
        ;
      </div>
    );
    return (
      <div>
        <p>{selectorPlatform}{addingFriend} </p>
        <p>This is the friend list of {this.state.user}:</p>
        {friendsList}
      </div>
    );
  }
}
