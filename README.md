# info-saver
Save JSON with unique external key

ex. 
POST /page[?eid=custom_page1] with {"data": "test data"} -> response /page/{eid}

GET  /page/{eid} -> response {"data": "test data"}
