/*{
  "timestamp": 1516068668628,
  "progress_ms": 10913,
  "is_playing": true,
  "item": {
    "album": {
      "album_type": "album",
      "artists": [
        {
          "external_urls": {
            "spotify": "https://open.spotify.com/artist/0LyfQWJT6nXafLPZqxe9Of"
          },
          "href": "https://api.spotify.com/v1/artists/0LyfQWJT6nXafLPZqxe9Of",
          "id": "0LyfQWJT6nXafLPZqxe9Of",
          "name": "Various Artists",
          "type": "artist",
          "uri": "spotify:artist:0LyfQWJT6nXafLPZqxe9Of"
        }
      ],
      "external_urls": {
        "spotify": "https://open.spotify.com/album/6G3P9zFdA4pSJhhIpelV6u"
      },
      "href": "https://api.spotify.com/v1/albums/6G3P9zFdA4pSJhhIpelV6u",
      "id": "6G3P9zFdA4pSJhhIpelV6u",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/92d368b37609d7cb040e341c29400d28321c46ee",
          "width": 640
        },
        {
          "height": 300,
          "url": "https://i.scdn.co/image/91f86f7be5a51f5f4044c18eb29ca33165fe00a4",
          "width": 300
        },
        {
          "height": 64,
          "url": "https://i.scdn.co/image/faaeb080e867ab4ca94e6c093067b967b887eb0d",
          "width": 64
        }
      ],
      "name": "Wu-Box - The Cream Of The Clan",
      "type": "album",
      "uri": "spotify:album:6G3P9zFdA4pSJhhIpelV6u"
    },
    "artists": [
      {
        "external_urls": {
          "spotify": "https://open.spotify.com/artist/2yQf6b8hxahZaT5dHlWaB1"
        },
        "href": "https://api.spotify.com/v1/artists/2yQf6b8hxahZaT5dHlWaB1",
        "id": "2yQf6b8hxahZaT5dHlWaB1",
        "name": "Raekwon",
        "type": "artist",
        "uri": "spotify:artist:2yQf6b8hxahZaT5dHlWaB1"
      }
    ],
    "disc_number": 1,
    "duration_ms": 139253,
    "explicit": false,
    "external_ids": {
      "isrc": "USA560686484"
    },
    "external_urls": {
      "spotify": "https://open.spotify.com/track/6Wcz8k6Yu6ZHKBFq1nwcaI"
    },
    "href": "https://api.spotify.com/v1/tracks/6Wcz8k6Yu6ZHKBFq1nwcaI",
    "id": "6Wcz8k6Yu6ZHKBFq1nwcaI",
    "name": "Still Strugglin'",
    "popularity": 44,
    "preview_url": "https://p.scdn.co/mp3-preview/99f29d61c1faf07bcc0dcb601290f62f3ef435cf?cid=774b29d4f13844c495f206cafdad9c86",
    "track_number": 6,
    "type": "track",
    "uri": "spotify:track:6Wcz8k6Yu6ZHKBFq1nwcaI"
  },
  "context": null
}
    */

const MAX_DELTA_MS = 2500;

const get_sync_dict = function(
  my_uri,
  my_timestamp,
  my_progress_ms,
  my_is_playing,
  my_duration_ms,
  sync_uri,
  sync_timestamp,
  sync_progress_ms,
  sync_is_playing
) {
  //the time ahead of sync request and current time in ms
  let currTime = Date.now();
  let time_delay_ms = currTime - sync_timestamp;
  let syncReq = { uri: null, progress: null, is_playing: null };

  //Compute how far behind the sync request we are, adjusted to the time delay
  let behind_sync_ms = 0;

  if (my_uri !== sync_uri) {
    //Case 1: We are finishing a track and sync started a different track
    behind_sync_ms += sync_progress_ms;
    behind_sync_ms += my_duration_ms - my_progress_ms;
  } else {
    //Case 2: We are on the same track, can be ahead or behind
    behind_sync_ms += my_progress_ms - sync_progress_ms;
  }

  if (Math.abs(behind_sync_ms) > MAX_DELTA_MS) {
    //We are behind or ahead too much, need to update state
    if (my_uri !== sync_uri) {
      //Change Tracks
      syncReq["uri"] = sync_uri;
      syncReq["progress"] = sync_progress_ms;
      syncReq["is_playing"] = sync_is_playing;
    } else if (my_progress_ms !== sync_progress_ms) {
      //Change player position
      syncReq["progress"] = sync_progress_ms;
      syncReq["is_playing"] = sync_is_playing;
    }
  }
  for (const key of Object.keys(syncReq)) {
    if (syncReq[key] !== null) {
      return syncReq;
    }
  }
  return null;
};

export const get_sync_dict_from_json = function(my_json, sync_json) {
  const my_data = my_json;
  const my_uri = my_data.item.uri;
  const my_timestamp = my_data.timestamp;
  const my_progress_ms = my_data.progress_ms;
  const my_is_playing = my_data.is_playing;
  const my_duration_ms = my_data.item.duration_ms;

  const sync_data = sync_json;
  const sync_uri = sync_data.item.uri;
  const sync_timestamp = sync_data.timestamp;
  const sync_progress_ms = sync_data.progress_ms;
  const sync_is_playing = sync_data.is_playing;

  return get_sync_dict(
    my_uri,
    my_timestamp,
    my_progress_ms,
    my_is_playing,
    my_duration_ms,
    sync_uri,
    sync_timestamp,
    sync_progress_ms,
    sync_is_playing
  );
};
