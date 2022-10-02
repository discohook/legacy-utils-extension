const initDataEncoded = new URLSearchParams(window.location.search).get('data')

// https://github.com/discohook/site/blob/main/common/base64/base64Encode.ts
const base64Encode = (utf8) => {
  const encoded = encodeURIComponent(utf8)
  const escaped = encoded.replace(/%[\dA-F]{2}/g, hex => {
    return String.fromCharCode(Number.parseInt(hex.slice(1), 16))
  })
  return btoa(escaped)
}

const defaultEncoded = 'eyJtZXNzYWdlcyI6W3siZGF0YSI6eyJjb250ZW50IjoiSGV5LCB3ZWxjb21lIHRvIDw6ZGlzY29ob29rOjczNjY0ODM5ODA4MTYyMjAxNj4gKipEaXNjb2hvb2sqKiEgVGhlIGVhc2llc3Qgd2F5IHRvIHBlcnNvbmFsaXNlIHlvdXIgRGlzY29yZCBzZXJ2ZXIuXG5cblRoZXJlJ3MgbW9yZSBpbmZvIGJlbG93LCBidXQgeW91IGRvbid0IGhhdmUgdG8gcmVhZCBpdC4gSWYgeW91J3JlIHJlYWR5IHByZXNzICoqQ2xlYXIgQWxsKiogaW4gdGhlIHRvcCBvZiB0aGUgZWRpdG9yIHRvIGdldCBzdGFydGVkLlxuXG5EaXNjb2hvb2sgaGFzIGEgW3N1cHBvcnQgc2VydmVyXShodHRwczovL2Rpc2NvaG9vay5hcHAvZGlzY29yZCksIGlmIHlvdSBuZWVkIGhlbHAgZmVlbCBmcmVlIHRvIGpvaW4gaW4gYW5kIGFzayBxdWVzdGlvbnMsIHN1Z2dlc3QgZmVhdHVyZXMsIG9yIGp1c3QgY2hhdCB3aXRoIHRoZSBjb21tdW5pdHkuXG5cbldlIGFsc28gaGF2ZSBbY29tcGxlbWVudGFyeSBib3RdKGh0dHBzOi8vZGlzY29ob29rLmFwcC9ib3QpIHRoYXQgbWF5IGhlbHAgb3V0LCBmZWF0dXJpbmcgcmVhY3Rpb24gcm9sZXMgYW5kIG90aGVyIHV0aWxpdGllcy5cbl8gXyIsImVtYmVkcyI6W3sidGl0bGUiOiJXaGF0J3MgdGhpcyBhYm91dD8iLCJkZXNjcmlwdGlvbiI6IkRpc2NvaG9vayBpcyBhIGZyZWUgdG9vbCB0aGF0IGFsbG93cyB5b3UgdG8gcGVyc29uYWxpc2UgeW91ciBzZXJ2ZXIgdG8gbWFrZSB5b3VyIHNlcnZlciBzdGFuZCBvdXQgZnJvbSB0aGUgY3Jvd2QuIFRoZSBtYWluIHdheSBpdCBkb2VzIHRoaXMgaXMgdXNpbmcgW3dlYmhvb2tzXShodHRwczovL3N1cHBvcnQuZGlzY29yZC5jb20vaGMvZW4tdXMvYXJ0aWNsZXMvMjI4MzgzNjY4KSwgd2hpY2ggYWxsb3dzIHNlcnZpY2VzIGxpa2UgRGlzY29ob29rIHRvIHNlbmQgYW55IG1lc3NhZ2VzIHdpdGggZW1iZWRzIHRvIHlvdXIgc2VydmVyLlxuXG5UbyBnZXQgc3RhcnRlZCB3aXRoIHNlbmRpbmcgbWVzc2FnZXMsIHlvdSBuZWVkIGEgd2ViaG9vayBVUkwsIHlvdSBjYW4gZ2V0IG9uZSB2aWEgdGhlIFwiSW50ZWdyYXRpb25zXCIgdGFiIGluIHlvdXIgc2VydmVyJ3Mgc2V0dGluZ3MuIElmIHlvdSdyZSBoYXZpbmcgaXNzdWVzIGNyZWF0aW5nIGEgd2ViaG9vaywgW3RoZSBib3RdKGh0dHBzOi8vZGlzY29ob29rLmFwcC9ib3QpIGNhbiBoZWxwIHlvdSBjcmVhdGUgb25lIGZvciB5b3UuXG5cbktlZXAgaW4gbWluZCB0aGF0IERpc2NvaG9vayBjYW4ndCBkbyBhdXRvbWF0aW9uIHlldCwgaXQgb25seSBzZW5kcyBtZXNzYWdlcyB3aGVuIHlvdSB0ZWxsIGl0IHRvLiBJZiB5b3UgYXJlIGxvb2tpbmcgZm9yIGFuIGF1dG9tYXRpYyBmZWVkIG9yIGN1c3RvbSBjb21tYW5kcyB0aGlzIGlzbid0IHRoZSByaWdodCB0b29sIGZvciB5b3UuIiwiY29sb3IiOjU4MTQ3ODN9LHsidGl0bGUiOiJEaXNjb3JkIGJvdCIsImRlc2NyaXB0aW9uIjoiRGlzY29ob29rIGhhcyBhIGJvdCBhcyB3ZWxsLCBpdCdzIG5vdCBzdHJpY3RseSByZXF1aXJlZCB0byBzZW5kIG1lc3NhZ2VzIGl0IG1heSBiZSBoZWxwZnVsIHRvIGhhdmUgaXQgcmVhZHkuXG5cbkJlbG93IGlzIGEgc21hbGwgYnV0IGluY29tcGxldGUgb3ZlcnZpZXcgb2Ygd2hhdCB0aGUgYm90IGNhbiBkbyBmb3IgeW91LiIsImNvbG9yIjo1ODE0NzgzLCJmaWVsZHMiOlt7Im5hbWUiOiJHZXR0aW5nIHNwZWNpYWwgZm9ybWF0dGluZyBmb3IgbWVudGlvbnMsIGNoYW5uZWxzLCBhbmQgZW1vamkiLCJ2YWx1ZSI6IlRoZSAqKi9mb3JtYXQqKiBjb21tYW5kIG9mIHRoZSBib3QgY2FuIGdpdmUgeW91IHNwZWNpYWwgZm9ybWF0dGluZyBmb3IgdXNlIGluIERpc2NvcmQgbWVzc2FnZXMgdGhhdCBsZXRzIHlvdSBjcmVhdGUgbWVudGlvbnMsIHRhZyBjaGFubmVscywgb3IgdXNlIGVtb2ppIHJlYWR5IHRvIHBhc3RlIGludG8gdGhlIGVkaXRvciFcblxuVGhlcmUgYXJlIFttYW51YWwgd2F5c10oaHR0cHM6Ly9kaXNjb3JkLmRldi9yZWZlcmVuY2UjbWVzc2FnZS1mb3JtYXR0aW5nKSBvZiBkb2luZyB0aGlzLCBidXQgaXQncyB2ZXJ5IGVycm9yIHByb25lLiBUaGUgYm90IHdpbGwgbWFrZSBzdXJlIHlvdSdsbCBhbHdheXMgZ2V0IHRoZSByaWdodCBmb3JtYXR0aW5nIGZvciB5b3VyIG5lZWRzLiJ9LHsibmFtZSI6IkNyZWF0aW5nIHJlYWN0aW9uIHJvbGVzIiwidmFsdWUiOiJZb3UgY2FuIG1hbmFnZSByZWFjdGlvbiByb2xlcyB3aXRoIHRoZSBib3QgdXNpbmcgdGhlICoqL3JlYWN0aW9uLXJvbGUqKiBjb21tYW5kLlxuXG5UaGUgc2V0LXVwIHByb2Nlc3MgaXMgdmVyeSBpbnR1aXRpdmU6IHR5cGUgb3V0ICoqL3JlYWN0aW9uLXJvbGUgY3JlYXRlKiosIHBhc3RlIGEgbWVzc2FnZSBsaW5rLCBzZWxlY3QgYW4gZW1vamksIGFuZCBwaWNrIGEgcm9sZS4gSGl0IGVudGVyIGFuZCB5b3UncmUgZG9uZSwgeW91ciBtZW1iZXJzIGNhbiBub3cgcmVhY3QgdG8gYW55IG9mIHlvdXIgbWVzc2FnZXMgdG8gcGljayB0aGVpciByb2xlcy4ifSx7Im5hbWUiOiJSZWNvdmVyIERpc2NvaG9vayBtZXNzYWdlcyBmcm9tIHlvdXIgc2VydmVyIiwidmFsdWUiOiJJdCBjYW4gYWxzbyByZXN0b3JlIGFueSBtZXNzYWdlIHNlbnQgaW4geW91ciBEaXNjb3JkIHNlcnZlciBmb3IgeW91IHZpYSB0aGUgYXBwcyBtZW51LlxuXG5UbyBnZXQgc3RhcnRlZCwgcmlnaHQtY2xpY2sgb3IgbG9uZy1wcmVzcyBvbiBhbnkgbWVzc2FnZSBpbiB5b3VyIHNlcnZlciwgcHJlc3Mgb24gYXBwcywgYW5kIHRoZW4gcHJlc3MgKipSZXN0b3JlIHRvIERpc2NvaG9vayoqLiBJdCdsbCBzZW5kIHlvdSBhIGxpbmsgdGhhdCBsZWFkcyB0byB0aGUgZWRpdG9yIHBhZ2UgY29udGFpbmluZyB0aGUgbWVzc2FnZSB5b3Ugc2VsZWN0ZWQhIn0seyJuYW1lIjoiT3RoZXIgZmVhdHVyZXMiLCJ2YWx1ZSI6IkRpc2NvaG9vayBjYW4gYWxzbyBncmFiIGltYWdlcyBmcm9tIHByb2ZpbGUgcGljdHVyZXMgb3IgZW1vamksIG1hbmFnZSB5b3VyIHdlYmhvb2tzLCBhbmQgbW9yZS4gSW52aXRlIHRoZSBib3QgYW5kIHVzZSAqKi9oZWxwKiogdG8gbGVhcm4gYWJvdXQgYWxsIHRoZSBib3Qgb2ZmZXJzISJ9XX1dLCJhdHRhY2htZW50cyI6W119fV19'
const overrideData = {
  content: 'Hey, welcome to <:discohook:736648398081622016> **Discohook** (plus <:utilshook:886428915172798494> **Discohook Utils**)! The easiest way to personalise your Discord server.\n\nThere\'s more info below, but you don\'t have to read it. If you\'re ready press **Clear All** in the top of the editor to get started.\n\nDiscohook has a [support server](https://discohook.app/discord), if you need help feel free to join in and ask questions, suggest features, or just chat with the community.\n\nWe also have [complementary bot](https://discohook.app/bot) that may help out, featuring reaction roles and other utilities.\n_ _',
  embeds: [
    {
      title: 'You have the Discohook Utils extension installed!',
      description: 'If you\'re seeing this after loading into the default Discohook page, that means you installed the Discohook Utils browser extension successfully. Great job!\n\nBe sure to check out [the feature list](https://github.com/shayypy/discohook-utils-extension/blob/main/README.md#features) to see what all this extension can do for you.\n\n:warning: Chances are you\'ll need the Discohook Utils bot in your server! You can [invite it here](https://dutils.shay.cat/invite) if you haven\'t already.',
      color: 16744959,
      author: {
        name: 'Discohook Utils',
        url: 'https://dutils.shay.cat',
        icon_url: 'https://cdn.discordapp.com/avatars/792842038332358656/da056550fd65a4d7e4636cb1707ca801.png?size=64'
      }
    },
    {
      title: 'What\'s this about?',
      description: 'Discohook is a free tool that allows you to personalise your server to make your server stand out from the crowd. The main way it does this is using [webhooks](https://support.discord.com/hc/en-us/articles/228383668), which allows services like Discohook to send any messages with embeds to your server.\n\nTo get started with sending messages, you need a webhook URL, you can get one via the \'Integrations\' tab in your server\'s settings. If you\'re having issues creating a webhook, [the bot](https://discohook.app/bot) can help you create one for you.\n\nKeep in mind that Discohook can\'t do automation yet, it only sends messages when you tell it to. If you are looking for an automatic feed or custom commands this isn\'t the right tool for you.',
      color: 5814783,
      author: {
        name: 'Discohook',
        icon_url: 'https://cdn.discordapp.com/avatars/633565743103082527/fa47564fcd19857e833e97c6c0208966.png?size=64'
      }
    },
    {
      title: 'Discord bot',
      description: 'Discohook has a bot as well, it\'s not strictly required to send messages it may be helpful to have it ready.\n\nBelow is a small but incomplete overview of what the bot can do for you.',
      color: 5814783,
      fields: [
        {
          name: 'Getting special formatting for mentions, channels, and emoji',
          value: 'The **/format** command of the bot can give you special formatting for use in Discord messages that lets you create mentions, tag channels, or use emoji ready to paste into the editor!\n\nThere are [manual ways](https://discord.dev/reference#message-formatting) of doing this, but it\'s very error prone. The bot will make sure you\'ll always get the right formatting for your needs.'
        },
        {
          name: 'Creating reaction roles',
          value: 'You can manage reaction roles with the bot using the **/reaction-role** command.\n\nThe set-up process is very intuitive: type out **/reaction-role create**, paste a message link, select an emoji, and pick a role. Hit enter and you\'re done, your members can now react to any of your messages to pick their roles.'
        },
        {
          name: 'Recover Discohook messages from your server',
          value: 'It can also restore any message sent in your Discord server for you via the apps menu.\n\nTo get started, right-click or long-press on any message in your server, press on apps, and then press **Restore to Discohook**. It\'ll send you a link that leads to the editor page containing the message you selected!'
        },
        {
          name: 'Other features',
          value: 'Discohook can also grab images from profile pictures or emoji, manage your webhooks, and more. Invite the bot and use **/help** to learn about all the bot offers!'
        }
      ],
      author: {
        name: 'Discohook',
        icon_url: 'https://cdn.discordapp.com/avatars/633565743103082527/fa47564fcd19857e833e97c6c0208966.png?size=64'
      }
    }
  ],
  attachment: [],
}

console.log('[Discohook Utils] Loaded override-default')

if (!initDataEncoded || initDataEncoded === defaultEncoded) {
  // Page loaded without data param or user loaded default
  console.debug('[Discohook Utils] Reloading with Discohook Utils landing page')
  const url = new URL(window.location.href)
  url.searchParams.set('data', base64Encode(JSON.stringify({ messages: [{ data: overrideData }]})))
  window.location.href = url.toString()
}
