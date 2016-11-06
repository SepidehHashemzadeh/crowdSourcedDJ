[1mdiff --git a/components/CreateEventForm.jsx b/components/CreateEventForm.jsx[m
[1mindex a337dea..96642de 100644[m
[1m--- a/components/CreateEventForm.jsx[m
[1m+++ b/components/CreateEventForm.jsx[m
[36m@@ -88,16 +88,18 @@[m [mvar CreateEventForm = React.createClass({[m
 	renderForm: function() {[m
 	    return ([m
 	    	<div className="createEventFormDiv">[m
[31m-		    	<form action="#">[m
[32m+[m		[41m    [m	[32m<form>[m
 				  <header>[m
 				    <h2 className="formTitle">Create New Event</h2>[m
 				    <div></div>[m
 				  </header>[m
 				  [m
 				  <div>[m
[31m-				    <label class="desc" id="title1" for="Field1">Event Name</label>[m
[32m+[m				[32m    <label class="desc" id="title1">[m
[32m+[m				[41m    [m	[32mEvent Name *[m
[32m+[m				[32m    </label>[m
 				    <div>[m
[31m-				      <input id="Field1" name="Field1" type="text" class="field text fn"size="8" tabindex="1"[m
[32m+[m				[32m      <input type="text" class="field text fn"size="8" tabindex="1"[m
 				             className="createEventFieldInput"[m
 			    			 onChange={this.handleEventName}[m
 				             value={this.state.eventName}[m
[36m@@ -107,11 +109,11 @@[m [mvar CreateEventForm = React.createClass({[m
 				    [m
 [m
 				  <div>[m
[31m-				    <label class="desc" id="title106" for="Field106">[m
[31m-				    	Event Time[m
[32m+[m				[32m    <label class="desc">[m
[32m+[m				[41m    [m	[32mEvent Time*[m
 				    </label>[m
 				    <div>[m
[31m-				    <input type="datetime-local" id="Field106" name="Field106" class="field select medium" tabindex="11"[m
[32m+[m				[32m    <input type="datetime-local" class="field select medium" tabindex="11"[m
 			    		    className="createEventFieldInput"[m
 			         	    onChange={this.handleEventStartTime}[m
 			    		    value={this.state.eventStartTime}/>[m
[36m@@ -120,11 +122,11 @@[m [mvar CreateEventForm = React.createClass({[m
 [m
 [m
 				  <div>[m
[31m-				    <label class="desc" id="title3" for="Field3">[m
[31m-				      Location[m
[32m+[m				[32m    <label class="desc">[m
[32m+[m				[32m      Location *[m
 				    </label>[m
 				    <div>[m
[31m-				      <input id="Field3" name="Field3" type="text" spellcheck="false" maxLength="255" tabindex="3"[m
[32m+[m				[32m      <input type="text" spellcheck="false" maxLength="255" tabindex="3"[m
 				             className="createEventFieldInput"[m
 			    			 onChange={this.handleEventLocation}[m
 			    		     value={this.state.eventLocation}/> [m
[36m@@ -132,12 +134,12 @@[m [mvar CreateEventForm = React.createClass({[m
 				  </div>[m
 				    [m
 				  <div>[m
[31m-				    <label class="desc" id="title4" for="Field4">[m
[31m-				      Event Description[m
[32m+[m				[32m    <label class="desc">[m
[32m+[m				[32m      Event Description *[m
 				    </label>[m
 				  [m
 				    <div>[m
[31m-				      <textarea id="Field4" name="Field4" spellcheck="true" rows="5" tabindex="4"[m
[32m+[m				[32m      <textarea spellcheck="true" rows="5" tabindex="4"[m
 				               className="createEventFieldInput"[m
 			    			   onChange={this.handleEventDescription}[m
 			    		       value={this.state.eventDescription}></textarea>[m
