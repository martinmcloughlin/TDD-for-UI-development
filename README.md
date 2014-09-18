TDD for UI development
======================

Investigation and documentation into using Test Driven Development for UI developers

Basic Principles
----------------

No Code is written for a function without
* first - defining a test
* second - making that test fail

Then we write the code, test, refactor, test again (rinse and repeat as needed).

example
-------

### Log in form

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

#### Extended requirements

##### Detail

Form
* must have id="masterSignIn"
* must have valid action
Email address field
* must be type="email"
* must have 'hint' text placeholder
* must validate inline on loss of focus
Password field
* must be type="password"
* must have 'hint' text placeholder
Checkbox
* must be unchecked by default
Submit button
* must trigger form submission
* must validate form elements on submit
Reminder link
* must be simple href / text link
* must link to reminder page

##### Tests

* Test form ID
* Test form action exists
* Test email field for type
* Test email field for placeholder
* Test email field for validation on focus loss
* Test password field for type
* Test password field for placeholder
* Test password field for validation on focus loss
* Test checkbox in unchecked
* Test form submit
* Test post submit validation
* Test reminder link format
* Test URL follow on click
