---
title: Google Calendar API from Ruby
permalink: /google-calendar-api-from-ruby/
---

I have a Rails app that needs to sync events to a Google Calendar and I had been using the [gcal4ruby](https://github.com/SeabourneConsulting/GCal4Ruby) gem to do this.  However, back in November 2014, Google deprecated the v1 and v2 Google Calendar API.  This gem does not use the newer v3 API so I had to make a change.

I decided to use the [official Google API Client for Ruby][2].  It took a bit of time to get up to speed with using this client, particularly because of the OAuth authentication requirement in v3 of the API.

The steps to get setup are:

1. Go to Google Developers Console &#8211; <https://console.developers.google.com/project>
2. Create a new Project
3. Go to Project > APIs & Auth > **Credentials**
4. Create **New Client ID** (OAuth).  Pay attention to the Authorized Redirect Uris; these are the Uris allowed to be redirected to when requesting authorization via OAuth.  This (or these) Uris should be a page you can receive a GET request on after OAuth authorization is given by a Google Account owner.
5. Click **Download JSON.  **This will download a JSON file with all the app credentials (token / secret) needed to authenticate when connecting with the client.
6. Rename the file downloaded above to **client_secrets.json** and move it to the same directory your app is running.

<img src="google_developer_console.png" alt="Google Developer Console"/>

Once you create the app and get your client secrets file in place, you are ready to start using the client.  Here is some example Ruby code that demonstrates how to connect, authenticate, and perform basic Google Calendar API operations like querying for a list of events, adding, and updating.

```ruby
#gem install 'google-api-client'

require 'google/api_client'

#Setup auth client
client_secrets = Google::APIClient::ClientSecrets.load #client_secrets.json must be present in current directory!
auth_client = client_secrets.to_authorization
auth_client.update!(
  :scope => 'https://www.googleapis.com/auth/calendar',
  :access_type => "offline", #will make refresh_token available
  :approval_prompt =>'force',
  :redirect_uri => 'http://www.myauthorizedredirecturl.com'
)

refresh_token_available = File.exist?('refresh_token.txt')

if !refresh_token_available
 #OAuth URL - this is the url that will prompt a Google Account owner to give access to this app.
 puts "Navigate browser to: '#{auth_client.authorization_uri.to_s}' and copy/paste auth code after redirect."

 #Once the authorization_uri (above) is followed and authorization is given, a redirect will be made
 #to http://www.myauthorizedredirecturl.com (defined above) and include the auth code in the request url.
 print "Auth code: "
 auth_client.code = gets
else
 #If authorization has already been given and refresh token saved previously, simply set the refresh code here.
 auth_client.refresh_token = File.read('refresh_token.txt')
end

#Now, get our access token which is what we will need to work with the API.
auth_client.fetch_access_token!

if !refresh_token_available
 #Save refresh_token for next time
 #Note: auth_client.refresh_token is only available the first time after OAuth permission is granted.
 #If you need it again, the Google Account owner would have deauthorize your app and you would have to request access again.
 #Therefore, it is important that the refresh token is saved after authenticating the first time!
 File.open('refresh_token.txt', 'w') { |file| file.write(auth_client.refresh_token) }
 refresh_token_available = true
end

api_client = Google::APIClient.new
cal = api_client.discovered_api('calendar', 'v3')

#Get Event List
puts "Getting list of events..."
list = api_client.execute(:api_method => cal.events.list,
	:authorization => auth_client,
	:parameters => {
		'maxResults' => 20,
		'timeMin' => '2014-06-18T03:12:24-00:00',
		'q' => 'Meeting',
		'calendarId' => 'primary'})

puts "Fetched #{list.data.items.count} events..."

#Update Event
puts "Updating first event from list..."
update_event = list.data.items[0]
update_event.description = "Updated Description here"
result = api_client.execute(:api_method => cal.events.update,
	:authorization => auth_client,
	:parameters => { 'calendarId' => 'primary', 'eventId' => update_event.id},
	:headers => {'Content-Type' => 'application/json'},
	:body_object => update_event)
puts "Done with update."

#Add New Event
puts "Inserting new event..."
new_event = cal.events.insert.request_schema.new
new_event.start = { 'date' => '2015-01-01' } #All day event
new_event.end = { 'date' => '2015-01-01' }
new_event.description = "Description here"
new_event.summary = "Summary here"
result = api_client.execute(:api_method => cal.events.insert,
	:authorization => auth_client,
	:parameters => { 'calendarId' => 'primary'},
	:headers => {'Content-Type' => 'application/json'},
	:body_object => new_event)
puts "Done with insert."
```

[2]: https://github.com/google/google-api-ruby-client
