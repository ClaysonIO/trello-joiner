# trello-joiner

### What is this?

Joiner takes many Trello boards, and turns them into a single one. Each board becomes a list, and each list becomes a card. The tool is primarily on the client side, with a small amount of data stored in the server. No reason why, yet.

### Why does this exist?

Trello-Joiner exists because of a project with multiple modules, each module having its own roadmapm versioning, timelines, and goals. With so many sheets, it's impossible to quickly understand what's currently happpening, and what's due next. And so the joiner was born. 

### Where is it going next? 

I need to have a few more features to really make this work. 
* Due dates need to go both directions, so that it can be set on the primary board, or on the secondary boards. 
* Links in each card of the primary board, that let you move quickly to the secondary boards.
* Labels should be syncronized among all of the boards, and what shows up on the primary board should be a reflection of the current state of the secondary board. 
* Webhooks to keep everything up to date. 

### How do I install it? 

Trello-Joiner is built using [MeteorJS](http://www.meteor.com). You can install it on your local computer, or deploy it to a Windows or Linux server. Check out the [Meteor Install Guide](https://www.meteor.com/install) if you have questions.

### How do I use it? 

Once you have the service installed, go to _yourhost.com/boards_, and use the authorize button to sign into trello. Press the download button to get a list of all of your boards. In the first column, select boards to be your source boards, the Secondary boards that feed the main board. Then select a single board in the second column, this will be your Primary board. Finally, press the last button to start the copying process.
