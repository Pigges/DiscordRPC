// Discord RPC docs: https://discord.js.org/#/docs/rpc/master/class/RPCClient
// Set clientId, import DiscordRPC and create a new client.
const clientId = '860512597115928606';
const DiscordRPC = require('discord-rpc');
const RPC = new DiscordRPC.Client({ transport: 'ipc'});

// Set the new activity.
async function setActivity() {
    if (!RPC) return;
    RPC.setActivity({
        details: `Decentralized`,
        state: `Digital marketplace`,
        largeImageKey: 'lbry-icon', // Sets the large image icon
        largeImageText: `LBRY`, // Sets the large image text that shows when hovering
        smallImageKey: 'discord-verified', // Sets the small image icon
        smallImageText: 'Verified', // Sets the small image text that shows when hovering
        instance: false,
        buttons: [ // Created the buttons
            {
                label: `Get LBRY`,
                url: 'https://lbry.com/get'
            },
            {
                label: `Follow me`,
                url: 'https://open.lbry.com/@pigges:d'
            }
        ]
    }).catch(function(err) { // If something went wrong with setting the activity
        console.log("Unable to set activity.");
        return;
    });
};

// Run when connected to client
RPC.once('ready', async () => {
    // Wait till activity is set
    await setActivity();

    // Update activity every 15 seconds
    setInterval(() => {
        setActivity();
        console.log("Updated");
    }, 15 * 1000);

    console.log(`Discord Rich Precence has been enabled.\nConnected to ${RPC.user.username+RPC.user.discriminator}`); // Log that RPC is connected and to whom.
});

RPC.login({ clientId }).catch(err => console.error); // Connect to the client