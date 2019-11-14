# info-saver
Save JSON with unique external key

ex. 
POST /page[?eid=custom_page1[&make_access_token=true]] with {"data": "test data"} -> response /page/{eid}[?access_token={token}]

GET  /page/{eid}[?access_token={token}] -> response {"data": "test data"}

PUT  /page/{eid}[?access_token={token}] 
