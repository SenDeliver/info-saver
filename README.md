# info-saver
Save JSON with unique external key
ex. POST /page with {"data": "test data"} -> response /page/{external_id}
    GET  /page/{external_id} -> response {"data": "test data"}
