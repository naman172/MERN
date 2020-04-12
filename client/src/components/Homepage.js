import React from 'react'
import { Card, Feed, Icon } from 'semantic-ui-react';
import SvgIcon from '@material-ui/core/SvgIcon';

const BoardMenuInfo = () => (
  <Card style={{width:"100%", margin:"0"}}>
    <Card.Content style={{background:"black", opacity:"0.9"}}>
      <Card.Header style={{color:"whitesmoke"}}>Boards Menu</Card.Header>
    </Card.Content>
    <Card.Content>
      <Feed style={{fontSize: "1.05em", margin: "8px 0"}}>
        <Feed.Event>
          <Icon name="group" size="big" style={{margin:"0 0 0 20px"}}/>
          <Feed.Content>
            <Feed.Date content='Information'/>
            <Feed.Summary>
              Collaboration Board
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
        <br/>
        <Feed.Event>
          <Icon name="cogs" size="big" style={{margin:"0 0 0 20px"}}/>
          <Feed.Content>
            <Feed.Date content='Information'/>
            <Feed.Summary>
              Board is being worked upon by some other collaborator
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
        <br/>
        <Feed.Event>
          <Icon name="history" size="big" style={{margin:"0 6px 0 20px"}}/>
          <Feed.Content>
            <Feed.Date content="Action"/>
            <Feed.Summary>
              View the operation log for the board currently on display 
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
        <br/>
        <Feed.Event>
          <Icon name="add" size="big" style={{margin:"0 1px 0 20px"}}/>
          <Feed.Content>
            <Feed.Date content='Action'/>
            <Feed.Summary>
              Add a new board
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
        <br/>
        <Feed.Event>
          <Icon name="sync" size="big" style={{margin:"6px 8px 0 20px"}}/>
          <Feed.Content>
            <Feed.Date content="Action"/>
            <Feed.Summary>
              Sync the list, to check if a board's status changed 
            </Feed.Summary>
            <Feed.Meta>
              It is advised that you sync up the list each time you're about to switch to a collaboration board
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    </Card.Content>
  </Card>
)

const NavInfo = () => (
  <Card style={{width:"100%", margin:"0"}}>
    <Card.Content style={{background:"black", opacity:"0.9"}}>
      <Card.Header style={{color:"whitesmoke"}} >Navbar</Card.Header>
    </Card.Content>
    <Card.Content>
      <Feed style={{fontSize: "1.05em", margin: "8px 0"}}>
        <Feed.Event>
          <Icon name="home" size="big" style={{margin:"0 0 0 20px", background:"transparent"}}/>
          <Feed.Content>
            <Feed.Date content='Action'/>
            <Feed.Summary>
              Go to Homepage
            </Feed.Summary>
            <Feed.Meta>You are currently on the homepage</Feed.Meta>
          </Feed.Content>
        </Feed.Event>
        <br/>
        <Feed.Event>
          <Icon name="sync" size="big" style={{margin:"0 0 0 20px"}}/>
          <Feed.Content>
            <Feed.Date content='Action'/>
            <Feed.Summary>
              Check for new notifications
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
        <br/>
        <Feed.Event>
          <Icon name="bell" size="big" style={{margin:"6px 4px 0px 24px"}}/>
          <Feed.Content>
            <Feed.Date content="Display"/>
            <Feed.Summary>
              View notifications
            </Feed.Summary>
            <Feed.Meta>All the collaboration requests sent to you will appear under notifications</Feed.Meta>
          </Feed.Content>
        </Feed.Event>
        <br/>
        <Feed.Event>
          <Icon name="sign-out alternate" size="big" style={{margin:"0 -1px 0 20px"}}/>
          <Feed.Content>
            <Feed.Date content="Action"/>
            <Feed.Summary>
              Logout
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
        <br/>
        <Feed.Event>
            <SvgIcon style={{alignSelf: "center", marginLeft : "20px", fontSize: "xx-large"}}>
                <path fill="currentColor" d="M19,5V7H15V5H19M9,5V11H5V5H9M19,13V19H15V13H19M9,17V19H5V17H9M21,3H13V9H21V3M11,3H3V13H11V3M21,11H13V21H21V11M11,15H3V21H11V15Z" />
            </SvgIcon>
            <Feed.Content>
                <Feed.Date content='Display'/>
                <Feed.Summary>
                Display the boards menu
                </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    </Card.Content>
  </Card>
)

const BoardInfo = () => (
  <Card style={{width:"100%", margin:"0"}}>
    <Card.Content style={{background:"black", opacity:"0.9"}}>
      <Card.Header style={{color:"whitesmoke"}}>Board</Card.Header>
    </Card.Content>
    <Card.Content>
      <Feed style={{fontSize: "1.05em", margin: "8px 0"}}>
        <Feed.Event>
          <Icon name="group" size="big" style={{margin:"8px 0 0 20px"}}/>
          <Feed.Content>
            <Feed.Date content='Display/Action/Information'/>
            <Feed.Summary>
              Displays the list of collaborators to the board 
            </Feed.Summary>
            <Feed.Meta>When viewed by the original creator of the board, the list will hold an option to terminate a collaborators access to the board</Feed.Meta>
          </Feed.Content>
        </Feed.Event>
        <br/>
        <Feed.Event>
          <Icon name="edit" size="big" style={{margin:"0 0 0 20px"}}/>
          <Feed.Content>
            <Feed.Date content='Action'/>
            <Feed.Summary>
              Edit the title of boards or lists
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
        <br/>
        <Feed.Event>
          <Icon name="trash alternate" size="big" style={{margin:"8px 7px 0 20px"}}/>
          <Feed.Content>
            <Feed.Date content="Action"/>
            <Feed.Summary>
              Delete the board, lists or cards
            </Feed.Summary>
            <Feed.Meta>The option for deleting the board is enabled only to the original creator of the said board</Feed.Meta>
          </Feed.Content>
        </Feed.Event>
        <br/>
        <Feed.Event>
          <Icon name="add user" size="big" style={{margin:"8px 0 0 20px"}}/>
          <Feed.Content>
            <Feed.Date content="Action"/>
            <Feed.Summary>
              Allows you to send a collaboration request
            </Feed.Summary>
            <Feed.Meta>Anyone who becomes a collaborator to a board can further send collaboration requests for the said board to other users</Feed.Meta>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    </Card.Content>
  </Card>
)


export {BoardInfo, NavInfo, BoardMenuInfo}
