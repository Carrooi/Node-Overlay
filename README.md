# Overlay

Really stupidly simple overlay for browser.
Depends on jQuery.

## Usage

```
var Overlay = require('overlay');

Overlay.show().then(function() {
	console.log('I have just been opened');
});

Overlay.hide().then(function() {
	console.log('I have just been closed');
});
```

## Options

There are few options for styling this overlay.

* color [black]: fill overlay with color
* opacity [0.8]
* zIndex [1000]
* duration [fast]: animation speed for jquery animation
* scrollable [false]: if this is true and overlay shows up, then window scroll bar disappear.

```
var options = {
	color: 'red'
};

Overlay.show(options);
```