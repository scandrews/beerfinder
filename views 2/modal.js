<!-- Modal -->
<!--
 * Bootstrap v2.3.2
 *
 * Copyright 2012 Twitter, Inc
 * Licensed under the Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Designed and built with all the love in the world @twitter by @mdo and @fat.
 -->
<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-header">
        <h1 id="myModalLabel">A Bootstrap Modal with Pure</h1>
    </div>

    <div class="modal-body">
        <p>
            This modal is launched by including <em>just</em> the {{code "modal.css"}} and {{code "modal.js"}} file from Bootstrap, and including Pure to drive all low-level styles. The result is a fully-functional Modal using just a fraction of the CSS.
        </p>

        <form class="pure-form pure-form-stacked">
            <legend>A Stacked Form</legend>

            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Email">

            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Password">

            <label for="state">State</label>
            <select id="state">
                <option>AL</option>
                <option>CA</option>
                <option>IL</option>
            </select>

            <label class="pure-checkbox">
                <input type="checkbox"> Remember me
            </label>
        </form>
    </div>

    <div class="modal-footer">
        <button class="pure-button" data-dismiss="modal" aria-hidden="true">Close</button>
        <button class="pure-button pure-button-primary">Submit</button>
    </div>
</div>

<script src="//code.jquery.com/jquery-1.9.1.js"></script>
<script src="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap.min.js"></script>
