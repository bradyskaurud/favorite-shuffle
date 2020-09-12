<template>
  <div class="home">
    <h2>Spotify</h2>
    <div v-if="oauthConnection.id">
        <ul id="oauthConnection">
            {{ oauthConnection.name }}
        </ul>
    </div>  
    <div v-else>
        <button  v-on:click='authorizeSpotify'>Authorize</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

// @ is an alias to /src
export default {
  name: 'Spotify',
  data: function() {
    return {
      oauthConnection: {},
    };
  },
  props: {
    msg: String
  },
  created () {
    this.getUsers()
  },
  watch: {
    '$route': 'getUsers'
  },
  methods: {
    authorizeSpotify: function() {
      axios.get('http://bskaurud.local.coschedule.ngrok.io/authorize')
        .then((result) => {
          const { authorizeUrl } = result.data || {};
          window.open(authorizeUrl, "AuthWindow", "width=600,height=600");
          
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getUsers: function() {
      axios.get('http://bskaurud.local.coschedule.ngrok.io/oauth_connections')
        .then((result) => {
          this.oauthConnection = result.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  }
}
</script>
