# Discohook Utils (extension)

This is a third-party tool for [Discohook](https://discohook.app), building on the [Discohook Utils suite](https://dutils.shay.cat).

## Features

* Load rich mention text in the preview tab from your server
  * *Planned:* display member nicknames instead of usernames when available

<!-- * Load messages directly from within Discohook -->
<!-- * Thread ID box for each webhook URL -->

## Developing

To start up a development browser using [web-ext](https://github.com/mozilla/web-ext):

```bash
web-ext run
```

To use Chromium instead of Firefox (the default), specify it as a target:

```bash
web-ext run -t chromium
```

Once you're finished making changes, feel free to [submit a pull request](https://github.com/shayypy/discohook-utils-extension/pulls).
