TDD for UI development
======================

Investigation and documentation into using Test Driven Development for UI developers

Basic Principles
----------------

No Code is written for a function without
* first - defining a test
* second - making that test fail

### example

Log in form

#### Master requirement

##### Detail

Form must contain
* email address field
* password field
* 'remember me' checkbox
* submit button
* link to password reminder

##### Tests

* Test form exists
* Test email field exists
* Test password field exists
* Test checkbox exists
* Test button exists
* Test link exists

#### Extend requirements

##### Detail

Form
* must have id="masterSignIn"

Email address field
* must be type="email"

Password field
* must be type="password"

Checkbox
* must be unchecked by default

Submit button
* must trigger form submission

Reminder link
* must be simple href / text link
* must link to reminder page